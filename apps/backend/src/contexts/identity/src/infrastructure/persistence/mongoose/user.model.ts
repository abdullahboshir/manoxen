import { model, Schema, Document, Types, Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { contextScopePlugin } from "@manoxen/core-util";
import { cachingMiddleware, auditDiffPlugin } from "@manoxen/infra-common";
import type { IUser } from "../../../domain/entities/user.entity";

export interface IUserDocument extends Omit<IUser, "id" | "_id">, Document {
  id: string;
  _id: Types.ObjectId;
  password?: string;
}

export interface IUserModel extends Model<IUserDocument> {
  isUserExists(email: string): Promise<IUserDocument | null>;
  isPasswordMatched(plainPass: string, hashedPass: string): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedAtTime: Date,
    jwtIssuedTime: number,
  ): boolean;
}

const NameSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true, maxlength: 50 },
    lastName: { type: String, trim: true, maxlength: 50 },
  },
  { _id: false },
);

const LoginHistorySchema = new Schema(
  {
    date: { type: Date, required: true, default: Date.now },
    ip: { type: String, required: true },
    userAgent: { type: String, required: true },
  },
  { _id: false },
);

const UserSchema = new Schema<IUserDocument, IUserModel>(
  {
    id: { type: String, required: true, unique: true, index: true, trim: true },
    name: { type: NameSchema, required: false },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    phone: { type: String, trim: true, sparse: true },
    password: { type: String, required: true, minlength: 6, select: false },
    isSuperAdmin: { type: Boolean, default: false },
    globalRoles: {
      type: [Schema.Types.ObjectId as any],
      ref: "Role",
      default: [],
    },
    region: { type: String },
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    status: { type: String, default: "pending" },
    avatar: { type: String },
    needsPasswordChange: { type: Boolean, default: false },
    passwordChangedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
    loginHistory: [LoginHistorySchema],
    settings: {
      theme: { type: String, default: "system" },
      tableHeight: { type: String, default: "56" },
    },
    directPermissions: [
      {
        permissionId: { type: Schema.Types.ObjectId, ref: "Permission" },
        effect: { type: String, enum: ["allow", "deny"], default: "allow" },
      },
    ],
    setupPasswordToken: { type: String, select: false },
    setupPasswordExpires: { type: Date, select: false },
    metadata: { type: Schema.Types.Mixed },
    organization: {
      type: Schema.Types.ObjectId as any,
      ref: "Organization",
      index: true,
    },
    // businessAccess is now a virtual, linkage handled via UserBusinessAccess collection

    createdBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (_doc, ret: any) {
        delete ret?.password;
        return ret;
      },
    },
    toObject: { virtuals: true },
  },
);

// Virtual for Business Access linkage
UserSchema.virtual("businessAccess", {
  ref: "UserBusinessAccess",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

// Instance method: Check if password matches
UserSchema.methods["isPasswordMatched"] = async function (
  this: any,
  plainText: string,
): Promise<boolean> {
  return await bcrypt.compare(plainText, this.password);
};

// Static method: Check if password matches (explicitly for service layer)
UserSchema.statics["isPasswordMatched"] = async function (
  plainPass: string,
  hashedPass: string,
): Promise<boolean> {
  return await bcrypt.compare(plainPass, hashedPass);
};

// Pre-save middleware to hash password
UserSchema.pre("save", async function (this: any, next) {
  if (!this.password) return next();
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password as string, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Static method: Check if user exists by email
UserSchema.statics["isUserExists"] = async function (
  email: string,
): Promise<IUserDocument> {
  const user = await this.findOne({ email, isDeleted: false, isActive: true })
    .populate([
      {
        path: "globalRoles",
        populate: [
          {
            path: "permissions",
            model: "Permission",
            select:
              "resource action scope effect conditions resolver attributes",
          },
          {
            path: "permissionGroups",
            model: "PermissionGroup",
            select: "permissions resolver",
            populate: {
              path: "permissions",
              model: "Permission",
              select:
                "resource action scope effect conditions resolver attributes",
            },
          },
        ],
      },
      // Direct Permissions Population
      {
        path: "directPermissions.permissionId",
        model: "Permission",
        select: "resource action scope effect conditions resolver attributes",
      },
      {
        path: "businessAccess",
        select:
          "role scope organization businessUnit outlet status isPrimary dataScopeOverride",
        populate: [
          {
            path: "role",
            select: "name title permissionGroups",
            populate: {
              path: "permissionGroups",
              select: "permissions resolver",
              populate: {
                path: "permissions",
                model: "Permission",
                select:
                  "resource action scope effect conditions resolver attributes",
              },
            },
          },
          { path: "organization", select: "name id activeModules" },
          { path: "businessUnit", select: "name slug id" },
          { path: "outlet", select: "name" },
        ],
      },
    ])
    .select("+password");

  return user as IUserDocument;
};

// Static method: Check if JWT was issued before password change
UserSchema.statics["isJWTIssuedBeforePasswordChanged"] = function (
  passwordChangedAtTime: Date,
  jwtIssuedTime: number,
): boolean {
  if (passwordChangedAtTime) {
    const changedTimestamp = Math.floor(passwordChangedAtTime.getTime() / 1000);
    return jwtIssuedTime < changedTimestamp;
  }
  return false;
};

cachingMiddleware(UserSchema as any);
UserSchema.plugin(auditDiffPlugin as any);
UserSchema.plugin(contextScopePlugin as any, {
  organizationField: "organization",
  includeGlobal: true,
});

export const User = model<IUserDocument, IUserModel>("User", UserSchema);

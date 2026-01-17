import { model, Schema } from "mongoose";
import validator from "validator";
import type { ICustomer } from "./customer.interface";
import { contextScopePlugin } from "@manoxen/core-util";

const AddressSchema = new Schema({
  country: { type: String, required: true, default: "Bangladesh" },
  division: { type: String, required: true },
  district: { type: String, required: true },
  subDistrict: { type: String, required: true },
  alliance: String,
  village: String,
  type: { type: String, enum: ["home", "work", "other"], required: true },
  street: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
});

const NameSchema = new Schema({
  firstName: { type: String, required: true, trim: true, maxlength: 50 },
  lastName: { type: String, required: true, trim: true, maxlength: 50 },
  firstNameBangla: { type: String, trim: true, maxlength: 50 },
  lastNameBangla: { type: String, trim: true, maxlength: 50 },
}, { _id: false });

const CustomerSchema = new Schema<ICustomer>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    organization: { type: Schema.Types.ObjectId, ref: "Organization", required: true, index: true },
    businessUnit: { type: Schema.Types.ObjectId, ref: "BusinessUnit", required: true, index: true },
    outlet: { type: Schema.Types.ObjectId, ref: "Outlet", index: true },
    sourceModule: {
      type: String,
      enum: ['pos', 'erp', 'hrm', 'ecommerce', 'crm', 'logistics', 'system'],
      default: 'pos',
      required: true,
      index: true
    },
    id: { type: String, required: true, unique: true, index: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "{VALUE} is not a valid email",
      },
    },
    phone: {
      type: String,
      unique: true,
      index: true,
      trim: true,
      sparse: true,
      validate: {
        validator: (value: string) => !value || /^01\d{9}$/.test(value),
        message: "Invalid phone number format",
      },
    },
    name: NameSchema,
    avatar: { type: String, default: null },
    dateOfBirth: {
      type: Date,
      validate: {
        validator: (value: Date) => !value || value < new Date(),
        message: "Date of birth must be in the past",
      },
    },
    gender: { type: String, enum: ["male", "female", "other"], lowercase: true, trim: true },
    preferences: {
      language: { type: String, enum: ["en", "bn"], default: "en" },
      addresses: [AddressSchema],
      currency: { type: String, enum: ["BDT", "USD"], default: "BDT" },
      newsletter: { type: Boolean, default: false },
      smsNotifications: { type: Boolean, default: true },
      emailNotifications: { type: Boolean, default: true },
    },
    loyaltyPoints: { type: Number, default: 0, min: 0 },
    membershipTier: {
      type: String,
      enum: ["regular", "silver", "gold", "platinum"],
      default: "regular",
      lowercase: true,
      trim: true,
    },
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    recentlyViewed: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

CustomerSchema.virtual("fullName").get(function () {
  if (!this.name) return "";
  return `${this.name.firstName} ${this.name.lastName}`;
});

CustomerSchema.plugin(contextScopePlugin, {
  organizationField: 'organization',
  businessUnitField: 'businessUnit',
  outletField: 'outlet'
});

export const Customer = model<ICustomer>("Customer", CustomerSchema);
export default Customer;

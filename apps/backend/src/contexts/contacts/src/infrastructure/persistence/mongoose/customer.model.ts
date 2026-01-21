import mongoose, { Schema } from "mongoose";
import type { ICustomer } from "../../../domain/entities/customer.entity";


const CustomerSchema = new Schema<ICustomer>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    alternatePhone: { type: String },
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    type: {
      type: String,
      enum: ["individual", "business"],
      required: true,
      default: "individual",
    },
    segment: {
      type: String,
      enum: ["regular", "premium", "vip"],
      default: "regular",
    },
    organization: { type: String },
    businessUnit: { type: String },
    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "active",
    },
    tags: [String],
    notes: String,
    loyaltyPoints: { type: Number, default: 0 },
    avatar: { type: String },
    outlet: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret: any) {
        if (ret) {
            delete ret._id;
            delete ret.__v;
        }
        return ret;
      },
    },
  }
);

CustomerSchema.virtual("user", {
  ref: "User",
  localField: "id", 
  foreignField: "_id",
  justOne: true
});

CustomerSchema.add({
  user: { type: String, ref: "User", required: true }, 
});

export const Customer = mongoose.model<ICustomer>("Customer", CustomerSchema);

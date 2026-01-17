import type { Types } from "mongoose";
import type { TName } from "@manoxen/iam-core";

export type TAddress = {
  country: string;
  division: string;
  district: string;
  subDistrict: string;
  alliance?: string;
  village?: string;
  region?: string;
  type: "home" | "work" | "other" | string;
  street: string;
  state: string;
  postalCode: string;
  isDefault: boolean;
};

export interface ICustomer {
  _id?: Types.ObjectId;
  id: string;
  user: Types.ObjectId;
  organization: Types.ObjectId;
  businessUnit: Types.ObjectId;
  outlet?: Types.ObjectId;
  sourceModule: 'pos' | 'erp' | 'hrm' | 'ecommerce' | 'crm' | 'logistics' | 'system' | string;
  name?: TName;
  email: string;
  phone?: string;
  avatar?: string;
  dateOfBirth?: Date;
  gender?: "male" | "female" | "other" | string;
  preferences?: {
    language?: "en" | "bn" | string;
    addresses?: TAddress[];
    currency?: "BDT" | "USD" | string;
    newsletter?: boolean;
    smsNotifications?: boolean;
    emailNotifications?: boolean;
  };
  loyaltyPoints?: number;
  membershipTier?: "regular" | "silver" | "gold" | "platinum" | string;
  wishlist?: Types.ObjectId[];
  recentlyViewed?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
  // virtuals
  fullName?: string;
  fullNameBangla?: string;
  age?: number | null;
}

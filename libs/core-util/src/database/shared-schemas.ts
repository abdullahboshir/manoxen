import { Schema } from "mongoose";

// ====== SHARED BRANDING SCHEMA ======
export const brandingSchema = new Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String },
    logoUrl: { type: String },
    bannerUrl: { type: String },
    faviconUrl: { type: String },
    tagline: { type: String },
    theme: {
        primaryColor: { type: String, default: "#3B82F6" },
        secondaryColor: { type: String, default: "#1E40AF" },
        accentColor: { type: String, default: "#F59E0B" },
        fontFamily: { type: String, default: "Inter" },
    },
}, { _id: false });

// ====== SHARED CONTACT SCHEMA ======
export const contactSchema = new Schema({
    email: { type: String, required: true },
    phone: { type: String },
    website: { type: String },
    supportPhone: { type: String },
    socialMedia: {
        facebook: { type: String },
        instagram: { type: String },
        twitter: { type: String },
        youtube: { type: String },
        linkedin: { type: String },
    },
}, { _id: false });

// ====== SHARED LOCATION SCHEMA ======
export const locationSchema = new Schema({
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    postalCode: { type: String },
    coordinates: {
        lat: { type: Number },
        lng: { type: Number },
    },
    timezone: { type: String, default: "Asia/Dhaka" },
}, { _id: false });

// ====== SHARED SMTP CONFIG SCHEMA ======
export const smtpConfigSchema = new Schema({
    host: { type: String, required: true },
    port: { type: Number, required: true },
    user: { type: String, required: true },
    password: { type: String, select: false },
    secure: { type: Boolean, default: true },
    fromEmail: { type: String, required: true },
    fromName: { type: String, required: true },
}, { _id: false });

// ====== SHARED BACKUP REGISTRY SCHEMA ======
export const backupRegistrySchema = new Schema({
    schedule: { type: String, enum: ["daily", "weekly", "monthly"], default: "daily" },
    retentionCount: { type: Number, default: 7 },
    storagePath: { type: String },
    encryptionEnabled: { type: Boolean, default: true },
    lastBackupDate: { type: Date },
    lastStatus: { type: String, enum: ["success", "failed", "pending"], default: "pending" },
}, { _id: false });

// ... other schemas from common.schema.ts if needed, 
// for now focusing on what Outlet and Customer need.

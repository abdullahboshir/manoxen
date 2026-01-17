export interface ISharedBranding {
    name: string;
    description?: string;
    logoUrl?: string;
    bannerUrl?: string;
    faviconUrl?: string;
    tagline?: string;
    theme: {
        primaryColor: string;
        secondaryColor: string;
        accentColor: string;
        fontFamily: string;
    };
}

export interface ISharedContact {
    email: string;
    phone?: string;
    website?: string;
    supportPhone?: string;
    socialMedia?: {
        facebook?: string;
        instagram?: string;
        twitter?: string;
        youtube?: string;
        linkedin?: string;
    };
}

export interface ISharedLocation {
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
    timezone: string;
}

export interface ISharedSmtpConfig {
    host: string;
    port: number;
    user: string;
    password?: string;
    secure: boolean;
    fromEmail: string;
    fromName: string;
}

export interface ISharedBackupRegistry {
    schedule: "daily" | "weekly" | "monthly";
    retentionCount: number;
    storagePath: string;
    encryptionEnabled: boolean;
    lastBackupDate?: Date;
    lastStatus: "success" | "failed" | "pending";
}

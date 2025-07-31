export enum UserRole {
    super_admin = 'super_admin',
    admin = 'admin',
    user = 'user',
    host = 'host'
}

export interface SessionInfo {
    id: string;
    token: string;
    userId: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
    ipAddress?: string | null;
    userAgent?: string | null;
}

export interface User {
    role: UserRole;
    id: string;
    name: string;
    emailVerified: boolean;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null;
}

export interface Session {
    user: User;
    session: SessionInfo;
}
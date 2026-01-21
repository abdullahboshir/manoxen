import { User } from "@manoxen/identity";
import { SecurityAlert } from "../../infrastructure/persistence/mongoose/security-alert.model";
import { AuditLog } from "../../infrastructure/persistence/mongoose/audit-log.model";

/**
 * SecurityReviewService
 * Analyzes system state for security vulnerabilities and stale access.
 */
export class SecurityReviewService {
    /**
     * Identifies users who haven't logged in for a long time and have sensitive roles.
     */
    static async identifyStaleSensitiveAccounts() {
        const ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

        const staleUsers = await User.find({
            isActive: true,
            isDeleted: false,
            lastLogin: { $lt: ninetyDaysAgo },
            // Assuming we check for manager or owner roles if possible
            // For now just identifying inactive ones
        }).populate('organization');

        for (const user of staleUsers) {
            await SecurityAlert.create({
                type: 'STALE_ACCOUNT',
                severity: 'low',
                message: `User ${user.email} has been inactive for over 90 days.`,
                metadata: { userId: user._id, lastLogin: user.lastLogin },
                organization: (user.organization as any)?._id || user.organization
            });
        }

        return staleUsers.length;
    }

    /**
     * Scans audit logs for repeated failed login attempts from same IP.
     */
    static async scanForBruteForceAttacks() {
        const oneHourAgo = new Date();
        oneHourAgo.setHours(oneHourAgo.getHours() - 1);

        const failedLogins = await AuditLog.aggregate([
            { $match: { action: 'LOGIN_FAILURE', timestamp: { $gte: oneHourAgo } } },
            { $group: { _id: "$ip", count: { $sum: 1 }, userEmails: { $addToSet: "$metadata.email" } } },
            { $match: { count: { $gt: 10 } } }
        ]);

        for (const attack of failedLogins) {
            await SecurityAlert.create({
                type: 'BRUTE_FORCE_TRIAL',
                severity: 'high',
                message: `Potential brute force attack detected from IP ${attack._id}.`,
                metadata: { ip: attack._id, attempts: attack.count, targetedEmails: attack.userEmails }
            });
        }

        return failedLogins.length;
    }

    /**
     * Full Security Audit Run.
     */
    static async runFullAudit() {
        const staleCount = await this.identifyStaleSensitiveAccounts();
        const bruteCount = await this.scanForBruteForceAttacks();

        return {
            staleAccountsIdentified: staleCount,
            potentialAttacksLogged: bruteCount,
            timestamp: new Date()
        };
    }
}

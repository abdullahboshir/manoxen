import nodemailer from "nodemailer";
import appConfig from "#shared/config/app.config";

/**
 * Industrial Standard Centralized Email Service
 */
export class MailService {
    private static transporter = nodemailer.createTransport({
        host: appConfig.smtp_host,
        port: appConfig.smtp_port,
        secure: appConfig.smtp_port === 465, // true for 465, false for other ports
        auth: {
            user: appConfig.smtp_user,
            pass: appConfig.smtp_pass,
        },
    });

    /**
     * Generic Method to Send Email
     */
    static async sendEmail(to: string, subject: string, html: string) {
        try {
            console.log(`âœ‰ï¸ Attempting to send email to: ${to}`);
            console.log(`ðŸ”§ SMTP Debug - Host: ${appConfig.smtp_host}, User: ${appConfig.smtp_user ? '***' : 'MISSING'}, Pass: ${appConfig.smtp_pass ? '***' : 'MISSING'}`);

            const info = await this.transporter.sendMail({
                from: `"${appConfig.smtp_from_name || 'Manoxen'}" <${appConfig.smtp_from}>`,
                to,
                subject,
                html,
            });

            console.log(`âœ‰ï¸ Email sent successfully to ${to}: ${info.messageId}`);
            return info;
        } catch (error) {
            console.error(`âŒ Failed to send email to ${to}:`, error);
            // We don't throw here to prevent breaking the main flow (e.g., organization creation)
            // but in production, we should log this to a monitoring system.
            return null;
        }
    }
}
















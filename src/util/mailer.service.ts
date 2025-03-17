import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  private async sendEmail(
    toEmail: string,
    subject: string,
    html: string,
  ): Promise<void> {
    const mailOptions = {
      from: '"CodeFlow Support" <codeflow01@gmail.com>',
      to: toEmail,
      subject,
      html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(
        `[MailerService] Email sent to ${toEmail}: ${info.messageId}`,
      );
    } catch (error) {
      console.error(
        `[MailerService] Error sending email to ${toEmail}:`,
        error,
      );
      throw new Error('Unable to send email. Please try again later.');
    }
  }

  async sendWelcomeEmail(toEmail: string, toName: string): Promise<void> {
    const subject = 'Welcome to CodeFlow!';
    const html = `
      <h3>Hello ${toName},</h3>
      <p>Welcome to CodeFlow! We're thrilled to have you on board. 🚀</p>
      <p>Start exploring, collaborating, and unleashing your coding potential today!</p>
      <p>Need assistance? Reach out to us anytime at <a href="mailto:codeflow01@gmail.com">codeflow01@gmail.com</a>.</p>
      <hr />
      <footer style="font-size: 12px; color: #666; text-align: center;">
        <p>&copy; ${new Date().getFullYear()} CodeFlow. All rights reserved.</p>
        <p>Kolkata, India</p>
        <p>
          <a href="mailto:codeflow01@gmail.com">Email Support</a> | 
          <a href="https://www.codeflow.com/terms">Terms of Service</a> | 
          <a href="https://www.codeflow.com/privacy">Privacy Policy</a>
        </p>
      </footer>
    `;
    await this.sendEmail(toEmail, subject, html);
  }

  async sendVerificationEmail(
    toEmail: string,
    toName: string,
    currentOTP: string,
  ): Promise<void> {
    const subject = 'Verify Your CodeFlow Account!';
    const html = `
      <h3>Hello ${toName},</h3>
      <p>To complete your account verification, use the OTP below:</p>
      <h1 style="text-align: center; font-size: 48px; color: #4CAF50;">${currentOTP}</h1>
      <p>This OTP is valid for 5 minutes. If you did not request this, please ignore this email.</p>
      <hr />
      <footer style="font-size: 12px; color: #666; text-align: center;">
        <p>&copy; ${new Date().getFullYear()} CodeFlow. All rights reserved.</p>
        <p>Kolkata, India</p>
        <p>
          <a href="mailto:codeflow01@gmail.com">Email Support</a> | 
          <a href="https://www.codeflow.com/terms">Terms of Service</a> | 
          <a href="https://www.codeflow.com/privacy">Privacy Policy</a>
        </p>
      </footer>
    `;
    await this.sendEmail(toEmail, subject, html);
  }

  async sendLoginNotification(
    toEmail: string,
    toName: string,
    ipAddress: string,
    userAgent: string,
  ): Promise<void> {
    const subject = 'New Login Detected on Your CodeFlow Account';
    const html = `
      <h3>Hello ${toName},</h3>
      <p>We noticed a new login to your CodeFlow account:</p>
      <ul>
        <li><strong>IP Address: </strong> ${ipAddress}</li>
        <li><strong>Device: </strong> ${userAgent}</li>
      </ul>
      <p>If this was you, no further action is required. If you suspect any suspicious activity, please reset your password immediately.</p>
      <p>Need help? Contact us at <a href="mailto:codeflow01@gmail.com">codeflow01@gmail.com</a>.</p>
      <hr />
      <footer style="font-size: 12px; color: #666; text-align: center;">
        <p>&copy; ${new Date().getFullYear()} CodeFlow. All rights reserved.</p>
        <p>Kolkata, India</p>
        <p>
          <a href="mailto:codeflow01@gmail.com">Email Support</a> | 
          <a href="https://www.codeflow.com/terms">Terms of Service</a> | 
          <a href="https://www.codeflow.com/privacy">Privacy Policy</a>
        </p>
      </footer>
    `;
    await this.sendEmail(toEmail, subject, html);
  }
}

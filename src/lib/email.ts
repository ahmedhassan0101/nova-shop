/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/email.ts
import { Resend } from "resend";
import { ApiError } from "./apiResponse";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}`;

  try {
    await resend.emails.send({
      from: "Your Store <onboarding@resend.dev>",
      to: email,
      subject: "Verify your email address",
      html: `
        <!DOCTYPE html>
        <html dir="ltr">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0;">Welcome to Our Store! 🎉</h1>
            </div>
            
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; color: #333;">Hi there,</p>
              
              <p style="font-size: 16px; color: #333;">
                Thank you for signing up! Please verify your email address by clicking the button below:
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${verificationUrl}" 
                   style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                  Verify Email Address
                </a>
              </div>
              
              <p style="font-size: 14px; color: #666;">
                Or copy and paste this link in your browser:<br>
                <a href="${verificationUrl}" style="color: #667eea; word-break: break-all;">${verificationUrl}</a>
              </p>
              
              <p style="font-size: 14px; color: #666; margin-top: 30px;">
                This link will expire in 24 hours.
              </p>
              
              <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
              
              <p style="font-size: 12px; color: #999;">
                If you didn't create an account, you can safely ignore this email.
              </p>
            </div>
          </body>
        </html>
      `,
    });
  } catch (error: any) {
    throw new ApiError({
      message: error?.message || "Failed to send verification email",
      messageKey: "email.verification.sendFailed",
      status: 500,
    });
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;
  try {
    await resend.emails.send({
      from: "Your Store <onboarding@resend.dev>",
      to: email,
      subject: "Reset your password",
      html: `
        <!DOCTYPE html>
        <html dir="ltr">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #f44336; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0;">Password Reset Request 🔐</h1>
            </div>
            
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; color: #333;">Hi there,</p>
              
              <p style="font-size: 16px; color: #333;">
                We received a request to reset your password. Click the button below to create a new password:
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" 
                   style="background: #f44336; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                  Reset Password
                </a>
              </div>
              
              <p style="font-size: 14px; color: #666;">
                Or copy and paste this link in your browser:<br>
                <a href="${resetUrl}" style="color: #f44336; word-break: break-all;">${resetUrl}</a>
              </p>
              
              <p style="font-size: 14px; color: #666; margin-top: 30px;">
                This link will expire in 1 hour.
              </p>
              
              <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
              
              <p style="font-size: 12px; color: #999;">
                If you didn't request a password reset, please ignore this email or contact support if you have concerns.
              </p>
            </div>
          </body>
        </html>
      `,
    });
  } catch (error: any) {
    throw new ApiError({
      message: error?.message || "Failed to send password reset email",
      messageKey: "email.passwordReset.sendFailed",
      status: 500,
    });
  }
}

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    await resend.emails.send({
      from: "Your Store <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to Our Store! 🎊",
      html: `
        <!DOCTYPE html>
        <html dir="ltr">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0;">Welcome, ${name}! 🎉</h1>
            </div>
            
            <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; color: #333;">
                Your account is now fully set up and ready to use!
              </p>
              
              <p style="font-size: 16px; color: #333;">
                Here's what you can do now:
              </p>
              
              <ul style="font-size: 16px; color: #333; line-height: 1.8;">
                <li>Browse our latest products</li>
                <li>Add items to your wishlist</li>
                <li>Track your orders</li>
                <li>Manage your addresses</li>
                <li>Get exclusive deals</li>
              </ul>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXTAUTH_URL}" 
                   style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                  Start Shopping
                </a>
              </div>
              
              <p style="font-size: 14px; color: #666; margin-top: 30px;">
                If you have any questions, feel free to contact our support team.
              </p>
            </div>
          </body>
        </html>
      `,
    });
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
}

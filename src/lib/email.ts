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
  const STORE_NAME = "Nova Shop";
  const WARNING_COLOR = "#f97316"; // Secondary/Warning Orange
  const ACCENT_BG = "#fff7ed"; // Light Accent Background
  try {
    await resend.emails.send({
      from: "Your Store <onboarding@resend.dev>",
      to: email,
      subject: "Reset your password",
      html: `
        <!DOCTYPE html>
          <html lang="en" dir="ltr">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Password Reset Request</title>
            </head>
            
            <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: Arial, sans-serif;">
              <center style="width: 100%; table-layout: fixed;">
                <table align="center" style="border-collapse: collapse; max-width: 600px; margin: 40px auto; width: 100%; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                  
                  <tr>
                    <td align="center" style="padding: 25px 30px; background-color: ${WARNING_COLOR}; border-radius: 12px 12px 0 0;">
                      <h1 style="color: #ffffff; font-size: 28px; font-weight: bold; margin: 0;">${STORE_NAME} 🔒</h1>
                    </td>
                  </tr>
                  
                  <tr>
                    <td style="padding: 30px;">
                      <h2 style="font-size: 22px; color: #1f2937; margin-top: 0;">Password Reset Request</h2>
                      
                      <p style="font-size: 16px; color: #4b5563; line-height: 1.6;">
                         We received a request to reset the password for your account. If this was you, please click the button below to create a new password:
                      </p>
                      
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td align="center" style="padding: 30px 0;">
                            <a href="${resetUrl}" 
                              style="background-color: ${WARNING_COLOR}; color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 16px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                                Reset Password
                            </a>
                          </td>
                        </tr>
                      </table>

                      <p style="font-size: 14px; color: #6b7280; line-height: 1.6;">
                         Or copy and paste this link into your browser:
                       <br>
                        <a href="${resetUrl}" style="color: ${WARNING_COLOR}; word-break: break-all; text-decoration: none;">${resetUrl}</a>
                      </p>
                      
                      <p style="font-size: 14px; color: #9f1239; margin-top: 20px; padding: 10px; background-color: ${ACCENT_BG}; border-radius: 6px;">
                       ⚠️ For security reasons, this link is valid for 1 hour only.
                      </p>

                      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
                      
                      <p style="font-size: 12px; color: #9ca3af; text-align: center;">
                         If you didn't request a password reset, please ignore this email.
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td align="center" style="padding: 20px 30px; background-color: #f9fafb; border-radius: 0 0 12px 12px;">
                      <p style="font-size: 12px; color: #9ca3af; margin: 0;">
                        © ${new Date().getFullYear()} ${STORE_NAME}. . All Rights Reserved.
                      </p>
                    </td>
                  </tr>

                </table>
              </center>
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
//  <!DOCTYPE html>
//         <html dir="ltr">
//           <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           </head>
//           <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
//             <div style="background: #f44336; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
//               <h1 style="color: white; margin: 0;">Password Reset Request 🔐</h1>
//             </div>

//             <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
//               <p style="font-size: 16px; color: #333;">Hi there,</p>

//               <p style="font-size: 16px; color: #333;">
//                 We received a request to reset your password. Click the button below to create a new password:
//               </p>

//               <div style="text-align: center; margin: 30px 0;">
//                 <a href="${resetUrl}"
//                    style="background: #f44336; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
//                   Reset Password
//                 </a>
//               </div>

//               <p style="font-size: 14px; color: #666;">
//                 Or copy and paste this link in your browser:<br>
//                 <a href="${resetUrl}" style="color: #f44336; word-break: break-all;">${resetUrl}</a>
//               </p>

//               <p style="font-size: 14px; color: #666; margin-top: 30px;">
//                 This link will expire in 1 hour.
//               </p>

//               <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

//               <p style="font-size: 12px; color: #999;">
//                 If you didn't request a password reset, please ignore this email or contact support if you have concerns.
//               </p>
//             </div>
//           </body>
//         </html>

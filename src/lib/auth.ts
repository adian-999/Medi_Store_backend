
import nodemailer from "nodemailer";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";



const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins:[process.env.APP_URL || "http://localhost:4000"],
  user:{
    additionalFields:{
        role:{
            type:"string",
            defaultValue:"USER",
            required:false
        },
        phone:{
            type:"string",
            required:false
        },
        status:{
            type:"string",
            defaultValue:"ACTIVE",
            required:false
        }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn:false,
    requireEmailVerification:true
  },
  emailVerification: {
    sendOnSignUp:true,
    autoSignInAfterVerification:true,
    sendVerificationEmail: async ( { user, url, token }, request) => {
     const verificationURL = `${process.env.APP_URL}/verify-email?token=${token}`;

const info = await transporter.sendMail({
  from: '"Medi Store" <medi-store99@gmail.com>',
  to: user.email,
  subject: "Verify Your Email - Medi Store",
  html: `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Email Verification</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,sans-serif;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:auto;background:#ffffff;border-radius:8px;overflow:hidden;">

      <!-- Header -->
      <tr>
        <td style="background-color:#0d6efd;padding:20px;text-align:center;">
          <h1 style="color:#ffffff;margin:0;">Medi Store</h1>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:30px;">
          <h2 style="margin-top:0;color:#333;">Verify Your Email Address</h2>
          <p style="color:#555;font-size:15px;line-height:1.6;">
            Thank you for registering with <strong>Medi Store</strong>.
            Please click the button below to verify your email address.
          </p>

          <!-- Button -->
          <div style="text-align:center;margin:30px 0;">
            <a href="${verificationURL}"
               style="background-color:#0d6efd;
                      color:#ffffff;
                      padding:12px 25px;
                      text-decoration:none;
                      border-radius:5px;
                      display:inline-block;
                      font-weight:bold;">
              Verify Email
            </a>
          </div>

          <p style="color:#777;font-size:13px;">
            If the button does not work, copy and paste this link into your browser:
          </p>

          <p style="word-break:break-all;color:#0d6efd;font-size:13px;">
            ${verificationURL}
          </p>

          <p style="color:#999;font-size:12px;margin-top:30px;">
            If you did not create this account, you can safely ignore this email.
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f1f1f1;text-align:center;padding:15px;font-size:12px;color:#777;">
          © ${new Date().getFullYear()} Medi Store. All rights reserved.
        </td>
      </tr>

    </table>
  </body>
  </html>
  `,
});

  console.log("Message sent:", info.messageId);
    },
  },

   socialProviders: {
        google: {
          prompt:"select_account consent",
          accessType:"offline",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
});

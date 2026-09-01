import { betterAuth } from "better-auth";
import { magicLink } from "better-auth/plugins";
import nodemailer from "nodemailer";
import { getDatabase } from "./database";

const githubEnabled = Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET);

const mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "postfix",
  port: Number(process.env.SMTP_PORT || 25),
  secure: process.env.SMTP_SECURE === "true",
  auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } : undefined,
});

export const auth = betterAuth({
  appName: "Coordiation Discussions",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3001",
  secret: process.env.BETTER_AUTH_SECRET || "coordiation-discussions-development-secret-change-me",
  database: getDatabase(),
  socialProviders: githubEnabled ? {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      scope: ["read:user", "user:email"],
    },
  } : {},
  account: { accountLinking: { enabled: true, trustedProviders: ["github"] } },
  plugins: [
    magicLink({
      expiresIn: 10 * 60,
      storeToken: "hashed",
      sendMagicLink: async ({ email, url }) => {
        await mailer.sendMail({
          from: process.env.AUTH_EMAIL_FROM || "Coordiation Discussions <no-reply@coordiation.com>",
          to: email,
          subject: "Your secure link to Coordiation Discussions",
          text: `Use this secure, single-use link to sign in to Coordiation Discussions:\n\n${url}\n\nThe link expires in 10 minutes. If you did not request it, you can ignore this email.`,
          html: `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:32px;color:#111"><p style="font-size:12px;letter-spacing:.12em">COORDIATION DISCUSSIONS</p><h1 style="font-size:32px;line-height:1.05">Continue the conversation.</h1><p style="color:#666;line-height:1.7">Use the secure, single-use button below to sign in. It expires in 10 minutes.</p><p style="margin:30px 0"><a href="${url}" style="display:inline-block;padding:14px 20px;background:#111;color:#fff;text-decoration:none;font-weight:700">Sign in to Discussions</a></p><p style="color:#888;font-size:12px;line-height:1.6">If you did not request this email, you can safely ignore it.</p></div>`,
        });
      },
    }),
  ],
  session: { expiresIn: 60 * 60 * 24 * 30, updateAge: 60 * 60 * 24 },
  advanced: { database: { joins: true }, useSecureCookies: process.env.NODE_ENV === "production" },
});

export type DiscussionSession = typeof auth.$Infer.Session;

export async function getSession(requestHeaders: Headers) {
  return auth.api.getSession({ headers: requestHeaders });
}

export function isDiscussionAdmin(email?: string | null) {
  if (!email) return false;
  return (process.env.DISCUSSIONS_ADMIN_EMAILS || "wiryosaputra@coordiation.com")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .includes(email.toLowerCase());
}


import { betterAuth } from "better-auth";
import { magicLink } from "better-auth/plugins";

// Schema-only configuration used by the official Better Auth CLI.
// Runtime configuration, including PostgreSQL and email delivery, lives in app/lib/auth.ts.
export const auth = betterAuth({
  plugins: [
    magicLink({
      sendMagicLink: async () => undefined,
      storeToken: "hashed",
    }),
  ],
});

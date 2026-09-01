"use client";

import { useState, type FormEvent } from "react";
import SolarIcon from "@/app/_components/SolarIcon";
import { authClient } from "@/app/lib/auth-client";

export default function LoginPanel({ returnTo = "/discussions" }: { returnTo?: string }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function requestMagicLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return setMessage("Enter your email address first.");
    setPending(true);
    setMessage("");
    const { error } = await authClient.signIn.magicLink({ email, callbackURL: returnTo });
    setPending(false);
    setMessage(error ? "We could not send the link. Please try again in a moment." : "Check your inbox. Your secure sign-in link expires in 10 minutes.");
  }

  async function signInWithGitHub() {
    setPending(true);
    setMessage("");
    const { error } = await authClient.signIn.social({ provider: "github", callbackURL: returnTo });
    if (error) { setPending(false); setMessage("GitHub sign-in is temporarily unavailable."); }
  }

  return <div className="discussion-login-actions">
    <button className="discussion-github-button co-flex co-items-center co-justify-between" type="button" onClick={signInWithGitHub} disabled={pending}>
      <span className="co-inline-flex co-items-center"><SolarIcon name="code-circle" size={19} />Continue with GitHub</span><SolarIcon name="arrow-right" size={16} />
    </button>
    <div className="discussion-divider"><span>OR USE EMAIL</span></div>
    <form onSubmit={requestMagicLink}>
      <label htmlFor="discussion-login-email">Email address</label>
      <div className="discussion-email-field co-flex co-items-center">
        <SolarIcon name="letter" size={17} />
        <input id="discussion-login-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <button type="submit" aria-label="Send magic link" disabled={pending}><SolarIcon name="arrow-right" size={16} /></button>
      </div>
      <p>We will send a single-use sign-in link. No password required.</p>
    </form>
    <p className="discussion-login-message" role="status" aria-live="polite">{message}</p>
  </div>;
}

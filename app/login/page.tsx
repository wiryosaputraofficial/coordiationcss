import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
import SolarIcon from "@/app/_components/SolarIcon";
import { createSeoMetadata } from "@/app/seo";
import LoginPanel from "./LoginPanel";
import "../discussions/discussions.css";

export const metadata: Metadata = createSeoMetadata({
  path: "/login",
  title: "Sign in to Coordiation Discussions",
  description: "Sign in with GitHub or an email magic link to ask questions, share answers, vote, and follow Coordiation discussions.",
  robots: { index: false, follow: true },
});

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ returnTo?: string }> }) {
  const requestedReturn = (await searchParams).returnTo;
  const returnTo = requestedReturn?.startsWith("/") && !requestedReturn.startsWith("//") ? requestedReturn : "/discussions";
  return (
    <main className="discussion-login" id="top">
      <header className="discussion-auth-header co-flex co-items-center co-justify-between">
        <Link className="brand" href="/" aria-label="Coordiation home"><img src="/coordiation-logo.png" alt="" /><span>Coordiation</span><span className="brand-product">Discussions</span></Link>
        <Link className="discussion-back co-inline-flex co-items-center" href="/discussions"><SolarIcon name="arrow-left" size={15} />Browse discussions</Link>
      </header>

      <div className="discussion-login-grid co-grid">
        <section className="discussion-login-intro co-flex">
          <p className="discussion-overline"><span>CO</span> COMMUNITY ACCESS</p>
          <h1>Ask clearly.<br /><em>Build together.</em></h1>
          <p>Join the community space for practical questions about Coordiation utilities, components, themes, tooling, and AI-assisted product delivery.</p>
          <dl className="discussion-login-proof co-grid">
            <div><dt><SolarIcon name="chat-round-line" size={18} /></dt><dd><strong>128</strong><span>Public discussions</span></dd></div>
            <div><dt><SolarIcon name="users-group-rounded" size={18} /></dt><dd><strong>486</strong><span>Community members</span></dd></div>
            <div><dt><SolarIcon name="check-circle" size={18} /></dt><dd><strong>72%</strong><span>Questions solved</span></dd></div>
          </dl>
          <p className="discussion-public-note"><SolarIcon name="eye" size={16} />You can read every public discussion without an account.</p>
        </section>

        <section className="discussion-login-card" aria-labelledby="login-title">
          <div className="discussion-login-card-head"><span>MEMBER SIGN IN</span><b>01</b></div>
          <div className="discussion-login-card-body">
            <SolarIcon name="chat-round-dots" size={32} />
            <h2 id="login-title">Continue to Discussions</h2>
            <p>Use GitHub for the fastest setup, or receive a secure one-time link by email.</p>
            <LoginPanel returnTo={returnTo} />
          </div>
          <footer>By continuing, you agree to keep discussions useful, respectful, and relevant to the Coordiation community.</footer>
        </section>
      </div>
    </main>
  );
}

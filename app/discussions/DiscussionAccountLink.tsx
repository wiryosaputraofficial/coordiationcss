"use client";

import Link from "@/app/_components/SiteLink";
import SolarIcon from "@/app/_components/SolarIcon";
import { authClient } from "@/app/lib/auth-client";

export default function DiscussionAccountLink() {
  const { data: session, isPending } = authClient.useSession();
  if (isPending) return <span className="header-cta discussion-account-pending" aria-label="Checking account" aria-busy="true">Account <SolarIcon name="user-circle" size={15} /></span>;
  return <Link className="header-cta co-inline-flex co-items-center" href={session ? "/profile" : "/login"}>
    {session ? (session.user.name || "Profile") : "Sign in"}
    <SolarIcon name={session ? "user-circle" : "arrow-to-top-right"} size={15} />
  </Link>;
}

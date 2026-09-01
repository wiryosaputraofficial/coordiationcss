"use client";

import Link from "@/app/_components/SiteLink";
import SolarIcon from "@/app/_components/SolarIcon";
import { authClient } from "@/app/lib/auth-client";

export default function DiscussionAccountLink() {
  const { data: session } = authClient.useSession();
  return <Link className="header-cta co-inline-flex co-items-center" href={session ? "/profile" : "/login"}>
    {session ? (session.user.name || "Profile") : "Sign in"}
    <SolarIcon name={session ? "user-circle" : "arrow-to-top-right"} size={15} />
  </Link>;
}

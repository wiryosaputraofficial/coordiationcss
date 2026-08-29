import type { AnchorHTMLAttributes, ReactNode } from "react";

type SiteLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  children: ReactNode;
  href: string;
  prefetch?: boolean;
};

export default function SiteLink({ href, prefetch: _prefetch, ...props }: SiteLinkProps) {
  void _prefetch;
  return <a href={href} {...props} />;
}

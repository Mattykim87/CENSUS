import { env } from "@/env";
import { getSafeUrlString } from "@/lib/url-utils";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Table",
  description:
    "Shadcn table with server side sorting, pagination, and filtering",
  url: getSafeUrlString(process.env.NEXT_PUBLIC_SITE_URL || "https://tablecn.com"),
  links: { github: "https://github.com/sadmann7/shadcn-table" },
};

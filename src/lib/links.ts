/**
 * Outbound destinations.
 *
 * These are build-time env vars so the same source can be pointed elsewhere
 * without a code change. The developer portal is optional: when it is not
 * configured, links to it are left out rather than rendered as dead links.
 */
const env = import.meta.env;

const contactEmail = env.VITE_CONTACT_EMAIL || "hello@trobus.gh";

export const LINKS = {
  contactEmail,
  pilot: `mailto:${contactEmail}?subject=${encodeURIComponent("Running Trobus on our routes")}`,
  developerPortal: env.VITE_DEVELOPER_PORTAL_URL || "",
} as const;

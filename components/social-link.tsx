"use client";

import { socialLinks } from "@/data/social-links";
import { SocialIcon } from "@/components/icons/social-icons";

export function SocialLink({ social }: { social: (typeof socialLinks)[number] }) {
  return (
    <a
      href={social.url || undefined}
      aria-label={social.label}
      aria-disabled={!social.url || undefined}
      className={`social-link social-${social.id}${!social.url ? " link-muted" : ""}`}
      onClick={!social.url ? (event) => event.preventDefault() : undefined}
    >
      <SocialIcon id={social.icon} size={22} />
    </a>
  );
}


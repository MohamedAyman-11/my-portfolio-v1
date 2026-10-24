"use client";

import { icons } from "@/config/icons";
import { site } from "@/config/site";
import { socialLinks } from "@/data/social-links";
import type { Locale } from "@/types/portfolio";
import type { Messages } from "@/lib/i18n";
import { SocialLink } from "@/components/social-link";

export function Footer({
  t,
  locale,
  onTop,
}: {
  t: Messages;
  locale: Locale;
  onTop: () => void;
}) {
  const Up = locale === "ar" ? icons.arrowUpLeft : icons.arrowUpRight;
  return (
    <footer className="footer">
      <div className="footer-main">
        <button className="brand footer-brand" onClick={onTop}>
          {site.signature}
          <small>{t.footerRole}</small>
        </button>
        <div className="footer-socials">
          {socialLinks.map((social) => (
            <SocialLink key={social.id} social={social} />
          ))}
        </div>
        <button className="back-top" onClick={onTop}>
          {t.top}
          <Up size={15} />
        </button>
      </div>
      <div className="footer-divider" />
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>
          {t.copyright}
          <i> ✳ </i>
        </span>
        <span className="footer-location">{site.location[locale]}</span>
      </div>
    </footer>
  );
}

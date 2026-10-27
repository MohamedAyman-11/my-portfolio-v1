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
  const linkedInUrl = socialLinks.find((social) => social.id === "linkedin")?.url;
  return (
    <footer className="footer">
      <div className="footer-main">
        <button className="brand footer-brand" onClick={onTop}>
          {site.signature}
          <small>{t.footerRole}</small>
        </button>
        <div className="footer-socials">
          {socialLinks.filter((social) => social.id === "github" || social.id === "linkedin").map((social) => (
            <SocialLink key={social.id} social={social} />
          ))}
        </div>
        <button className="back-top" type="button" onClick={onTop} aria-label={t.top}>
          {t.top}
          <span className="back-top-icon"><Up size={15} /></span>
        </button>
      </div>
      <div className="footer-divider" />
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {t.copyrightStart}{" "}
          <span className="footer-heart" aria-hidden="true">♥</span>{" "}
          {t.copyrightEnd}
        </span>
        <p className="footer-credit" dir="ltr">
          <span className="footer-code-punct">&lt;</span>
          <span className="footer-code-name">Developed</span>{" "}
          <span className="footer-code-attribute">by</span>=
          <span className="footer-code-string">&quot;</span>
          <a className="footer-credit-link" href={linkedInUrl} target="_blank" rel="noreferrer">
            Mohamed Ayman
          </a>
          <span className="footer-code-string">&quot;</span>{" "}
          <span className="footer-code-attribute">andPowered</span>=
          <span className="footer-code-value">true</span>{" "}
          <span className="footer-code-punct">/&gt;</span>
        </p>
      </div>
    </footer>
  );
}

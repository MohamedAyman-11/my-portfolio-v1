"use client";

import { motion } from "framer-motion";
import { icons } from "@/config/icons";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { socialLinks } from "@/data/social-links";
import type { Locale } from "@/types/portfolio";
import { SocialIcon } from "@/components/icons/social-icons";
import {
  REVEAL_EASE,
  VIEWPORT_AMOUNT,
  reveal,
  revealFromSide,
  type BaseProps,
} from "./motion";

export function ContactSection({
  t,
  reducedMotion,
  locale,
  formStatus,
  onSubmit,
}: BaseProps & {
  locale: Locale;
  formStatus: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  const rtl = locale === "ar";
  const Arrow = rtl ? icons.arrowLeft : icons.arrowRight;
  return (
    <section className="section contact-section section-anchor" id="contact">
      <div className="section-inner">
        <motion.div
          className="section-heading contact-heading"
          {...reveal(reducedMotion)}
        >
          <div className="eyebrow">
            <span className="eyebrow-line" />
            {t.contactEyebrow}
          </div>
          <h2>
            {t.contactTitleLead}{" "}
            <span className="gradient-text">{t.contactTitleAccent}</span>
          </h2>
          <p>{t.contactBody}</p>
        </motion.div>
        <div className="contact-panel">
          <div className="contact-sidebar">
            <motion.article
              className="contact-copy card-surface"
              {...(reducedMotion
                ? {}
                : {
                    initial: { opacity: 0, x: -48, rotateY: -8 },
                    whileInView: { opacity: 1, x: 0, rotateY: 0 },
                    viewport: { once: true, amount: VIEWPORT_AMOUNT },
                    transition: {
                      duration: 1.1,
                      ease: REVEAL_EASE,
                    },
                  })}
            >
              <div className="contact-card-heading">
                <span className="contact-card-icon">
                  <icons.sparkles size={20} />
                </span>
                <div>
                  <h3>{t.contactCardTitle}</h3>
                  <span>{t.contactAvailability}</span>
                </div>
              </div>
              <p>{t.contactCardBody}</p>
              {site.location[locale] && (
                <div className="contact-location">
                  <icons.mapPin size={18} />
                  <span>{site.location[locale]}</span>
                </div>
              )}
              <div className="contact-decoration" aria-hidden="true">
                ✳
              </div>
            </motion.article>
            <motion.section
              className="contact-connect card-surface"
              {...(reducedMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 34, scale: 0.92 },
                    whileInView: { opacity: 1, y: 0, scale: 1 },
                    viewport: { once: true, amount: VIEWPORT_AMOUNT },
                    transition: {
                      duration: 1.1,
                      delay: 0.08,
                      ease: REVEAL_EASE,
                    },
                  })}
            >
              <h3>{t.connectTitle}</h3>
              <div className="contact-socials">
                {socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.url || undefined}
                    aria-label={social.label}
                    title={social.label}
                    aria-disabled={!social.url || undefined}
                    className={`social-link social-${social.id}${!social.url ? " link-muted" : ""}`}
                    onClick={
                      !social.url
                        ? (event) => event.preventDefault()
                        : undefined
                    }
                  >
                    <SocialIcon id={social.icon} size={23} />
                  </a>
                ))}
                <a
                  href={`mailto:${site.email}`}
                  aria-label={site.email}
                  title={site.email}
                  className="social-link social-email"
                >
                  <icons.mail size={22} />
                </a>
              </div>
            </motion.section>
            <motion.article
              className="contact-email-card card-surface"
              {...(reducedMotion
                ? {}
                : {
                    initial: { opacity: 0, x: -28, y: 18, scale: 0.96 },
                    whileInView: { opacity: 1, x: 0, y: 0, scale: 1 },
                    viewport: { once: true, amount: VIEWPORT_AMOUNT },
                    transition: {
                      duration: 1.1,
                      delay: 0.16,
                      ease: REVEAL_EASE,
                    },
                  })}
            >
              <span className="contact-card-icon">
                <icons.mail size={20} />
              </span>
              <div>
                <span className="contact-email-label">
                  {t.emailDirectLabel}
                </span>
                {site.email ? (
                  <a href={`mailto:${site.email}`}>
                    {site.email}
                    <icons.arrowUpRight size={15} />
                  </a>
                ) : (
                  <span className="email-placeholder">{t.emailMissing}</span>
                )}
              </div>
            </motion.article>
          </div>
          <motion.form
            className="contact-form"
            onSubmit={onSubmit}
            noValidate
            {...revealFromSide(reducedMotion, "right", 0, VIEWPORT_AMOUNT, 1.1)}
          >
            <h3>{t.sendMessageTitle}</h3>
            <div className="form-row">
              <label>
                {t.contactName}
                <input
                  name="name"
                  autoComplete="name"
                  required
                  placeholder={t.namePlaceholder}
                />
              </label>
              <label>
                {t.contactEmail}
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder={t.emailPlaceholder}
                />
              </label>
            </div>
            <label>
              {t.subject}
              <input
                name="subject"
                required
                placeholder={t.subjectPlaceholder}
              />
            </label>
            <label>
              {t.message}
              <textarea
                name="message"
                required
                rows={4}
                placeholder={t.messagePlaceholder}
              />
            </label>
            <Button variant="ghost" className="button button-primary send-button" type="submit">
              {t.send}
              <Arrow size={16} />
            </Button>
            <p
              className={`form-feedback ${formStatus === t.formError ? "error" : ""}`}
              aria-live="polite"
            >
              {formStatus || (site.email ? t.formHint : t.formMissing)}
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

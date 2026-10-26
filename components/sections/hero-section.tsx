"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { icons } from "@/config/icons";
import { site } from "@/config/site";
import { heroBadges } from "@/data/hero-badges";
import { socialLinks } from "@/data/social-links";
import type { Locale, Theme } from "@/types/portfolio";
import { TechnologyIcon } from "@/components/icons/technology-icons";
import { SocialLink } from "@/components/social-link";
import { type BaseProps } from "./motion";

export function HeroSection({
  t,
  reducedMotion,
  locale,
  theme,
  onScroll,
}: BaseProps & {
  locale: Locale;
  theme: Theme;
  onScroll: (id: string) => void;
}) {
  const rtl = locale === "ar";
  const initials = site.name
    .split(" ")
    .map((part) => part[0])
    .join("");
  const Arrow = rtl ? icons.arrowLeft : icons.arrowRight;
  const [headingComplete, setHeadingComplete] = useState(reducedMotion);
  const handleHeadingComplete = useCallback(() => setHeadingComplete(true), []);
  const revealTransition = (duration: number) => ({
    duration: reducedMotion ? 0.01 : duration,
    ease: [0.22, 1, 0.36, 1] as const,
  });
  const eyebrowReveal = {
    hidden: { opacity: 0, x: rtl ? 12 : -12 },
    visible: { opacity: 1, x: 0, transition: revealTransition(0.5) },
  };
  const headingReveal = {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: revealTransition(0.72) },
  };
  const roleReveal = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: revealTransition(0.52) },
  };
  const descriptionReveal = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: revealTransition(0.62) },
  };
  const actionsReveal = {
    hidden: { opacity: 0, y: 16, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: revealTransition(0.58) },
  };
  const socialsReveal = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: revealTransition(0.48) },
  };

  return (
    <section id="home" className="hero section-anchor">
      <div className="hero-grid">
        <motion.div
          className="portrait-column"
          onPointerLeave={(event) => {
            const frame =
              event.currentTarget.querySelector<HTMLElement>(".portrait-frame");
            frame?.style.setProperty("--tilt-x", "0deg");
            frame?.style.setProperty("--tilt-y", "0deg");
            frame?.style.setProperty("--tilt-z", "0deg");
          }}
          initial={reducedMotion ? false : { opacity: 0, scale: 0.94, y: 18 }}
          animate={headingComplete ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.94, y: 18 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.68, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="portrait-orbit orbit-a" />
          <div className="portrait-orbit orbit-b" />
          <div className="portrait-orbit orbit-c" />
          <svg className="orbit-label" viewBox="0 0 400 400" aria-hidden="true">
            <defs>
              <path
                id="hero-label-path"
                d="M 200,22 a 178,178 0 1,1 0,356 a 178,178 0 1,1 0,-356"
              />
            </defs>
            <text direction="ltr" style={{ unicodeBidi: "bidi-override" }}>
              <textPath
                href="#hero-label-path"
                direction="ltr"
                style={{ unicodeBidi: "bidi-override" }}
              >
                {t.heroOrbitLabel}
              </textPath>
            </text>
          </svg>
          <div className="portrait-glow" aria-hidden="true" />
          <div className="portrait-frame">
            {site.photo ? (
              <Image
                src={site.photo}
                alt={t.photoAlt}
                className="portrait-photo"
                fill
                preload
                sizes="(max-width: 760px) 80vw, 400px"
              />
            ) : (
              <div className="portrait-placeholder">
                <span className="placeholder-monogram">{initials}</span>
                <span className="placeholder-caption">{t.heroRole}</span>
              </div>
            )}
          </div>
          <div className="badge-orbit" aria-hidden="true">
            {heroBadges.map((badge, index) => (
              <motion.div
                className={`float-tag tag-${badge.position}`}
                key={badge.name}
                initial={reducedMotion ? false : { opacity: 0, scale: 0.92 }}
                animate={headingComplete ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
                transition={{
                  duration: reducedMotion ? 0.01 : 0.38,
                  delay: reducedMotion ? 0 : 0.12 + index * 0.1,
                }}
              >
                <span className="tag-mark">
                  <TechnologyIcon
                    id={badge.icon}
                    theme={theme}
                    className="technology-icon"
                  />
                </span>
                {badge.name}
              </motion.div>
            ))}
          </div>
          {site.availabilityEnabled && (
            <div className="availability">
              <span className="status-dot" />
              {t.available}
            </div>
          )}
        </motion.div>
        <motion.div
          className="hero-copy"
          initial={reducedMotion ? false : "hidden"}
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: reducedMotion ? 0 : 0.2,
                delayChildren: reducedMotion ? 0 : 0.08,
              },
            },
          }}
        >
          <motion.div className="eyebrow hero-eyebrow" variants={eyebrowReveal}>
            <span className="eyebrow-line" />
            {t.heroEyebrow}
          </motion.div>
          <motion.h1 variants={headingReveal} aria-label={`${t.heroLead} ${t.heroAccent}`}>
            <TypewriterHeading
              lead={t.heroLead}
              accent={t.heroAccent}
              reducedMotion={reducedMotion}
              onComplete={handleHeadingComplete}
            />
          </motion.h1>
          <motion.p className="hero-role" variants={roleReveal}>
            {t.heroRole}
            <span className="role-divider" aria-hidden="true" />
            {site.location[locale]}
          </motion.p>
          <motion.p className="hero-description" variants={descriptionReveal}>
            {t.heroBody}
          </motion.p>
          <motion.div className="hero-actions" variants={actionsReveal}>
            <button
              className="button button-primary"
              onClick={() => onScroll("projects")}
            >
              {t.work}
              <Arrow size={16} />
            </button>
            {site.cvUrl ? (
              <a className="button button-secondary" href={site.cvUrl} download>
                {t.download}
                <icons.arrowDown size={16} />
              </a>
            ) : (
              <span
                className="button button-secondary button-disabled"
                aria-disabled="true"
              >
                {t.download}
                <icons.arrowDown size={16} />
              </span>
            )}
          </motion.div>
          <motion.div className="hero-socials" variants={socialsReveal}>
            <span>{t.followMe}</span>
            <i />
            {socialLinks.filter((social) => social.id !== "facebook" && social.id !== "whatsapp").map((social) => (
              <SocialLink key={social.id} social={social} />
            ))}
          </motion.div>
        </motion.div>
      </div>
      <button className="scroll-cue" onClick={() => onScroll("about")}>
        <span>{t.scroll}</span>
        <span className="scroll-line" />
      </button>
    </section>
  );
}

function TypewriterHeading({
  lead,
  accent,
  reducedMotion,
  onComplete,
}: {
  lead: string;
  accent: string;
  reducedMotion: boolean;
  onComplete: () => void;
}) {
  const full = `${lead} ${accent}`;
  const [visibleCount, setVisibleCount] = useState(reducedMotion ? full.length : 0);

  useEffect(() => {
    if (reducedMotion) {
      setVisibleCount(full.length);
      onComplete();
      return;
    }

    let count = 0;
    setVisibleCount(0);
    let timer = window.setTimeout(function typeNext() {
      count += 1;
      setVisibleCount(count);
      if (count < full.length) timer = window.setTimeout(typeNext, 78);
      else onComplete();
    }, 420);

    return () => window.clearTimeout(timer);
  }, [full, reducedMotion, onComplete]);

  const visibleLead = full.slice(0, Math.min(visibleCount, lead.length));
  const visibleAccent = visibleCount > lead.length
    ? full.slice(lead.length + 1, visibleCount)
    : "";

  return (
    <>
      <span>{visibleLead}</span>
      {visibleCount > lead.length && (
        <>
          {" "}
          <span className="gradient-text">{visibleAccent}</span>
        </>
      )}
      <span className="typing-caret" aria-hidden="true" />
    </>
  );
}

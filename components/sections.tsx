"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { icons } from "@/config/icons";
import { site } from "@/config/site";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { socialLinks } from "@/data/social-links";
import type { Locale, Theme } from "@/types/portfolio";
import type { Messages } from "@/lib/i18n";
import { heroBadges } from "@/data/hero-badges";
import { SocialIcon } from "@/components/icons/social-icons";
import { TechnologyIcon } from "@/components/icons/technology-icons";

type BaseProps = { t: Messages; reducedMotion: boolean };
type MotionProps = Record<string, unknown>;
const reveal = (reduced: boolean, delay = 0): MotionProps =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.18 },
        transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
      };
const revealFromSide = (
  reduced: boolean,
  side: "left" | "right",
  delay = 0,
): MotionProps =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, x: side === "left" ? -36 : 36 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true, amount: 0.16 },
        transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
      };
const rise = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
  },
};
const fade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.32 } },
};

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
  const heroStep = reducedMotion ? fade : rise;

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
          initial={
            reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 14 }
          }
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0.32 : 0.8, delay: 1.05 }}
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
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: reducedMotion ? 0.2 : 0.42,
                  delay: reducedMotion ? 0 : 1.05 + index * 0.16,
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
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.14, delayChildren: 0.16 },
            },
          }}
        >
          <motion.div className="eyebrow hero-eyebrow" variants={heroStep}>
            <span className="eyebrow-line" />
            {t.heroEyebrow}
          </motion.div>
          <motion.h1
            variants={heroStep}
            aria-label={`${t.heroLead} ${t.heroAccent}`}
          >
            <TypewriterHeading
              lead={t.heroLead}
              accent={t.heroAccent}
              reducedMotion={reducedMotion}
            />
          </motion.h1>
          <motion.p className="hero-role" variants={heroStep}>
            {t.heroRole}
            <span className="role-divider" aria-hidden="true" />
            {site.location[locale]}
          </motion.p>
          <motion.p className="hero-description" variants={heroStep}>
            {t.heroBody}
          </motion.p>
          <motion.div className="hero-actions" variants={heroStep}>
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
          <motion.div className="hero-socials" variants={heroStep}>
            <span>{t.followMe}</span>
            <i />
            {socialLinks.map((social) => (
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
}: {
  lead: string;
  accent: string;
  reducedMotion: boolean;
}) {
  const full = `${lead} ${accent}`;
  const [visibleCount, setVisibleCount] = useState(
    reducedMotion ? full.length : 0,
  );

  useEffect(() => {
    if (reducedMotion) {
      setVisibleCount(full.length);
      return;
    }
    let count = 0;
    let timer = window.setTimeout(function typeNext() {
      count += 1;
      setVisibleCount(count);
      if (count < full.length) timer = window.setTimeout(typeNext, 78);
    }, 420);
    return () => window.clearTimeout(timer);
  }, [full, reducedMotion]);

  const visibleLead = full.slice(0, Math.min(visibleCount, lead.length));
  const visibleAccent =
    visibleCount > lead.length ? full.slice(lead.length + 1, visibleCount) : "";
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

function SocialLink({ social }: { social: (typeof socialLinks)[number] }) {
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

export function AboutSection({
  t,
  reducedMotion,
  theme,
}: BaseProps & { theme: Theme }) {
  const StatIcons = [
    icons.briefcase,
    icons.codeXml,
    icons.cpu,
    icons.graduationCap,
  ];
  const groupedSkills = ["frontend", "backend", "tools"] as const;

  return (
    <section className="section about-section section-anchor" id="about">
      <div className="section-inner">
        <motion.div
          className="section-heading about-heading"
          {...reveal(reducedMotion)}
        >
          <div className="eyebrow">
            <span className="eyebrow-line" />
            {t.aboutEyebrow}
          </div>
          <h2>
            {t.aboutTitleLead}{" "}
            <span className="gradient-text">{t.aboutTitleAccent}</span>
          </h2>
        </motion.div>
        <motion.div
          className="stats-row about-stats"
          {...reveal(reducedMotion)}
        >
          {t.stats.map((item, index) => {
            const StatIcon = StatIcons[index] ?? icons.code;
            return (
              <div className="stat-card" key={item.label}>
                <span className="stat-icon">
                  <StatIcon size={23} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <strong>
                  <AnimatedStat value={item.value} />
                </strong>
                <span>{item.label}</span>
              </div>
            );
          })}
        </motion.div>
        <div className="about-grid">
          <motion.article
            className="about-copy card-surface"
            {...revealFromSide(reducedMotion, "left")}
          >
            <div className="about-story-title">
              <span>
                <icons.story size={21} />
              </span>
              <h3 className="font-bold text-2xl!">{t.storyTitle}</h3>
            </div>
            <p>{t.aboutBody}</p>
            <p>{t.aboutBody2}</p>
            <p>{t.aboutBody3}</p>
          </motion.article>
          <motion.div
            className="about-right"
            {...revealFromSide(reducedMotion, "right", 0.12)}
          >
            {groupedSkills.map((category, index) => (
              <section
                className={`skills-card card-surface skill-group skill-group-${index + 1}`}
                key={category}
              >
                <h3>
                  <span className="skill-group-dot" />
                  {t.skillCategories[category]}
                </h3>
                <div className="skills-list">
                  {skills
                    .filter((skill) => skill.category === category)
                    .map((skill) => {
                      return (
                        <span className="skill-chip" key={skill.id}>
                          {skill.icon ? (
                            <TechnologyIcon
                              id={skill.icon}
                              theme={theme}
                              className="skill-icon"
                            />
                          ) : (
                            <icons.code className="skill-icon" size={16} />
                          )}
                          {skill.name}
                        </span>
                      );
                    })}
                </div>
              </section>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AnimatedStat({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const parts = value.match(/^([^0-9]*)(\d+)(.*)$/);
  const numericTarget = parts ? Number(parts[2]) : null;

  useEffect(() => {
    if (numericTarget === null || !ref.current) return;
    let frame = 0;
    const target = numericTarget;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const started = performance.now();
        const duration = 1100;
        const tick = (now: number) => {
          const progress = Math.min((now - started) / duration, 1);
          setCount(Math.floor(target * (1 - (1 - progress) ** 3)));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [numericTarget]);

  return (
    <span ref={ref} dir="ltr">
      {parts ? `${parts[1]}${count}${parts[3]}` : value}
    </span>
  );
}

export function ServicesSection({
  t,
  reducedMotion,
  theme,
  onContact,
}: BaseProps & { theme: Theme; onContact: () => void }) {
  return (
    <section className="section services-section section-anchor" id="services">
      <div className="section-inner">
        <motion.div
          className="section-heading services-heading"
          {...reveal(reducedMotion)}
        >
          <div className="eyebrow">
            <span className="eyebrow-line" />
            {t.servicesEyebrow}
          </div>
          <h2>
            {t.servicesTitleLead}{" "}
            <span className="gradient-text">{t.servicesTitleAccent}</span>
          </h2>
          <p>{t.servicesIntro}</p>
        </motion.div>
        <div className="service-grid">
          {t.services.map((service, index) => {
            return (
              <motion.article
                className="service-card card-surface"
                key={service.title}
                {...reveal(reducedMotion, (index % 3) * 0.08)}
              >
                <div className="service-top">
                  <span className={`service-icon service-icon-${index + 1}`}>
                    {index === 0 ? (
                      <TechnologyIcon
                        id="react"
                        theme={theme}
                        style={{ width: 28, height: 28 }}
                      />
                    ) : index === 1 ? (
                      <TechnologyIcon
                        id="express"
                        theme={theme}
                        style={{ width: 28, height: 28 }}
                      />
                    ) : index === 2 ? (
                      <icons.database size={28} />
                    ) : (
                      <icons.rocket size={28} />
                    )}
                  </span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
                <div className="service-tags">
                  {service.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
        <div className="services-cta">
          <p>{t.servicesCta}</p>
          <button className="button button-primary" onClick={onContact}>
            {t.servicesCtaButton}
            <icons.arrowUpRight size={19} />
          </button>
        </div>
      </div>
    </section>
  );
}

export function ProjectsSection({
  t,
  reducedMotion,
  onPreview,
}: BaseProps & { onPreview: (project: (typeof projects)[number]) => void }) {
  const [expandedRepositories, setExpandedRepositories] = useState<string | null>(null);

  return (
    <section className="section projects-section section-anchor" id="projects">
      <div className="section-inner">
        <motion.div
          className="section-heading projects-heading"
          {...reveal(reducedMotion)}
        >
          <div className="eyebrow">
            <span className="eyebrow-line" />
            {t.projectsEyebrow}
          </div>
          <h2>
            {t.projectsTitleLead}{" "}
            <span className="gradient-text">{t.projectsTitleAccent}</span>
          </h2>
          <p>{t.projectsIntro}</p>
        </motion.div>
        <div className="project-grid">
          {projects
            .filter((project) => project.featured)
            .map((project, index) => {
              const copy = t.projects[project.id as keyof typeof t.projects];
              const repositories = project.repositories;
              return (
                <motion.article
                  key={project.id}
                  className={`project-card card-surface project-${index + 1}`}
                  {...reveal(reducedMotion, (index % 2) * 0.1)}
                >
                  <div className={`project-art art-${index + 1}`}>
                    <span className="project-art-icon" aria-hidden="true">
                      {project.image
                        ? <Image src={project.image} alt="" width={68} height={68} />
                        : ["✦", "◇", "⌘"][index % 3]}
                    </span>
                    <h3 className="project-art-title">{copy.name}</h3>
                    <span className="project-art-index">{copy.type}</span>
                    <span className="art-orb" aria-hidden="true" />
                  </div>
                  <div className="project-info">
                    {copy.description && <p>{copy.description}</p>}
                    {project.technologies.length > 0 && (
                      <div className="project-stack">
                        {project.technologies.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    )}
                    <div className="project-actions">
                      <button
                        className="project-action project-demo"
                        onClick={() => onPreview(project)}
                      >
                        <icons.play size={15} fill="currentColor" />
                        {t.projectAction}
                      </button>
                      {repositories.length > 0 && (
                        <button
                          type="button"
                          className="project-action project-repo"
                          onClick={() => setExpandedRepositories((current) => current === project.id ? null : project.id)}
                          aria-expanded={expandedRepositories === project.id}
                          aria-controls={`repositories-${project.id}`}
                        >
                          <SocialIcon id="github" size={17} />
                          {t.repos}
                          <span className="repo-count">
                            {repositories.length}
                          </span>
                        </button>
                      )}
                    </div>
                    <AnimatePresence initial={false}>
                      {repositories.length > 0 && expandedRepositories === project.id && (
                        <motion.div
                          id={`repositories-${project.id}`}
                          className="project-repositories"
                          aria-label={t.repositoriesLabel}
                          initial={{ height: 0, opacity: 0, y: -8 }}
                          animate={{ height: "auto", opacity: 1, y: 0 }}
                          exit={{ height: 0, opacity: 0, y: -8 }}
                          transition={{
                            height: { duration: reducedMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] },
                            opacity: { duration: reducedMotion ? 0 : 0.2 },
                            y: { duration: reducedMotion ? 0 : 0.24, ease: "easeOut" },
                          }}
                          style={{ overflow: "hidden" }}
                        >
                          {repositories.map((repository, repositoryIndex) => (
                            <motion.a
                              key={repository.url}
                              href={repository.url}
                              target="_blank"
                              rel="noreferrer"
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: reducedMotion ? 0 : 0.2,
                                delay: reducedMotion ? 0 : repositoryIndex * 0.06,
                              }}
                            >
                              <span>{repository.name}</span>
                              <icons.externalLink size={16} />
                            </motion.a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.article>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export function JourneySection({ t, reducedMotion }: BaseProps) {
  const journeyIcons = [
    icons.search,
    icons.compass,
    icons.codeXml,
    icons.sparkles,
  ];
  return (
    <section className="section journey-section section-anchor" id="journey">
      <div className="section-inner">
        <motion.div
          className="section-heading journey-heading"
          {...reveal(reducedMotion)}
        >
          <div className="eyebrow">
            <span className="eyebrow-line" />
            {t.journeyEyebrow}
          </div>
          <h2>
            {t.journeyTitleLead}{" "}
            <span className="gradient-text">{t.journeyTitleAccent}</span>
          </h2>
          <p>{t.journeyIntro}</p>
        </motion.div>
        <div className="journey-timeline">
          {t.journeySteps.map((step, index) => {
            const JourneyIcon = journeyIcons[index] ?? icons.lightbulb;
            return (
              <motion.article
                className="journey-step"
                key={step.title}
                {...reveal(reducedMotion, (index % 2) * 0.08)}
              >
                <div className="journey-marker">
                  <JourneyIcon size={21} />
                </div>
                <div className="journey-card card-surface">
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
        <p className="journey-ending">{t.journeyEnding}</p>
      </div>
    </section>
  );
}

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
        <motion.div className="contact-panel" {...reveal(reducedMotion)}>
          <div className="contact-sidebar">
            <article className="contact-copy card-surface">
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
            </article>
            <section className="contact-connect card-surface">
              <h3>{t.connectTitle}</h3>
              <div className="contact-socials">
                {socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.url || undefined}
                    aria-label={social.label}
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
              </div>
            </section>
            <article className="contact-email-card card-surface">
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
            </article>
          </div>
          <form className="contact-form" onSubmit={onSubmit} noValidate>
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
            <button className="button button-primary send-button" type="submit">
              {t.send}
              <Arrow size={16} />
            </button>
            <p
              className={`form-feedback ${formStatus === t.formError ? "error" : ""}`}
              aria-live="polite"
            >
              {formStatus || (site.email ? t.formHint : t.formMissing)}
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

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

"use client";

import { useRef } from "react";
import { useCountUp } from "react-countup";
import { motion } from "framer-motion";
import { icons } from "@/config/icons";
import { skills, skillCategories } from "@/data/skills";
import type { Theme } from "@/types/portfolio";
import { TechnologyIcon } from "@/components/icons/technology-icons";
import { reveal, revealFromSide, type BaseProps } from "./motion";

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
                  <AnimatedStat value={item.value} reducedMotion={reducedMotion} />
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
            {t.aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </motion.article>
          <div className="about-right">
            {skillCategories.map((category, index) => (
              <motion.section
                className={`skills-card card-surface skill-group skill-group-${index + 1}`}
                key={category}
                initial={reducedMotion ? false : {
                  opacity: 0,
                  y: index === 0 ? 24 : index === 2 ? -18 : 0,
                  x: index === 1 ? 24 : 0,
                  scale: index === 2 ? 0.96 : 1,
                }}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{
                  duration: reducedMotion ? 0.01 : 0.7,
                  delay: reducedMotion ? 0 : index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
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
              </motion.section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimatedStat({
  value,
  reducedMotion,
}: {
  value: string;
  reducedMotion: boolean;
}) {
  const parts = value.match(/^([^0-9]*)(\d+)(.*)$/);
  const numericTarget = parts ? Number(parts[2]) : null;

  if (numericTarget === null || !parts) return <span dir="ltr">{value}</span>;

  return (
    <CountedStat
      target={numericTarget}
      prefix={parts[1]}
      suffix={parts[3]}
      reducedMotion={reducedMotion}
    />
  );
}

function CountedStat({
  target,
  prefix,
  suffix,
  reducedMotion,
}: {
  target: number;
  prefix: string;
  suffix: string;
  reducedMotion: boolean;
}) {
  const ref = useRef<HTMLElement>(null!);

  useCountUp({
    ref,
    start: 0,
    end: target,
    duration: reducedMotion ? 0 : 2,
    prefix,
    suffix,
    enableScrollSpy: !reducedMotion,
    scrollSpyOnce: true,
  });

  return <span ref={ref} dir="ltr" />;
}

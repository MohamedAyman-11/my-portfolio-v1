"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { icons } from "@/config/icons";
import { skills } from "@/data/skills";
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

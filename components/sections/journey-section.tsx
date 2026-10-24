"use client";

import { motion } from "framer-motion";
import { icons } from "@/config/icons";
import { reveal, type BaseProps } from "./motion";

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

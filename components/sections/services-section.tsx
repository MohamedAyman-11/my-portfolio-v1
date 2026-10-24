"use client";

import { motion } from "framer-motion";
import { icons } from "@/config/icons";
import type { Theme } from "@/types/portfolio";
import { TechnologyIcon } from "@/components/icons/technology-icons";
import { reveal, type BaseProps } from "./motion";

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

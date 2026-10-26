"use client";

import { motion } from "framer-motion";
import { icons } from "@/config/icons";
import type { Theme } from "@/types/portfolio";
import { TechnologyIcon } from "@/components/icons/technology-icons";
import { services } from "@/data/services";
import { reveal, type BaseProps } from "./motion";

export function ServicesSection({
  t,
  reducedMotion,
  theme,
  locale,
  onContact,
}: BaseProps & { theme: Theme; locale: "en" | "ar"; onContact: () => void }) {
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
          {services.map((service, index) => {
            const copy = service.copy[locale];
            return (
              <motion.article
                className="service-card card-surface"
                key={service.id}
                {...reveal(reducedMotion, (index % 3) * 0.08)}
              >
                <div className="service-top">
                  <span className={`service-icon service-icon-${index + 1}`}>
                    {service.icon.type === "technology" ? (
                      <TechnologyIcon
                        id={service.icon.id}
                        theme={theme}
                        style={{ width: 28, height: 28 }}
                      />
                    ) : (
                      (() => {
                        const ServiceIcon = icons[service.icon.id];
                        return <ServiceIcon size={28} />;
                      })()
                    )}
                  </span>
                </div>
                <h3>{copy.title}</h3>
                <p>{copy.body}</p>
                <div className="service-tags">
                  {copy.tags.map((tag) => (
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

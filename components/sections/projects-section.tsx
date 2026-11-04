"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { icons } from "@/config/icons";
import { projects } from "@/data/projects";
import { socialLinks } from "@/data/social-links";
import { SocialIcon } from "@/components/icons/social-icons";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/types/portfolio";
import {
  REVEAL_EASE,
  VIEWPORT_AMOUNT,
  reveal,
  type BaseProps,
} from "./motion";

export function ProjectsSection({
  t,
  reducedMotion,
  locale,
  onPreview,
}: BaseProps & {
  locale: Locale;
  onPreview: (project: (typeof projects)[number]) => void;
}) {
  const [expandedRepositories, setExpandedRepositories] = useState<
    string | null
  >(null);

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
              const copy = project.copy[locale];
              const repositories = project.repositories;
              return (
                <motion.article
                  key={project.id}
                  className={`project-card card-surface project-${index + 1}`}
                  {...(reducedMotion
                    ? {}
                    : {
                        initial: { opacity: 0, y: 28, scale: 0.98 },
                        whileInView: { opacity: 1, y: 0, scale: 1 },
                        viewport: { once: true, amount: VIEWPORT_AMOUNT },
                        transition: {
                          duration: 1.1,
                          delay: index * 0.1,
                          ease: REVEAL_EASE,
                        },
                      })}
                >
                  <div className={`project-art art-${index + 1}`}>
                    <span
                      className={`project-art-icon ${project.image ? "has-image" : ""}`}
                      aria-hidden="true"
                    >
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt=""
                          width={68}
                          height={68}
                        />
                      ) : (
                        ["✦", "◇", "⌘"][index % 3]
                      )}
                    </span>
                    <h3 className="project-art-title">{copy.name}</h3>
                    <span className="project-art-index">{copy.type}</span>
                    <span className="art-orb" aria-hidden="true" />
                  </div>
                  <div className="project-info">
                    {copy.description && <p>{copy.description}</p>}
                    {project.technologies.length > 0 && (
                      <div
                        className="project-stack"
                        aria-label={`Technologies used: ${project.technologies.join(", ")}`}
                      >
                        <div className="project-stack-heading">
                          <span className="project-stack-label">
                            Tech stack
                          </span>
                          <span className="project-stack-count">
                            +{project.technologies.length} technologies
                          </span>
                        </div>
                        <div className="project-stack-list">
                          {project.technologies.slice(0, 5).map((tag) => (
                            <span className="project-tech-chip" key={tag}>
                              {tag}
                            </span>
                          ))}
                          {project.technologies.length > 5 && (
                            <span
                              className="project-tech-chip project-tech-more"
                              aria-hidden="true"
                            >
                              +{project.technologies.length - 5}
                            </span>
                          )}
                        </div>
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
                          onClick={() =>
                            setExpandedRepositories((current) =>
                              current === project.id ? null : project.id,
                            )
                          }
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
                      {repositories.length > 0 &&
                        expandedRepositories === project.id && (
                          <motion.div
                            id={`repositories-${project.id}`}
                            className="project-repositories"
                            aria-label={t.repositoriesLabel}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: reducedMotion ? 0 : 0.22,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            style={{ overflow: "hidden" }}
                          >
                            {repositories.map((repository) => (
                              <a
                                key={repository.url}
                                href={repository.url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <span>{repository.name}</span>
                                <icons.externalLink size={16} />
                              </a>
                            ))}
                          </motion.div>
                        )}
                    </AnimatePresence>
                  </div>
                </motion.article>
              );
            })}
        </div>
        <div className="projects-cta">
          <Button
            variant="ghost"
            className="button button-primary"
            asChild
          >
            <a
              href={socialLinks.find((social) => social.id === "github")!.url}
              target="_blank"
              rel="noreferrer"
            >
              {t.projectsCtaButton}
              <icons.arrowUpRight size={19} />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

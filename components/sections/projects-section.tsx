"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { icons } from "@/config/icons";
import { projects } from "@/data/projects";
import { SocialIcon } from "@/components/icons/social-icons";
import type { Locale } from "@/types/portfolio";
import { reveal, type BaseProps } from "./motion";

export function ProjectsSection({
  t,
  reducedMotion,
  locale,
  onPreview,
}: BaseProps & { locale: Locale; onPreview: (project: (typeof projects)[number]) => void }) {
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
              const copy = project.copy[locale];
              const repositories = project.repositories;
              return (
                <motion.article
                  key={project.id}
                  className={`project-card card-surface project-${index + 1}`}
                  {...(reducedMotion
                    ? {}
                    : {
                        initial: { opacity: 0, y: 36, scale: 0.97 },
                        whileInView: { opacity: 1, y: 0, scale: 1 },
                        viewport: { once: true, amount: 0.18 },
                        transition: {
                          duration: 1.05,
                          delay: index * 0.12,
                          ease: [0.2, 0.7, 0.2, 1],
                        },
                      })}
                >
                  <div className={`project-art art-${index + 1}`}>
                    <span className={`project-art-icon ${project.image ? "has-image" : ""}`} aria-hidden="true">
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

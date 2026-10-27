"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { icons } from "@/config/icons";
import type { Messages } from "@/lib/i18n";
import type { ProjectRecord } from "@/types/portfolio";
import type { Locale } from "@/types/portfolio";

type PreviewSize = "desktop" | "mobile";

function getVideoEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = parsed.pathname.slice(1);
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      const id = parsed.searchParams.get("v") ?? parsed.pathname.match(/\/embed\/([^/]+)/)?.[1];
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }

    if (host === "vimeo.com") {
      const id = parsed.pathname.split("/").filter(Boolean).at(-1);
      return id && /^\d+$/.test(id) ? `https://player.vimeo.com/video/${id}` : null;
    }

    if (host === "linkedin.com" && parsed.pathname.startsWith("/embed/feed/update/")) {
      return parsed.toString();
    }
  } catch {
    return null;
  }

  return null;
}

function isDirectVideo(url: string) {
  try {
    return /\.(mp4|webm|ogg)(?:$|\?)/i.test(new URL(url).href);
  } catch {
    return false;
  }
}

export function ProjectPreviewDialog({ project, t, locale, onClose }: {
  project: ProjectRecord | null;
  t: Messages;
  locale: Locale;
  onClose: () => void;
}) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const [previewSelection, setPreviewSelection] = useState<{ projectId: string; size: PreviewSize } | null>(null);
  const [loadedPreview, setLoadedPreview] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  const previewSize = project && previewSelection?.projectId === project.id ? previewSelection.size : "desktop";
  const selectPreviewSize = (size: PreviewSize) => {
    if (project) setPreviewSelection({ projectId: project.id, size });
  };

  useEffect(() => {
    if (!project) return;
    returnFocus.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { onClose(); return; }
      if (event.key !== "Tab") return;
      const dialog = document.querySelector<HTMLElement>("[role='dialog']");
      const focusable = dialog?.querySelectorAll<HTMLElement>("button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])");
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      returnFocus.current?.focus();
    };
  }, [project, onClose]);

  const copy = project?.copy[locale] ?? null;
  const demo = project?.demo;
  const videoEmbedUrl = demo?.type === "video" ? getVideoEmbedUrl(demo.url) : null;
  const directVideo = demo?.type === "video" && isDirectVideo(demo.url);
  const previewKey = demo ? `${project?.id}:${demo.type}:${demo.url}` : null;
  const previewLoading = Boolean(previewKey && loadedPreview !== previewKey);
  useEffect(() => {
    setLoadedPreview(null);
  }, [project?.id, demo?.url]);
  const markPreviewLoaded = () => {
    if (previewKey) setLoadedPreview(previewKey);
  };

  return <AnimatePresence initial={false}>{project && copy && <motion.div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0.01 : 0.2, ease: "easeOut" }}>
    <motion.div className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" initial={{ opacity: 0, y: reducedMotion ? 0 : 22, scale: reducedMotion ? 1 : 0.965 }} animate={{ opacity: 1, y: 0, scale: 1, transition: reducedMotion ? { duration: 0.01 } : { type: "spring", stiffness: 320, damping: 29, mass: 0.85 } }} exit={{ opacity: 0, y: reducedMotion ? 0 : 12, scale: reducedMotion ? 1 : 0.985, transition: { duration: reducedMotion ? 0.01 : 0.16, ease: "easeIn" } }}>
      <div className="demo-header">
        <div className="demo-project-heading">
          <span className={`demo-project-icon ${project.image ? "has-image" : ""}`} aria-hidden="true">
            {project.image
              ? <Image src={project.image} alt="" width={42} height={42} priority />
              : demo?.type === "video" ? <icons.play size={18} /> : <icons.monitor size={18} />}
          </span>
          <div>
            <h2 id="dialog-title">{copy.name}</h2>
            <span>{demo ? t.demoMode : t.preview}</span>
          </div>
        </div>
        <div className="demo-controls">
          {demo && <div className="demo-size-toggle" role="group" aria-label={t.previewSize}>
            <button type="button" className={previewSize === "desktop" ? "active" : ""} onClick={() => selectPreviewSize("desktop")} aria-label={t.desktopView} aria-pressed={previewSize === "desktop"}><icons.monitor size={17}/></button>
            <button type="button" className={previewSize === "mobile" ? "active" : ""} onClick={() => selectPreviewSize("mobile")} aria-label={t.mobileView} aria-pressed={previewSize === "mobile"}><icons.smartphone size={16}/></button>
          </div>}
          {demo && <a className="icon-button demo-open-link" href={demo.url} target="_blank" rel="noreferrer" aria-label={t.openProject} title={t.openProject}><icons.externalLink size={18}/></a>}
          <button ref={closeButton} className="icon-button demo-close-button" onClick={onClose} aria-label={t.close}><icons.close size={19}/></button>
        </div>
      </div>

      <div className={`demo-stage ${previewSize === "mobile" ? "is-mobile" : ""}`}>
        {demo?.type === "website" && <iframe className="demo-iframe" src={demo.url} title={`${copy.name} ${t.demoMode}`} loading="lazy" allow="fullscreen; clipboard-read; clipboard-write" onLoad={markPreviewLoaded} />}
        {demo?.type === "video" && directVideo && <video className="demo-video" src={demo.url} controls playsInline preload="metadata" onLoadedData={markPreviewLoaded} onCanPlay={markPreviewLoaded} onError={markPreviewLoaded} />}
        {demo?.type === "video" && !directVideo && videoEmbedUrl && <iframe className="demo-iframe" src={videoEmbedUrl} title={`${copy.name} ${t.demoMode}`} loading="lazy" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen onLoad={markPreviewLoaded} />}
        {previewLoading && <div className="demo-preview-loading" role="status" aria-live="polite"><span className="demo-preview-spinner" aria-hidden="true"/><span>{t.loadingPreview}</span></div>}
        {!demo || (demo.type === "video" && !directVideo && !videoEmbedUrl) ? <div className="dialog-preview">
          <div className="preview-icon"><icons.code size={25}/></div>
          <h3>{t.preview}</h3>
          <p>{t.previewBody}</p>
        </div> : null}
      </div>
    </motion.div>
  </motion.div>}</AnimatePresence>;
}

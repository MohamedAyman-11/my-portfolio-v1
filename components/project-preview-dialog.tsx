"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { icons } from "@/config/icons";
import type { Messages } from "@/lib/i18n";
import type { ProjectRecord } from "@/types/portfolio";

export function ProjectPreviewDialog({ project, t, onClose }: {
  project: ProjectRecord | null;
  t: Messages;
  onClose: () => void;
}) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

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

  const copy = project ? t.projects[project.id] : null;

  return <AnimatePresence>{project && copy && <motion.div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <motion.div className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" initial={{ opacity: 0, y: 14, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8 }}>
      <div className="dialog-header"><div><span className="dialog-kicker">{copy.type}</span><h2 id="dialog-title">{copy.name}</h2></div><button ref={closeButton} className="icon-button" onClick={onClose} aria-label={t.close}><icons.close size={19}/></button></div>
      <div className="dialog-preview"><div className="preview-icon"><icons.code size={25}/></div><h3>{t.preview}</h3><p>{t.previewBody}</p>{project.demoUrl && <a className="button button-primary" href={project.demoUrl} target="_blank" rel="noreferrer">{t.openProject}<icons.externalLink size={15}/></a>}</div>
    </motion.div>
  </motion.div>}</AnimatePresence>;
}

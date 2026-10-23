"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { icons } from "@/config/icons";
import { site } from "@/config/site";
import { navigation } from "@/data/navigation";
import { messages } from "@/lib/messages";
import type { Locale, Theme } from "@/types/portfolio";
import type { ProjectRecord } from "@/types/portfolio";
import { AboutSection, ContactSection, Footer, HeroSection, JourneySection, ProjectsSection, ServicesSection } from "@/components/sections";
import { ProjectPreviewDialog } from "@/components/project-preview-dialog";

export default function Portfolio({ initialLocale, initialTheme }: { initialLocale: Locale; initialTheme: Theme }) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(null);
  const [pointer, setPointer] = useState({ x: -100, y: -100 });
  const [pointerTarget, setPointerTarget] = useState(false);
  const [pointerAccent, setPointerAccent] = useState<string | null>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const rtl = locale === "ar";
  const t = messages[locale];

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
    document.cookie = `portfolio-theme=${theme}; Max-Age=31536000; Path=/; SameSite=Lax`;
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
    localStorage.setItem("portfolio-locale", locale);
    document.cookie = `portfolio-locale=${locale}; Max-Age=31536000; Path=/; SameSite=Lax`;
  }, [locale, rtl]);

  useEffect(() => {
    if (!mobileOpen) return;
    const htmlOverflow = document.documentElement.style.overflow;
    const bodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = htmlOverflow;
      document.body.style.overflow = bodyOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    let frame = 0;
    const updateActiveSection = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 36);
        const headerBottom = document.querySelector(".topbar")?.getBoundingClientRect().bottom ?? 0;
        const marker = window.scrollY + Math.max(headerBottom + 16, window.innerHeight * 0.3);
        let current: string = navigation[0];
        for (const id of navigation) {
          const section = document.getElementById(id);
          if (section && section.getBoundingClientRect().top + window.scrollY <= marker) current = id;
        }
        if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) current = "contact";
        setActive(current);
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
        progressRef.current?.style.setProperty("transform", `scaleX(${Math.min(1, Math.max(0, progress))})`);
      });
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!media.matches || reducedMotion) return;
    const move = (event: PointerEvent) => setPointer({ x: event.clientX, y: event.clientY });
    const over = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      const serviceCard = target.closest<HTMLElement>(".service-card");
      setPointerTarget(!!target.closest("a,button,[role=button],.service-card"));
      setPointerAccent(serviceCard ? getComputedStyle(serviceCard).getPropertyValue("--service-accent").trim() : null);
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerover", over); };
  }, [reducedMotion]);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    }));
  };
  const closePreview = useCallback(() => setSelectedProject(null), []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!site.email) { setFormStatus(t.formMissing); return; }
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !subject || !message) { setFormStatus(t.formError); return; }
    setFormStatus(t.sending);
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${message}\n\n${name}\n${email}`)}`;
  };

  return <>
    <a className="skip-link" href="#home">{t.skipLink}</a>
    <main className="site-shell" data-theme={theme} onPointerMove={(event) => {
      if (reducedMotion || event.pointerType !== "mouse") return;
      const target = event.target as HTMLElement;
      const portrait = target.closest<HTMLElement>(".portrait-column");
      if (portrait) {
        const rect = portrait.getBoundingClientRect();
        const frame = portrait.querySelector<HTMLElement>(".portrait-frame");
        frame?.style.setProperty("--tilt-x", `${((event.clientX - rect.left) / rect.width - .5) * 10}deg`);
        frame?.style.setProperty("--tilt-y", `${(.5 - (event.clientY - rect.top) / rect.height) * 10}deg`);
        return;
      }
      const card = target.closest<HTMLElement>(".card-surface, .stat-card");
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
        card.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
      }
    }}>
      <div className="scroll-progress" aria-hidden="true"><span ref={progressRef}/></div>
      <div className="ambient ambient-one" aria-hidden="true"/><div className="ambient ambient-two" aria-hidden="true"/>
      <div className={`custom-cursor ${pointerTarget ? "is-over" : ""} ${pointerAccent ? "is-service-hover" : ""}`} style={{ transform: `translate3d(${pointer.x}px,${pointer.y}px,0)`, "--cursor-accent": pointerAccent ?? "var(--purple)" } as CSSProperties} aria-hidden="true"><span/></div>
      <header className={`topbar-wrap${scrolled ? " is-scrolled" : ""}`}><nav className={`topbar${scrolled ? " is-scrolled" : ""}`} aria-label={t.primaryNavigation}>
        <button className="brand" onClick={() => scrollTo("home")} aria-label={t.homeLabel}>{site.signature}</button>
        <div className="nav-links">{navigation.map((id) => <a key={id} href={`#${id}`} onClick={(event) => { event.preventDefault(); scrollTo(id); }} className={active === id ? "active" : ""} aria-current={active === id ? "location" : undefined}>{active === id && <motion.span className="nav-active-indicator" layoutId="nav-active-indicator" transition={{ type: "spring", stiffness: 420, damping: 34 }} aria-hidden="true"/>}<span className="nav-link-label">{t.nav[id]}</span></a>)}</div>
        <div className="nav-actions">
          <button className="icon-button theme-toggle-button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={t.theme} title={t.theme} aria-pressed={theme === "dark"}>
            <span className="theme-toggle-icon" key={theme} aria-hidden="true">{theme === "dark" ? <icons.sun size={17}/> : <icons.moon size={17}/>}</span>
          </button>
          <button className="locale-button language-toggle-button" onClick={() => setLocale(rtl ? "en" : "ar")} aria-label={t.language} aria-pressed={rtl}>
            <icons.globe className="language-toggle-globe" size={15}/><span className="locale-label" key={locale} aria-hidden="true">{rtl ? "AR" : "EN"}</span>
          </button>
          <button className="button button-small button-primary hire-button" onClick={() => scrollTo("contact")}>{t.hire}<icons.arrowUpRight size={15}/></button>
          <button className="icon-button mobile-menu-button" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? t.closeMenu : t.menu} aria-expanded={mobileOpen}><icons.menu size={20}/></button>
        </div>
      </nav>
      <AnimatePresence>{mobileOpen && <motion.div className="mobile-menu" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
        {navigation.map((id) => <a key={id} href={`#${id}`} onClick={(event) => { event.preventDefault(); scrollTo(id); }} className={active === id ? "active" : ""} aria-current={active === id ? "location" : undefined}>{t.nav[id]}<span aria-hidden="true">{rtl ? "←" : "→"}</span></a>)}
        <button className="button button-primary" onClick={() => scrollTo("contact")}>{t.hire}<icons.arrowUpRight size={16}/></button>
      </motion.div>}</AnimatePresence></header>
      <AnimatePresence>
        {mobileOpen && <motion.div className="mobile-menu-backdrop" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={() => setMobileOpen(false)} />}
      </AnimatePresence>

      <HeroSection t={t} reducedMotion={Boolean(reducedMotion)} locale={locale} onScroll={scrollTo}/>
      <AboutSection t={t} reducedMotion={Boolean(reducedMotion)}/>
      <ServicesSection t={t} reducedMotion={Boolean(reducedMotion)} onContact={() => scrollTo("contact")}/>
      <ProjectsSection t={t} reducedMotion={Boolean(reducedMotion)} onPreview={setSelectedProject}/>
      <JourneySection t={t} reducedMotion={Boolean(reducedMotion)}/>
      <ContactSection t={t} reducedMotion={Boolean(reducedMotion)} locale={locale} formStatus={formStatus} onSubmit={onSubmit}/>
      <Footer t={t} locale={locale} onTop={() => scrollTo("home")}/>
      <ProjectPreviewDialog project={selectedProject} t={t} onClose={closePreview}/>
    </main>
  </>;
}

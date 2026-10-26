"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { site } from "@/config/site";
import { navigation } from "@/data/navigation";
import { messages } from "@/lib/messages";
import type { Locale, Theme } from "@/types/portfolio";
import type { ProjectRecord } from "@/types/portfolio";
import { AboutSection, ContactSection, Footer, HeroSection, JourneySection, ProjectsSection, ServicesSection } from "@/components/sections";
import { ProjectPreviewDialog } from "@/components/project-preview-dialog";
import { SiteHeader } from "@/components/site-header";

export default function Portfolio({ initialLocale, initialTheme }: { initialLocale: Locale; initialTheme: Theme }) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const rtl = locale === "ar";
  const t = messages[locale];

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.classList.add("theme-switching");
    root.dataset.theme = nextTheme;
    setTheme(nextTheme);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => root.classList.remove("theme-switching"));
    });
  };

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
        setScrolled(window.scrollY > 0);
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
    const move = (event: PointerEvent) => {
      cursorRef.current?.style.setProperty("transform", `translate3d(${event.clientX}px,${event.clientY}px,0)`);
    };
    const over = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      const serviceCard = target.closest<HTMLElement>(".service-card");
      const cursor = cursorRef.current;
      if (!cursor) return;
      cursor.classList.toggle("is-over", !!target.closest("a,button,[role=button],.service-card"));
      cursor.classList.toggle("is-service-hover", !!serviceCard);
      if (serviceCard) {
        cursor.style.setProperty("--cursor-accent", getComputedStyle(serviceCard).getPropertyValue("--service-accent").trim() || "var(--purple)");
      } else {
        cursor.style.setProperty("--cursor-accent", "var(--purple)");
      }
    };
    const leave = () => cursorRef.current?.classList.remove("is-over", "is-service-hover");
    const out = (event: PointerEvent) => {
      if (event.relatedTarget === null) leave();
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerout", out, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerout", out);
    };
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
        const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
        frame?.style.setProperty("--tilt-x", `${(x - .5) * 10}deg`);
        frame?.style.setProperty("--tilt-y", `${(.5 - y) * 10}deg`);
        frame?.style.setProperty("--tilt-z", `${(x - .5) * 3}deg`);
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
      <div ref={cursorRef} className="custom-cursor" aria-hidden="true"><span/></div>
      <SiteHeader
        t={t}
        locale={locale}
        theme={theme}
        activeSection={active}
        scrolled={scrolled}
        mobileOpen={mobileOpen}
        onNavigate={scrollTo}
        onToggleTheme={toggleTheme}
        onToggleLocale={() => setLocale(rtl ? "en" : "ar")}
        onToggleMobile={() => setMobileOpen((open) => !open)}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <HeroSection t={t} reducedMotion={Boolean(reducedMotion)} locale={locale} theme={theme} onScroll={scrollTo}/>
      <AboutSection t={t} reducedMotion={Boolean(reducedMotion)} theme={theme}/>
      <ServicesSection t={t} reducedMotion={Boolean(reducedMotion)} theme={theme} locale={locale} onContact={() => scrollTo("contact")}/>
      <ProjectsSection t={t} reducedMotion={Boolean(reducedMotion)} locale={locale} onPreview={setSelectedProject}/>
      <JourneySection t={t} reducedMotion={Boolean(reducedMotion)}/>
      <ContactSection t={t} reducedMotion={Boolean(reducedMotion)} locale={locale} formStatus={formStatus} onSubmit={onSubmit}/>
      <Footer t={t} locale={locale} onTop={() => scrollTo("home")}/>
      <ProjectPreviewDialog project={selectedProject} t={t} locale={locale} onClose={closePreview}/>
    </main>
  </>;
}

"use client";

import { motion } from "framer-motion";
import type { RefObject } from "react";
import { icons } from "@/config/icons";
import { site } from "@/config/site";
import { navigation } from "@/data/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import type { Messages } from "@/lib/i18n";
import type { Locale, Theme } from "@/types/portfolio";

type SiteHeaderProps = {
  t: Messages;
  locale: Locale;
  theme: Theme;
  activeSection: string;
  scrolled: boolean;
  progressRef: RefObject<HTMLSpanElement | null>;
  mobileOpen: boolean;
  onNavigate: (id: string) => void;
  onToggleTheme: () => void;
  onToggleLocale: () => void;
  onToggleMobile: () => void;
  onCloseMobile: () => void;
};

export function SiteHeader({
  t,
  locale,
  theme,
  activeSection,
  scrolled,
  progressRef,
  mobileOpen,
  onNavigate,
  onToggleTheme,
  onToggleLocale,
  onToggleMobile,
  onCloseMobile,
}: SiteHeaderProps) {
  const rtl = locale === "ar";

  const handleNavigation = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    onNavigate(id);
  };

  return (
    <Sheet open={mobileOpen} onOpenChange={(open) => { if (open) onToggleMobile(); else onCloseMobile(); }}>
    <header className={`topbar-wrap${scrolled ? " is-scrolled" : ""}`}>
      <nav className={`topbar${scrolled ? " is-scrolled" : ""}`} aria-label={t.primaryNavigation}>
        <button className="brand" onClick={() => onNavigate("home")} aria-label={t.homeLabel}>
          {site.signature}
        </button>

        <div className="nav-links">
          {navigation.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(event) => handleNavigation(event, id)}
              className={activeSection === id ? "active" : ""}
              aria-current={activeSection === id ? "location" : undefined}
            >
              {activeSection === id && (
                <motion.span
                  className="nav-active-indicator"
                  layoutId="nav-active-indicator"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  aria-hidden="true"
                />
              )}
              <span className="nav-link-label">{t.nav[id]}</span>
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <button
            className="icon-button theme-toggle-button"
            onClick={onToggleTheme}
            aria-label={t.theme}
            title={t.theme}
            aria-pressed={theme === "dark"}
          >
            <span className={`theme-toggle-icon ${theme === "dark" ? "is-dark" : "is-light"}`} key={theme} aria-hidden="true">
              {theme === "dark" ? <icons.sun size={19} strokeWidth={2.2} /> : <icons.moon size={19} strokeWidth={2.2} />}
            </span>
          </button>
          <button
            className="locale-button language-toggle-button"
            onClick={onToggleLocale}
            aria-label={t.language}
            aria-pressed={rtl}
          >
            <icons.globe className="language-toggle-globe" size={15} />
            <span className="locale-label" key={locale} aria-hidden="true">{rtl ? "AR" : "EN"}</span>
          </button>
          <Button type="button" variant="ghost" className="button button-small button-primary hire-button" onClick={() => onNavigate("contact")}>
            {t.hire}<icons.arrowUpRight size={15} />
          </Button>
          <SheetTrigger asChild>
            <button className="icon-button mobile-menu-button" aria-label={mobileOpen ? t.closeMenu : t.menu}>
              <span className="mobile-menu-toggle-icon" aria-hidden="true">
                {mobileOpen ? <icons.close size={20} /> : <icons.menu size={20} />}
              </span>
            </button>
          </SheetTrigger>
        </div>
        <div className="scroll-progress" aria-hidden="true">
          <span ref={progressRef} />
        </div>
      </nav>

    </header>
      <SheetContent
        side={rtl ? "right" : "left"}
        className="mobile-menu"
        overlayClassName="mobile-menu-backdrop"
        aria-label={t.primaryNavigation}
      >
              <button className="icon-button mobile-menu-close" onClick={onCloseMobile} aria-label={t.closeMenu}>
                <icons.close size={19} />
              </button>
              {navigation.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(event) => handleNavigation(event, id)}
                  className={activeSection === id ? "active" : ""}
                  aria-current={activeSection === id ? "location" : undefined}
                >
                  {t.nav[id]}<span aria-hidden="true">{rtl ? "←" : "→"}</span>
                </a>
              ))}
              <Button type="button" variant="ghost" className="button button-primary" onClick={() => onNavigate("contact")}>
                {t.hire}<icons.arrowUpRight size={16} />
              </Button>
      </SheetContent>
    </Sheet>
  );
}

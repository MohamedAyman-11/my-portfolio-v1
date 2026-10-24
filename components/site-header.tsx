"use client";

import { AnimatePresence, motion } from "framer-motion";
import { icons } from "@/config/icons";
import { site } from "@/config/site";
import { navigation } from "@/data/navigation";
import type { Messages } from "@/lib/i18n";
import type { Locale, Theme } from "@/types/portfolio";

type SiteHeaderProps = {
  t: Messages;
  locale: Locale;
  theme: Theme;
  activeSection: string;
  scrolled: boolean;
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
          <button className="button button-small button-primary hire-button" onClick={() => onNavigate("contact")}>
            {t.hire}<icons.arrowUpRight size={15} />
          </button>
          <button
            className="icon-button mobile-menu-button"
            onClick={onToggleMobile}
            aria-label={mobileOpen ? t.closeMenu : t.menu}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                className="mobile-menu-toggle-icon"
                key={mobileOpen ? "close" : "menu"}
                aria-hidden="true"
                initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                {mobileOpen ? <icons.close size={20} /> : <icons.menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="mobile-menu" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
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
            <button className="button button-primary" onClick={() => onNavigate("contact")}>
              {t.hire}<icons.arrowUpRight size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu-backdrop"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onCloseMobile}
          />
        )}
      </AnimatePresence>
    </header>
  );
}

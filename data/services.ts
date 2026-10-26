import type { IconId } from "@/config/icons";
import type { TechnologyIconId } from "@/config/icons";
import type { Locale } from "@/types/portfolio";

type ServiceCopy = { title: string; body: string; tags: readonly string[] };

type ServiceRecord = {
  id: string;
  icon: { type: "technology"; id: TechnologyIconId } | { type: "icon"; id: IconId };
  copy: Record<Locale, ServiceCopy>;
};

export const services = [
  {
    id: "frontend",
    icon: { type: "technology", id: "react" },
    copy: {
      en: {
        title: "Frontend development",
        body: "Responsive, accessible interfaces built around real user needs and thoughtful interactions.",
        tags: ["React & Next.js", "TypeScript", "Tailwind CSS", "Responsive UI", "Accessibility", "Interactive UI", "SEO"],
      },
      ar: {
        title: "تطوير الواجهات الأمامية",
        body: "واجهات متجاوبة وسهلة الوصول تتمحور حول احتياجات المستخدم وتفاعلات مدروسة.",
        tags: ["React & Next.js", "TypeScript", "Tailwind CSS", "Responsive UI", "Accessibility", "Interactive UI", "SEO"],
      },
    },
  },
  {
    id: "backend",
    icon: { type: "technology", id: "express" },
    copy: {
      en: {
        title: "Backend development",
        body: "Reliable backend services and APIs built to support maintainable, scalable applications.",
        tags: ["Express.js", "REST APIs", "Node.js", "JWT & Security", "Authentication", "Integrations"],
      },
      ar: {
        title: "تطوير الأنظمة الخلفية",
        body: "خدمات خلفية وواجهات API موثوقة تدعم تطبيقات قابلة للصيانة والتوسع.",
        tags: ["Express.js", "REST APIs", "Node.js", "JWT", "Authentication", "Integrations"],
      },
    },
  },
  {
    id: "database",
    icon: { type: "icon", id: "database" },
    copy: {
      en: {
        title: "Database design",
        body: "Thoughtful relational data models built for consistency, maintainability, and growth.",
        tags: ["PostgreSQL", "Data modeling", "SQL", "MongoDB", "Prisma", "Schema design", "Query optimization"],
      },
      ar: {
        title: "تصميم قواعد البيانات",
        body: "نماذج بيانات علائقية مدروسة تحافظ على الاتساق وسهولة الصيانة والتوسع.",
        tags: ["PostgreSQL", "Data modeling", "SQL", "MongoDB", "Prisma", "Schema design", "Query optimization"],
      },
    },
  },
  {
    id: "performance",
    icon: { type: "icon", id: "rocket" },
    copy: {
      en: {
        title: "Performance optimization",
        body: "Fast, responsive experiences shaped by careful optimization and attention to detail.",
        tags: ["Core Web Vitals", "Optimization", "Accessibility", "Caching", "SEO"],
      },
      ar: {
        title: "تحسين الأداء",
        body: "تجارب سريعة ومتجاوبة من خلال تحسين الأداء والاهتمام بالتفاصيل.",
        tags: ["Core Web Vitals", "Optimization", "Accessibility", "Caching", "Lazy loading"],
      },
    },
  },
] as const satisfies readonly ServiceRecord[];

import type { IconId } from "@/config/icons";
import type { TechnologyIconId } from "@/config/icons";
import type { Locale } from "@/types/portfolio";

type ServiceCopy = { title: string; body: string; tags: readonly string[] };

type ServiceRecord = {
  id: string;
  icon:
    | { type: "technology"; id: TechnologyIconId }
    | { type: "icon"; id: IconId };
  copy: Record<Locale, ServiceCopy>;
};

export const services = [
  {
    id: "frontend",
    icon: { type: "technology", id: "react" },
    copy: {
      en: {
        title: "Frontend Development",
        body: "Building modern, responsive web interfaces with a strong focus on usability and smooth user experiences.",
        tags: ["UI Development", "Responsive Design", "Interactive Interfaces"],
      },
      ar: {
        title: "Frontend Development",
        body: "بناء واجهات Web حديثة ومتجاوبة، مع التركيز على سهولة الاستخدام وتقديم تجربة سلسة للمستخدم.",
        tags: ["UI Development", "Responsive Design", "Interactive Interfaces"],
      },
    },
  },
  {
    id: "backend",
    icon: { type: "technology", id: "express" },
    copy: {
      en: {
        title: "Backend Development",
        body: "Building reliable APIs and server-side systems that support secure and scalable web applications.",
        tags: [
          "API Development",
          "Server-Side Logic",
          "Authentication & Authorization",
        ],
      },
      ar: {
        title: "Backend Development",
        body: "بناء APIs وتطوير أنظمة Backend موثوقة تدعم تطبيقات Web، مع الاهتمام بالأمان والأداء وقابلية التوسع.",
        tags: [
          "API Development",
          "Server-Side Logic",
          "Authentication & Authorization",
        ],
      },
    },
  },
  {
    id: "database",
    icon: { type: "icon", id: "database" },
    copy: {
      en: {
        title: "Database Design",
        body: "Designing well-structured data models that keep data organized and make it easy to manage and access.",
        tags: ["Database Modeling", "Schema Design", "Data Management"],
      },
      ar: {
        title: "Database Design",
        body: "تصميم Database Structures منظمة تساعد على تخزين البيانات وإدارتها بكفاءة، مع سهولة الوصول إليها.",
        tags: ["Database Modeling", "Schema Design", "Data Management"],
      },
    },
  },
  {
    id: "performance",
    icon: { type: "icon", id: "rocket" },
    copy: {
      en: {
        title: "Performance Optimization",
        body: "Improving loading speed and application performance to deliver faster and smoother user experiences.",
        tags: [
          "Loading Optimization",
          "Caching Strategies",
          "SEO Optimization",
        ],
      },
      ar: {
        title: "Performance Optimization",
        body: "تحسين سرعة تحميل التطبيقات وأدائها من خلال تحسين Loading وRendering، لتقديم تجربة استخدام أسرع وأكثر سلاسة.",
        tags: [
          "Loading Optimization",
          "Caching Strategies",
          "SEO Optimization",
        ],
      },
    },
  },
] as const satisfies readonly ServiceRecord[];

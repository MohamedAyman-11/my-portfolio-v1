import type { TechnologyIconId } from "@/config/icons";

export type Locale = "en" | "ar";
export type ProjectId = "project-01" | "project-02" | "project-03";
export type Theme = "dark" | "light";

export type ProjectRepository = {
  name: string;
  url: string;
};

export type ProjectRecord = {
  id: ProjectId;
  name: string;
  demo?:
    | { type: "website"; url: string }
    | { type: "video"; url: string };
  description: string;
  image?: string;
  repositories: readonly ProjectRepository[];
  technologies: readonly string[];
  featured: boolean;
};

export type SkillCategory = "frontend" | "backend" | "tools";

export type Skill = {
  id: string;
  name: string;
  category: SkillCategory;
  icon?: TechnologyIconId;
  url?: string;
};

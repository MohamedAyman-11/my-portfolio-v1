import type { Skill } from "@/types/portfolio";

export const skills = [
  { id: "react", name: "React", category: "frontend", icon: "react" },
  { id: "nextjs", name: "Next.js", category: "frontend", icon: "nextjs" },
  { id: "typescript", name: "TypeScript", category: "frontend", icon: "typescript" },
  { id: "redux", name: "Redux", category: "frontend", icon: "redux" },
  { id: "tailwind", name: "Tailwind CSS", category: "frontend", icon: "tailwind" },
  { id: "nodejs", name: "Node.js", category: "backend", icon: "nodejs" },
  { id: "express", name: "Express.js", category: "backend", icon: "express" },
  { id: "prisma", name: "Prisma", category: "backend", icon: "prisma" },
  { id: "mongodb", name: "MongoDB", category: "backend", icon: "mongodb" },
  { id: "postgresql", name: "PostgreSQL", category: "backend", icon: "postgresql" },
  { id: "git", name: "Git", category: "tools", icon: "git" },
  { id: "postman", name: "Postman", category: "tools", icon: "postman" },
  { id: "ai-tools", name: "AI Tools", category: "tools", icon: "ai" },
  { id: "figma", name: "Figma", category: "tools", icon: "figma" },
] as const satisfies readonly Skill[];

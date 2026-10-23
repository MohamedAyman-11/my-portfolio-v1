import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpLeft, ArrowUpRight, Atom,
  BriefcaseBusiness, Braces, Code2, CodeXml, Compass, Database, ExternalLink,
  Gauge, GitBranch, Globe2, Layers3, Lightbulb, Mail, MapPin, Menu, Moon,
  Play, Search, Send, Server, Sparkles, Sun, Wind, X,
  type LucideIcon,
} from "lucide-react";

export const icons = {
  atom: Atom, braces: Braces, arrowDown: ArrowDown, arrowLeft: ArrowLeft, arrowRight: ArrowRight,
  arrowUpLeft: ArrowUpLeft, arrowUpRight: ArrowUpRight,
  briefcase: BriefcaseBusiness, code: Code2, codeXml: CodeXml, compass: Compass,
  database: Database, externalLink: ExternalLink, gauge: Gauge, globe: Globe2,
  layers: Layers3, lightbulb: Lightbulb, mail: Mail, mapPin: MapPin, menu: Menu,
  moon: Moon, play: Play, search: Search, send: Send, server: Server, sparkles: Sparkles,
  sun: Sun, wind: Wind, gitBranch: GitBranch, close: X,
} satisfies Record<string, LucideIcon>;

export type IconId = keyof typeof icons;

export const technologyIcons = {
  react: icons.atom,
  nextjs: icons.layers,
  typescript: icons.codeXml,
  redux: icons.layers,
  tailwind: icons.wind,
  nodejs: icons.server,
  express: icons.braces,
  prisma: icons.database,
  mongodb: icons.database,
  postgresql: icons.database,
  git: icons.gitBranch,
  postman: icons.send,
  ai: icons.sparkles,
  figma: icons.globe,
} satisfies Record<string, LucideIcon>;

export type TechnologyIconId = keyof typeof technologyIcons;

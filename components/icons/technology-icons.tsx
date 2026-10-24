import {
  Expressdotjs,
  Figma,
  Git,
  Mongodb,
  Nodejs,
  Nextdotjs,
  Openai,
  Postgresql,
  Postman,
  Prisma,
  React,
  Redux,
  Tailwindcss,
  Typescript,
} from "@thesvg/react";
import type { ComponentType, SVGProps } from "react";
import type { Theme } from "@/types/portfolio";
import type { TechnologyIconId } from "@/config/icons";

type IconProps = SVGProps<SVGSVGElement>;
type ThemeIconProps = IconProps & { theme: Theme };

function ReactMark({ theme, className, ...props }: ThemeIconProps) {
  return <React {...props} variant={theme === "dark" ? "light" : "dark"} className={`h-4 w-4 ${className ?? ""}`} />;
}

function NextMark({ theme, className, style, ...props }: ThemeIconProps) {
  return (
    <Nextdotjs
      {...props}
      variant="mono"
      className={`h-4 w-4 ${className ?? ""}`}
      style={{ ...style, color: theme === "dark" ? "#fff" : "#111827" }}
    />
  );
}

function ExpressMark({ theme, className, ...props }: ThemeIconProps) {
  return (
    <Expressdotjs {...props} variant={theme === "dark" ? "dark" : "light"} className={`h-4 w-4 ${className ?? ""}`} />
  );
}

function PostgresMark({ theme, className, ...props }: ThemeIconProps) {
  return <Postgresql {...props} variant="mono" className={`h-4 w-4 ${theme === "dark" ? "text-cyan-100" : "text-slate-800"} ${className ?? ""}`} />;
}

function TypeScriptMark({ theme, className, ...props }: ThemeIconProps) {
  return <Typescript {...props} variant={theme === "dark" ? "default" : "mono"} className={`h-4 w-4 ${theme === "light" ? "text-slate-800" : ""} ${className ?? ""}`} />;
}

function ThemedBrandMark({ Icon, theme, className, ...props }: ThemeIconProps & { Icon: ComponentType<IconProps> }) {
  return <Icon {...props} data-theme={theme} className={`h-4 w-4 ${className ?? ""}`} />;
}

const brandMark = (Icon: ComponentType<IconProps>): ComponentType<ThemeIconProps> =>
  function BrandMark({ theme, ...props }: ThemeIconProps) {
    return <ThemedBrandMark Icon={Icon} theme={theme} {...props} />;
  };

function PrismaMark({ theme, className, ...props }: ThemeIconProps) {
  return <Prisma {...props} variant={theme === "dark" ? "dark" : "light"} className={`h-4 w-4 ${className ?? ""}`} />;
}

function OpenaiMark({ theme, className, ...props }: ThemeIconProps) {
  return <Openai {...props} variant={theme === "dark" ? "dark" : "light"} className={`h-4 w-4 ${className ?? ""}`} />;
}

const technologyIcons: Record<TechnologyIconId, ComponentType<ThemeIconProps>> = {
  react: ReactMark,
  nextjs: NextMark,
  redux: brandMark(Redux),
  tailwind: brandMark(Tailwindcss),
  nodejs: brandMark(Nodejs),
  express: ExpressMark,
  prisma: PrismaMark,
  mongodb: brandMark(Mongodb),
  postgresql: PostgresMark,
  git: brandMark(Git),
  postman: brandMark(Postman),
  ai: OpenaiMark,
  figma: brandMark(Figma),
  typescript: TypeScriptMark,
};

export function TechnologyIcon({
  id,
  theme,
  ...props
}: IconProps & { id: TechnologyIconId; theme: Theme }) {
  const Icon = technologyIcons[id];
  return <Icon theme={theme} {...props} />;
}

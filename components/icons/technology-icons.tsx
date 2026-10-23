import type { ComponentType, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function ReactMark(props: IconProps) {
  return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
    <g stroke="#61DAFB" strokeWidth="1.7">
      <ellipse cx="16" cy="16" rx="13" ry="5" />
      <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(60 16 16)" />
      <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(120 16 16)" />
    </g><circle cx="16" cy="16" r="2.4" fill="#61DAFB" />
  </svg>;
}

function NextMark(props: IconProps) {
  return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
    <circle cx="16" cy="16" r="14" fill="#fff" />
    <path d="M10 23V9l12 14V9" stroke="#111" strokeWidth="2.5" strokeLinejoin="round" />
  </svg>;
}

function ExpressMark(props: IconProps) {
  return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
    <text x="3" y="23" fill="#F3C969" fontFamily="Arial, sans-serif" fontSize="21" fontWeight="500" letterSpacing="-2">ex</text>
  </svg>;
}

function PostgresMark(props: IconProps) {
  return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
    <path d="M7 18.5V12c0-4 3.5-6.5 8.7-6.5 5.5 0 9.3 2.8 9.3 7.2v5.1c0 2.1-1 3.2-2.8 3.2-1.4 0-2.2-.9-2.2-2.5v-4.1c0-2-1.2-3.2-3.1-3.2-2 0-3.2 1.4-3.2 3.8v7.1c0 1.8-.9 2.8-2.5 2.8-1.5 0-2.5-1-2.5-2.8v-1.4c-1.1-.4-1.7-1.1-1.7-2.2Z" fill="#6B9BD2" />
    <path d="M7.2 13.1c-2.1-.4-3.5-1.7-3.5-3.4 0-1.5 1-2.6 2.5-2.6 1.4 0 2.7 1.1 3.5 3.1M22 12.2c1.7-1 3.6-.8 4.6.5.8 1.1.5 2.5-.6 3.3l-2.1 1.5M18.3 10.1c.7-1.2 1.9-1.8 3-1.5" stroke="#6B9BD2" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="18.2" cy="9.1" r=".9" fill="#14202E" />
    <path d="M12.4 22.3c-.6 1.9-1.7 3.1-3.2 3.1" stroke="#6B9BD2" strokeWidth="1.6" strokeLinecap="round" />
  </svg>;
}

function TypeScriptMark(props: IconProps) {
  return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
    <rect x="2" y="2" width="28" height="28" rx="6" fill="#3178C6" />
    <path d="M7 13v-2h12v2h-4.7v12h-2.6V13H7Zm13.2 8.6c.9.7 1.8 1.1 2.8 1.1s1.6-.4 1.6-1.1c0-.6-.4-.9-1.8-1.5l-.8-.3c-2-.8-3-1.8-3-3.6 0-2 1.5-3.4 3.9-3.4 1.6 0 2.8.5 3.8 1.6l-1.7 1.5c-.6-.7-1.2-1-2.1-1-.8 0-1.3.4-1.3 1s.4.9 1.7 1.4l.8.3c2.1.9 3.1 1.9 3.1 3.7 0 2.2-1.7 3.6-4.2 3.6-1.9 0-3.5-.6-4.6-1.8l1.8-1.5Z" fill="#fff" />
  </svg>;
}

const technologyIcons: Record<string, ComponentType<IconProps>> = {
  react: ReactMark,
  nextjs: NextMark,
  express: ExpressMark,
  postgresql: PostgresMark,
  typescript: TypeScriptMark,
};

export function TechnologyIcon({ id, ...props }: IconProps & { id: keyof typeof technologyIcons }) {
  const Icon = technologyIcons[id];
  return <Icon {...props} />;
}

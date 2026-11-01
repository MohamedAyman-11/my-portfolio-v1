import type { Messages } from "@/lib/i18n";

export type BaseProps = { t: Messages; reducedMotion: boolean };
type MotionProps = Record<string, unknown>;

export const VIEWPORT_AMOUNT = 0.18;
export const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

export const reveal = (
  reduced: boolean,
  delay = 0,
  amount = VIEWPORT_AMOUNT,
  duration = 1.02,
): MotionProps =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount },
        transition: { duration, delay, ease: REVEAL_EASE },
      };

export const revealFromSide = (
  reduced: boolean,
  side: "left" | "right",
  delay = 0,
  amount = VIEWPORT_AMOUNT,
  duration = 1.1,
): MotionProps =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, x: side === "left" ? -36 : 36 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true, amount },
        transition: { duration, delay, ease: REVEAL_EASE },
      };

export const rise = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: REVEAL_EASE },
  },
};

export const fade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.32 } },
};

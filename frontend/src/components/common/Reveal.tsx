import type { ReactNode } from "react";
import { motion } from "framer-motion";

type RevealDirection =
  | "up"
  | "down"
  | "left"
  | "right"
  | "none"
  | "top"
  | "bottom"
  | "fade";

type RevealProps = {
  children: ReactNode;
  direction?: RevealDirection | string;
  delay?: number;
  className?: string;
  amount?: number;
};

const directionMap: Record<string, { x: number; y: number }> = {
  up: { x: 0, y: 42 },
  bottom: { x: 0, y: 42 },

  down: { x: 0, y: -42 },
  top: { x: 0, y: -42 },

  left: { x: -42, y: 0 },
  right: { x: 42, y: 0 },

  none: { x: 0, y: 0 },
  fade: { x: 0, y: 0 }
};

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
  amount = 0.22
}: RevealProps) {
  const offset = directionMap[direction] ?? directionMap.up;

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
        filter: "blur(8px)"
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        filter: "blur(0px)"
      }}
      viewport={{
        once: false,
        amount
      }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
}
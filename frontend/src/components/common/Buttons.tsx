import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type AnimatedButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

type NativeButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function AnimatedButton({
  children,
  href = "#",
  variant = "primary",
  className = "",
  ...props
}: AnimatedButtonProps) {
  return (
    <a
      href={href}
      className={`sp-animated-btn sp-animated-btn-${variant} ${className}`}
      {...props}
    >
      <span className="sp-btn-icon">
        <ArrowUpRight size={18} strokeWidth={2.6} />
      </span>
      <span className="sp-btn-label">{children}</span>
    </a>
  );
}

export function AnimatedNativeButton({
  children,
  variant = "primary",
  className = "",
  ...props
}: NativeButtonProps) {
  return (
    <button
      type="button"
      className={`sp-animated-btn sp-animated-btn-${variant} ${className}`}
      {...props}
    >
      <span className="sp-btn-icon">
        <ArrowUpRight size={18} strokeWidth={2.6} />
      </span>
      <span className="sp-btn-label">{children}</span>
    </button>
  );
}

export const PrimaryButton = AnimatedButton;
export const SecondaryButton = AnimatedButton;

export default AnimatedButton;
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

type ButtonLinkProps = {
  label: string;
  href: string;
  variant?: 'gradient' | 'outline';
};

export function ButtonLink({ label, href, variant = 'gradient' }: ButtonLinkProps) {
  const className = variant === 'gradient' ? 'btn gradient-btn' : 'btn outline-btn';

  return (
    <motion.a
      className={className}
      href={href}
      whileHover={{ y: -3, scale: 1.025 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 420, damping: 20 }}
    >
      <span><ArrowUpRight size={16} strokeWidth={2.4} /></span>
      {label}
    </motion.a>
  );
}

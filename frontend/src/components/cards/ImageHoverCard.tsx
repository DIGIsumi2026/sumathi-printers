import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

type ImageHoverCardProps = {
  src: string;
  alt: string;
  caption: string;
  className?: string;
  children?: ReactNode;
};

export default function ImageHoverCard({ src, alt, caption, className = '', children }: ImageHoverCardProps) {
  return (
    <motion.div className={`image-hover ${className}`} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 220, damping: 18 }}>
      <img src={src} alt={alt} />
      {children}
      <div className="hover-caption">{caption}</div>
    </motion.div>
  );
}

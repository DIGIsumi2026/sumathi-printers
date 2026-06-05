import { Settings, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FloatingTools() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <motion.button className="floating-gear" aria-label="Open settings" whileHover={{ rotate: 45, scale: 1.08 }}>
        <Settings size={19} />
      </motion.button>
      <motion.button className="scroll-top" onClick={scrollTop} aria-label="Scroll to top" whileHover={{ y: -4, scale: 1.08 }}>
        <ArrowUp size={19} />
      </motion.button>
    </>
  );
}

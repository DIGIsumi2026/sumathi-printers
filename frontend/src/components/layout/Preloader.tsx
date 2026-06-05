import { AnimatePresence, motion } from 'framer-motion';

type PreloaderProps = {
  visible: boolean;
  brand: string;
};

export default function Preloader({ visible, brand }: PreloaderProps) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="preloader"
          aria-label="Loading website"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, pointerEvents: 'none' }}
          transition={{ duration: 0.45 }}
        >
          <motion.div
            className="preloader-green"
            initial={{ y: 0 }}
            animate={{ y: '-100%' }}
            transition={{ delay: 1.25, duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
          >
            <span>{brand}</span>
          </motion.div>
          <motion.div
            className="preloader-black"
            initial={{ y: 0 }}
            animate={{ y: '100%' }}
            transition={{ delay: 1.25, duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
          >
            <span>{brand}</span>
          </motion.div>
          <div className="scan-lines" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

import { motion } from "framer-motion";

type RevealTitleProps = {
  text: string;
  className?: string;
};

export default function RevealTitle({
  text,
  className = ""
}: RevealTitleProps) {
  const words = text.split(" ");

  return (
    <h2 className={`reveal-title ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="reveal-word"
          initial={{ y: 28, opacity: 0, filter: "blur(8px)" }}
          whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.45 }}
          transition={{
            duration: 0.55,
            delay: index * 0.045,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          {word}
        </motion.span>
      ))}
    </h2>
  );
}
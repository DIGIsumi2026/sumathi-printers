import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CompanyData, ImageMap } from '../../../types/site';
import imagesJson from '../../../data/images.json';
import { ButtonLink } from '../../../components/common/Buttons';
import Reveal from '../../../components/common/Reveal';

const images = imagesJson as ImageMap;

type HeroSectionProps = {
  company: CompanyData;
};

export default function HeroSection({ company }: HeroSectionProps) {
  const [activeWord, setActiveWord] = useState(0);
  const words = company.hero.rotatingWords;

  useEffect(() => {
    const timer = window.setInterval(() => setActiveWord((value) => (value + 1) % words.length), 1900);
    return () => window.clearInterval(timer);
  }, [words.length]);

  return (
    <section id="home" className="hero-section section-pale pattern-bg">
      <div className="hero-orbit one" />
      <div className="hero-orbit two" />

      <div className="container hero-grid">
        <div className="hero-content">
          <Reveal className="hero-kicker" direction="down">✦ {company.hero.eyebrow}</Reveal>

          <h1 className="hero-title">
            {company.hero.titlePrefix}{' '}
            <span className="word-rotator">
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[activeWord]}
                  initial={{ y: 48, opacity: 0, rotateX: -80 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  exit={{ y: -48, opacity: 0, rotateX: 80 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  {words[activeWord]}
                </motion.span>
              </AnimatePresence>
              <span className="mini-face">S</span>
            </span>{' '}
            {company.hero.titleSuffix} <span className="target-icon">◎</span>
          </h1>

          <Reveal className="hero-copy" delay={0.12}>
            <p>{company.hero.description}</p>
          </Reveal>

          <Reveal className="hero-actions" delay={0.18}>
            <ButtonLink label="Request Quote" href="#quote" />
            <ButtonLink label="Get In Touch" href="#contact" variant="outline" />
          </Reveal>

          <Reveal as="ul" className="hero-points" delay={0.24}>
            {company.hero.points.map((point) => <li key={point}>{point}</li>)}
          </Reveal>
        </div>

        <div className="vertical-watermark">{company.brand.toUpperCase()}</div>

        <Reveal className="hero-product-strip image-hover" direction="scale">
          <img src={images.heroProducts} alt="Printed product mockups" />
          <div className="hover-caption">Explore high-quality product printing collections</div>
        </Reveal>
      </div>
    </section>
  );
}

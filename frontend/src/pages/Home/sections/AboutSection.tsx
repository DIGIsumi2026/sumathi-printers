import { CheckCircle2, PenTool } from 'lucide-react';
import type { CompanyData, ImageMap } from '../../../types/site';
import imagesJson from '../../../data/images.json';
import Badge from '../../../components/common/Badge';
import RevealTitle from '../../../components/common/RevealTitle';
import Reveal from '../../../components/common/Reveal';
import { ButtonLink } from '../../../components/common/Buttons';
import ImageHoverCard from '../../../components/cards/ImageHoverCard';

const images = imagesJson as ImageMap;

type AboutSectionProps = {
  company: CompanyData;
};

export default function AboutSection({ company }: AboutSectionProps) {
  return (
    <section id="about" className="about-section section-pale pattern-bg">
      <div className="container about-grid">
        <Reveal className="about-copy" direction="left">
          <Badge left="Who We Are" right="About Sumathi Printers" />
          <RevealTitle text={company.about.title} />

          <div className="big-counter">
            <span className="counter-icon"><PenTool size={26} /></span>
            <strong>40<span>+</span></strong>
            <small>Years of printing heritage</small>
          </div>

          {company.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

          <div className="trust-pill"><CheckCircle2 size={18} /> State-of-the-art machinery and technology</div>
          <div className="trust-pill"><CheckCircle2 size={18} /> Confidential, affordable and schedule-focused service</div>

          <ButtonLink label="Get Started" href="#quote" />
        </Reveal>

        <Reveal direction="right">
          <ImageHoverCard
            className="about-visual"
            src={images.aboutCollage}
            alt="Modern printing apparel collage"
            caption="Modern printing technology and production workflow"
          >
            <div className="ribbon">Reliable Platform</div>
          </ImageHoverCard>
        </Reveal>
      </div>
    </section>
  );
}

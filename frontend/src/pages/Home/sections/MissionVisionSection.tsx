import { Eye, Target, Sparkles } from 'lucide-react';
import type { CompanyData, ImageMap } from '../../../types/site';
import imagesJson from '../../../data/images.json';
import Badge from '../../../components/common/Badge';
import RevealTitle from '../../../components/common/RevealTitle';
import Reveal from '../../../components/common/Reveal';
import ImageHoverCard from '../../../components/cards/ImageHoverCard';

const images = imagesJson as ImageMap;

type MissionVisionSectionProps = {
  company: CompanyData;
};

export default function MissionVisionSection({ company }: MissionVisionSectionProps) {
  return (
    <section className="mission-section section-white">
      <div className="container section-head two-column">
        <div>
          <Badge left="Mission & Vision" right="Company Direction" />
          <RevealTitle text="Quality, Service Excellence And Responsible Growth" />
        </div>
        <Reveal className="head-side" direction="right">
          <p>{company.about.technology}</p>
        </Reveal>
      </div>

      <div className="container mission-grid">
        <Reveal as="article" className="mission-card" direction="up">
          <span><Eye size={30} /></span>
          <h3>Vision</h3>
          <p>{company.missionVision.vision}</p>
        </Reveal>

        <Reveal as="article" className="mission-card" direction="up" delay={0.12}>
          <span><Target size={30} /></span>
          <h3>Mission</h3>
          <p>{company.missionVision.mission}</p>
        </Reveal>

        <Reveal className="mission-image-wrap" direction="scale" delay={0.2}>
          <ImageHoverCard
            className="mission-image"
            src={images.serviceStack}
            alt="Printing production preview"
            caption="Integrated prepress, printing and finishing services"
          >
            <div className="offer-pill"><Sparkles size={16} /> Quality & Service Excellence</div>
          </ImageHoverCard>
        </Reveal>
      </div>
    </section>
  );
}

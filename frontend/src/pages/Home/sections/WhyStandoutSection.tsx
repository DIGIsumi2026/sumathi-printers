import { Play, CheckCircle2 } from 'lucide-react';
import type { CompanyData, ImageMap } from '../../../types/site';
import imagesJson from '../../../data/images.json';
import Badge from '../../../components/common/Badge';
import RevealTitle from '../../../components/common/RevealTitle';
import Reveal from '../../../components/common/Reveal';
import ImageHoverCard from '../../../components/cards/ImageHoverCard';

const images = imagesJson as ImageMap;

type WhyStandoutSectionProps = {
  company: CompanyData;
};

export default function WhyStandoutSection({ company }: WhyStandoutSectionProps) {
  return (
    <section id="why" className="why-section section-white">
      <div className="container why-grid">
        <Reveal direction="left">
          <ImageHoverCard
            className="video-card"
            src={images.standoutVideo}
            alt="Print products video preview"
            caption="Watch our quality and reliability story"
          >
            <button className="play-button" aria-label="Play video"><Play size={24} fill="currentColor" /></button>
          </ImageHoverCard>
        </Reveal>

        <Reveal className="why-copy" direction="right">
          <Badge left="Why Choose Us" right="Printing Made Reliable" />
          <RevealTitle text="We Combine Quality, Speed & Reliability in Every Project" />

          {company.stats.map((stat, index) => (
            <div className="stat-row" key={stat.label}>
              <span className="timeline-dot"><CheckCircle2 size={16} /></span>
              <div>
                <strong>{stat.value}<span>{index === 0 ? '' : '+'}</span></strong>
                <small>{stat.label}</small>
              </div>
              <img src={index % 2 === 0 ? images.statMugsA : images.statMugsB} alt={stat.label} />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

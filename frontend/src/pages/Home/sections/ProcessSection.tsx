import { useState } from 'react';
import { ClipboardList } from 'lucide-react';
import type { CompanyData, ImageMap } from '../../../types/site';
import imagesJson from '../../../data/images.json';
import Badge from '../../../components/common/Badge';
import RevealTitle from '../../../components/common/RevealTitle';
import Reveal from '../../../components/common/Reveal';
import ImageHoverCard from '../../../components/cards/ImageHoverCard';

const images = imagesJson as ImageMap;

type ProcessSectionProps = {
  company: CompanyData;
};

export default function ProcessSection({ company }: ProcessSectionProps) {
  const [activeProcess, setActiveProcess] = useState(0);

  return (
    <section id="process" className="process-section section-pale pattern-bg">
      <div className="container process-box">
        <Reveal direction="left">
          <ImageHoverCard
            className="process-preview"
            src={images.processUi}
            alt="Printing order search interface"
            caption="Simple print ordering workflow"
          />
        </Reveal>

        <Reveal className="process-copy" direction="right">
          <Badge left="How It Works" right="Simple Steps to Get Started" />
          <RevealTitle text="We Make Printing Easy, Quick And Reliable" />

          <div className="step-list">
            {company.processSteps.map((step, index) => (
              <button
                className={`step-item ${activeProcess === index ? 'active' : ''}`}
                key={step.title}
                onClick={() => setActiveProcess(index)}
              >
                <span className="step-icon"><ClipboardList size={20} /></span>
                <span>
                  <strong>{step.title}</strong>
                  <small>{step.text}</small>
                </span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

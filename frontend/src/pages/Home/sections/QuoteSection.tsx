import type { FormEvent } from 'react';
import { Truck, CreditCard, Headphones } from 'lucide-react';
import type { CompanyData, FormStatus, ImageMap } from '../../../types/site';
import imagesJson from '../../../data/images.json';
import Badge from '../../../components/common/Badge';
import RevealTitle from '../../../components/common/RevealTitle';
import Reveal from '../../../components/common/Reveal';
import ImageHoverCard from '../../../components/cards/ImageHoverCard';
import { ButtonLink } from '../../../components/common/Buttons';
import StatusMessage from '../../../components/forms/StatusMessage';

const images = imagesJson as ImageMap;

type QuoteSectionProps = {
  company: CompanyData;
  quoteStatus: FormStatus;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function QuoteSection({ company, quoteStatus, onSubmit }: QuoteSectionProps) {
  return (
    <section id="quote" className="cta-section section-pale pattern-bg">
      <div className="cta-split">
        <Reveal direction="left">
          <ImageHoverCard
            className="cta-photo"
            src={images.contactGirl}
            alt="Custom printed shirt"
            caption="Personalized apparel and product printing"
          />
        </Reveal>

        <Reveal className="cta-copy" direction="right">
          <Badge left="Call To Action" right="Start Printing Today" />
          <RevealTitle text="Bringing Creativity And Quality Together" />
          <p>{company.tagline}</p>

          <div className="hero-actions">
            <ButtonLink label="Request Quote" href="#quote" />
            <ButtonLink label="Contact Us" href="#contact" variant="outline" />
          </div>

          <form className="quote-form" onSubmit={onSubmit}>
            <input name="name" placeholder="Your name" required />
            <input name="email" type="email" placeholder="Email address" required />
            <select name="product" required defaultValue="">
              <option value="" disabled>Choose print product</option>
              {company.services.map((service) => <option key={service}>{service}</option>)}
            </select>
            <input name="quantity" placeholder="Quantity" />
            <textarea name="message" placeholder="Tell us about your printing requirement" />
            <button className="form-submit" type="submit" disabled={quoteStatus === 'loading'}>
              {quoteStatus === 'loading' ? 'Sending...' : 'Request Quote'}
            </button>
            <StatusMessage status={quoteStatus} success="Quote request saved successfully." />
          </form>
        </Reveal>
      </div>

      <div className="benefit-row container">
        <Reveal><span><Truck size={24} /></span><strong>Fast and reliable print delivery</strong></Reveal>
        <Reveal delay={0.1}><span><CreditCard size={24} /></span><strong>Affordable and competitive prices</strong></Reveal>
        <Reveal delay={0.2}><span><Headphones size={24} /></span><strong>Friendly professional customer service</strong></Reveal>
      </div>
    </section>
  );
}

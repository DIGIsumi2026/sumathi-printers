import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Play, Star } from 'lucide-react';
import type { CompanyData, ImageMap } from '../../../types/site';
import imagesJson from '../../../data/images.json';
import SectionHeader from '../../../components/common/SectionHeader';
import Reveal from '../../../components/common/Reveal';
import ImageHoverCard from '../../../components/cards/ImageHoverCard';

const images = imagesJson as ImageMap;

type TestimonialSectionProps = {
  company: CompanyData;
};

export default function TestimonialSection({ company }: TestimonialSectionProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonial = company.testimonials[activeTestimonial];

  const previous = () => setActiveTestimonial((value) => (value + company.testimonials.length - 1) % company.testimonials.length);
  const next = () => setActiveTestimonial((value) => (value + 1) % company.testimonials.length);

  return (
    <section id="testimonial" className="testimonial-section section-white">
      <SectionHeader
        badgeLeft="Testimonial"
        badgeRight="What Our Clients Say"
        title="High-Quality Services With Fast Delivery."
        text="We take pride in delivering high-quality printing solutions that support long-term client relationships."
        buttonLabel="Get In Touch"
        buttonHref="#contact"
      />

      <Reveal className="container testimonial-panel">
        <ImageHoverCard
          className="testimonial-snapshot"
          src={images[testimonial.imageKey]}
          alt={`${testimonial.name} testimonial`}
          caption={`${testimonial.name} — ${testimonial.role}`}
        >
          <button className="testimonial-play" aria-label="Play testimonial video"><Play size={18} fill="currentColor" /></button>
        </ImageHoverCard>

        <div className="testimonial-card">
          <div className="stars">{Array.from({ length: 5 }).map((_, index) => <Star size={18} fill="currentColor" key={index} />)}</div>
          <h3>{testimonial.title}</h3>
          <p>“{testimonial.quote}”</p>

          <ul>
            {testimonial.points.map((point) => (
              <li key={point}><Check size={16} /> {point}</li>
            ))}
          </ul>

          <div className="quote-mark">”</div>

          <div className="small-arrows">
            <button onClick={previous} aria-label="Previous testimonial"><ArrowLeft size={18} /></button>
            <button className="active" onClick={next} aria-label="Next testimonial"><ArrowRight size={18} /></button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

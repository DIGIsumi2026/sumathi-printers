import { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { CompanyData, ImageMap } from '../../../types/site';
import imagesJson from '../../../data/images.json';
import SectionHeader from '../../../components/common/SectionHeader';
import Reveal from '../../../components/common/Reveal';
import ImageHoverCard from '../../../components/cards/ImageHoverCard';

const images = imagesJson as ImageMap;

type ServicesSectionProps = {
  company: CompanyData;
};

export default function ServicesSection({ company }: ServicesSectionProps) {
  const [activeService, setActiveService] = useState(1);
  const service = company.serviceCards[activeService];

  const previousService = () => setActiveService((value) => (value + company.serviceCards.length - 1) % company.serviceCards.length);
  const nextService = () => setActiveService((value) => (value + 1) % company.serviceCards.length);

  return (
    <section id="services" className="services-section section-white">
      <SectionHeader
        badgeLeft="Our Services"
        badgeRight="Creative Printing Solutions"
        title="Comprehensive Printing Services With Fast Delivery."
        text="We offer a wide range of professional printing services designed for businesses, institutions, publishers and individual customers."
        buttonLabel="See All Services"
        buttonHref="#service-list"
      />

      <div className="container service-showcase">
        <Reveal as="article" className="service-main" direction="left">
          <ImageHoverCard
            className="service-image"
            src={images[service.imageKey]}
            alt={service.title}
            caption={service.title}
          >
            <a className="corner-button" href="#quote" aria-label="Open quote form"><ArrowUpRight size={19} /></a>
          </ImageHoverCard>

          <div className="service-desc">
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </div>
        </Reveal>

        <Reveal className="service-controls" direction="scale">
          <button onClick={previousService} aria-label="Previous service"><ArrowLeft size={18} /></button>
          <button className="active" onClick={nextService} aria-label="Next service"><ArrowRight size={18} /></button>
          <span />
        </Reveal>

        <Reveal direction="right">
          <ImageHoverCard
            className="service-stack"
            src={images.serviceStack}
            alt="Stacked printing service examples"
            caption="Layered preview of all printing services"
          />
        </Reveal>
      </div>

      <div id="service-list" className="container service-list-grid">
        {company.services.map((item, index) => (
          <motion.a
            href="#quote"
            className="service-list-item"
            key={item}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ delay: index * 0.035, duration: 0.48 }}
            whileHover={{ y: -4, scale: 1.015 }}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            {item}
          </motion.a>
        ))}
      </div>
    </section>
  );
}

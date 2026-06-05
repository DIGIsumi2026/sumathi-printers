import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { CompanyData, ImageMap } from '../../../types/site';
import imagesJson from '../../../data/images.json';
import SectionHeader from '../../../components/common/SectionHeader';
import Reveal from '../../../components/common/Reveal';
import ImageHoverCard from '../../../components/cards/ImageHoverCard';
import { ButtonLink } from '../../../components/common/Buttons';

const images = imagesJson as ImageMap;

type CategorySectionProps = {
  company: CompanyData;
};

export default function CategorySection({ company }: CategorySectionProps) {
  return (
    <section id="categories" className="category-section section-pale pattern-bg">
      <SectionHeader
        badgeLeft="Our Categories"
        badgeRight="Printing Categories"
        title="Choose From A Wide Range of Printing Categories."
        centered
      />

      <div className="container category-grid">
        <div className="category-cards">
          {company.categories.map((category, index) => (
            <motion.article
              className="category-card image-hover"
              key={category.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ delay: index * 0.07, duration: 0.5 }}
              whileHover={{ y: -7 }}
            >
              <img src={images[category.imageKey]} alt={category.title} />
              <h3>{category.title}</h3>
              <p>Custom print styles available</p>
              <a href="#quote" aria-label={`Request quote for ${category.title}`}><ArrowRight size={18} /></a>
              <div className="hover-caption">Create your {category.title.toLowerCase()} order</div>
            </motion.article>
          ))}
        </div>

        <Reveal className="category-feature-wrap" direction="right">
          <ImageHoverCard
            className="category-feature"
            src={images.categoryFeature}
            alt="High-quality printing services"
            caption="Limited promotional printing offers"
          >
            <div className="offer-pill">● Trending Print Offers</div>
            <h3>Enjoy High-Quality Printing Services</h3>
            <a className="solid-purple" href="#quote">Click & Order Now</a>
          </ImageHoverCard>
        </Reveal>
      </div>

      <div className="center-button">
        <ButtonLink label="Request Custom Quote" href="#quote" />
      </div>
    </section>
  );
}

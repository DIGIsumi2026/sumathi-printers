import { MessageCircle, UserRound } from 'lucide-react';
import { motion } from 'framer-motion';
import type { CompanyData, ImageMap } from '../../../types/site';
import imagesJson from '../../../data/images.json';
import SectionHeader from '../../../components/common/SectionHeader';

const images = imagesJson as ImageMap;

type BlogSectionProps = {
  company: CompanyData;
};

export default function BlogSection({ company }: BlogSectionProps) {
  return (
    <section id="blog" className="blog-section section-white">
      <SectionHeader
        badgeLeft="Our Blog"
        badgeRight="News & Insights"
        title="Explore Expert Insights And Creative Ideas"
        text="Helpful printing notes for better material selection, finishing decisions and packaging presentation."
        buttonLabel="See All Blogs"
        buttonHref="#blog"
      />

      <div className="container blog-grid">
        {company.blogs.map((blog, index) => (
          <motion.article
            className="blog-card image-hover"
            key={blog.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ delay: index * 0.1, duration: 0.55 }}
            whileHover={{ y: -8 }}
          >
            <span className="blog-tag">{blog.tag}</span>
            <img src={images[blog.imageKey]} alt={blog.title} />
            <div className="date-badge"><strong>05</strong><small>Jun, 26</small></div>
            <div className="blog-body">
              <p><UserRound size={14} /> {blog.author} <span>•</span> <MessageCircle size={14} /> 216 Comments</p>
              <h3>{blog.title}</h3>
            </div>
            <div className="hover-caption">Read printing insight: {blog.title}</div>
          </motion.article>
        ))}
      </div>

      <div className="slider-line"><button>‹</button><span /><button className="active">›</button></div>
    </section>
  );
}

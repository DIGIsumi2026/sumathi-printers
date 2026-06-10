import { motion } from "framer-motion";
import { Award, BriefcaseBusiness, GraduationCap, Sparkles } from "lucide-react";
import { imageAssets } from "../../../data/imageAssets";

const boardMembers = [
  {
    name: "Mr. Thilanga Sumathipala",
    role: "Chairman",
    image: imageAssets.board.thilanga,
    profile:
      "Business professional known for strategic vision; co-founder of the Sumathi Group of Companies and founder of the Thilanga Sumathipala Foundation.",
    highlights: [
      "Industries Led: Printing, Hospitality, Commerce, Energy, Technology & Entertainment, and Leisure.",
      "Key Achievement: Conceptualized and led the Sumathi Awards, the National Television Awards."
    ],
    icon: BriefcaseBusiness
  },
  {
    name: "Mrs. Samadara Sumathipala",
    role: "Director",
    image: imageAssets.board.samadara,
    profile:
      "Recognized as a strategic, forward-thinking leader who makes critical growth and leadership decisions.",
    highlights: [
      "Strategic leadership and decision-making.",
      "Supports business growth, governance and long-term organizational direction."
    ],
    icon: Sparkles
  },
  {
    name: "Mr. Dulantha Sumathipala",
    role: "Director",
    image: imageAssets.board.dulantha,
    profile:
      "Second son of Mr. Thilanga Sumathipala. Climbed the ranks from Sumathi Printers and NAPCO Pvt Ltd to become a Segment Director, joining the holding company board in 2020.",
    highlights: [
      "Education: BSc. Hons. in International Management & Business from the University of Plymouth, England.",
      "Alma Mater: Royal College, Colombo."
    ],
    icon: GraduationCap
  },
  {
    name: "Mr. Sajantha Sumathipala",
    role: "Director",
    image: imageAssets.board.sajantha,
    profile: "Youngest son of the Sumathi family.",
    highlights: [
      "Education: Holds a Master's degree in Business Management from foreign universities.",
      "Contributes to the next generation leadership of the Sumathi Group."
    ],
    icon: Award
  }
];

export default function AboutBoardSection() {
  return (
    <section className="sp-about-board-section">
      <span className="sp-about-board-watermark">BOARD OF MANAGEMENT</span>

      <span className="sp-about-board-shape sp-about-board-shape-one" />
      <span className="sp-about-board-shape sp-about-board-shape-two" />
      <span className="sp-about-board-ring" />

      <div className="container sp-about-board-container">
        <motion.div
          className="sp-about-board-head"
          initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="sp-about-board-badge">
            <Sparkles size={15} />
            <span>Leadership</span>
          </div>

          <h2>Board Of Management</h2>

          <p>
            Guided by experienced leadership, strategic vision and a commitment
            to continuous growth, Sumathi Printers continues to strengthen its
            position in Sri Lanka’s printing and publishing industry.
          </p>
        </motion.div>

        <div className="sp-about-board-grid">
          {boardMembers.map((member, index) => {
            const Icon = member.icon;

            return (
              <motion.article
                key={member.name}
                className="sp-about-board-card"
                tabIndex={0}
                initial={{ opacity: 0, y: 42, scale: 0.94, filter: "blur(12px)" }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.28 }}
                transition={{
                  duration: 0.72,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <div className="sp-about-board-image-wrap">
                  <img src={member.image} alt={member.name} draggable={false} />

                  <div className="sp-about-board-image-overlay" />

                  <div className="sp-about-board-role-pill">
                    <Icon size={15} />
                    <span>{member.role}</span>
                  </div>
                </div>

                <div className="sp-about-board-main">
                  <h3>{member.name}</h3>
                  <span>{member.role}</span>
                </div>

                <div className="sp-about-board-dropdown">
                  <p>{member.profile}</p>

                  <ul>
                    {member.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
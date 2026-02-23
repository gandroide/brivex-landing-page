import { motion } from 'framer-motion';
import { useTranslation } from '../i18n/LanguageContext';

const pillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

export default function TechDnaSection() {
  const { t } = useTranslation();
  const items = t('techDna.items');

  return (
    <section className="tech-dna" id="technology">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">{t('techDna.badge')}</span>
          <h2 className="section-title">{t('techDna.title')}</h2>
          <p className="section-subtitle">{t('techDna.subtitle')}</p>
        </motion.div>

        <div className="tech-grid">
          {Array.isArray(items) && items.map((item, i) => (
            <motion.div
              key={item}
              className="tech-pill"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={pillVariants}
            >
              <span className="tech-pill-dot" />
              {item}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

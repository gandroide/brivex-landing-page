import { motion } from 'framer-motion';
import { useTranslation } from '../i18n/LanguageContext';

const CARDS = [
  {
    key: 'bioalert',
    url: 'https://bio-acustic-farm-landing-page.ajontiveros82.workers.dev/',
    iconClass: 'bioalert',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
  },
  // {
  //   key: 'axisops',
  //   iconClass: 'axisops',
  //   icon: (
  //     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  //       <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
  //       <line x1="8" y1="21" x2="16" y2="21" />
  //       <line x1="12" y1="17" x2="12" y2="21" />
  //     </svg>
  //   ),
  // },
  // {
  //   key: 'aleris',
  //   iconClass: 'aleris',
  //   icon: (
  //     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  //       <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  //     </svg>
  //   ),
  // },
  {
    key: 'brivexsaas',
    iconClass: 'brivexsaas',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

export default function EcosystemSection() {
  const { t } = useTranslation();

  return (
    <section className="ecosystem" id="ecosystem">
      <div className="container">
        <motion.div
          className="ecosystem-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">{t('ecosystem.badge')}</span>
          <h2 className="section-title">{t('ecosystem.title')}</h2>
          <p className="section-subtitle">{t('ecosystem.subtitle')}</p>
        </motion.div>

        <div className="ecosystem-grid">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.key}
              className="glass-card"
              custom={i}
              onClick={() => window.open(card.url, '_blank')}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={cardVariants}
            >
              <div className={`eco-card-icon ${card.iconClass}`}>
                {card.icon}
              </div>
              <h3 className="eco-card-title">{t(`ecosystem.${card.key}.name`)}</h3>
              <p className="eco-card-desc">{t(`ecosystem.${card.key}.description`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

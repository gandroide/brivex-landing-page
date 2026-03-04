import { motion } from 'framer-motion';
import { useTranslation } from '../i18n/LanguageContext';

export default function Footer() {
  const { t, locale, setLocale, SUPPORTED_LOCALES } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Future: integrate with Supabase or API
    alert('Message sent! (placeholder)');
  };

  return (
    <footer className="footer" id="contact">
      <div className="container">
        <motion.div
          className="footer-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Contact form */}
          <div className="footer-form">
            <h3>{t('footer.form_title')}</h3>
            <p>{t('footer.form_subtitle')}</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder={t('footer.name_placeholder')}
                required
                aria-label={t('footer.name_placeholder')}
                id="contact-name"
              />
              <input
                type="email"
                placeholder={t('footer.email_placeholder')}
                required
                aria-label={t('footer.email_placeholder')}
                id="contact-email"
              />
              <textarea
                placeholder={t('footer.message_placeholder')}
                required
                aria-label={t('footer.message_placeholder')}
                id="contact-message"
              />
              <button type="submit" className="btn btn-primary" id="contact-submit">
                {t('footer.send_button')}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </form>
          </div>

          {/* Ecosystem links */}
          <div className="footer-links">
            <h4>{t('footer.links_title')}</h4>
            <ul>
              <li><a href="https://bioalert.brivex.ai" target="_blank" rel="noopener noreferrer">Bio-Alert</a></li>
              {/* <li><a href="https://axisops.brivex.ai" target="_blank" rel="noopener noreferrer">AXIS.ops</a></li> */}
              {/* <li><a href="https://aleris.brivex.ai" target="_blank" rel="noopener noreferrer">Aleris</a></li> */}
              <li><a href="https://saas.brivex.ai" target="_blank" rel="noopener noreferrer">Brivex SaaS</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="footer-links">
            <h4>{t('footer.connect_title')}</h4>
            <ul>
              <li>
                <a href="https://linkedin.com/company/brivex" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:hello@brivex.ai">hello@brivex.ai</a>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Brivex. {t('footer.rights')}</p>

          <div className="lang-switcher">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4, marginRight: '0.15rem' }}>
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            {SUPPORTED_LOCALES.map((loc) => (
              <button
                key={loc}
                className={`lang-btn ${locale === loc ? 'active' : ''}`}
                onClick={() => setLocale(loc)}
                aria-label={`Switch language to ${loc.toUpperCase()}`}
              >
                {loc.toUpperCase()}
              </button>
            ))}
          </div>

          <p>{t('footer.built_with')}</p>
        </div>
      </div>
    </footer>
  );
}

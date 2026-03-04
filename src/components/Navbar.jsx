import { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/LanguageContext';

export default function Navbar() {
  const { t, locale, setLocale, SUPPORTED_LOCALES } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { label: t('nav.ecosystem'), href: '#ecosystem' },
    { label: t('nav.technology'), href: '#technology' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  const handleNavClick = () => setMobileOpen(false);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="navbar-inner">
          <a href="#" className="navbar-logo" aria-label="Brivex Home" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src="/logo.svg" alt="Brivex Logo" width="32" height="32" />
            BRIVEX
          </a>

          <ul className="navbar-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
            <li>
              <div className="lang-switcher" role="group" aria-label="Language selector">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4, marginRight: '0.15rem' }}>
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                {SUPPORTED_LOCALES.map((loc) => (
                  <button
                    key={loc}
                    className={`lang-btn ${locale === loc ? 'active' : ''}`}
                    onClick={() => setLocale(loc)}
                    aria-label={`Switch to ${loc.toUpperCase()}`}
                    aria-pressed={locale === loc}
                  >
                    {loc.toUpperCase()}
                  </button>
                ))}
              </div>
            </li>
          </ul>

          <button
            className={`hamburger ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile slide-in menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`} aria-hidden={!mobileOpen}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={handleNavClick}>
            {link.label}
          </a>
        ))}
        <div className="lang-switcher" style={{ marginTop: '1rem' }}>
          {SUPPORTED_LOCALES.map((loc) => (
            <button
              key={loc}
              className={`lang-btn ${locale === loc ? 'active' : ''}`}
              onClick={() => setLocale(loc)}
            >
              {loc.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

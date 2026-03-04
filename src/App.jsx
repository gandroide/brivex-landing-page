import { LanguageProvider } from './i18n/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EcosystemSection from './components/EcosystemSection';
import TechDnaSection from './components/TechDnaSection';
import Footer from './components/Footer';
import WelcomeModal from './components/WelcomeModal';

export default function App() {
  return (
    <LanguageProvider>
      <WelcomeModal />
      <Navbar />
      <main>
        <Hero />
        <EcosystemSection />
        <TechDnaSection />
      </main>
      <Footer />
    </LanguageProvider>
  );
}

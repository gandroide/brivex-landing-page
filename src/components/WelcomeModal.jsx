import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Solo mostrar el modal si no lo hemos visto en esta sesión
    const hasSeen = sessionStorage.getItem('hasSeenWelcomeModal');
    
    if (!hasSeen) {
      // Un pequeño retraso para que la animación de entrada de la página fluya primero
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 600);
      
      sessionStorage.setItem('hasSeenWelcomeModal', 'true');
      
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="modal-container glass-card"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 200, delay: 0.1 }}
          >
            <div className="modal-header">
              <span className="section-badge">Novedad</span>
              <h2 className="modal-title section-title">¡Bienvenido a Brivex!</h2>
              <p className="section-subtitle">Potencia tus operaciones con nuestra plataforma unificada y maximiza tus ventajas comerciales.</p>
            </div>
            
            <div className="modal-body">
              <div className="advantage-list">
                <div className="advantage-item">
                  <div className="advantage-icon">🚀</div>
                  <div className="advantage-text">
                    <strong>Integración Total</strong>
                    <p>Conecta a la perfección módulos como Bio-Alert, AxisOps y Aleris en un único ecosistema centralizado e inteligente.</p>
                  </div>
                </div>
                <div className="advantage-item">
                  <div className="advantage-icon">⚡</div>
                  <div className="advantage-text">
                    <strong>Toma de Decisiones en Tiempo Real</strong>
                    <p>Visualiza datos críticos al instante para ejecutar operaciones con agilidad, precisión y sincronización inteligente.</p>
                  </div>
                </div>
                <div className="advantage-item">
                  <div className="advantage-icon">🛡️</div>
                  <div className="advantage-text">
                    <strong>Seguridad de Grado Empresarial</strong>
                    <p>Protege tu información crítica 24/7 con una infraestructura ultra-robusta y tecnologías de cifrado de vanguardia.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setIsOpen(false)} className="btn btn-primary w-full">
                Entendido, comenzar a explorar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

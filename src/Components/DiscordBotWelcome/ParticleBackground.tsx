import React, { useEffect } from 'react';
import styles from './DiscordBotWelcome.module.css';

const ParticleBackground: React.FC = () => {
  useEffect(() => {
    if (window.particlesJS) {
      window.particlesJS.load('particles-js', './particles.json', function() {
        console.log('Particles.js loaded!');
      });
    }
  }, []);

  return (
    <div id="particles-js" className={styles.particleBackground}></div>
  );
};

export default ParticleBackground;
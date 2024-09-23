import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import CountUp from 'react-countup';
import CommandList from './CommandList';
import Statistics from './Statistics';
import About from './About';
import Game from './Game';
import Team from './Team';
import styles from './DiscordBotWelcome.module.css';

const DiscordBotWelcome: React.FC = () => {
  const [beers, setBeers] = useState<{ id: number; x: number }[]>([]);
  const controls = useAnimation();

  useEffect(() => {
    controls.start(i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 }
    }));

    if (window.particlesJS) {
      window.particlesJS.load('particles-js', './particles.json', function() {
        console.log('Particles.js loaded!');
      });
    }

    const beerInterval = setInterval(() => {
      setBeers(prev => [...prev, { id: Date.now(), x: Math.random() * window.innerWidth }]);
    }, 2000);

    return () => clearInterval(beerInterval);
  }, [controls]);

  return (


    <div className={styles.container}>
      <div id="particles-js" className={styles.particleBackground}></div>

      <div className={styles.content}>
      <div className={styles.header}>
  <motion.h1
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={styles.headerTitle}
  >
    Хачик Барсегян
  </motion.h1>
  <motion.p
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.3 }}
    className={styles.headerDescription}
  >
    Ваш идеальный помощник в Discord! Управляйте вашим сервером с легкостью и удобством, получая поддержку в любое время.
  </motion.p>
</div>
<About/>
        <CommandList />
        {/* <Game/> */}
        <Statistics />
        <Team/>

        <motion.a
          href="#"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: 'spring', stiffness: 500, damping: 10 }}
          className={styles.addButton}
        >
          Добавить в Discord
        </motion.a>
      </div>

      {beers.map(beer => (
        <motion.div
          key={beer.id}
          initial={{ opacity: 0, y: -50, x: beer.x }}
          animate={{ opacity: [0, 1, 0], y: window.innerHeight + 50 }}
          transition={{ duration: 5 }}
          onAnimationComplete={() => setBeers(prev => prev.filter(b => b.id !== beer.id))}
          className={styles.beerIcon}
        >
          🍺
        </motion.div>
      ))}
    </div>
  );
};

export default DiscordBotWelcome;
import React, { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';
import styles from './DiscordBotWelcome.module.css';

const Statistics: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const { top } = ref.current.getBoundingClientRect();
        if (top < window.innerHeight && top > 0) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Проверяем сразу при загрузке

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={ref} className={styles.statisticsContainer}>
      <div className={styles.statistic}>
        
        <span className={styles.statLabel}>Сервера</span>

        <h2 className={styles.statTitle}>
          {isVisible && <CountUp start={0} end={500} duration={3} />}
        </h2>
      </div>

      <div className={styles.statistic}>
        
        <span className={styles.statLabel}>Пользователи</span>

        <h2 className={styles.statTitle}>
          {isVisible && <CountUp start={0} end={1500} duration={4} />}
        </h2>
      </div>

      <div className={styles.statistic}>
       
        <span className={styles.statLabel}>Команды</span>

        <h2 className={styles.statTitle}>
          {isVisible && <CountUp start={0} end={200} duration={5} />}
        </h2>
        
      </div>
    </div>
  );
};

export default Statistics;

import React from 'react';
import styles from './DiscordBotWelcome.module.css';

const About: React.FC = () => {
  const features = [
    { title: 'Интуитивный интерфейс', description: 'Легкий и понятный интерфейс для управления ботом.' },
    { title: 'Команды на русском', description: 'Все команды доступны на вашем родном языке.' },
    { title: 'Поддержка нескольких серверов', description: 'Управляйте несколькими серверами с одного места.' },
    { title: 'Настраиваемые функции', description: 'Кастомизируйте команды и настройки под ваши нужды.' },
    { title: 'Активная поддержка', description: 'Команда поддержки всегда на связи для помощи.' },
  ];

  return (
    <div className={styles.aboutContainer}>
      <h2 className={styles.aboutTitle}>О нашем боте</h2>
      <div className={styles.featuresContainer}>
        {features.map((feature, index) => (
          <div className={styles.featureCard} key={index}>
            <h3 className={styles.featureTitle}>{feature.title}</h3>
            <p className={styles.featureDescription}>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
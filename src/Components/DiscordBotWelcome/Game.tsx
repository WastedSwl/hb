import React from 'react';
import styles from './DiscordBotWelcome.module.css';
import gameImage from '../Assets/4QRowXK2RBOXQbVZtFsJjA-removebg-preview.png'; // Укажите путь к изображению

const Game: React.FC = () => {
  return (
    <div className={styles.gameContainer}>
      <div className={styles.gameText}>
        <h2 className={styles.gameTitle}>Игра: Clash of Guilds</h2>
        <p className={styles.gameDescription}>
          Мы создаем браузерную игру в стиле Clash of Clans, в которой каждый сервер сможет создать свою гильдию. 
          Пользователи будут прокачивать свои гильдии, сражаться с другими игроками и грабить чужие поселения. 
          Развивайте свои стратегии, объединяйтесь с друзьями и станьте лидером в мире гильдий!
        </p>
      </div>
      <div className={styles.gameImageContainer}>
        <img src={gameImage} alt="Game Preview" className={styles.gameImage} />
      </div>
    </div>
  );
};

export default Game;

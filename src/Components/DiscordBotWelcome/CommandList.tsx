import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './DiscordBotWelcome.module.css';

const commands = [
  { title: 'Префикс', description: 'a!', shortDescription: 'Command prefix for bot' },
  { title: 'ИИ', description: 'Ответ ChatGPT при упоминании.', shortDescription: 'AI assistant responses' },
  { 
    title: 'Развлечения', 
    description: `kiss - Отправить поцелуй кому-то, 
      shitpost - Поделитесь случайной шуткой или мемом, 
      fuck - Использовать грубое слово, 
      kill - Устранить кого-то (виртуально), 
      hug - Отправить виртуальные объятия, 
      slap - Дать кому-то игривую пощечину, 
      curse - Наклонить случайное проклятие, 
      question - Задать случайный вопрос, 
      leaderboard - Показать топ-рейтинги`, 
    shortDescription: 'Fun commands' 
  },
  { 
    title: 'Инструменты', 
    description: `vidtogif - Преобразовать видео в GIF, 
      demotivator - Создать демотивирующий постер, 
      avatar - Сгенерировать новый аватар`, 
    shortDescription: 'Useful tools' 
  },
  { 
    title: 'Экономика', 
    description: `balance - Проверить свой баланс`, 
    shortDescription: 'Economy system' 
  },
  { 
    title: 'Слэш-команды', 
    description: `help - Получить помощь по командам бота, 
      imagine - Генерировать изображения на основе текстовых подсказок, 
      blacklist - Управление черным списком пользователей, 
      anon - Отправить анонимное сообщение`, 
    shortDescription: 'Slash commands' 
  },
  { 
    title: 'Контекстные команды', 
    description: `Add gif - Добавить GIF к вашему сообщению`, 
    shortDescription: 'Context menu commands' 
  },
];

const CommandList: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div>
      {commands.map((command, index) => (
        <div key={index}>
          <motion.div
            onClick={() => toggleExpand(index)}
            className={styles.commandItem}
          >
            <h2 className={styles.commandTitle}>{command.title}</h2>
            <p className={styles.commandDescription}>{command.shortDescription}</p>
          </motion.div>

          {expandedIndex === index && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className={styles.commandDetails}
            >
              {command.description.split(', ').map((cmd, i) => {
                const [cmdName, cmdDesc] = cmd.split(' - ');
                return (
                  <div key={i} className={styles.commandDetail}>
                    <span className={styles.commandName}>{cmdName}</span> - <span className={styles.commandDesc}>{cmdDesc}</span>
                  </div>
                );
              })}
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommandList;

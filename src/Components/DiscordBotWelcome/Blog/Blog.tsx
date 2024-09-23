import React, { useEffect, useState } from 'react';
import styles from './Blog.module.css';

interface Update {
  date: string;
  description: string;
}

interface Task {
  id: string;
  name: string;
}

const Blog: React.FC = () => {
  const [updates, setUpdates] = useState<Update[]>([
    { date: '2024-09-01', description: 'Добавлена поддержка новых команд.' },
    { date: '2024-09-15', description: 'Исправлены ошибки в интерфейсе.' },
    { date: '2024-09-20', description: 'Оптимизация работы бота.' },
  ]);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [faq, setFaq] = useState<{ question: string; answer: string; open: boolean }[]>([
    { question: 'Как установить бота?', answer: 'Вы можете установить бота, следуя инструкциям в разделе "Установка" на нашем сайте.', open: false },
    { question: 'Как добавить команду?', answer: 'Используйте команду `/add` в вашем сервере для добавления новых команд.', open: false },
    { question: 'Где найти документацию?', answer: 'Документация доступна по ссылке в нижнем меню.', open: false },
  ]);

  const toggleFAQ = (index: number) => {
    setFaq(prevFaq =>
      prevFaq.map((item, i) =>
        i === index ? { ...item, open: !item.open } : item
      )
    );
  };

  useEffect(() => {
    if (window.particlesJS) {
      window.particlesJS.load('particles-js', './particles.json', function () {
        console.log('Particles.js loaded!');
      });
    }
  }, []);

  return (
    <div className={styles.blogContainer}>
      <div id="particles-js" className={styles.particleBackground}></div>
      <h2 className={styles.blogTitle}>Блог</h2>

      <div className={styles.updatesContainer}>
        <h3 className={styles.updatesTitle}>Последние обновления</h3>
        <ul className={styles.updatesList}>
          {updates.map((update, index) => (
            <li key={index} className={styles.updateItem}>
              <strong>{update.date}:</strong> {update.description}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.faqContainer}>
        <h3 className={styles.faqTitle}>Часто задаваемые вопросы (FAQ)</h3>
        <ul className={styles.faqList}>
          {faq.map((item, index) => (
            <li key={index} className={styles.faqItem}>
              <div
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && toggleFAQ(index)}
              >
                <strong>{item.question}</strong>
                <span className={item.open ? styles.iconOpen : styles.iconClosed}>
                  {item.open ? '-' : '+'}
                </span>
              </div>
              {item.open && <p className={styles.faqAnswer}>{item.answer}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;

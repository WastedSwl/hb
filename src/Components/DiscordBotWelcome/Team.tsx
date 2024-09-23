import React, { useEffect, useState } from 'react';
import styles from './DiscordBotWelcome.module.css';

interface TeamMember {
  name: string;
  username: string;
}

const teamMembers: TeamMember[] = [
  { name: 'Igor Shatskiy', username: 'merzfst' },
  { name: 'swl', username: 'WastedSwl' },
];

interface GitHubStats {
  avatarUrl: string;
  bio: string;
  languages: string[];
}

const Team: React.FC = () => {
  const [stats, setStats] = useState<GitHubStats[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const promises = teamMembers.map(async (member) => {
        const userResponse = await fetch(`https://api.github.com/users/${member.username}`);
        const userData = await userResponse.json();

        const reposResponse = await fetch(`https://api.github.com/users/${member.username}/repos`);
        const reposData = await reposResponse.json();

        const languageMap: { [key: string]: number } = {};
        reposData.forEach((repo: any) => {
          if (repo.language) {
            languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
          }
        });

        const languages = Object.keys(languageMap).sort((a, b) => languageMap[b] - languageMap[a]);

        return {
          avatarUrl: userData.avatar_url,
          bio: userData.bio || "Backend developer",
          languages,
        };
      });

      const results = await Promise.all(promises);
      setStats(results);
    };

    fetchStats();
  }, []);

  return (
    <div className={styles.teamContainer}>
      <h2 className={styles.teamTitle}>Team</h2>
      <div className={styles.teamCards}>
        {teamMembers.map((member, index) => (
          <div className={styles.teamCard} key={index}>
            <img src={stats[index]?.avatarUrl} alt={member.name} className={styles.teamImage} />
            <div className={styles.teamInfo}>
              <h3 className={styles.teamName}>{member.name}</h3>
              <p className={styles.teamBio}>{stats[index]?.bio}</p>
              <h4>Stack:</h4>
              <div className={styles.languageContainer}>
                {stats[index]?.languages && stats[index].languages.length > 0 ? (
                  stats[index].languages.map((language, langIndex) => (
                    <span key={langIndex} className={styles.languageBadge}>{language}</span>
                  ))
                ) : (
                  <p>Нет языков</p>
                )}
              </div>
            
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
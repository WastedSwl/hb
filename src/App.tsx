import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DiscordBotWelcome from './Components/DiscordBotWelcome/DiscordBotWelcome';
import Blog from './Components/DiscordBotWelcome/Blog/Blog';
import Navbar from './Components/DiscordBotWelcome/NavBar';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<DiscordBotWelcome />} />
        <Route path="blog" element={<Blog />} />
      </Routes>
    </Router>
  );
};

export default App;

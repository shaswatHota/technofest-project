import React, { useState } from 'react';
import '../styles/Home.css';
import Post from '../components/Posts';
import Navbar from '../components/Navbar';

const dummyPosts = [
  {
    name: 'Ravi Kumar',
    batch: '2015',
    content: 'Excited to mentor new students this year!',
    time: '2 hours ago',
  },
  {
    name: 'Aisha Patel',
    batch: '2020',
    content: 'Landed a role at Amazon! Thanks to the alumni network ❤️',
    time: '1 day ago',
  },
];

const techTrendingUpdates = [
  'AI advancements are transforming the tech industry in 2025.',
  'Quantum computing: The next frontier for computing power.',
  '5G networks are revolutionizing mobile communication.',
  'The rise of blockchain technology in decentralized finance.',
  'VR and AR: Shaping the future of immersive experiences.',
];

function Home() {
  return (
    <>
      <Navbar />

      <div className="home-container">
        {/* Alumni Connect - Centered */}
        <div className="center-column">
          <div className="home-header">
            <h2>Alumni Connect</h2>
            <button className="chat-button">💬 Chat</button>
          </div>

          <div className="post-input">
            <textarea placeholder="What's happening?" rows="3"></textarea>
            <button className="post-btn">Post</button>
          </div>

          <div className="feed">
            {dummyPosts.map((post, idx) => (
              <Post key={idx} {...post} />
            ))}
          </div>
        </div>

        {/* Tech Trending Section */}
        <div className="right-column">
          <h3>Tech Trending</h3>
          <ul>
            {techTrendingUpdates.map((update, idx) => (
              <li key={idx}>
                <span className="trend-bullet">🔹</span>
                {update}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Home;

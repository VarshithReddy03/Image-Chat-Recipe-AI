import React, { useState } from 'react';
import './App.css';
import ImageGenerator from './Components/ImageGenerator';
import ChatComponent from './Components/ChatComponent';
import RecipeGenerator from './Components/RecipeGenerator';

function App() {
  const [activeTab, setActiveTab] = useState('image-generator');

  return (
    <div className="App">
      <div className="tabs">
        <button className={activeTab === 'image-generator' ? 'active' : ''}
          onClick={() => setActiveTab('image-generator')}>Image</button>

        <button className={activeTab === 'chat' ? 'active' : ''}
          onClick={() => setActiveTab('chat')}>Chat</button>

        <button className={activeTab === 'recipe-generator' ? 'active' : ''}
          onClick={() => setActiveTab('recipe-generator')}>Recipe</button>
      </div>

      <div className="tab-content">
        {activeTab === 'image-generator' && <ImageGenerator />}
        {activeTab === 'chat' && <ChatComponent />}
        {activeTab === 'recipe-generator' && <RecipeGenerator />}
      </div>
    </div>
  );
}

export default App;
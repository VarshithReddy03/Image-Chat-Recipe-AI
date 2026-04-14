import React, { useState } from "react";

function ChatComponent() {
  const [prompt, setPrompt] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const askAi = async () => {
    try {
      if (!prompt.trim()) return;

      setLoading(true);
      const response = await fetch(`http://localhost:8080/ask-ai?prompt=${encodeURIComponent(prompt)}`);
      const data = await response.text();
      setChatResponse(data);

    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Chat with AI</h2>

      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask something..."
      />

      <button className="generate-btn" onClick={askAi}>
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      <div className="output">
        {chatResponse && <p>{chatResponse}</p>}
      </div>
    </div>
  );
}

export default ChatComponent;
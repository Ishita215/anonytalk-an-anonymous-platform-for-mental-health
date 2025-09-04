import { createRoot } from "https://esm.sh/react-dom@18.2.0/client";
import React, { useEffect, useRef, useState } from "https://esm.sh/react@18.2.0";

function App() {
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState([
    { id: 1, text: "Life is a journey of self-discovery 🌈", emotion: "contemplative" },
    { id: 2, text: "Sometimes silence speaks louder than words 🤫", emotion: "introspective" },
  ]);
  const [emotion, setEmotion] = useState(null);
  const chatBoxRef = useRef(null);

  const detectEmotion = async (text) => {
    try {
      const { OpenAI } = await import("https://esm.town/v/std/openai");
      const openai = new OpenAI();
      const response = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are an emotion detection AI. Analyze the emotional tone of the following text and respond with a single word emotion and a brief explanation.",
          },
          {
            role: "user",
            content: text,
          },
        ],
        model: "gpt-4o-mini",
        max_tokens: 30,
      });

      const emotionResult = response.choices[0].message.content?.trim() || "neutral";
      setEmotion(emotionResult);
    } catch (error) {
      console.error("Emotion detection failed", error);
      setEmotion("neutral");
    }
  };

  const handlePostAnonymously = () => {
    if (message.trim()) {
      detectEmotion(message);
      const newPost = {
        id: posts.length + 1,
        text: message,
        emotion: emotion || "neutral",
      };
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      setMessage("");

      // Scroll to top of chat box
      if (chatBoxRef.current) {
        chatBoxRef.current.scrollTop = 0;
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handlePostAnonymously();
    }
  };

  return (
    <div className="anony-talk-container">
      <nav className="glass-header">
        <div className="logo">AnonyTalk</div>
        <div className="nav-buttons">
          <button className="login-btn">Login</button>
          <button className="anonymous-btn">Continue Anonymously</button>
        </div>
      </nav>

      <main className="main-content">
        <div className="chat-box" ref={chatBoxRef}>
          <div className="messages">
            {posts.map((post) => (
              <div key={post.id} className="glass-container message-card">
                <p>{post.text}</p>
                <span className="emotion-tag">{post.emotion}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="message-input">
          <textarea
            id="message"
            placeholder="Share your thoughts anonymously..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button id="send" className="send-btn" onClick={handlePostAnonymously}>
            Send
          </button>
        </div>
      </main>
    </div>
  );
}

function client() {
  createRoot(document.getElementById("root")).render(<App />);
}
if (typeof document !== "undefined") {
  client();
}
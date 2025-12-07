import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { GoogleGenerativeAI } from '@google/generative-ai';
import styles from './styles.module.css';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! Ask me anything about Physical AI & Humanoid Robotics! 🤖' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // 🔑 REPLACE WITH YOUR GEMINI API KEY
  const API_KEY = 'YOUR_GEMINI_API_KEY_HERE';
  const genAI = new GoogleGenerativeAI(API_KEY);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-pro",
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        }
      });

      const prompt = `You are an expert AI assistant for a book about Physical AI & Humanoid Robotics. 
The book covers: Foundations, Mechanical Design, Sensing & Perception, Locomotion & Control, and Learning & Future.
Answer questions concisely and technically. Keep responses under 150 words unless more detail is requested.

Question: ${userMessage}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const assistantMessage = response.text();
      
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '❌ Error: Please check your API key or try again.' 
      }]);
    }
    
    setIsLoading(false);
  };

  return (
    <>
      <button 
        className={styles.floatingButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="AI Assistant"
      >
        {isOpen ? <FaTimes size={24} /> : <FaRobot size={24} />}
      </button>

      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <FaRobot size={20} />
            <span>AI Assistant</span>
          </div>

          <div className={styles.chatMessages}>
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`${styles.message} ${styles[msg.role]}`}
              >
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.message} ${styles.assistant}`}>
                Thinking... 💭
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.chatInput}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about robotics..."
              disabled={isLoading}
            />
            <button 
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
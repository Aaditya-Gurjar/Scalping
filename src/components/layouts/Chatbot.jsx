import React, { useState, useRef, useEffect } from 'react';

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { text: 'Welcome! How can I help you?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const [animateOpen, setAnimateOpen] = useState(false);
  const [preAnimate, setPreAnimate] = useState(true);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Inject animation CSS if not present
    if (!document.getElementById('chatbot-animate-css')) {
      const style = document.createElement('style');
      style.id = 'chatbot-animate-css';
      style.innerHTML = `
        @keyframes chatbot-fade-slide-in {
          0% { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .chatbot-animate-open {
          animation: chatbot-fade-slide-in 0.25s cubic-bezier(0.4,0,0.2,1);
          will-change: opacity, transform;
        }
        .chatbot-pre-animate {
          opacity: 0;
          transform: translateY(16px);
        }
      `;
      document.head.appendChild(style);
    }
    // Next tick, remove pre-animate to trigger animation
    setTimeout(() => {
      setPreAnimate(false);
      setAnimateOpen(true);
    }, 10);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    // Simulate API call (replace with your API call)
    setTimeout(() => {
      setMessages(prev => [...prev, { text: 'This is a sample API response.', sender: 'bot' }]);
    }, 800);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className={`chatbot-container position-fixed bottom-1 end-1 m-3 shadow rounded bg-white border chatbot-animate-open${preAnimate ? ' chatbot-pre-animate' : ''}`}
      style={{ width: 350, zIndex: 1050 }}>
      {/* Header with Gradient Blue */}
      <div className="chatbot-header d-flex justify-content-between align-items-center p-2 border-bottom text-white rounded-top"
        style={{
          background: 'linear-gradient(90deg, #007bff 0%, #00c6ff 100%)',
          color: '#fff'
        }}
      >
        <span className="fw-bold">Chatbot</span>
        <button className="btn btn-sm btn-light" onClick={onClose}>&times;</button>
      </div>
      {/* Message Area */}
      <div className="chatbot-messages p-3 card-bg-color" style={{ maxHeight: 350, overflowY: 'auto', background: '#f8f9fa' }}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`d-flex mb-2 ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
            <div
              className={`p-2 rounded-3${msg.sender === 'user' ? '' : ''}`}
              style={{
                maxWidth: '75%',
                background: msg.sender === 'user'
                  ? 'linear-gradient(90deg, #007bff 0%, #00c6ff 100%)'
                  : '#f1f1f1', // Fixed color for bot
                color: msg.sender === 'user' ? '#fff' : '#222', // Fixed color for bot
                border: msg.sender === 'user' ? undefined : '1px solid #e0e0e0'
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      {/* Input Area */}
      <div className="chatbot-input d-flex border-top p-2 bg-white">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="btn btn-primary" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;

import React from 'react';


const Chatbot = ({ onClose }) => {
  return (
    <div className="chatbot-container">
      {/* Header with Close Icon */}
      <div className="chatbot-header">
        <span>Chatbot</span>
        <button className="close-button" onClick={onClose}>×</button>
      </div>

      {/* Message Area */}
      <div className="chatbot-messages">
        <div className="chatbot-message">
          Welcome! How can I help you?
        </div>
      </div>

      {/* Input Area */}
      <div className="chatbot-input">
        <input type="text" placeholder="Type a message..." disabled />
        <button disabled>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;

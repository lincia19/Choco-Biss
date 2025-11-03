// components/Chatbot.jsx
import React, { useState } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your Choco Biss assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot response (replace with Gemini API later)
    setTimeout(() => {
      const botResponses = [
        "Our chocolates are made fresh daily with premium ingredients!",
        "We offer free delivery in Thane district for orders above ₹500.",
        "You can track your order in the 'Orders' section of your profile.",
        "We have a 24-hour return policy for all our products.",
        "Our bestsellers include Chocolate Bars, Brownies, and Chocolate Cake!"
      ];
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages(prev => [...prev, { text: randomResponse, isBot: true }]);
    }, 1000);
  };

  return (
    <>
      {/* Chatbot Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-rose-500 text-white w-14 h-14 rounded-full shadow-lg hover:bg-rose-600 transition-all z-50 flex items-center justify-center"
      >
        💬
      </button>

      {/* Chatbot Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white rounded-lg shadow-xl z-50 flex flex-col border">
          {/* Header */}
          <div className="bg-rose-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Choco Biss Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-white">✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-3 ${msg.isBot ? 'text-left' : 'text-right'}`}>
                <div className={`inline-block p-3 rounded-lg max-w-xs ${
                  msg.isBot ? 'bg-gray-100 text-gray-800' : 'bg-rose-500 text-white'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about our chocolates..."
                className="flex-1 border rounded-lg px-3 py-2 text-sm"
              />
              <button
                onClick={handleSend}
                className="bg-rose-500 text-white px-4 rounded-lg hover:bg-rose-600"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
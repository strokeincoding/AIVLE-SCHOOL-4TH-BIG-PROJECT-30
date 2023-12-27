import React, { useState } from 'react';
import './Chatbot.css';
import chatbotIcon from './chatbot-icon.png';

function ChatbotPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const sendMessage = () => {
        if (userInput.trim() === '') return;
        const newMessages = [...messages, { text: userInput, sender: 'user' }];
        setMessages(newMessages);
        // TODO: 서버에 메시지 전송 및 응답 처리
        setUserInput('');
    };

    const clearMessages = () => {
        setMessages([]);
    };

    return (
        <div className="chatbot-container">
            <button onClick={togglePopup} className="chatbot-button">
                <img src={chatbotIcon} alt="Chat with us" />
            </button>
            {isOpen && (
                <div className="popup">
                    <div className="chat-box">
                        {messages.map((message, index) => (
                            <div key={index} className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}>
                                {message.text}
                            </div>
                        ))}
                    </div>
                    <div className="input-and-buttons">
                        <input
                            className="chatbot-input"
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="메시지를 입력하세요..."
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <button onClick={sendMessage} className="send-button">보내기</button>
                        {messages.length > 0 && (
                            <button onClick={clearMessages} className="clear-messages-button">대화 정리</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatbotPopup;

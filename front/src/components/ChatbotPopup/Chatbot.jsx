import React, { useState } from 'react';
import './Chatbot.css';
import chatbotIcon from './chatbot-icon.png';

function ChatbotPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [threadId, setThreadId] = useState(null); 
    const [isLoading, setIsLoading] = useState(false); 

    const togglePopup = () => {
        setIsOpen(!isOpen);
        if (isOpen) {
            setThreadId(null);
            setMessages([]);
        }
    };

    const sendMessage = async () => {
        if (userInput.trim() === '') return;
        setIsLoading(true);  
        const newMessages = [...messages, { text: userInput, sender: 'user' }];
        setMessages(newMessages);

        try {
            const response = await fetch('http://localhost:8000/chatbot/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userInput, thread_id: threadId })
            });

            if (!response.ok) {
                throw new Error('서버 응답 오류');
            }

            const data = await response.json();
            setMessages(prevMessages => [...prevMessages, { text: data.reply, sender: 'bot' }]);

            if (!threadId) {
                setThreadId(data.thread_id); 
            }
        } catch (error) {
            console.error('챗봇 통신 오류:', error);
        }
        setIsLoading(false);  
        setUserInput('');
    };

    const clearMessages = () =>{
        setThreadId(null);
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
                        {isLoading && (  
                            <div className="loader-container">
                                <div className="loader"></div>
                            </div>
                        )}
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

import React, { useState, useEffect } from "react";

const Chat = () => {
  const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8000/ws');
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
  if (socket) {
    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      console.log('Received message:', event.data);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };
  }
}, [socket]);

const sendMessage = (event) => {
    event.preventDefault();
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(message);
  }
};

  return (
    <div>
      <h1>WebSocket Chat</h1>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="text-black"
        />
        <button type="submit">Send</button>
      </form>
        <p>{message}</p>
    </div>
  );
};

export default Chat;

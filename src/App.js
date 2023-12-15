// App.js
import React, { useEffect, useState } from "react";
import {
  connectWebSocket,
  disconnectWebSocket,
  subscribeWebSocket,
  sendMessageWebSocket,
} from "./useWebSocket";
import { Button, Input } from "antd";
import "./App.css";

const App = () => {
  const [history, setHistory] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    // Connect to WebSocket and wait for the connection to be established
    connectWebSocket()
      .then(() => {
        // Subscribe to a specific destination (update with backend destination)
        subscribeWebSocket("/topic/hello", (message) => {
          console.log(message);
          setHistory((prevHistory) => [...prevHistory, message]);
        });
      })
      .catch((error) => {
        console.error("Failed to connect to WebSocket:", error);
      });

    // return () => {
    //   // Disconnect when the component is unmounted
    //   disconnectWebSocket();
    // };
  }, []);

  const sendMessage = () => {
    // Send a message to a specific destination (update with backend destination)
    sendMessageWebSocket("/app/hello", inputMessage);
    setInputMessage("");
  };

  return (
    <div className="App">
      <h1>WebSocket with React</h1>
      <div>
        <Input
          id="send-text"
          style={{
            borderRadius: "1px",
            border: "1px solid green",
            width: "250px",
            marginRight: "10px",
          }}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <Button
          style={{ borderRadius: "1px", background: "green", color: "white" }}
          onClick={sendMessage}
        >
          Send Message
        </Button>
      </div>
      {history.map((message, index) => (
        <p key={index}>
          {message.sender ? `${message.sender} :` : ""} {message.message}
        </p>
      ))}
    </div>
  );
};

export default App;

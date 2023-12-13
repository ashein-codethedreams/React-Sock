import React, { useEffect, useState } from "react";
import WebSocketService from "./WebSocketService";

const App = () => {
  const [greeting, setGreeting] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const authToken =
    "eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIzIiwicm9sZXMiOiJST0xFX1VTRVIiLCJzdWIiOiJHYXkgQXVuZyIsImV4cCI6MTcwMjU0NjI1Nn0.gbt7nIvNIO7I9Ryb-5fly4476VqTtQNtSWkh7zYzijXIqPnWaGRLTKfgwvqvNMaLKI75VBZ24u55CmjzLa4Kfg";
  const webSocketService = WebSocketService(authToken);

  useEffect(() => {
    // Connect to WebSocket and wait for the connection to be established
    webSocketService
      .connect()
      .then(() => {
        // Subscribe to a specific destination (update with your backend destination)
        webSocketService.subscribe("/topic/hello", (message) => {
          setGreeting(message.text);
        });
      })
      .catch((error) => {
        console.error("Failed to connect to WebSocket:", error);
      });

    // return () => {
    //   // Disconnect when the component is unmounted
    //   webSocketService.disconnect();
    // };
  }, [webSocketService]);

  const sendMessage = () => {
    // Send a message to a specific destination (update with your backend destination)

    webSocketService.sendMessage("/app/hello", inputMessage);
  };

  return (
    <div className="App">
      <h1>WebSocket with React</h1>
      <p>{greeting}</p>
      <input
        type="text"
        id="send-text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default App;

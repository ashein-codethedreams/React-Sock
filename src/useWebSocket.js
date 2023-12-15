import SockJS from "sockjs-client";
import Stomp from "stompjs";

const authToken =
  "eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIzIiwicm9sZXMiOiJST0xFX1VTRVIiLCJzdWIiOiJHYXkgQXVuZyIsImV4cCI6MTcwMjY5NTUwMn0.6fk-P3T5Za0NF8KZ01eurfX6d96YMXK_aR52UtVhfzuWC9rfdZGrDNNfv8UXbUB5IRk-gc7NO_MWyRREodLd9g";
const socket = new SockJS("http://192.168.0.121:8080/socket");
const stompClient = Stomp.over(socket);

const connectWebSocket = () => {
  return new Promise((resolve, reject) => {
    stompClient.connect(
      { Authorization: `Bearer ${authToken}` },
      (frame) => {
        console.log("Connected: " + frame);
        resolve(frame);
      },
      (error) => {
        console.error("Error connecting to WebSocket:", error);
        reject(error);
      }
    );
  });
};

const disconnectWebSocket = () => {
  stompClient.disconnect();
  console.log("Disconnected from WebSocket");
};

const subscribeWebSocket = (destination, callback) => {
  stompClient.subscribe(destination, (message) => {
    const payload = JSON.parse(message.body);
    callback(payload);
  });
};

const sendMessageWebSocket = (destination, message) => {
  const headers = {
    Authorization: `Bearer ${authToken}`,
  };
  stompClient.send(destination, headers, message);
};

export {
  connectWebSocket,
  disconnectWebSocket,
  subscribeWebSocket,
  sendMessageWebSocket,
};

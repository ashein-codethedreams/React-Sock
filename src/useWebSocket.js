import SockJS from "sockjs-client";
import Stomp from "stompjs";

const authToken =
  "eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIzIiwicm9sZXMiOiJST0xFX1VTRVIiLCJzdWIiOiJHYXkgQXVuZyIsImV4cCI6MTcwMjU0NjI1Nn0.gbt7nIvNIO7I9Ryb-5fly4476VqTtQNtSWkh7zYzijXIqPnWaGRLTKfgwvqvNMaLKI75VBZ24u55CmjzLa4Kfg";

const socket = new SockJS("http://192.168.0.121:8181/socket");
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

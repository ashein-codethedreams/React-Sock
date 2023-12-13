import SockJS from "sockjs-client";
import Stomp from "stompjs";

const WebSocketService = (authToken) => {
  const socket = new SockJS("http://192.168.0.121:8080/socket"); // Update with your backend URL
  const stompClient = Stomp.over(socket);

  const connect = () => {
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

  const disconnect = () => {
    stompClient.disconnect();
    console.log("Disconnected from WebSocket");
  };

  const subscribe = (destination, callback) => {
    stompClient.subscribe(destination, (message) => {
      const payload = JSON.parse(message.body);
      callback(payload);
    });
  };

  const sendMessage = (destination, message) => {
    const headers = {
      Authorization: `Bearer ${authToken}`, // Add Authorization header with the token
    };
    if (stompClient.connected) {
      stompClient.send(destination, headers, message);
    } else {
      console.error(
        "WebSocket connection not yet established. Message not sent."
      );
    }
  };

  return {
    connect,
    disconnect,
    subscribe,
    sendMessage,
  };
};

export default WebSocketService;

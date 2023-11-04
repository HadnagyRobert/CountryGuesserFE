import React, { useEffect, useState } from 'react'
import { Client } from '@stomp/stompjs';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import './Notifications.css'

function Notifications() {
  const [stompClient, setStompClient] = useState(null);
  const [messageReceived, setMessageReceived] = useState("");
  const {tokenPayload} = useContext(AuthContext);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (stompClient == null){
      setupStompClient();
    }
    }, [tokenPayload]);
    
  const setupStompClient = () => {
    const stompClient = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    stompClient.onConnect = () => {
      stompClient.subscribe('/topic/publicmessages', (data) => {
        onMessageReceived(data);
      });
    };

    stompClient.activate();
    setStompClient(stompClient);
  };

  const onMessageReceived = (data) => {
    const message = data.body;
    console.log(message);
    setShow(true);
    setMessageReceived(message);
    setTimeout(() => {
      setShow(false);
      setMessageReceived("");
    }, 10000);
  };

  return (
    show && 
    <div className="notification-box">
        <p>{messageReceived}</p>
    </div>
)

}

export default Notifications
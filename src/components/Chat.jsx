// Create the page for the chat 

import React, { useState, useEffect } from 'react';
import queryString from 'query-string'; // retrieving data from the url
import io from 'socket.io-client/dist/socket.io'
import {withRouter} from "react-router"

let socket;

const Chat = ({location}) => {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);  // this stores all the messages in an array in state


  // UseEffect for user joining the room
  useEffect(() => {
    const {name, room} = queryString.parse(location.search)
    socket = io('localhost:3000');
    // setting the name and the room
    setName(name);
    setRoom(room)
    console.log(socket)

    socket.emit('join', {name, room}); // same as name: name. Sends name and room to server

    return () => {
      socket.emit('disconnect');

      socket.off();
    }
  }, ['localhost:3000', location.search]) // useEffect will trigger when values in array update

  // UseEffect for user sending a message
  useEffect(() => {
    socket.on('message', (message) => {

    })
  })

  return (
    <h1>Chat</h1>
  );
};

export default withRouter(Chat);
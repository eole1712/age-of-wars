import openSocket from 'socket.io-client';

let socket = null;

export default (() => {
  if (!socket) {
    socket = openSocket('http://localhost:8000');
  }
  return socket;
})();

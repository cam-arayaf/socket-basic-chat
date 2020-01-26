const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('client'));

const port = 6677;

server.listen(port, () => console.log(`Running server in http://localhost:${ port }/`));

let messages = [{
    nickname: 'Admin',
    text: 'Welcome to private chat with Node.js and Socket.io'
}];

io.on('connection', (socket) => {
    console.log(`Node with IP ${ socket.handshake.address } has connected`);
    socket.emit('messages', messages);
    socket.on('addMessage', (data) => {
        if (!data.nickname || !data.text) return;
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(3000);

app.get('/', function(request, respons){
    respons.sendFile(__dirname + '/index.html');
});

users = [];
connections = [];
console.log('8888888888')

io.sockets.on('connection', function(socket) {
   console.log('Connect')
    connections.push(socket);
   

    socket.on('disconnect', function(data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconect')
    });

    socket.on('send mess', function(data){
        console.log(data)
        io.sockets.emit('add mess', {mess: data.mess, name: data.name});
    })
})
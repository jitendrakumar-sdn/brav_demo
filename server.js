// var server = require('http').createServer();
// var io = require('socket.io')(server);
// var p2p = require('socket.io-p2p-server').Server;
// io.use(p2p);
// server.listen(3030);

// var server = require('http').createServer();
// var io = require('socket.io')(server);
// var p2p = require('socket.io-p2p-server').Server;
// server.listen(9000);

// let clients = {};
// server.on('listening', function () {
//   var addr = server.address();
//   var bind = typeof addr === 'string' ?
//     'pipe ' + addr :
//     'port ' + addr.port;
//   //   debug('Listening on ' + bind);
//   console.log('Listening on ' + bind);
// });


// io.on('connection', function (socket) {
//   console.log(socket)
//   clients[socket.id] = socket;
//   //   socket.join(roomName);
//   //   p2p(socket, null, room);
// });

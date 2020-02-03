var express = require('express');
var app = express();
var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
})
var io = require('socket.io')(server,{
});

app.get('/', function(req, res) {
    res.send('hello world');
});

var chat = io.of('/chat').on('connection', function(socket) {

    socket.on('joinRoom-ser', (data) => {
        var userName = data.userName;
        var roomName = data.roomName;
        var time = getDateTime();
        console.log(userName);
        socket.join(roomName, () => {
          console.log(userName + ' join a ' + roomName);
          socket.nsp.to(roomName).emit('joinRoom-cli', {
            userName:userName,
            roomName:roomName,
            time:time,
          });
        });
    });

    socket.on('sendSubmit-ser', (data) => {
        var userName = data.userName;
        var roomName = data.roomName;
        var inputMsg = data.inputMsg;
        var time = getDateTime();
        console.log(userName);
        console.log(userName + ' send msg ' + inputMsg + 'time '+time);
        socket.nsp.to(roomName).emit('sendSubmit-cli', {
            userName:userName,
            roomName:roomName,
            inputMsg,inputMsg,
            time:time,
        });
    });

    socket.on('leaveRoom', (roomName, userName) => {
        socket.leave(roomName, () => {
          console.log(userName + ' leave a ' + roomName);
        //   io.to(room[roomName]).emit('leaveRoom', roomName, userName);
        });
      });

      socket.on('chat message', (roomName, userName, msg) => {
        console.log(userName + ' send ' + roomName+' : '+msg);
        // io.to(room).emit('chat message', name, msg);
      });
    
});

function getDateTime() {
    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    // var year = date.getFullYear();

    // var month = date.getMonth() + 1;
    // month = (month < 10 ? "0" : "") + month;

    // var day  = date.getDate();
    // day = (day < 10 ? "0" : "") + day;

    return hour + ":" + min + ":" + sec;

}
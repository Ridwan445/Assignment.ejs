const express = require('express');
const socket = require('socket.io');
const app = express();
const server = app.listen(4000, function(){
    console.log('listening for requests on port 4000');
});


app.use(express.static('views'));
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("index");
  })


const connect = socket(server);
connect.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    
    
    socket.on('chat', function(data){
        connect.sockets.emit('chat', data);
    });

    
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

})
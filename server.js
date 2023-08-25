const express = require('express'); // import the express package
const app = express();
const http = require('http'); // module provides functionality for creating Http server and request.
const cors = require('cors'); // import the cors package
const socketIo = require('socket.io'); // import the socket.io package

const server = http.createServer(app); // create a server with http server using express
const io = socketIo(server);  // Attach socket.io to the http server
 
// use the cors middleware with appropiate options
app.use(cors({
    origin:"*", // Replace with Client-side URL
    method:['GET','POST'], //Allow to specific Http methods
    credentials:true, // Allows credentails(cookies,headers,etc)
}))
     
// `io.on('connection',(callback)` method is used to handel events thats occur when a new client(user) connects to the socket.io server
io.on('connection',(socket)=>{ 
    console.log(' A user connected');
    // Event listner for this specific socket connection
    socket.on('draw',(data)=>{
        console.log('Recived data :',data);

        // Broadcast the received drawing data to all connected clients
        io.emit('draw',data);
    });

    socket.on('disconnect',()=>{    // disconnect when it's done
        console.log('A user disconneted ');
    })
})

PORT = process.env.PORT || 3000;
server.listen(PORT,()=>{   
    console.log(` server running on port ${PORT}`)
})
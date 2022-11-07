import express from 'express';
import mongoose  from "mongoose";
import router from "./routing/router.js";
import {Server} from "socket.io";
import http from 'http';

const PORT = 3000;
const DB_URL = 'mongodb+srv://rost9911:Neymarisc0nt!@cluster0.ehy1pmj.mongodb.net/?retryWrites=true&w=majority';
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Registration. Typed as the server has to receive data in JSON format
app.use(express.json());
app.use('/', router);

async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true});
        server.listen(PORT, () => console.log("server started on port" + PORT));
        // mongoose.connection.watch().on('change', change => console.log('db change:', change));
    } catch (e) {
        console.log(e);
    }
}

io.on('connection', (socket) => {
    console.log('a user connected');
});

startApp();
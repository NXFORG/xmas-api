const express = require("express");
const cors = require("cors");

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));


const userRoutes = require('./routes/users');
const presentRoutes = require('./routes/presents');

server.get('/', (req, res) => res.send("<h1>Welcome to Chris' Christmas present wantlist API</h1>"));

server.use('/users', userRoutes);
server.use('/present', presentRoutes);

module.exports = server;
const express = require('express');
const proxy = require('express-http-proxy');
const server = express();
const path = require('path');
const PORT = 8080;

// Second App Static Files
server.use('/second', express.static(path.join(__dirname, 'client2/build')));

// Main App Static Files
server.use(express.static(path.join(__dirname, 'client1/build')));

// Redirect on Get to Second App
server.get('second/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client2/build/index.html'));
});

// Redirect on Get to Main App
server.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client1/build/index.html'));
});

server.use(express.json());

server.listen(PORT, () => {
	console.log(`> Serving Multiple Apps at port: [${PORT}]`);
	console.log(`> Primary route: localhost:${PORT}/`);
	console.log(`> Secondary route: localhost:${PORT}/second`);
});

const express = require('express');

const port = 5000;

const server = express();
server.use(express.json());

server.get('/hobbits', (req, res) => {
  res.send('Welcome!');
});

// Create data
server.post('/hobbits', (req, res) => {
  res.status(201).json({ url: '/hobbits', operation: 'POST' });
});

// Update data
server.put('/hobbits', (req, res) => {
  res.status(200).json({ url: '/hobbits', operation: 'PUT' });
});

// Delete data
server.delete('/hobbits', (req, res) => {
  res.status(204);
});

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

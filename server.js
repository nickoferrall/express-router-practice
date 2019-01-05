const express = require('express');

const port = 5000;

const server = express();

server.get('/hobbits', (req, res) => {
  res.send('Welcome!');
});

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

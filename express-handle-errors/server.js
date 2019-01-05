const express = require('express');
const path = require('path');

const server = express();

server.get('/download', (req, res, next) => {
  const filePath = path.join(__dirname, 'index.html');
  res.sendFile(filePath, err => {
    if (err) {
      next(err);
    } else {
      console.log('File sent successfully.');
    }
  });
});

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: 'There was an error performing the required operation.',
    error: err
  });
});

server.listen(5000, () => {
  console.log('Magic happening on 5000!');
});

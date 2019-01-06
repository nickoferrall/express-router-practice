const express = require('express');

const racesRoutes = require('./races/racesRoutes');
const villains = require('./races/villains');
const server = express();

// server.use('/', (req, res) => {
//   res.status(200).send('Hello from express app running.');
// });

server.use('/races', racesRoutes);

server.use('/villains', villains);

server.use('/', (req, res) => {
  res.status(200).send('Hello from express');
});

server.listen(8000, () => {
  console.log('Magic on 8000.');
});

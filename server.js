const express = require('express');

const port = 5000;

const server = express();
server.use(express.json());

// Custom middleware
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} ${req.get(
      'Origin'
    )}`
  );
  next();
}

function atGate(req, res, next) {
  console.log('At the gate, about to be eaten.');
  next();
}

function auth(req, res, next) {
  if (req.url === '/mellon') {
    next();
  } else {
    res.send('You shall not pass.');
  }
}

server.use(logger);
server.use(atGate);

server.get('/mellon', auth, (req, res) => {
  console.log('Gate opening...');
  console.log('Inside and safe!');
  res.send('Welcome traveller!');
});

// Get data
server.get('/hobbits', (req, res) => {
  console.log(req.query);
  // query string parameters get added to req.query
  const sortField = req.query.sortby || 'id';
  const hobbits = [
    {
      id: 1,
      name: 'Samwise Gamgee'
    },
    {
      id: 2,
      name: 'Frodo Baggins'
    }
  ];

  // apply the sorting
  const response = hobbits.sort((a, b) =>
    a[sortField] < b[sortField] ? -1 : 1
  );

  res.status(200).json(response);
});

// Create data
let hobbits = [
  {
    id: 1,
    name: 'Bilbo Baggins',
    age: 111
  },
  {
    id: 2,
    name: 'Frodo Baggins',
    age: 33
  }
];
let nextId = 3;

// and modify the post endpoint like so:
server.post('/hobbits', (req, res) => {
  console.log(req.body);
  const hobbit = req.body;
  hobbit.id = nextId++;

  hobbits.push(hobbit);

  res.status(201).json(hobbits);
});

// Update data
server.put('/hobbits/:id', (req, res) => {
  const hobbit = hobbits.find(h => h.id == req.params.id);

  if (!hobbit) {
    res.status(404).json({ message: 'Hobbit does not exist' });
  } else {
    // modify the existing hobbit
    Object.assign(hobbit, req.body);

    res.status(200).json(hobbit);
  }
});

// Delete data
server.delete('/hobbits/:id', (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  // or we could destructure it like so: const { id } = req.params;
  res.status(200).json({
    url: `/hobbits/${id}`,
    operation: `DELETE for hobbit with id ${id}`
  });
});

server.use(function(req, res) {
  res.status(404).send("Ain't no one got time for that!");
});

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

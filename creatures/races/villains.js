const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const villains = ['Harry Kane', 'Sergio Aguero', 'Wayne Rooney'];
  res.status(200).json(villains);
});

module.exports = router;

const express = require('express');
const router  = express.Router();
const MyApp = require('../models/MyApp');

/* GET home page */
router.get('/apps', (req, res, next) => {  
  res.send(req.body);
});

// PUT route created to add new apps
router.put('/apps-create', (req, res, next) => {
  const { id, name } = req.body;
  MyApp
    .create( {id, name} )
    .then( project => {
      res.send(project);
    })
    .catch( err => next(err))
});

module.exports = router;

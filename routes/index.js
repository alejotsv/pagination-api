const express = require('express');
const router  = express.Router();
const MyApp = require('../models/MyApp');

/* GET home page */
router.get('/apps', (req, res, next) => {  
  let by;
  let start;
  let end;
  let max;
  let order; 
  console.log(req.body);
  console.log(req.body.range.by);

  MyApp
    .find()    
    .then( apps => {
      res.send(apps);
    })
    .catch( err => next(err) )
});

// PUT route created to add new apps
router.put('/apps-create', (req, res, next) => {
  const { id, name } = req.body;
  MyApp
    .create( {id, name} )
    .then( newApp => {
      res.send( newApp );
    })
    .catch( err => next(err))
});



module.exports = router;

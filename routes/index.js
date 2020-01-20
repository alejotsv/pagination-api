const express = require('express');
const router  = express.Router();
const MyApp = require('../models/MyApp');

/* GET home page */
router.get('/apps', (req, res, next) => {  
  let by;

  // Verify if the required field 'by' exists and if it matches valid values
  if (req.body.range.by !== 'id' && req.body.range.by !== 'name'){
    res.send(`The field 'by' is required and valid values are either 'id' or 'name'`);
  } else {
    by = req.body.range.by;
  }

  let start;

  // Verify if the field 'start' exists and set value or default to variable
  if (!req.body.range.start) {
    start = 0;
  } else {
    start = req.body.range.start;
  }
  
  let end;  

   // Verify if the field 'end' exists and set value or default to variable
   if (req.body.range.start) {
    end = req.body.range.end;
  }

  let max;

  // Verify if the field 'max' exists and set value or default to variable
  if (!req.body.range.max) {
    max = 50;
  } else {
    max = req.body.range.max;
  }

  let order; 
  console.log(req.body);
  console.log(`this is max: ${max}`);
  
  
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

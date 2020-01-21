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
    start = 1;
  } else if (by==='id'){
    start = req.body.range.start;
  } else if (by==='name') {
    // remove 'my-app-' from app name and convert to number
    start = Number(req.body.range.start.split('-').pop());
  }

  console.log('this is start: ' + start);
  
  let end;

  // Verify if the field 'end' exists and set value or default to variable
  if (req.body.range.end) {
   if (by==='id'){
     end = req.body.range.end - start + 1;
   } else if (by==='name'){
     // remove 'my-app-' from app name and convert to number
     end = Number(req.body.range.end.split('-').pop()) - start + 1;
   }
  }

  let max;  

  // Verify if the field 'max' exists and set value or default to variable
  if (!req.body.range.max) {
    max = 50;
  } else {
    max = req.body.range.max;
  }

  let limit;

  // Verify if limit will match end or max
  if (!req.body.range.end || end > max) {
    limit = max;
  } else {
    limit = end;
  }

  let order; 
  console.log(req.body);   
  
  
  MyApp
    .find()
    .select('-_id')
    .limit(limit)
    .skip(start-1)
    .then( apps => {
      // TODO: create an array of pages according to the specifications and return that      
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

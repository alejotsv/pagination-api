const express = require('express');
const router  = express.Router();
const MyApp = require('../models/MyApp');

/* GET Apps */
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
  
  
  let end;

  // Verify if the field 'end' exists and set value or default to variable
  if (req.body.range.end) {
   if (by==='id'){
    //  Get limit by substracting start point and adding 1
     end = req.body.range.end - start + 1;
   } else if (by==='name'){
     // Remove 'my-app-' from app name, convert to number, and get limit by substracting start point and adding 1
     end = Number(req.body.range.end.split('-').pop()) - start + 1;
   }
  }

  let max;

  // Verify if the field 'max' exists and set value or default to variable
  if (!req.body.range.max) {
    // Set default max
    max = 50;
  } else {    
    max = req.body.range.max;
  }

  let limit;

  // Verify if limit will match end or max
  if (!req.body.range.end || end > max) {
    // If end point goes beyond max, max gets precedence
    limit = max;
  } else {
    limit = end;
  }

  let order;

  // Verify if the field 'order' exists and set value or default to variable
  if (req.body.range.order !== 'desc') {
    order = 'asc';
  } else {
    order = 'desc';
  }  
  
  
  MyApp
    // Find all documents in collection
    .find()
    // Exclude the object id
    .select('-_id')
    // Limit the number of results to the max page size or the end point
    .limit(limit)
    // Skip documents prior to the start point
    .skip(start-1)
    // Sort according to the order value
    // .sort( { id: order })
    .then( apps => {
      // Return search results  
      if(order === 'asc'){
        res.send(apps);
      } else {
        res.send(apps.reverse());
      }
    })
    .catch( err => next(err) )
});

// PUT route created to add new apps
router.put('/apps-create', (req, res, next) => {
  const arr = req.body;
  console.log(arr);
  MyApp.collection
    .insertMany( arr, {ordered: true} )
    .then( newApps => {
      res.send( newApps );
    })
    .catch( err => next(err))
});



module.exports = router;


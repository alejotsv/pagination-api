const mongoose = require('mongoose');
const Schema = moongose.Schema;

const myAppSchema = new Schema ({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  }

});

const MyApp = moongose.model('MyApp', myAppSchema);

module.exports = MyApp;
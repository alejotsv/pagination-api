const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const MyApp = mongoose.model('MyApp', myAppSchema);

module.exports = MyApp;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const catSchema = new Schema({
  name: String,
  age: {
	type: Number,
	min: [0, 'haloo wat doink'],
	max: [42, 'haloo wake up brother'] 
  },
  genre: {
	  type: String,
	  enum: ['male', 'female', 'robot']
  }
});

module.exports = mongoose.model('Cat', catSchema);

const mongoose = require('mongoose');

const PlantSchema = new mongoose.Schema({
  commonName: String,
  scientificName: String,
  edible:  Boolean,
  picUrl: String,
});

module.exports = mongoose.model('Plant', PlantSchema);

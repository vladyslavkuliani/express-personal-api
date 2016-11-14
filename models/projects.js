var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
  name: String,
  description: String,
  githubLink: String,
  feedback: [String],
  rating: Number,
  technology: String
});

var Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RatingSchema = Schema({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  votes: [Number]
});

var Rating = mongoose.model("Rating", RatingSchema);

module.exports = Rating;

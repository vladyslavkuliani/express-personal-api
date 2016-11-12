var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedbackSchema = Schema({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  feedbacks: [String]
});

var Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = Feedback;

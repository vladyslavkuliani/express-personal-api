var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/personal-api");

// module.exports.Campsite = require("./campsite.js.example");
module.exports.Project = require('./projects.js');
module.exports.Rating = require('./rating.js');
module.exports.Feedback = require('./feedbacks.js');

// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })
var projects_list = [{
  name: "Racing Game",
  description: "Browser game based on knowledge received for 2 weeks at GA",
  githubLink: "https://github.com/vladyslavkuliani/Racing-Game",
  feedback: [],
  rating: null,
  technology: "Javascript"
},
{
  name: "Tic Tac Toe",
  description: "HW: browser tic-tac-toe with HTML, CSS, JS, jQuery, Bootstrap",
  githubLink: "https://github.com/vladyslavkuliani/Racing-Game",
  feedback: [],
  rating: null,
  technology: "Javascript"
},
{
  name: "Geoquakes",
  description: "Mashup of Google Maps + Earthquakes - jquery ajax lab",
  githubLink: "https://github.com/vladyslavkuliani/geoquakes",
  feedback: [],
  rating: null,
  technology: "HTML"
}
];

var rating_list = [{
  projectId: "Racing Game",
  votes: []
},
{
  projectId: "Tic Tac Toe",
  votes: []
},
{
  projectId: "Geoquakes",
  votes: []
}
];

var feedback_list = [{
  projectId: "Racing Game",
  feedbacks: []
},
{
  projectId: "Tic Tac Toe",
  feedbacks: []
},
{
  projectId: "Geoquakes",
  feedbacks: []
}
];

db.Project.find({}, function(err, succ) {
if(succ.length != projects_list.length){
db.Project.remove({}, function(err, projects){
  if(err){return console.log("error1");}
  db.Project.create(projects_list, function(err, p){
    db.Rating.remove({}, function(err, r){
      if(err){return console.log("error2");}
      rating_list.forEach(function(ratingData){
        var rating = new db.Rating({
          votes: ratingData.votes
        });
        db.Project.findOne({name:ratingData.projectId}, function(err, project){
          if(err){return console.log("error3");}
          rating.projectId = project._id;
        });
        rating.save();
      });
    });

    db.Feedback.remove({}, function(err, f){
      if(err){return console.log("error4");}
      feedback_list.forEach(function(feedbacksData){
        var feedback = new db.Feedback({
          feedbacks: feedbacksData.feedbacks
        });
        db.Project.findOne({name:feedbacksData.projectId}, function(err, project){
          if(err){return console.log("error5");}
          feedback.projectId = project._id;
        });
        feedback.save();
      });
    });
  });
});
}
});

// process.exit();

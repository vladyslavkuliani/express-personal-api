// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');



/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    woopsIForgotToDocumentAllMyEndpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/example-username/express_self_api/README.md", // CHANGE ME
    baseUrl: "http://enigmatic-lowlands-94475.herokuapp.com", // CHANGE ME
    endpoints: [
      //done
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      //done
      {method: "GET", path: "/api/profile", description: "My info"},
      //done
      {method: "GET", path: "/api/projects", description: "My projects"},
      //done
      {method: "POST", path: "/api/projects", description: "Leave your feedback"},
      //done
      {method: "GET", path: "/api/projects/search?technology=Javascript/HTML/CSS/...", description: "Find projects by technologies used in it"},
      //done
      {method: "POST", path: "/api/rate", description: "Rate my project"}
    ]
  })
});

app.get('/api/profile', function(req, res){
  db.Project.find({}, function(err, p){
    if(err){return console.log(err)};
    res.json({
      name: "Vladyslav Kuliani",
      githubLink: "https://github.com/vladyslavkuliani",
      personalSiteLink: "https://vladyslavkuliani.github.io/",
      age: "22",
      projects: p
    });
  });
});

app.get('/api/projects', function(req, res){
  db.Project.find({}, function(err, p){
    if(err){return console.log(err)};
    res.json([{
      projects: p
    }]);
  });
});

app.post('/api/projects', function(req, res){
  db.Project.findOne({name: req.body.project}, function(err, p){
    if(err){return console.log(err);}
    p.feedback.unshift(req.body.feedback);
    p.save();
  });

  db.Project.find({}, function(err, p){
    if(err){return console.log(err)};
    res.json({
      projects: p
    });
  });
});

app.get('/api/projects/search', function(req, res){
  db.Project.find({technology: req.query.technology}, function(err, projects){
    if(err){return console.log(err);}
    res.json(projects);
  });
});


app.post('/api/rate', function(req, res){
  var average=0;
  console.log(req.body.project);
  db.Project.findOne({name: req.body.project}, function(err, project){
    if(err){return console.log(err);}
    db.Rating.findOne({_id:project._id}, function(err, rating){
      if(err){return console.log(err);}
      rating.votes.unshift(req.body.rating);

      for(var i=0; i<rating.votes.length; i++){
        average+=rating.votes[i];
      }
      average/= rating.votes.length;
    });
    project.rating = average;
    res.json(project);
    });
  });

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});

/* -------------------------
  Imports and Requirements.
----------------------------*/

const express = require('express');
const app = express(); // this will actually execute express

const {
    check,
    validationResult
} = require('express-validator'); // express-validator enables server-side validation (e.g. that input has certain character length)

const mongoose = require('mongoose');
const Models = require('./models.js'); // importing the models.js file

const cors = require('cors');
app.use(cors());


const bodyParser = require("body-parser");
app.use(bodyParser.json()); // ".use" employs middleware


const passport = require('passport'); // passport 
require('./passport');

const Movies = Models.Movie; 
const Users = Models.User;

const morgan = require('morgan'); // morgan is a library for logging
app.use(morgan('common')); // common is a standard logging format

mongoose.connect('mongodb+srv://testuser:iamtesting123@cluster0-y8njo.azure.mongodb.net/movieDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }); // allowing Mongoose to connect to the database

//mongoose.connect('mongodb://localhost:27017/movieDB', {useNewUrlParser: true, useUnifiedTopology: true}); //allowing Mongoose to connect to the database

var auth = require('./auth.js')(app);

/* -------------------------
            ROUTES
----------------------------*/

app.get('/', function(req, res) {
    res.send("Welcome to MovieDB"); // standard entry point.
});

app.post('/movies', [check('Title', 'Title is required').not().isEmpty(), // express validator functions
check('Description', 'Please enter a Description').not().isEmpty(),
check('Genre', 'Please name the Genre').not().isEmpty()], function(req, res) {
    var errors = validationResult(req); // express validator method, helps to return the errors

        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            });
        }
    Movies.findOne({
            Title: req.body.Title
        })
        .then(function(movie) {
            if (movie) {
            } else {
                Movies
                    .create({
                        Title: req.body.Title, // based on the req parameters from the body
                        Description: req.body.Description,
                        ImagePath: req.body.ImagePath,
                        Featured: req.body.Featured,
                        Genre: {
                            Name: req.body.Genre.Name,
                            Description: req.body.Genre.Description
                        },
                        Director: {
                            Name: req.body.Director.Name,
                            Bio: req.body.Director.Bio
                        }
                    })
                    .then(function(movie) {
                        res.status(201).json(movie)
                    })
                    .catch(function(error) { //returning the error in case the promise can't be fulfilled
                        console.error(error);
                        res.status(500).send("Error: " + error);
                    })
            }
        }).catch(function(error) {
            console.error(error);
            res.status(500).send("Error: " + error);
        });
});



app.get('/movies', passport.authenticate('jwt', { session: false }), function(req, res) {
    Movies.find()
        .then(function(movies) {
            res.status(201).json(movies) // this promise returns a json object with the list of movies 
        })
        .catch(function(err) {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

app.get("/movies/:Title" // returns all information about a specific movie if the GET route /movies/:title is requested
    
, (req, res) => { 
    Movies.findOne({
            Title: req.params.Title
        })
        .then(function(movie) {
            res.json(movie)
        })
        .catch(function(err) {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

app.get('/movies/genres/:name', // returns all movies with a certain genre in case the GET route /movies is requested
     function(req, res) {
    Movies.findOne({
            "Genre.Name": req.params.name
        })
        .then(function(movie) {
            res.status(201).json(movie.Genre.Description) // if we find a movie with  
        })
        .catch(function(err) {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
}); 

app.get('/directors/:name', function(req, res) {
    Movies.findOne({
            "Director.Name": req.params.name
        })
        .then(function(movie) {
            res.status(201).json(movie.Director)
        })
        .catch(function(err) {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

app.post('/users',

    [check('username', 'Username is required').not().isEmpty(),
        check('username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
        check('password', 'Password is required').not().isEmpty(),
        check('mail', 'Email does not appear to be valid').isEmail()
    ], (req, res) => {

        // check the validation object for errors
        var errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            });
        }
        var hashedPassword = Users.hashPassword(req.body.password); // hashing the password that is given via the request body
        Users.findOne({
                username: req.body.username
            }) // Search to see if a user with the requested username already exists
            .then(function(user) {
                if (user) {
                    //If the user is found, send a response that it already exists
                    return res.status(400).send(req.body.username + " already exists");
                } else {
                    Users
                        .create({
                            username: req.body.username,
                            password: hashedPassword, // hashed password as defined above
                            mail: req.body.mail,
                            birthday: req.body.birthday
                        })
                        .then(function(user) {
                            res.status(201).json(user)
                        })
                        .catch(function(error) {
                            console.error(error);
                            res.status(500).send("Error: " + error);
                        });
                }
            }).catch(function(error) {
                console.error(error);
                res.status(500).send("Error: " + error);
            });
    });


app.get('/users', function(req, res) {

    Users.find()
        .then(function(users) {
            res.status(201).json(users)
        })
        .catch(function(err) {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

app.put('/users/:username', function(req, res) {
    Users.findOneAndUpdate({
            "username": req.params.username
        }, {
            $set: {
                username: req.body.username,
                password: req.body.password,
                mail: req.body.mail,
                birthday: req.body.birthday
            }
        }, {
            new: true
        }, // This line makes sure that the updated document is returned
        function(err, updatedUser) {
            if (err) {
                console.error(err);
                res.status(500).send("Error: " + err);
            } else {
                res.json(updatedUser)
            }
        })
});

app.post('/users/:username/favorites/:MovieID', function(req, res) {
    Users.findOneAndUpdate({
            "username": req.params.username
        }, {
            $push: {
                favoriteMovies: req.params.MovieID
            }
        }, {
            new: true
        },
        function(err, updatedUser) {
            if (err) {
                console.error(err);
                res.status(500).send("Error: " + err);
            } else {
                res.json(updatedUser)
            }
        })
});

app.delete('/users/:username/favorites/:MovieID', function(req, res) {
    Users.findOneAndUpdate({
            username: req.params.username
        }, {
            $pull: {
                favoriteMovies: req.params.MovieID
            }
        }, {
            new: true
        })
        .then(item => {
            res.json(item)
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});




app.delete('/users/:username', function(req, res) {
    Users.findOneAndRemove({
        "username": req.params.username
    }).then(function() {
        res.json("Successfully deleted " + req.params.username);
    })
});


app.get('/users/:username', function(req, res) {
    Users.findOne({
            username: req.params.username
        })
        .then(function(user) {
            res.json(user)
        })
        .catch(function(err) {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

app.use(express.static('public')); // returns all static files, meaning that e.g. documentation.html is returned when the respective request is made

app.use(function(err, req, res, next) { // error logging
    console.error(err.stack);
    res.status(500).send('Error!');
});

var port = process.env.PORT || 3000; // chooses the port whichever is stored in the environment variable PORT. If there is none, 3000 is used.
app.listen(port, "0.0.0.0", function() {
    console.log("Listening on Port 3000");
});
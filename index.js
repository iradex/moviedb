const express = require('express');
morgan = require('morgan'); //morgan is a library for logging
const app = express();

let movies = [{ // storing the movies that will be returned when /movies is requested
        title: "Die Hard",
        actor: "Bruce Willis",
        length: 105
    },
    {
        title: "Forrest Gump",
        actor: "Tom Hanks",
        length: 186
    },
    {
        title: "Harry Potter 1",
        actor: "Daniel Radcliffe",
        length: 126
    }
];

app.use(morgan('common')); // common is a standard logging format

app.get('/', function(req, res) {
    res.send("Welcome to MovieDB"); // standard entry point.
});

app.get('/movies', function(req, res) {
    res.json(movies) // returns the JSON object in case the GET route /movies is requested
});

app.get("/movies/:title", (req, res) => { // returns all information about a specific movie if the GET route /movies/:title is requested
    res.json(movies.find( (movie) =>
      { return movie.title === req.params.title   }));
});

app.get('/movies/genres/:genre', function(req, res) {
    res.json("Succesfull get request returning all movies of a certain genre"); // returns all movies with a certain genre in case the GET route /movies is requested
});

app.get('/directors/:name', function(req, res) {
    res.json("Succesfull get request returning information about a certain director");
});

app.post('/users', function(req, res){
    res.json("Succesfully created new user");
});

app.put('/users/:username', function(req, res) {
    res.json("Successfully updated user data");
});

app.post('/users/:username/favorites', function(req, res) {
    res.json("Succesfully added movie to favorites list");
});

app.delete('/users/:username/favorites/:title', function (req, res) {
    res.json("Movie sucessfully deleted from favorites list");
});

app.delete('/users/:username', function(req, res) {
    res.json("User successfully deleted"); 
});

app.use(express.static('public')); // returns all static files, meaning that e.g. documentation.html is returned when the respective request is made

app.use(function(err, req, res, next) { // error logging
    console.error(err.stack);
    res.status(500).send('Error!');
});

app.listen(8080, () =>
    console.log('MovieDB is listening on port 8080.')
);
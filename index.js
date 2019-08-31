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

app.use(express.static('public')); // returns all static files, meaning that e.g. documentation.html is returned when the respective request is made

app.use(function(err, req, res, next) { // error logging
    console.error(err.stack);
    res.status(500).send('Error!');
});

app.listen(8080, () =>
    console.log('MovieDB is listening on port 8080.')
);
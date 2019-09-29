const mongoose = require('mongoose');

var movieSchema = mongoose.Schema({ //defining what is required for a movie entry
    Title : {type: String, required: true},
    Description : {type: String, required: true},
    Genre : {
      Name : String,
      Description : String
    },
    Director : {
      Name : String,
      Bio : String
    },
    Actors : [String],
    ImagePath : String,
    Featured : Boolean
  });
  
  var userSchema = mongoose.Schema({ //defining what is required for a user entry
   username : {type: String, required: true},
   password : {type: String, required: true},
   mail : {type: String, required: true},
   birthday : Date,
   favoriteMovies : [{ type : mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
  });
  
  var Movie = mongoose.model('Movie', movieSchema); //naming the model "Movie"
  var User = mongoose.model('User', userSchema); //naming the model "User"
  
  module.exports.Movie = Movie; // Exporting is required to access it in index.js
  module.exports.User = User;
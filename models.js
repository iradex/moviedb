const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
  

var userSchema = mongoose.Schema({
  username : {type: String, required: true},
  password : {type: String, required: true},
  mail : {type: String, required: true},
  birthday : Date,
  FavoriteMovies : [{ type : mongoose.Schema.Types.ObjectId, ref: 'Movies' }]
});
 
userSchema.statics.hashPassword = function(password) {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password); };


  var Movie = mongoose.model('Movie', movieSchema); //naming the model "Movie"
  var User = mongoose.model('User', userSchema); //naming the model "User"
  
  module.exports.Movie = Movie; // Exporting is required to access it in index.js
  module.exports.User = User;
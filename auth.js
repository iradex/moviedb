var jwtSecret = 'your_jwt_secret'; 
var jwt = require('jsonwebtoken');
const passport = require('passport');
require('./passport.js'); // this is the local passport file


function generateJWTToken(user) {
 return jwt.sign(user, jwtSecret, {
   subject: user.username,
   expiresIn: '7d',
   algorithm: 'HS256' // algorithm used to encode the values of the JWT
 });
}

module.exports = (router) => {
 router.post('/login', (req, res) => {
   passport.authenticate('local', { session : false}, (error, user, info) => {
     if (error || !user) {
       return res.status(400).json({
         message: 'Something is wrong',
         user: user
       });
     }
     req.login(user, { session: false }, (error) => {
       if (error) {
         res.send(error);
       }
       var token = generateJWTToken(user.toJSON());
       return res.json({ user, token });
     });
   })(req, res);
 });
}
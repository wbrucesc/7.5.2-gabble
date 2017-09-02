const models = require('./models');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  session = require('express-session');
  // flash = require('express-flash-messages');

const routes = require('./routes');


const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/static', express.static('public'));

//Passport user auth

const checkPassword = function(user, password){
  return user.password === password;
};

passport.use('local-login', new LocalStrategy(function(username, password, done){
  models.User.findOne({
    where: {
      username: username
    }
  }).then(function(user){
    if(user === null) {
      done(null, false);       //false means no user
    } else if (user && checkPassword(user, password)) {
      done(null, user);
    } else {
      done(null, false);        //there is a user but their password is not correct
    }
  });
}));

passport.use('local-signup', new LocalStrategy(function(username, password, done){
  console.log("CREATING USER!!!");
  models.User.create({
    where: {
      username: newUsername,
      password: newpw
    }
  }).then(function(user){
    if (user){
      done(null, user);
    } else {
      done(null, false);
    }
  });
}));

// passport.use('local-signup', new LocalStrategy(
//   function(username, password, done){
//     console.log('local signup is running');
//     User.signup(username, password, function(err, user){
//       if (err) {
//           return done(err);
//       }
//       if (user) {
//           return done(null, user);
//       } else {
//           return done(null, false, {
//               message: "There is already a user with that username."
//           });
//       }
//     });
//   }
// ));


passport.serializeUser(function(user, done){        //stores user.id onto the session
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  models.User.findById(id).then(function(user){
    done(null, user);
  });
});


//Middleware

app.use(bodyParser.urlencoded({extended: false}));


app.use(session({
    secret: 'go tigers',   //salt used to generate tokens
    resave: false,
    saveUninitialized: true      //set to false on snippets project?
}));

app.use(passport.initialize());
app.use(passport.session());


routes(app);

app.listen(3000);

module.exports = app;

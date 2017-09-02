const express = require('express');
const passport = require('passport');


const HomeController = require('./controllers/home');
const UserController = require('./controllers/user');

module.exports = function(app){
const homeRouter = express.Router();
const userRouter = express.Router();


const requireLogin = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('login');
  }
};


homeRouter.use(requireLogin);
homeRouter.get('/', HomeController.index);
homeRouter.get('/logout', HomeController.out);
homeRouter.get('/add', HomeController.form);


userRouter.get('/login', UserController.login);   //user prepended to / on all user routes
userRouter.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    // failureFlash: true
  }));

userRouter.get('/signup', UserController.signup);
userRouter.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signup',
  // failureFlash: true
}));






  app.use('/', userRouter);
  app.use('/', homeRouter);
};

const express = require('express');

const HomeController = require('./controllers/home');
const UserController = require('./controllers/user');

module.exports = function(app){
const homeRouter = express.Router();
const userRouter = express.Router();


homeRouter.get('/', HomeController.index);
homeRouter.get('/logout', HomeController.out);
homeRouter.get('/add', HomeController.form);


userRouter.get('/login', UserController.login);   //user prepended to / on all user routes
userRouter.get('/signup', UserController.signup);






  app.use('/', userRouter);
  app.use('/', homeRouter);
};

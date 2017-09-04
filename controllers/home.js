const models = require('../models');

const HomeController = {
  index: function(req, res){
    models.Gab.findAll().then(function(results){
      res.render('home', {Gab: results});
      console.log(results);
    });
  },

  form: function(req, res){
    res.render('form');
  },

  add: function(req, res){
    models.Gab.create({
      author: req.session.user,
      body: req.body.newGab,
    }).then(function(result){
      res.redirect('/');
    });
  },

  out: function(req, res){
    // res.redirect('login');
  req.session.destroy(function(){
    res.redirect('/login');
    // console.log('USER LOGGED OUT');
    });
  },






};

module.exports = HomeController;

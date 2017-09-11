const models = require('../models');

const HomeController = {
  index: function(req, res){
    models.Gab.findAll({order:[['createdAt', 'DESC']]}).then(function(results){
      res.render('home', {Gab: results});
    });
  },

  form: function(req, res){
    res.render('form');
  },

  add: function(req, res){
    models.Gab.create({
      author: req.user.username,
      body: req.body.newGab,
      userId: req.user.id
    }).then(function(result){
      res.redirect('/');
    });
  },
  delete: function(req, res){
    models.Gab.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(){
      res.redirect('/');
  });

  //   const id = req.params.id;
  //   models.Gab.findById(id).then(function(gab){
  //     if (gab.userId === req.user.id){
  //       gab.destroy()
  //     }
  //   });
  },

  out: function(req, res){
    // res.redirect('login');
  req.session.destroy(function(){
    res.redirect('/login');
    // console.log('USER LOGGED OUT');
    });
  },
  // like: function(req, res){
  //   models.Like.create({
  //     user: req.user.id,
  //     post: req.params.id
  //   }).then(function(like){
  //       res.redirect('/');
  //   });
  // },





};

module.exports = HomeController;

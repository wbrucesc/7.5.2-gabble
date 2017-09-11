const models = require('../models');

const HomeController = {
  index: function(req, res) {
    models.Gab.findAll({
      order: [
        ['createdAt', 'DESC']
      ],
      include: [{
        model: models.Like
      }]
    }).then(function(results) {
      res.render('home', {
        Gab: results
      });
    });
  },

  form: function(req, res) {
    res.render('form');
  },

  add: function(req, res) {
    models.Gab.create({
      author: req.user.username,
      body: req.body.newGab.trim(),
      userId: req.user.id
    }).then(function(result) {
      res.redirect('/');
    });
  },
  delete: function(req, res) {
    models.Gab.destroy({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    }).then(function() {
      res.redirect('/');
    });
  },
  newLike: function(req, res){
    console.log("like is firing");
    models.Like.create({
      isLiked: true,
      user: req.user.id,
      gab: req.params.id
    }).then(function(like){
      res.redirect('/');
    });
  },
  showLikes: function(req, res){
    models.Gab.findOne({
      where: {
        id: req.params.id
      },
      include: [models.User, {
        model: models.Like,
        include: {
          model: models.User,
          as: "fan"
        }
      }]
    }).then(function(gab){
      res.render('likesPage', {gab: gab});
    });
  },

  out: function(req, res) {
    // res.redirect('login');
    req.session.destroy(function() {
      res.redirect('/login');
      // console.log('USER LOGGED OUT');
    });
  },


};

module.exports = HomeController;

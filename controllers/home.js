const HomeController = {
  index: function(req, res){
    res.render('home');
  },

  form: function(req, res){
    res.render('form');
  },

  add: function(req, res){

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

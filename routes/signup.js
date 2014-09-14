var express = require('express');
var router = express.Router();
var User = require('../modules/user');

router.get('/', function(req, res) {
  if (req.session.username) {
    res.redirect('/home');
  } else {
    res.render('register');
  }
});

router.post('/register', function(req,res) {
  var name = req.body.username;
  var pwd = req.body.userPwd;

  var user = new User({
    username : name,
    userPwd  : pwd,
  });
  var result = null;
  user.register(function(err, newuser){
    if(!err){
      req.session.username = name;
      result = true;
      res.send(result);
    }else{
      result = false;
      res.send(result);
    }
  });
});

module.exports = router;
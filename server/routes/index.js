var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home',displayName:req.user?req.user.displayName:'' });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home',displayName:req.user?req.user.displayName:'' });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About',displayName:req.user?req.user.displayName:'' });
});

/* GET Contact page. */
router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Contact',displayName:req.user?req.user.displayName:'' });
});

/* GET Services page. */
router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Services',displayName:req.user?req.user.displayName:'' });
});

/* GET Projects page. */
router.get('/projects', function(req, res, next) {
  res.render('index', { title: 'Projects',displayName:req.user?req.user.displayName:'' });
});

/////////////////////////////
let indexController = require('../controllers/index');

/* GET login page. */
router.get('/login', indexController.displayLoginPage);
/* GET login page. */
router.post('/login', indexController.processLoginPage);
/* GET register page. */
router.get('/register', indexController.displayRegisterPage);
/* GET register page. */
router.post('/register', indexController.processRegisterPage);
/* GET logout. */
router.get('/logout', indexController.performLogout);


module.exports = router;

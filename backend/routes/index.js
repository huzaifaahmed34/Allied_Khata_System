var express = require('express');
var router = express.Router();
var login=require('../controllers/login');
const { body, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/signup',[body('name').not().isEmpty(),body('email').isEmail(),  body('password').not().isEmpty(), body('repassword').not().isEmpty()], login.Signup);

router.post('/login',[body('email').isEmail(),  body('password').not().isEmpty()], login.login);

module.exports = router;

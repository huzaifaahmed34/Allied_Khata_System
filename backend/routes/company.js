var express = require('express');
var router = express.Router();
let Company=require('../controllers/company');
/* GET home page. */
router.post('/add',Company.AddCompany);
router.get('/',Company.showCompany);


router.get('/edit',Company.editCompany);
router.get('/manageredit',Company.editCompanyManager);
router.post('/update',Company.updateCompany);
router.post('/managerupdate',Company.updateCompanyManager);
router.get('/delete',Company.DeleteCompany);
router.get('/deleteManager',Company.DeleteCompanyManager);
  


module.exports = router;

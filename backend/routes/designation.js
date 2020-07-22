var express = require('express');
var router = express.Router();
let Designation=require('../controllers/designation');
/* GET home page. */
router.post('/add',Designation.AddDesignation);

router.get('/',Designation.ViewDesignation);
router.get('/edit',Designation.EditDesignation);
router.get('/delete',Designation.DeleteDesignation);
router.post('/update',Designation.UpdateDesignation);


module.exports = router;

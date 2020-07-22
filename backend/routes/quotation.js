var express = require('express');
var router = express.Router();
let Quotation=require('../controllers/quotation');
/* GET home page. */
router.post('/generate',Quotation.GenerateQuotation);
router.get('/last-quotation',Quotation.ViewLastQuotation);
router.get('/',Quotation.ViewQuotation);
router.get('/edit',Quotation.EditQuotation);
router.get('/quotationedit',Quotation.EditQuotationDetails);

router.post('/update',Quotation.updateQuotation);
router.post('/updatequotation',Quotation.updateQuotationDetails)
router.get('/deletequotation',Quotation.deleteQuotationDetails);
router.get('/print-quotation-id',Quotation.PrintQuotationId);

module.exports = router;

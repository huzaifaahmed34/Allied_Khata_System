const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/quotationmanagment', {useNewUrlParser: true});
const db=mongoose.connection;
 
const QuotationSchema=new mongoose.Schema({
       
        company_id:mongoose.Schema.ObjectId,
        date:{type:String},
        remarks:{type:String},
        amount:{type:String},
        discount_perc:{type:String,default:0},
        discount_amount:{type:String,default:0},
        total_amount:{type:String},
        attention:{type:Number},
        net_amount:{type:String},
        quotation_valid:{type:String},
        quotation_details:{type:Array,default:null},
        created_at:{type:Date,default:Date.now},
        updated_at:{type:Date,default:null},
        deleted_at:{type:Date,default:null},
        is_deleted:{type:Number,default:0}
})

const Quotation=mongoose.model('Quotation',QuotationSchema);
module.exports=Quotation;
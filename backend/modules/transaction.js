const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/quotationmanagment', {useNewUrlParser: true});
const db=mongoose.connection;

const TransactionSchema=new mongoose.Schema({

    account_id:{type:mongoose.Schema.ObjectId,default:null},
    invoice_id:{type:mongoose.Schema.ObjectId,default:null},
    remarks:{type:String,default:null},
    amount:{type:String,default:null},
    created_at: {type:Date,default: Date.now},
    updated_at:{type:Date,default:''},
   
})

const Transaction=mongoose.model('Transactions',TransactionSchema);
module.exports=Transaction;
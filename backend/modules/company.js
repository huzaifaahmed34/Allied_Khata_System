const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/quotationmanagment', {useNewUrlParser: true});
const db=mongoose.connection;
 
const CompanySchema=new mongoose.Schema({
        type:{type:String},
        name:{type:String},
        city:{type:String},
        address:{type:String},
        email:{type:String},
        phone:{type:String},
        staff:{type:Array,default:null},
        created_at:{type:Date,default:Date.now},
        updated_at:{type:Date,default:null},
        deleted_at:{type:Date,default:null},
        is_deleted:{type:Number,default:0}
})

const Company=mongoose.model('Company',CompanySchema);
module.exports=Company;
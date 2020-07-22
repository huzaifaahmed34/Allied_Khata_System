const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/quotationmanagment', {useNewUrlParser: true});
const db=mongoose.connection;
 
const DesignationSchema=new mongoose.Schema({
        name:{type:String,required:true},
        created_at:{type:Date,default:Date.now},
        updated_at:{type:Date,default:''}
})

const Designation=mongoose.model('Designation',DesignationSchema);
module.exports=Designation;
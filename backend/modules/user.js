const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/quotationmanagment', {useNewUrlParser: true});
const db=mongoose.connection;

const UserSchema=new mongoose.Schema({
    name:String,
    email:{type:String,required:true},
    password:String,
    created_at: {type:Date,default: Date.now},
    updated_at:{type:Date,default:''},
})

const User=mongoose.model('User',UserSchema);
module.exports=User;
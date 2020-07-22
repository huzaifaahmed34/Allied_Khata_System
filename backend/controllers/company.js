
const mongoose=require('mongoose');
const Company=require('../modules/company');

 
exports.AddCompany=(req,res,next)=>{
    
const C=new Company({
    type:req.body.type,
    name:req.body.name,
    address:req.body.address,
    phone:req.body.phone,
    city:req.body.city,
    email:req.body.email,
    staff:req.body.staff

})
C.save((err)=>{
if(err){
    return res.status(500).json({
        status: 'error',
        message: err
      });
}
else{
    res.send('Data Inserted Successfully');
}
})

}

exports.showCompany=(req,res,next)=>{
let data=Company.find().sort({_id:-1});
data.exec((err,response)=>{
if(err){
return res.status(500).json({
    status:'error',
    message:err
})
} 
else{
res.send(response);
}
});
}
exports.editCompany=(req,res,next)=>{
    let data=Company.findOne({_id:req.query.id},{staff:0})
    data.exec((err,response)=>{
        if (err){
            return res.status(500).json({
                status:'error',
                message:err
            })
        }else{
            res.send(response);
        }
    })
}

exports.editCompanyManager=(req,res,next)=>{
 
    let data=Company.findOne({_id:req.query.id}, {staff: {$elemMatch: {id:parseInt(req.query.staffid)}}})
   
    data.exec((err,response)=>{
        if (err){
            return res.status(500).json({
                status:'error',
                message:err
            })
        }else{
            res.send(response);
        }
    })
}



exports.updateCompany=(req,res,next)=>{
 
    const Des=({
    
        name:req.body.name,
        address:req.body.address,
        phone:req.body.phone,
        city:req.body.city,
        email:req.body.email,
         
    })
    
    Company.findByIdAndUpdate(req.body._id,Des).exec((err)=>{
        if (err){
            return res.status(500).json({
                status: 'error',
                message: err
              });
        }
        res.send('Data Updated Successfully');
    });
    }




    exports.updateCompanyManager=(req,res,next)=>{
 
        const Des=({
            id:parseInt(req.body.id),
            name:req.body.name,
            designation:req.body.designation,
            phone:req.body.phone,
          
            email:req.body.email,
             
        })
     
      Company.updateOne(
            { _id: req.body.manager_id,
       staff: { $elemMatch: { id:parseInt(req.body.id)}}},
        { $set: { "staff.$" : Des } }
         ).exec((err)=>{
            if (err){
                return res.status(500).json({
                    status: 'error',
                    message: err
                  });
            }
            res.send('Data Updated Successfully');
        });
        }


    exports.DeleteCompany=(req,res,next)=>{ 
 
        const qry=Company.findByIdAndDelete(req.query.id);
       qry.exec((err,response)=>{
               if(err){
                   return response.status(500).json({
                       status: 'error',
                       message: err
                     });
               }
               res.send('Data Deleted Successfully');
       })
    }
    
       
    
exports.DeleteCompanyManager=(req,res,next)=>{ 

    const qry=Company.update({ _id: req.query.id},
      { $pull:{ staff:  { id:parseInt(req.query.manager_id)}}});
   qry.exec((err,response)=>{
           if(err){
               return response.status(500).json({
                   status: 'error',
                   message: err
                 });
           }
           res.send('Data Deleted Successfully');
   })
}
const mongoose=require('mongoose');
const Designation=require('../modules/designation');

exports.AddDesignation=(req,res,next)=>{
  
const Des=new Designation({
        name:req.body.name
})
Des.save((err)=>{
    if (err){
        return res.status(500).json({
            status: 'error',
            message: err
          });
    }
    res.send('Data Inserted Successfully');
});
}


exports.UpdateDesignation=(req,res,next)=>{
  
    const Des=({
            name:req.body.name
    })
    Designation.findByIdAndUpdate(req.body.id,Des).exec((err)=>{
        if (err){
            return res.status(500).json({
                status: 'error',
                message: err
              });
        }
        res.send('Data Updated Successfully');
    });
    }
exports.ViewDesignation=(req,res,next)=>{
 const qry=Designation.find({});
    qry.exec((err,response)=>{
            if(err){
                return response.status(500).json({
                    status: 'error',
                    message: err
                  });
            }
            res.send(response);
    })
}

exports.EditDesignation=(req,res,next)=>{ 
 
        const qry=Designation.findOne({_id:req.query.id});
       qry.exec((err,response)=>{
               if(err){
                   return response.status(500).json({
                       status: 'error',
                       message: err
                     });
               }
               res.send(response);
       })
   }
   exports.DeleteDesignation=(req,res,next)=>{ 
 
    const qry=Designation.findByIdAndDelete(req.query.id);
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




   
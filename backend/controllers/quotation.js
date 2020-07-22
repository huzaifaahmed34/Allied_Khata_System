const mongoose=require('mongoose');

let Quotation=require('../modules/quotation');
let Company=require('../modules/company');
const { ObjectID } = require('mongodb');
const { response } = require('express');
const { exists } = require('../modules/quotation');
const { DeleteDesignation } = require('./designation');

exports.GenerateQuotation=(req,res,next)=>{
 
let Q=new Quotation({
    company_id:req.body.customer,
date:req.body.date,
remarks:req.body.remarks,
discount_perc:req.body.t_disc_perc,
discount_amount:req.body.t_disc_amount,
attention:req.body.attention,
total_amount:req.body.total,
net_amount:req.body.net_amount,
quotation_details:req.body.quotation_details
})
Q.save((err)=>{
    if (err){
  res.send(err);
    }
    res.send('Data Inserted Successfully');
})
}  




exports.PrintQuotationId=(req,res,next)=>{
  let q=Quotation.aggregate([
      {
          $lookup:{
localField:'company_id',
from:'companies',
foreignField: '_id',
as:'c'
          }}, 
        {
              "$unwind" : { 
              "path" : "$c", 
              "preserveNullAndEmptyArrays" : false
              } },{ $project: 
              {
                date: 1,
                quotation_details: 1,
              remarks:1,
              discount_perc:1,
              discount_amount:1,
              total_amount:1,
              net_amount:1,
              'c.name':1,
              attention:1,
                "staff": 
                { 
                  $filter: 
                  { 
                    input: "$c.staff", 
                    as: "staff", 
                    cond: { $eq: [ '$$staff.id','$attention'] } 
                  } 
                } 
              }
          },{$match:{_id:ObjectID(req.query.id)}}]
      )
  q.exec((err,response)=>{
      res.send(response);
  })
}
exports.ViewLastQuotation=(req,res,next)=>{
    let q=Quotation.aggregate([
        {
            $lookup:{
  localField:'company_id',
  from:'companies',
  foreignField: '_id',
as:'c'
            }}, 
          {
                "$unwind" : { 
                "path" : "$c", 
                "preserveNullAndEmptyArrays" : false
                } },{ $project: 
                {
                  date: 1,
                  quotation_details: 1,
                remarks:1,
                discount_perc:1,
                discount_amount:1,
                total_amount:1,
                net_amount:1,
                'c.name':1,
                attention:1,
                  "staff": 
                  { 
                    $filter: 
                    { 
                      input: "$c.staff", 
                      as: "staff", 
                      cond: { $eq: [ '$$staff.id','$attention'] } 
                    } 
                  } 
                }
            },{$sort:{_id:-1}},{$limit:1}]
        )
    q.exec((err,response)=>{
        res.send(response);
    })
}

exports.ViewQuotation=(req,res,next)=>{
  let qry=Quotation.aggregate([{
    $lookup:{
      localField:'company_id',
      from:'companies',
     
      foreignField:'_id',
      as:'c'
    }},{$unwind:{path:'$c',preserveNullAndEmptyArrays:false}}]).sort({_id:-1});
  qry.exec((err,response)=>{
        if(err){
          res.send(err);
        }
        else{
          res.send(response);
        }
  })
}
exports.EditQuotation=(req,res,next)=>{
      let qry=Quotation.findOne({_id:req.query.id})
  qry.exec((err,response)=>{
            if(err){
              res.send(err)
            }
            else{
              res.send(response);
            }
  });
}
exports.EditQuotationDetails=(req,res,next)=>{
  let qry=Quotation.findOne({_id:req.query.id},{quotation_details:{$elemMatch:{id:parseInt(req.query.detail_id)}}});
  qry.exec((err,response)=>{
    if(err){
      res.send(err)
    }
    else{
      res.send(response);
    }
  })
}

exports.updateQuotation=(req,res,next)=>{
  
    let data={
      company_id:req.body.customer_name,
      date:req.body.date,
      remarks:req.body.remarks,
    
      discount_perc:req.body.discount_perc,
      discount_amount:req.body.discount_amount,
      total_amount:req.body.total,
    
      net_amount:req.body.net_amount,
    };
  let qry=Quotation.findByIdAndUpdate(req.body._id,data);
  qry.exec((err,response)=>{
    if(err){
      res.send(err);
    }
    else{
      res.send("Data Updated Successfully");
    }
  })
}

exports.updateQuotationDetails=(req,res)=>{
  console.log(req.body.productname);
 let Des={
  id:parseInt(req.body.detail_id),
    unit:req.body.unit,
   rate:req.body.rate,
   qty:req.body.qty,
   productname:req.body.productname,
   discount_perc:req.body.cdiscount_perc,
   discount_amount:req.body.cdiscount_amount,
   subtotal:req.body.subtotal
 }
 
let total_amount=parseInt(req.body.total_amount)+parseInt((parseInt(req.body.subtotal)-parseInt(req.body.total_hidden)));
let discount_amount=total_amount*(req.body.discount_perc/100);
let net_total=total_amount-discount_amount;
let qry=Quotation.updateOne({_id:req.body.id,'quotation_details.id':parseInt(req.body.detail_id)},{$set:{total_amount:total_amount,'quotation_details.$':Des,discount_amount:discount_amount,net_amount:net_total}
}

)
qry.exec((err,response)=>{
  if(err){
    res.send(err);
  }
  else{
    res.send('DAta Updated Successfully')
  }
})
  
}

exports.deleteQuotationDetails=(req,res)=>{
  
var total_amount=req.query.total_amount-req.query.subtotal;
let discount_amount=total_amount*(req.query.discount_perc/100);
let net_total=total_amount-discount_amount;
  
// $set:{total_amount:total_amount,discount_amount:discount_amount,net_amount:net_total}
let qry=Quotation.update({_id:req.query.id},{$set:{total_amount:total_amount,discount_amount:discount_amount,net_amount:net_total},$pull:{quotation_details:{id:parseInt(req.query.detail_id)}}});

qry.exec((err,response)=>{
  if(err){
    res.send(err);
  }
  else{
    res.send('DAta Updated Successfully')
  }
})
  
}


exports.deleteQuotation=(req,res)=>{
  let qry=Quotation.deleteOne({_id:req.query.id});
  qry.exec((err,response)=>{
    if(err){
      res.send(err);
    }
    else{
      res.send('DAta Updated Successfully')
    }
  });
}

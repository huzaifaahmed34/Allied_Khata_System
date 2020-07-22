const mongoose=require('mongoose');
const User=require('../modules/user');

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const { body, validationResult } = require('express-validator');
const keys = require("../config/keys");
exports.Signup=(req,res)=>{
    const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.send({ errors: errors.array() });
}
let name=req.body.name;
let email=req.body.email;
let password=req.body.password;
let repassword=req.body.repassword;


if(password===repassword){
qry=User.findOne({email:email});
qry.exec((err,response)=>{
    console.log(response);
    if(response){
            res.send('User Already Exist')
    }else{
        const hash = bcrypt.hashSync(password, saltRounds);
        let data=new User({
            name:name,
            email:email,
            password:hash
        })
        data.save((err)=>{
            if(err){
                res.send(err)
            }
            else{
                res.send('User Added Succesfully');
            }
        })
        
    }
})
}
else{
    res.send('Password Does not match');
}
}

exports.login=(req,res,next)=>{
        let email=req.body.email;
        let password=req.body.password;
        const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.send({ errors: errors.array() });
}
        let qry=User.findOne({email:email});
        qry.exec((err,response)=>{
            if(response){
                const match =  bcrypt.compareSync(password, response.password);
 
                if(match) {
                    const payload = {
                        id: qry.id,
                        name: qry.name
                      };
              // Sign token
                      jwt.sign(
                        payload,
                        keys.secretOrKey,
                        {
                          expiresIn: 31556926 // 1 year in seconds
                        },
                        (err, token) => {
                          res.json({
                            success: true,
                            token: "Bearer " + token
                          });
                        })

                }
                else{
                    res.send('Password is Incorrect');
                }
            }
            else{
                res.send('Email is Incorrect');
            }
        })
}
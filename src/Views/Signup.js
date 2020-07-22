import React, { Fragment ,useState, useEffect,useRef} from 'react';

import axios from 'axios';
import cs from '../assets/css/style.css';

import f from '../assets/fonts/material-icon/css/material-design-iconic-font.min.css';
import { useReactToPrint } from 'react-to-print';
import { useHistory, Link } from 'react-router-dom';
 
const Signup=()=>{
    const history=useHistory();
    let [input,handleInput]=useState({name:'',email:'',password:'',repassword:''});
    let [error,handleError]=useState({name:'',email:'',password:'',repassword:''});
    let [success,handleSuccess]=useState(null);
    useEffect(()=>{
        let token=localStorage.getItem('token');
        if(token!==null){
            history.push({pathname:'/'})
        }
        },[])
    const handleSubmit=(e)=>{
        e.preventDefault();
axios.post('http://localhost:3010/signup',input).then((res)=>{
    handleError({});
    console.log(res.data.errors);
    if(res.data.errors){
    res.data.errors.map(list=>{
           handleError(prev=>({...prev,[list.param]:'Required'})) 
        });
    }
    else{
   handleSuccess(res.data);
   if(res.data=='User Added Succesfully'){
   handleInput({name:'',email:'',password:'',repassword:''});
   setTimeout(()=>{
    history.push({
        pathname:'/login',
        state:{login:1}
           });
},600)

}

    }
})
    }
return(
    <React.Fragment>
 

<div class="main sigupcomponent mt-5 pb-0" >



<section class="signup">
    <div class="container">
        <div class="signup-content">
            <div class="signup-form">
                <h2 class="form-title">Sign up</h2>
                <div class={'alert alert-info'+(success==null?' d-none':' d-block')}> {success}</div>
                <span style={{color:'red'}}>{error.name}</span>
                <form onSubmit={(e)=>handleSubmit(e)} class="register-form" id="register-form">
                    <span ></span>
                    <div class="form-group">
                      
                        <label for="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                        <input type="text" name="name" id="name" value={input.name} onChange={(e)=>handleInput({...input,name:e.target.value})} placeholder="Your Name"/>
                      
                    </div>
<span style={{color:'red'}}>{error.email}</span>
                    <div class="form-group">
                      
                        <label for="email"><i class="zmdi zmdi-email"></i></label>
                        <input type="email" name="email" id="email" value={input.email} onChange={(e)=>handleInput({...input,email:e.target.value})} placeholder="Your Email"/>
                      
                    </div>
                    <span style={{color:'red'}} >{error.password} </span>
                    <div class="form-group">
                        <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                        <input type="password" name="password" value={input.password} id="pass" onChange={(e)=>handleInput({...input,password:e.target.value})} placeholder="Password"/>
                    </div>
<span style={{color:'red'}}>{error.repassword}</span>
                    <div class="form-group">
                        <label for="re-pass"><i class="zmdi zmdi-lock-outline"></i></label>
                        <input type="password" name="re_password" id="re_pass" value={input.repassword} onChange={(e)=>handleInput({...input,repassword:e.target.value})} placeholder="Repeat your password"/>
                    </div>
                 
                    <div class="form-group form-button">
                        <input type="submit" name="signup" id="signup" class="form-submit" value="Register"/>
                    </div>
                </form>
            </div>
            <div class="signup-image">
                <figure><img src="images/signup-image.jpg" alt="sing up image"/></figure>
                <Link to="login" class="signup-image-link">I am already member</Link>
            </div>
        </div>
    </div>
</section>
</div>
 
    </React.Fragment>
    )
    }

     export default Signup
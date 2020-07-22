import React, { Fragment ,useState, useEffect,useRef} from 'react';

import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import { useHistory, Link } from 'react-router-dom';
import cs from '../assets/css/style.css';

import f from '../assets/fonts/material-icon/css/material-design-iconic-font.min.css';
const Login=()=>{
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
axios.post('http://localhost:3010/login',input).then((res)=>{
    handleError({});
    console.log(res.data.errors);
    if(res.data.errors){
    res.data.errors.map(list=>{
           handleError(prev=>({...prev,[list.param]:'Field Required'})) 
        });
    }
    else{
//    
   if(res.data.success){
  
    handleInput({name:'',email:'',password:'',repassword:''});
    localStorage.setItem('token', res.data.token);
    setTimeout(()=>{
    history.push({pathname:'/'});
    },600);
   }
   else{
   
    handleSuccess(res.data);
   }
//    if(res.data=='User Added Succesfully'){
//   
//    setTimeout(()=>{
//     history.push({
//         pathname:'/login',
//         state:{login:1}
//            });
// },600)

// }

    }
})
    }
return(
    <React.Fragment>
 

<div class="main sigupcomponent mt-4">

<section class="sign-in">
            <div class="container">
                <div class="signin-content">
                    <div class="signin-image">
                        <figure><img src="images/signin-image.jpg" alt="sing up image"/></figure>
                        <Link to="/signup" class="signup-image-link">Create an account</Link>
                    </div>

                    <div class="signin-form">
                        <h2 class="form-title">Sign In</h2>
                        <div class={'alert alert-danger'+(success==null?' d-none':' d-block')}> {success}</div>
                <form onSubmit={(e)=>handleSubmit(e)} class="register-form" id="register-form">
                            <span style={{color:'red'}}>{error.email} </span> <div class="form-group">
                                <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="email" name="email" id="your_name" value={input.email} onChange={(e)=>handleInput({...input,email:e.target.value})}  placeholder="Your Email"/>
                            </div>
                            <span style={{color:'red'}}>{error.password} </span>
                            <div class="form-group">
                                <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                                <input type="password" name="password" value={input.password} onChange={(e)=>handleInput({...input,password:e.target.value})}  id="your_pass" placeholder="Password"/>
                            </div>
                            <div class="form-group">
                                <input type="checkbox" name="remember-me" id="remember-me" class="agree-term" />
                                <label for="remember-me" class="label-agree-term"><span><span></span></span>Remember me</label>
                            </div>
                            <div class="form-group form-button">
                                <input type="submit" name="signin" id="signin" class="form-submit" value="Log in"/>
                            </div>
                        </form>
                  
                    </div>
                </div>
            </div>
        </section>
</div> 
    </React.Fragment>
    )
    }

     export default Login
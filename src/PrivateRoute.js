import React, { useState ,useContext, useEffect } from 'react';
 
import Dashboard from './Views/Dashboard';
 
import { BrowserRouter, Route, Switch ,Redirect} from 'react-router-dom';
import AddDesignation from './Views/AddDesignation';
import AddCompany from './Views/AddCompany';

import ViewCompany from './Views/ViewCompany';
import GenerateQuotation from './Views/GenerateQuotation';
import QuotationPrint from './Views/QuotationPrint';
import ViewQuotation from './Views/ViewQuotation';
 
import Login from './Views/Login';
import Signup from './Views/Signup';

const PrivateRoute=()=> {
    const existingTokens = localStorage.getItem("token");
    console.log(existingTokens);
    let [token,settoken]=useState({});
    useEffect(()=>
 { 
     
    
if(existingTokens){
    settoken({'login':true});
}
},[])
    return (

        <React.Fragment>

<Route  path='/signup'  component={Signup}/>
 
<Route  path='/login'  component={Login}/>
 
   <React.Fragment>
       <Route exact path='/'  component={Dashboard}/>
        <Route exact path='/add-designation'  component={AddDesignation}/>
        <Route exact path='/add-company'  component={AddCompany}/>
        <Route exact path='/view-company'  component={ViewCompany}/>
        <Route exact path='/generate-quotation'  component={GenerateQuotation}/>
        <Route exact path='/print-quotation'  component={QuotationPrint}/>    
        <Route exact path='/view-quotation'  component={ViewQuotation}/> 
        </React.Fragment> 
   
        </React.Fragment>
     
    )
}
export default PrivateRoute
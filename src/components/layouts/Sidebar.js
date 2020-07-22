import React from 'react';
import {  NavLink } from 'react-router-dom';
const Sidebar=()=>{

return (
    <React.Fragment>
<div className="sidebar" data-image="../assets/img/sidebar-5.jpg">
       
<div className="sidebar-wrapper">
    <div className="logo">
        <NavLink to="/" className="simple-text">
            Huzaifa Ahmed
        </NavLink>
    </div>
    <ul className="nav">
        <li className="nav-item active">
            <NavLink className="nav-link" to="/">
                <i className="nc-icon nc-chart-pie-35"></i>
                <p>Dashboard</p>
            </NavLink>
        </li>
        
        <li class="nav-item sidedrop ">
            <a class="nav-link collapsed" data-toggle="collapse" href="#pagesExamples1" aria-expanded="false">
            <i className="nc-icon nc-circle-09"></i>
            <i className="nc-icon nc-stre-down " ></i>       <p>  Designation
            
              
              </p>
            </a>
            <div class="collapse" id="pagesExamples1" >
              <ul class="nav">
                <li class="nav-item ">
                <NavLink  to="/add-designation" className="nav-link">
                  <i className="nc-icon nc-circle-09"></i>
                    <span class="sidebar-normal"> Add Desigantion </span>
                </NavLink>
                </li>
        
              
              </ul>
            </div>
          </li>

     
        
          <li class="nav-item sidedrop ">
            <a class="nav-link collapsed" data-toggle="collapse" href="#pagesExamples2" aria-expanded="false">
            <i className="nc-icon nc-circle-09"></i>
            <i className="nc-icon nc-stre-down " ></i>       <p>  Company
            
              
              </p>
            </a>
            <div class="collapse" id="pagesExamples2" >
              <ul class="nav">
                <li class="nav-item ">
                <NavLink  to="/add-company" className="nav-link">
                  <i className="nc-icon nc-circle-09"></i>
                    <span class="sidebar-normal"> Add Company </span>
                </NavLink>
                </li>
                <li class="nav-item ">
                <NavLink  to="/view-company" className="nav-link">
                  <i className="nc-icon nc-circle-09"></i>
                    <span class="sidebar-normal"> View Company </span>
                </NavLink>
                </li>
        
              
              </ul>
            </div>
          </li>



          <li class="nav-item sidedrop ">
            <a class="nav-link collapsed" data-toggle="collapse" href="#pagesExamples3" aria-expanded="false">
            <i className="nc-icon nc-circle-09"></i>
            <i className="nc-icon nc-stre-down " ></i>       <p>  Quotation
            
              
              </p>
            </a>
            <div class="collapse" id="pagesExamples3" >
              <ul class="nav">
                <li class="nav-item ">
                <NavLink  to="/generate-quotation" className="nav-link">
                  <i className="nc-icon nc-circle-09"></i>
                    <span class="sidebar-normal">Generate Quotation </span>
                </NavLink>
                </li>
                <li class="nav-item ">
                <NavLink  to="/view-quotation" className="nav-link">
                  <i className="nc-icon nc-circle-09"></i>
                    <span class="sidebar-normal"> View Quotation </span>
                </NavLink>
                </li>
        
              
              </ul>
            </div>
          </li>

     
 
    </ul>
</div>
</div>
</React.Fragment>
)
}

export default Sidebar;

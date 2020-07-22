
import React, { Fragment, useEffect } from 'react';
import Sidebar from '../components/layouts/Sidebar';
import Navbar from '../components/layouts/Navbar';
 
import { useHistory } from 'react-router-dom';
const Dashboard=()=>{
    const history=useHistory();
    useEffect(()=>{
        let token=localStorage.getItem('token');
      
        if(token==null){
            history.push({pathname:'/login'})
        }
        },[])
    return (
        <Fragment>
                 
                 <Sidebar/>  
     
        
     <div className="main-panel">
     <Navbar/>
<div className="content">
                <div className="container-fluid">
                
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card ">
                                <div className="card-header ">
                                    <h4 className="card-title">STATIC CHART</h4>
                                    <p className="card-category">All products including Taxes</p>
                                </div>
                                <div className="card-body ">
                                    <div id="chartActivity" className="ct-chart"></div>
                                </div>
                                <div className="card-footer ">
                                    <div className="legend">
                                        <i className="fa fa-circle text-info"></i> Tesla Model S
                                        <i className="fa fa-circle text-danger"></i> BMW 5 Series
                                    </div>
                                    <hr />
                                    <div className="stats">
                                        <i className="fa fa-check"></i> Data information certified
                                    </div>
                                </div>
                        
                        
                    
                                <div className="card-footer ">
                                    <hr/>
                                    <div className="stats">
                                        <i className="now-ui-icons loader_refresh spin"></i> Updated 3 minutes ago
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </Fragment>
       )
    }
    export default Dashboard
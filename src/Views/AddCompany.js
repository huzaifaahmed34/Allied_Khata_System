
import React, { Fragment ,useState, useEffect,useRef} from 'react';
import axios from 'axios';
import Sidebar from '../components/layouts/Sidebar';
import Navbar from '../components/layouts/Navbar';
import * as $ from 'jquery'
import DeleteModal from '../components/DeleteModal';
import { error } from 'jquery';
import { useHistory } from 'react-router-dom';
const AddCompany=()=>{
    const history=useHistory();
    useEffect(()=>{
        let token=localStorage.getItem('token');
      
        if(token==null){
            history.push({pathname:'/login'})
        }
        },[])
    let managername=useRef();
    let manageremail=useRef();
    let managerdesignation=useRef();
    let managerphone=useRef();
   let [count,setCount]=useState(1);
    let [input,handleInput]=useState({type:'',name:'',phone:'',email:'',city:'',address:'',staff:[]});
    let [designation,handleDesignation]=useState([]);
    let [divhide,setdiv]=useState('d-none');
    let [errors,handleError]=useState({name:'',email:'',type:'',phone:'',address:'',city:''});
    let [errors1,handleError1]=useState({name:'',email:'',designation:'',phone:''});
    let [successhide,handleSuccesshide]=useState('d-none');
    useEffect(()=>{
            axios.get('http://localhost:3010/designation/').then((res)=>{
                handleDesignation(res.data);
            })
    },[]);

    const deleteRow=(id)=>{
        const delrow=input.staff.filter(l=>id!=l.id);
  
    handleInput({...input,staff:delrow
        })
    } 
   const handleAdd=()=>{
    input.name==''?handleError(prev=>({...prev,name:'is-invalid'})):handleError(prev=>({...prev,name:''}));
    input.type==''?handleError(prev=>({...prev,type:'is-invalid'})):handleError(prev=>({...prev,type:''}));
    input.phone==''?handleError(prev=>({...prev,phone:'is-invalid'})):handleError(prev=>({...prev,phone:''}));
    input.email==''?handleError(prev=>({...prev,email:'is-invalid'})):handleError(prev=>({...prev,email:''}));
    input.city==''?handleError(prev=>({...prev,city:'is-invalid'})):handleError(prev=>({...prev,city:''}));
    input.address==''?handleError(prev=>({...prev,address:'is-invalid'})):handleError(prev=>({...prev,address:''}));
if( managerdesignation.current.value==''){
handleError1(prev=>({...prev,cd:'is-invalid'}))
 
}
else{
    handleError1(prev=>({...prev,designation:''}))
}
if( managerphone.current.value==''){
    handleError1(prev=>({...prev,phone:'is-invalid'}))
}
else{
    handleError1(prev=>({...prev,phone:''}))
}
if( manageremail.current.value==''){
    handleError1(prev=>({...prev,email:'is-invalid'}))
}
else{
    handleError1(prev=>({...prev,email:''}))
}
if( managername.current.value==''){
    handleError1(prev=>({...prev,name:'is-invalid'}))
}
else{
    handleError1(prev=>({...prev,name:''}))
}
 
if(managerphone.current.value=='' ||  managername.current.value=='' || manageremail.current.value=='' || managerdesignation.current.value=='' 
|| input.name=='' || input.email=='' || input.city=='' || input.address=='' || input.type=='' || input.phone==''){
  
    
}
else{
    handleInput({...input,
        staff:[
            ...input.staff,{
            id:count,
            designation: managerdesignation.current.value,
            name: managername.current.value,
            email: manageremail.current.value,
            phone: managerphone.current.value

        }
    ]
    })
;
    setCount(prev=>prev+1);
    managerphone.current.value=''; 
    managername.current.value=''; 
    manageremail.current.value=''; 
 managerdesignation.current.value='';
}    
} 
   const handleSubmit=(e)=>{
e.preventDefault();
input.name==''?handleError(prev=>({...prev,name:'is-invalid'})):handleError(prev=>({...prev,name:''}));
input.type==''?handleError(prev=>({...prev,type:'is-invalid'})):handleError(prev=>({...prev,type:''}));
input.phone==''?handleError(prev=>({...prev,phone:'is-invalid'})):handleError(prev=>({...prev,phone:''}));
input.email==''?handleError(prev=>({...prev,email:'is-invalid'})):handleError(prev=>({...prev,email:''}));
input.city==''?handleError(prev=>({...prev,city:'is-invalid'})):handleError(prev=>({...prev,city:''}));
input.address==''?handleError(prev=>({...prev,address:'is-invalid'})):handleError(prev=>({...prev,address:''}));

if(input.name=='' || input.email=='' || input.city=='' || input.address=='' || input.type=='' || input.phone==''){
   }
   else{
       axios.post('http://localhost:3010/company/add',input).then((res)=>{
       handleInput({type:'',name:'',phone:'',email:'',city:'',address:'',staff:[]});
       setCount(1);
       handleError({name:'',email:'',type:'',phone:'',address:'',city:''});
      handleError1({name:'',email:'',designation:'',phone:''});
      handleSuccesshide('');
      const timer = setTimeout(() => {
        handleSuccesshide('d-none')
      }, 3000)
       })
   }

   }
   const handleType=(e)=>{
       let name=e.target.value;
    handleInput({...input,type:name});
if(name=='Individual'){
setdiv('d-none')
}
else if(name=='Company'){
setdiv('')
}
else if(name==''){
setdiv('d-none');
}
   }
return(
    <Fragment>
                  
                  <Sidebar/>  
     
        
     <div className="main-panel">
     <Navbar/>
    <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title">Add Company</h4>
                                    </div>
                                    <form onSubmit={(e)=>handleSubmit(e)}>
                                    <div className="card-body">
                                        <div className="row">
                               
                                            <div className="col-md-12 ">
                                            <div className={'alert alert-success '+successhide}  >
                                            <button type="button" aria-hidden="true" class="close" data-dismiss="alert">
                                                <i class="nc-icon nc-simple-remove"></i>
                                            </button>
                                            <span>
                                                <b> Data Inserted Successfully</b></span>
                                        </div>
                                    
                                        </div></div>
                                     
                               
    
                                            <div className="row">
                                
                                                <div className="col-md-3 ">
                                                <div className="form-group">
                                                        <label>Select Type</label>
             <select type="text" id="type" value={input.type} onChange={(e)=>handleType(e)} className={"form-control "+errors.type} >
            <option value="">Select Type</option>
            <option value="Individual">Individual</option>
            <option value="Company">Company</option>
            </select>
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                <div className="col-md-3 ">
                                                <div className="form-group">
                                                        <label>FullName</label>
        <input type="text" id="name"  value={input.name} onChange={(e)=>handleInput({...input,name:e.target.value})} className={"form-control "+errors.name}   placeholder="Enter FullName" />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                <div className="col-md-3 ">
                                                <div className="form-group">
                                                        <label>Phone Number</label>
        <input type="number" id="phone"  value={input.phone} onChange={(e)=>handleInput({...input,phone:e.target.value})} className={"form-control "+errors.phone}  placeholder="Enter  Phone Number" />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>

                                                <div className="col-md-3 ">
                                                <div className="form-group">
                                                        <label>Email</label>
        <input type="email" id="email" value={input.email} onChange={(e)=>handleInput({...input,email:e.target.value})} className={"form-control "+errors.email}  placeholder="Enter Email" />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                </div>
                                                <div className="row ">
                                                <div className="col-md-3 ">
                                                <div className="form-group">
                                                        <label>City</label>
        <input type="text" id="city"  value={input.city} onChange={(e)=>handleInput({...input,city:e.target.value})} className={"form-control "+errors.city}  placeholder="Enter City " />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                <div className="col-md-9 ">
                                                <div className="form-group">
                                                        <label>Address</label>
        <textarea type="text" id="address"   value={input.address} onChange={(e)=>handleInput({...input,address:e.target.value})}  className={"form-control "+errors.address}  placeholder="Enter  Full Address" ></textarea>
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                
                                               </div> 
                                               <div className={"row mt-0 "+divhide} >
                                                   <div className="col-md-12">

                                                       <h4 className="mt-0">Add Manager</h4>
                                                   </div>
                                                   </div>
                                                   <div className={"row mt-0 "+divhide} >
                                                   <div className="col-md-3 ">
                                                <div className="form-group">
                                                        <label>Select Designation</label>
        <select type="text" id="designation"    ref={managerdesignation} className={'form-control '+errors1.designation} >
        <option value="">Select Designation</option>
        {designation.map((list)=>{
return(
    <option value={list.id}>{list.name}</option>
 
         )
        })} 
            </select>
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                <div className="col-md-3 ">
                                                <div className="form-group">
                                                        <label>Name</label>
        <input type="text" id="managername"    ref={managername} className={'form-control '+errors1.name}  placeholder="Enter Name " />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                <div className="col-md-3 ">
                                                <div className="form-group">
                                                        <label>Email</label>
        <input type="email" id="manageremail" ref={manageremail}  className={'form-control '+errors1.email}  placeholder="Enter Email " />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                <div className="col-md-2 ">
                                                <div className="form-group">
                                                        <label>Phone</label>
        <input type="number" id="managerphone"   ref={managerphone} className={'form-control '+errors1.phone}  placeholder="Enter Phone # " />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                <div className="col-md-1">
                     <button type="button" className="btn btn-primary mt-4 btn-fill" onClick={()=>handleAdd()} title="Add Manager"><i className="fa fa-plus"></i></button>  </div>
                                                    
                                                
                                               </div>
                                       
                                               <div className={"row "+divhide}>
                                               <div className="col-md-12">
            <table className="table">
                <thead>
                    <tr>
                        <th>Sno</th>
                      
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Designation</th>
                        <th>Action</th>
                        </tr>
                </thead>
                <tbody>
                    {
                        input.staff.map((list,index)=>{
                            return(
                                <tr>
                                    <td>{++index}</td>
                                    <td>{list.name}</td>
                                    <td>{list.email}</td>
                                    <td>{list.phone}</td>
                                    <td>{list.designation}</td>
                                    <td><a className="btn btn-danger  text-light btn-sm btn-fill" onClick={()=>deleteRow(list.id)} >Remove</a></td>
                                </tr>
                            )
                        })
                    }
                    
                </tbody>
            </table>
                                                    
                                                </div>
                                               </div>
                                               <div className="row">         

          <div className="col-md-2 ">
            <button type="submit" className="btn btn-info btn-fill ">Submit</button>
                                                
                                                </div>
                                             
                                                </div>
                                          
                                                </div>
                                            </form>
                                        
                                           
                                 
                                </div>
                            </div>
                            
                            </div>
                       
                        </div>
                    </div>
                  </div>
            </Fragment>  

)


}


export default AddCompany;

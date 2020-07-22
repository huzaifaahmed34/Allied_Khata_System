import React, { Fragment ,useState, useEffect,useRef} from 'react';
import axios from 'axios';
import Sidebar from '../components/layouts/Sidebar';
import Navbar from '../components/layouts/Navbar';
import * as $ from 'jquery'
import DeleteModal from '../components/DeleteModal';
import { useHistory } from 'react-router-dom';

const ViewCompany=()=>{
    const history=useHistory();
    useEffect(()=>{
        let token=localStorage.getItem('token');
      
        if(token==null){
            history.push({pathname:'/login'})
        }
        },[])
  
    let [input,handleInput]=useState({_id:'',type:'',name:'',phone:'',email:'',city:'',address:''});  
   
    const [updatedata,handleInputUpdate]=useState({id:'',name:''});
  
    let [successhide1,handleSuccessHide1]=useState('d-none');
    let [errors,handleValidation]=useState({name:''});
    let [data1,showdata]=useState([]);
    let [editmodalhide,changeModal]=useState({display:'none'});
    let [deleteid,changedeleteid]=useState('');
    let [deleteManagerid,changemanagerdeleteid]=useState(''); 
    const inputEl = useRef(null);
    const inputEl1 = useRef(null);
    let [designation,handleDesignation]=useState([]);
   const closeDelete=useRef(null);
   const closeDelete1=useRef(null);
   let name=useRef(null);
   let address=useRef(null);
   let email=useRef(null);
   let city=useRef(null);
   let phone=useRef(null);
   let editid=useRef(null);
  let  managerdesignation=useRef(null);
  let  managername=useRef(null);
  let  managerphone=useRef(null);
  let  manageremail=useRef(null);
  let  managerid=useRef(null);
  let  managereditid=useRef(null);
   useEffect(()=>{
    axios.get('http://localhost:3010/designation/').then((res)=>{
        handleDesignation(res.data);
    })
},[]);

    // FOr GET TABLE DATA //
   useEffect(()=>{
    
    axios.get('http://localhost:3010/company/').then((res)=>{
        
        $('#example1').DataTable().destroy();
   showdata(res.data)
   $('#example1').DataTable({
    dom: 'Bfrtip',
    buttons: [
     'copy', 'excel', 'pdf','csv','print'
 ], "paging": true,
 "pageLength": 20,
   "lengthChange": false,
   "searching": true,
   "ordering": false,
   "info": true,
   "autoWidth": false,
  });
}) 
 
},[successhide1]);


     
// FOR UPDATE DATA //
   const handleSubmitUpdate=(e)=>{ 
  
axios.post('http://localhost:3010/company/update',
{   _id:editid.current.value,
    name:name.current.value, 
    address:address.current.value,
    city:city.current.value,
    phone:phone.current.value,
    email:email.current.value}
    ).then(res=>{
   
   inputEl.current.click();
 handleSuccessHide1('');
 const timer = setTimeout(() => {
     handleSuccessHide1('d-none')
   }, 3000)
 
})

}
     
// FOR UPDATE DATA //
const handleManagerUpdate=(e)=>{ 
  
    axios.post('http://localhost:3010/company/managerupdate',
    {   id:managereditid.current.value,
        name:managername.current.value, 
        designation:managerdesignation.current.value,
       
        phone:managerphone.current.value,
        email:manageremail.current.value,
    manager_id:managerid.current.value}
        ).then(res=>{
       
       inputEl1.current.click();
     handleSuccessHide1('');
     const timer = setTimeout(() => {
         handleSuccessHide1('d-none')
       }, 3000)
     
    })
    
    }


 
// For Edit Data //
const editData=(id)=>{
    [name.current.value,address.current.value, city.current.value,phone.current.value, editid.current.value,email.current.value]='';
    handleInput({name:'',phone:'',email:'',city:'',address:''});  
axios.get('http://localhost:3010/company/edit',
        {params: { id: id  },
}).then((res)=>{
    [name.current.value,address.current.value, city.current.value,phone.current.value, editid.current.value,email.current.value]=[res.data.name,res.data.address,res.data.city,res.data.phone,res.data._id,res.data.email];
 
      

})
}

// For Edit Manager Data //
const editManagerData=(id,staffid)=>{
    
    [managername.current.value,managerdesignation.current.value,managerphone.current.value,managereditid.current.value,manageremail.current.value]='';
 
axios.get('http://localhost:3010/company/manageredit',
        {params: { id: id ,staffid:staffid},
}).then((res)=>{
  
     [managername.current.value,managerdesignation.current.value,managerphone.current.value,managereditid.current.value,manageremail.current.value,managerid.current.value]=[res.data.staff[0].name,res.data.staff[0].designation,res.data.staff[0].phone,res.data.staff[0].id,res.data.staff[0].email,res.data._id];
 
      

})
}

// For Delete Manager Data
const setdeleteManager=(id,managerid)=>{
    changemanagerdeleteid({id:id,manager_id:managerid});
    }
const deleteManagerData=()=>{
 
    axios.get('http://localhost:3010/company/deleteManager',{params:{
        id:deleteManagerid.id,
        manager_id:deleteManagerid.manager_id
    }}).then((res)=>{
        console.log(res);
        closeDelete1.current.click();
        handleSuccessHide1('');
        const timer = setTimeout(() => {
            handleSuccessHide1('d-none')
          }, 3000)
    })

}



//For Delete Data///
const setdelete=(id)=>{
changedeleteid(id);
}



const deleteData=()=>{
   
    axios.get('http://localhost:3010/company/delete',{params:{
        id:deleteid
    }}).then((res)=>{
        closeDelete.current.click();
        handleSuccessHide1('');
        const timer = setTimeout(() => {
            handleSuccessHide1('d-none')
          }, 3000)
    })

}

let tabledata;



    return (
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
                                    <h4 className="card-title">View Company</h4>
                                </div>
                                <div className="card-body">
                                <div className="row">
                           
                           <div className="col-md-12 ">
                           <div className={'alert alert-success '+successhide1} >
                           <button type="button" aria-hidden="true" class="close" data-dismiss="alert">
                               <i class="nc-icon nc-simple-remove"></i>
                           </button>
                           <span>
                               <b> Data Updated Successfully</b></span>
                       </div>
                   
                       </div></div>
                                        <div className="row">
                                            <div className="col-lg-12 ">
                                            <div className="table-responsive">
                                            <table id="example1" class="table table-bordered table-striped table-sm " >
                    <thead>
                                        <tr>
                                        <th  scope="col"  >Sno</th>
                                        <th scope="col"  >Type</th>
                                        <th scope="col"  >Designation</th>
                                        <th scope="col"  >Name</th>
                                        <th scope="col"  >Email</th>
                                        <th scope="col"  >Phone</th>
                                        <th scope="col"  >City</th>
                                        <th scope="col"  >Address</th>
                                    
                                          
                                            <th scope="col"   >Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                   { data1.map((list,index)=>{
       
  
    return (
        <Fragment>
        <tr scope="row" key={index}>

        <td >{++index}</td>
        <td  >{list.type}</td>
        <td  > </td>
        <td  >{list.name}</td>
        <td  >{list.email}</td>
        <td  >{list.phone}</td>
        <td  >{list.city}</td>
        <td  >{list.address}</td>
        
       
      
        <td  className="border-0"><a href="javascript:;" data-toggle="modal" data-target="#myModal1" onClick={()=>editData(list._id)}  ><i className="fa fa-edit text-info"></i></a> <a href="javascript:;"  onClick={()=>setdelete(list._id)} data-toggle="modal" data-target="#deleteModal" > <i className="fa fa-trash text-danger"></i></a></td>
        </tr>

       {list.staff.length>0?
           list.staff.map((l)=>{
           return ( 
           <tr >
                <td className="p-1"></td>
           <td className="p-1"></td>
                    <td className="p-1" >{l.designation}</td>
                    <td  className="p-1">{l.name}</td>
                    <td  className="p-1">{l.email}</td>
                    <td  className="p-1">{l.phone}</td>
                    <td className="p-1"></td>
                    <td className="p-1"></td>
                    <td className="py-1 border-0" ><a href="javascript:;" data-toggle="modal" data-target="#myModal2" onClick={()=>editManagerData(list._id,l.id)}  ><i className="fa fa-pencil text-info"></i></a> <a href="javascript:;"  onClick={()=>setdeleteManager(list._id,l.id)} data-toggle="modal" data-target="#deleteModal1" > <i className="fa fa-times text-danger"></i></a></td>
    
                </tr>
            );
                }):''
            }</Fragment>
    
    
       )
})
                                         }
                                          
                                        </tbody>
                                    </table>
        
     

</div>
                                            </div>
                                             
                                           
                                        </div>
                                   
                                      
                                         
                                    
                                </div>
                            </div>
                        </div>
                        
                        </div>
                    </div>
                </div>
                <div class='modal fade 'id="myModal1" >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
      
       
        <div class="modal-header">
          <h4 class="modal-title mt-0">Edit Company</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
         <input  ref={editid} id="id" type="hidden"/>
        <div class="modal-body">
       <div className="row">
                                                <div className="col-md-4 ">
                                                <div className="form-group">
                                                        <label>FullName</label>
        <input type="text" id="name"   ref={name} className={"form-control "+errors.name}   placeholder="Enter FullName" />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                <div className="col-md-4 ">
                                                <div className="form-group">
                                                        <label>Phone Number</label>
        <input type="number" id="phone"   ref={phone}  className={"form-control "+errors.phone}  placeholder="Enter  Phone Number" />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>

                                                <div className="col-md-4 ">
                                                <div className="form-group">
                                                        <label>Email</label>
        <input type="email" id="email"   ref={email} className={"form-control "+errors.email}  placeholder="Enter Email" />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                </div>
                                                <div className="row ">
                                                <div className="col-md-3 ">
                                                <div className="form-group">
                                                        <label>City</label>
        <input type="text" id="city"    ref={city} className={"form-control "+errors.city}  placeholder="Enter City " />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                <div className="col-md-9 ">
                                                <div className="form-group">
                                                        <label>Address</label>
        <textarea type="text" id="address"     ref={address} className="form-control "  placeholder="Enter  Full Address" ></textarea>
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                
                                            
        </div></div>
        
       
        <div class="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal" ref={inputEl}>Close</button>
          <button type="button" className="btn btn-info btn-fill" onClick={()=>handleSubmitUpdate()} >Submit</button>
        </div>
        
      </div>
    </div>
  </div>
 
  <div class='modal fade 'id="myModal2" >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
      
       
        <div class="modal-header">
          <h4 class="modal-title mt-0">Edit Company Managers                                                                                       </h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
         <input  ref={managereditid} id="managereditid" type="hidden"/>
         <input  ref={managerid} id="managereditid" type="hidden"/>
        <div class="modal-body">
       <div className="row">
       <div className="col-md-4 ">
                                                <div className="form-group">
                                                        <label>Designation</label>
                                                        <select type="text" id="designation"    ref={managerdesignation} className={'form-control '} >
        <option value="">Select Designation</option>
        {designation.map((list)=>{
return(
    <option value={list.name}>{list.name}</option>
 
         )
        })} 
            </select>   </div>
                                                    
                                                </div>
                                                <div className="col-md-4 ">
                                                <div className="form-group">
                                                        <label>FullName</label>
        <input type="text" id="FullName"   ref={managername} className={"form-control "+errors.name}   placeholder="Enter FullName" />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                <div className="col-md-4 ">
                                                <div className="form-group">
                                                        <label>Phone Number</label>
        <input type="number" id="Number"   ref={managerphone}  className={"form-control "+errors.phone}  placeholder="Enter  Phone Number" />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>

                                                <div className="col-md-4 ">
                                                <div className="form-group">
                                                        <label>Email</label>
        <input type="email" id="Email1"   ref={manageremail} className={"form-control "+errors.email}  placeholder="Enter Email" />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                </div>
                                                 
                                               
                                                
                                            
        </div>
       
        
       
        <div class="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal" ref={inputEl1}>Close</button>
          <button type="button" className="btn btn-info btn-fill" onClick={()=>handleManagerUpdate()} >Submit</button>
        </div>
        
      </div>
    </div></div>
    </div>
    <DeleteModal name="Company Manager" deleteData={()=>deleteManagerData()} closeDelete={closeDelete1} id='deleteModal1'/>
       <DeleteModal name="Company" deleteData={()=>deleteData()} closeDelete={closeDelete} id='deleteModal'/>
        </Fragment>  
    )}

    export default ViewCompany
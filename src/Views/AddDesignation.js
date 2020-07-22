
import React, { Fragment ,useState, useEffect,useRef} from 'react';
import axios from 'axios';
import Sidebar from '../components/layouts/Sidebar';
import Navbar from '../components/layouts/Navbar';
import * as $ from 'jquery'
import DeleteModal from '../components/DeleteModal';
import { useHistory } from 'react-router-dom';

const AddDesignation=()=>{
    const history=useHistory();
    useEffect(()=>{
        let token=localStorage.getItem('token');
      
        if(token==null){
            history.push({pathname:'/login'})
        }
        },[])
    const header = [
        { title: 'Sno', prop: 'sno', sortable: true,filterable: true },
        { title: 'Name', prop: 'name', sortable: true,filterable: true },
        { title: 'Action', prop: 'action', sortable: true,filterable: true },
      
      ];
     
const classes = {
    table: 'table-striped table-hover ',
    
    
  };
    const [input,handleInput]=useState({name:''});
    
    const [updatedata,handleInputUpdate]=useState({id:'',name:''});
    let [successhide,handleSuccessHide]=useState('d-none');
    let [successhide1,handleSuccessHide1]=useState('d-none');
    let [errors,handleValidation]=useState({name:''});
    let [data1,showdata]=useState([]);
    let [editmodalhide,changeModal]=useState({display:'none'});
    let [deleteid,changedeleteid]=useState('');
    const inputEl = useRef(null);
   const closeDelete=useRef(null);
    // FOr GET TABLE DATA //
   useEffect(()=>{
    
    axios.get('http://localhost:3010/designation/').then((res)=>{
        
        $('#example1').DataTable().destroy();
   showdata(res.data)
   $('#example1').DataTable({
    dom: 'Bfrtip',
    buttons: [
     'copy', 'excel', 'pdf','csv','print'
 ], "paging": true,
   "lengthChange": false,
   "searching": true,
   "ordering": true,
   "info": true,
   "autoWidth": false,
  });
}) 
 
},[successhide1,successhide]);
// FOR HAndle Insert Inputs //
    const handleChange=(e)=>{
      handleInput({
        ...data1,
          [e.target.id]:e.target.value
      })
    }

    
// FOR Insert  DATA //
   const handleSubmit=(e)=>{
       
       e.preventDefault();
if(input.name==''){
handleValidation({...errors,name:'Name Required'});
}
else{
    handleValidation({...errors,name:''});
}
 
axios.post('http://localhost:3010/designation/add',input).then(res=>{
    handleSuccessHide('');
    handleInput({name:''});
    const timer = setTimeout(() => {
        handleSuccessHide('d-none')
      }, 3000)
    
})

   }

// FOR UPDATE DATA //
   const handleSubmitUpdate=(e)=>{ 
 
axios.post('http://localhost:3010/designation/update',updatedata).then(res=>{
   inputEl.current.click();
 handleSuccessHide1('');
 const timer = setTimeout(() => {
     handleSuccessHide1('d-none')
   }, 3000)
   handleInputUpdate({name:'',id:''});
})

}
//For Handle Update Input //
const updateData=(e)=>{ 
    handleInputUpdate({
        ...updatedata,
        [e.target.id]:e.target.value
    })
}

// For Edit Data //
const editData=(id)=>{
 
axios.get('http://localhost:3010/designation/edit',
        {params: { id: id  },
}).then((res)=>{
     
    handleInputUpdate({name:res.data.name,id:res.data._id})
})
}


//For Delete Data///
const setdelete=(id)=>{
changedeleteid(id);
}
const deleteData=()=>{
   
    axios.get('http://localhost:3010/designation/delete',{params:{
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
                                    <h4 className="card-title">Add Designation</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                           
                                        <div className="col-md-12 ">
                                        <div className={'alert alert-success '+successhide} >
                                        <button type="button" aria-hidden="true" class="close" data-dismiss="alert">
                                            <i class="nc-icon nc-simple-remove"></i>
                                        </button>
                                        <span>
                                            <b> Data Inserted Successfully</b></span>
                                    </div>
                                
                                    </div></div>
                                 
                                    <form onSubmit={(e)=>handleSubmit(e)}>

                                        <div className="row">
                            
                                            <div className="col-md-5 ">
                                            <div className="form-group">
                                                    <label>Enter Name</label>
    <input type="text" id="name" value={input.name || ''} onChange={(e)=>handleChange(e)} className="form-control" disabled="" placeholder="Enter Desgination Name" />
    <span className="text-danger">{errors.name || ''}</span>   </div>
                                                
                                            </div>
      <div className="col-md-2 mt-4">
                                            <button type="submit" className="btn btn-info btn-fill ">Submit</button>
                                            
                                            </div>
                                         
                                        </div>
                                        
                                      
                                    
                                        <div className="clearfix"></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        
                        </div>
                        <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">View Designation</h4>
                                </div>
                                <div className="card-body">
                                <div className="row">
                           
                           <div className="col-md-12 ">
                           <div className={'alert alert-success '+successhide1} >
                           <button type="button" aria-hidden="true" class="close" data-dismiss="alert">
                               <i class="nc-icon nc-simple-remove"></i>
                           </button>
                           <span>
                               <b> Data Inserted Successfully</b></span>
                       </div>
                   
                       </div></div>
                                        <div className="row">
                                            <div className="col-lg-12 ">
                                            <div className="table-responsive">
                                            <table id="example1" class="table table-striped " >
                    <thead>
                                        <tr>
                                        <th  scope="col"  >Sno</th>
                                        <th scope="col"  >Name</th>
                                          
                                            <th   >Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                   { data1.map((list,index)=>{
       
  
    return (
        <tr scope="row" key={index}>

        <td >{++index}</td>
        <td  s>{list.name}</td>
       
      
        <td  ><a href="javascript:;" data-toggle="modal" data-target="#myModal1" onClick={()=>editData(list._id)}  ><i className="fa fa-edit text-info"></i></a> <a href="javascript:;"  onClick={()=>setdelete(list._id)} data-toggle="modal" data-target="#deleteModal" > <i className="fa fa-trash text-danger"></i></a></td>
        </tr>
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
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
      
       
        <div class="modal-header">
          <h4 class="modal-title mt-0">Edit Designation</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
         
        <div class="modal-body">
        <div className="col-md-12 ">
                                            <div className="form-group">
                                                    <label>Enter Name</label>
    <input type="text" id="name" value={updatedata.name || ''} onChange={(e)=>updateData(e)} className="form-control" disabled="" placeholder="Enter Desgination Name" />
                                                </div>
                                                
                                            </div>
        </div>
        
       
        <div class="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal" ref={inputEl}>Close</button>
          <button type="button" className="btn btn-info btn-fill" onClick={()=>handleSubmitUpdate()} >Submit</button>
        </div>
        
      </div>
    </div>
  </div>
  </div>
       <DeleteModal name="Designation" deleteData={()=>deleteData()} closeDelete={closeDelete} id='deleteModal'/>
  </Fragment>  
    )}

    export default AddDesignation
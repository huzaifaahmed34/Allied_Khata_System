import React, { Fragment ,useState, useEffect,useRef} from 'react';
import axios from 'axios';
import Sidebar from '../components/layouts/Sidebar';
import Navbar from '../components/layouts/Navbar';
import * as $ from 'jquery';
import DeleteModal from '../components/DeleteModal';
import { useHistory } from 'react-router-dom';

const ViewQuotation=()=>{
 
    const history=useHistory();
    useEffect(()=>{
        let token=localStorage.getItem('token');
      
        if(token==null){
            history.push({pathname:'/login'})
        }
        },[])
    let [input,handleInput]=useState({_id:'',type:'',name:'',phone:'',email:'',city:'',address:'',date:'12-23-23-2',quotation_details:[]}); 
   
    const [updatedata,handleInputUpdate]=useState({id:'',name:''});
  
    let [successhide1,handleSuccessHide1]=useState('d-none');
    let [errors,handleValidation]=useState({name:''});
    let [data1,showdata]=useState([]);
    let [data2,showdata1]=useState([]);
    let [company,handleCompany]=useState([]);
    let [editmodalhide,changeModal]=useState({display:'none'});
    let [deleteid,changedeleteid]=useState('');
    let [deleteManagerid,changemanagerdeleteid]=useState(''); 
    const inputEl = useRef(null);
    const inputEl1 = useRef(null);
    let [designation,handleDesignation]=useState([]);
   const closeDelete=useRef(null);
   const closeDelete1=useRef(null);
   let customer_name=useRef(null);
   let remarks=useRef(null);
   let discount_amount=useRef(null);
   let discount_perc=useRef(null);
   let total=useRef(null);
   let net_amount=useRef(null);
   let date=useRef(null);
   let editid=useRef(null);
   let  total_hidden=useRef(null);  
  let  productname=useRef(null);
  let  qty=useRef(null);
  let  rate=useRef(null);
  let  unit=useRef(null);
  let  c_editid=useRef(null);
  let  cdiscount_amount=useRef(null);
  let  subtotal=useRef(null);
  let  cdiscount_perc=useRef(null);

    // FOr GET TABLE DATA //
   useEffect(()=>{
    
    axios.get('http://localhost:3010/quotation/').then((res)=>{
        
        $('#example1').DataTable().destroy();
   showdata(res.data)
   $('#example1').DataTable({
    dom: 'Bfrtip',
    buttons: [
     'copy', 'excel', 'pdf','csv','print'
 ], "paging": true,
 "pageLength": 10,
   "lengthChange": false,
   "searching": true,
   "ordering": false,
   "info": true,
   "autoWidth": false,
  });
}) 

axios.get('http://localhost:3010/company/').then((res)=>{
    handleCompany(res.data);
 })
 
},[successhide1]);


     
// FOR UPDATE DATA //
   const handleSubmitUpdate=(e)=>{ 
  
axios.post('http://localhost:3010/quotation/update',
{   _id:editid.current.value,
    customer_name:customer_name.current.value, 
    remarks:remarks.current.value,
    discount_perc:discount_perc.current.value,
    discount_amount:discount_amount.current.value,
    date:date.current.value,
    total:total.current.value,
    net_amount:net_amount.current.value,
}
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
  
    axios.post('http://localhost:3010/quotation/updatequotation',
    {   id:editid.current.value,
        detail_id:c_editid.current.value,
        unit:unit.current.value, 
        rate:rate.current.value,
        qty:qty.current.value,
        cdiscount_perc:cdiscount_perc.current.value,
        cdiscount_amount:cdiscount_amount.current.value,
        subtotal:subtotal.current.value,
        total_amount:total.current.value,
        discount_perc:discount_perc.current.value,
        total_hidden:total_hidden.current.value,
        productname:productname.current.value
    }
        ).then(res=>{
            editData(editid.current.value);
       inputEl1.current.click();
      
     handleSuccessHide1('');
     const timer = setTimeout(() => {
         handleSuccessHide1('d-none')
       }, 3000)
     
    })
    
    }


 
// For Edit Data //
const editData=(id)=>{
    [customer_name.current.value,discount_amount.current.value, discount_perc.current.value,remarks.current.value, editid.current.value,total.current.value]='';
 
axios.get('http://localhost:3010/quotation/edit',
        {params: { id: id  },
}).then((res)=>{
  
[customer_name.current.value,discount_amount.current.value, discount_perc.current.value,remarks.current.value, editid.current.value,total.current.value,date.current.value,net_amount.current.value]
    =[res.data.company_id,res.data.discount_amount,res.data.discount_perc,res.data.remarks,res.data._id,res.data.total_amount,res.data.date,res.data.net_amount];
showdata1(res.data.quotation_details); 
      

})
}

// For Edit Manager Data //
const editManagerData=(id,staffid)=>{
    
 [productname.current.value,unit.current.value,rate.current.value,qty.current.value,c_editid.current.value,cdiscount_perc.current.value,cdiscount_amount.current.value,subtotal.current.value]='';
 
axios.get('http://localhost:3010/quotation/quotationedit',
        {params: { id: id ,detail_id:staffid},
}).then((res)=>{
  
    [productname.current.value,unit.current.value,rate.current.value,qty.current.value,c_editid.current.value,cdiscount_perc.current.value,cdiscount_amount.current.value,subtotal.current.value,total_hidden.current.value]
=[res.data.quotation_details[0].productname,res.data.quotation_details[0].unit,res.data.quotation_details[0].rate,res.data.quotation_details[0].qty,res.data.quotation_details[0].id,res.data.quotation_details[0].discount_perc,res.data.quotation_details[0].discount_amount,res.data.quotation_details[0].subtotal,res.data.quotation_details[0].subtotal];
 
})
}

// For Delete Manager Data
const setdelete1=(id,detail_id,subtotal)=>{
  
    changemanagerdeleteid({id:id,detail_id:detail_id,subtotal:subtotal,total_amount:total.current.value,
        discount_perc:discount_perc.current.value
    });
    }
const deleteManagerData=()=>{
 
    axios.get('http://localhost:3010/quotation/deletequotation',{params: deleteManagerid
}).then((res)=>{
     
        closeDelete1.current.click();
        
        editData(editid.current.value);
        handleSuccessHide1('');
        const timer = setTimeout(() => {
            handleSuccessHide1('d-none')
          }, 3000)
    })

}

const printData=(id)=>{
    history.push({
        pathname:  "/print-quotation",
        state: {
          id: id
        }} );
    
}
const rateChange=()=>{
    if(cdiscount_perc.current.value>100){
        alert('Discount Perc Cannot Be Greater than 100');
        cdiscount_perc.current.value=0;
        cdiscount_amount.current.value=(cdiscount_perc.current.value*rate.current.value*qty.current.value)/100;
        subtotal.current.value=(rate.current.value*qty.current.value)-cdiscount_amount.current.value;
    }
    else{
    cdiscount_amount.current.value=(cdiscount_perc.current.value*rate.current.value*qty.current.value)/100;
subtotal.current.value=(rate.current.value*qty.current.value)-cdiscount_amount.current.value;
 } }

 const handlediscount=(e)=>{
discount_perc.current.value=e.target.value;
discount_amount.current.value=total.current.value*(e.target.value/100);
net_amount.current.value=total.current.value-(total.current.value*(e.target.value/100))
    

 }

//For Delete Data///
const setdelete=(id)=>{
changedeleteid(id);
}



const deleteData=()=>{
   
    axios.get('http://localhost:3010/quotation/delete',{params:{
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
                                    <h4 className="card-title">Modify Quotations</h4>
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
                                            <table id="example1" class="table table-bordered table-striped  table-sm " >
                    <thead>
                                        <tr>
                                        <th  scope=""  >Sno</th>
                                        <th scope=""  className="px-0" >Date</th>
                                        <th scope=""  >Customer Name</th>
                                    
                                        <th scope=""  >Total</th>
                                        <th scope=""  >D%</th>
                                        <th scope=""  >D Amount</th>
                                        <th scope=""  >Net Total</th>
                                    
                                            <th scope=""   >Action</th>
                                            <th scope=""  >Print Preview</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                   { data1.map((list,index)=>{
       
  
    return (
   
        <tr scope="row" key={index}>

        <td >{++index}</td>
        <td  >{list.date}</td>
        <td  >{list.c.name}</td>
       
        <td  >{list.total_amount}</td>
        <td  >{list.discount_perc}</td>
        <td  >{list.discount_amount}</td>
        <td  >{list.net_amount}</td>
 
     
        
<td  className="border-0"><a href="javascript:;" data-toggle="modal" data-target="#myModal1" onClick={()=>editData(list._id)}  ><i className="fa fa-edit text-info"></i></a> <a href="javascript:;"  onClick={()=>setdelete(list._id)} data-toggle="modal" data-target="#deleteModal" > <i className="fa fa-trash text-danger"></i></a></td>
      
<td  ><a href="javascript:;" onClick={()=>printData(list._id)}  >Print</a></td>
      
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
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
      
       
        <div class="modal-header">
          <h4 class="modal-title mt-0">Edit Quotation</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
         <input  ref={editid} id="id" type="hidden"/>
        <div class="modal-body">
       <div className="row">
                                                <div className="col-md-4 ">
                                                <div className="form-group">
                                                        <label>Customer Name</label>
                                                        <select type="text" id="customer" ref={customer_name}  className={"form-control "+errors.customer} >
            <option value="">Select Customer</option>
            {company.map((list)=>{
return(
    <option value={list._id}>{list.name}</option>
 
         )
        })} 
            </select>     <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                <div className="col-md-4 ">
                                                <div className="form-group">
                                                        <label>date</label>
        <input type="date" id="date"   ref={date}  className={"form-control "+errors.date}  placeholder="Enter  Phone Number" />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>

                                                <div className="col-md-4 ">
                                                <div className="form-group">
                                                        <label>Total Amount</label>
        <input type="number" id="total"   ref={total} className={"form-control "+errors.email}   readOnly placeholder="Enter Email" />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                </div>
                                                <div className="row ">
                                                <div className="col-md-2">
                                                <div className="form-group">
                                                        <label>D %</label>
        <input type="number" id="discount_perc"    ref={discount_perc} className={"form-control "}  onChange={(e)=>handlediscount(e)} />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                <div className="col-md-3 ">
                                                <div className="form-group">
                                                        <label>D Amount</label>
        <input type="number" id="discount_amount"     ref={discount_amount} className="form-control "  readOnly placeholder="" />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                <div className="col-md-3 ">
                                                <div className="form-group">
                                                        <label>Net Amount</label>
        <input type="number" id="net_amount"     ref={net_amount} className="form-control " readOnly  placeholder=""/>
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                <div className="col-md-4 ">
                                                <div className="form-group">
                                                        <label>Remarks</label>
        <input type="text" id="remarks"     ref={remarks} className="form-control "  placeholder="" />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                
                                            
        </div>
        <div className="row">
            <div className="col-md-12">
                <h4>Quotation Products</h4>
                            <table className="table ">
            <thead className="bg-dark text-white">
                <tr>
                        <th className="text-white">S#</th>
                        <th  className="text-white">Product Name</th>
                        <th className="text-white">Unit</th>
                         <th className="text-white">Rate</th>
                         <th className="text-white">Quantity</th>
                          <th className="text-white">D%</th>
                         <th className="text-white">D Amnt</th>
                         <th className="text-white">Total</th>
                          <th className="text-white">Action</th>
                     
                        
                    </tr>
                </thead>
                <tbody>
                    {data2.map((list,index)=>{
                    return(
                        <tr>
                            <td>{++index}</td>
                            <td>{list.productname}</td>
                            <td>{list.unit}</td>
                            <td>{list.rate}</td>
                            <td>{list.qty}</td>
                            <td>{list.discount_perc}</td>
                            <td>{list.discount_amount}</td>
                            <td>{list.subtotal}</td>
                            <td><a href="javascript:;"  data-toggle="modal" data-target="#myModal2" onClick={()=>editManagerData(editid.current.value,list.id)}><i className="fa fa-edit"></i></a><a href="javascript:;" onClick={()=>setdelete1(editid.current.value,list.id,list.subtotal)} data-toggle="modal" data-target="#deleteModal1"> <i className="fa fa-trash text-danger"></i></a></td>
                        </tr>
                    )
                    })
                    }
                    </tbody>
            </table>
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
 
  <div class='modal fade 'id="myModal2" >
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
      
       
        <div class="modal-header">
        <h4 class="modal-title mt-0">Edit Quotation Details                                                                                       </h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <input  ref={total_hidden} id="total_hidden" type="hidden"/>
         <input  ref={c_editid} id="ceditid" type="hidden"/>
         <input   id="managereditid" type="hidden"/>
        <div class="modal-body">
       <div className="row">
       <div className="col-md-6">
                                                <div className="form-group">
                                                        <label>Product Name</label>
        <input type="text" id="productname"    ref={productname} className={'form-control '}  placeholder="Enter Name " />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                <div className="col-md-6">
                                                <div className="form-group">
                                                        <label>unit</label>
        <input type="text" id="unit" ref={unit}  className={'form-control '}  placeholder="Unit " />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                <div className="col-md-6 ">
                                                <div className="form-group">
                                                        <label>rate</label>
        <input type="number" id="rate"   ref={rate} className={'form-control '} onChange={()=>rateChange()}              placeholder="Rate " />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                <div className="col-md-6 ">
                                                <div className="form-group">
                                                        <label>qty(Kg)</label>
        <input type="number" id="qty"   ref={qty} className={'form-control '}  onChange={()=>rateChange()}  placeholder="Qty " />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                <div className="col-md-6">
                                                <div className="form-group">
                                                        <label>Dis. %</label>
        <input type="number" id="discount_perc"  defaultValue='0'  ref={cdiscount_perc} onChange={()=>rateChange()}  className={'form-control '}  placeholder="1-99"  />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                <div className="col-md-6 ">
                                                <div className="form-group">
                                                        <label>Discount A.</label>
        <input type="number" id="discount_amount"   ref={cdiscount_amount} defaultValue='0' readonly='' className={'form-control '}  placeholder="D.Amount " />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                <div className="col-md-6 ">
                                                <div className="form-group">
                                                        <label>Total</label>
        <input type="number" id="subtotal"   ref={subtotal}  defaultValue='0' readonly='false' className={'form-control '}  placeholder="Total " />
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
    <DeleteModal name="Quotation Details" deleteData={()=>deleteManagerData()} closeDelete={closeDelete1} id='deleteModal1'/>
       <DeleteModal name="Quotation" deleteData={()=>deleteData()} closeDelete={closeDelete} id='deleteModal'/>
    </Fragment>
)

}
export default ViewQuotation;
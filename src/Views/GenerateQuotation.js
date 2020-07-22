import React, { Fragment ,useState, useEffect,useRef} from 'react';
import axios from 'axios';
import Sidebar from '../components/layouts/Sidebar';
import Navbar from '../components/layouts/Navbar';
import * as $ from 'jquery' 
import { error } from 'jquery';
import { useHistory } from 'react-router-dom';
const GenerateQuotation=()=>{
    const history=useHistory();
   
    useEffect(()=>{
        let token=localStorage.getItem('token');
      
        if(token==null){
            history.push({pathname:'/login'})
        }
        },[])
    let productname=useRef();
    let rate=useRef();
    let qty=useRef();
    let discount_amount=useRef();
    let discount_perc=useRef();
    let unit=useRef();
    let inputEl=useRef();
    let subtotal=useRef();
   let [count,setCount]=useState(1);
    let [input,handleInput]=useState({customer:'',date:'',t_disc_amount:0,t_disc_perc:0,remarks:'',attention:'',quotation_valid:'',total:0,net_amount:0,quotation_details:[]});
    let [company,handleCompany]=useState([]);
    let [attention,handleAttention]=useState([]);
    let [divhide,setdiv]=useState('d-none');
    let [errors,handleError]=useState({customer:'',date:'',net_d_perc:'',net_d_amount:'',remarks:''});
    let [errors1,handleError1]=useState({productname:'',rate:'',qty:'',discount_amount:'',unit:'',attention:'',quotation_valid:'',subtotal:''});
    let [successhide,handleSuccesshide]=useState('d-none');
    useEffect(()=>{
            axios.get('http://localhost:3010/company/').then((res)=>{
                handleCompany(res.data);
             })
           
          
    },[]);

    const deleteRow=(id)=>{
        const delrow=input.quotation_details.filter(l=>id!=l.id);

  const m=input.quotation_details.filter(l=>id==l.id).reduce(l=>l);
  console.log(m);
    handleInput({...input,total:input.total-m.subtotal,t_disc_amount:((input.total-m.subtotal)*input.t_disc_perc/100),net_amount:(input.total-m.subtotal)-((input.total-m.subtotal)*input.t_disc_perc/100),quotation_details:delrow
        })
    } 
   const handleAdd=()=>{
    input.customer==''?handleError(prev=>({...prev,customer:'is-invalid'})):handleError(prev=>({...prev,customer:''}));
    input.date==''?handleError(prev=>({...prev,date:'is-invalid'})):handleError(prev=>({...prev,date:''}));
    
if( productname.current.value==''){
handleError1(prev=>({...prev,productname:'is-invalid'}))
 
}
else{
    handleError1(prev=>({...prev,productname:''}))
}
if( rate.current.value==''){
    handleError1(prev=>({...prev,rate:'is-invalid'}))
}
else{
    handleError1(prev=>({...prev,rate:''}))
}
if( qty.current.value==''){
    handleError1(prev=>({...prev,qty:'is-invalid'}))
}
else{
    handleError1(prev=>({...prev,qty:''}))
}
if( unit.current.value==''){
    handleError1(prev=>({...prev,unit:'is-invalid'}))
}
else{
    handleError1(prev=>({...prev,unit:''}))
}
if( discount_amount.current.value==''){
    handleError1(prev=>({...prev,discount_amount:'is-invalid'}))
}
else{
    handleError1(prev=>({...prev,discount_amount:''}))
}
if( discount_perc.current.value==''){
    handleError1(prev=>({...prev,discount_perc:'is-invalid'}))
}
else{
    handleError1(prev=>({...prev,discount_perc:''}))
} 

if(discount_perc.current.value=='' ||  discount_amount.current.value=='' || unit.current.value=='' || qty.current.value=='' 
|| rate.current.value=='' || productname.current.value=='' || input.customer=='' || input.date==''){
 
}
else{
    // ,net_amount:input.total-input.total*(e.target.value/100)})
 
    handleInput({...input,total:input.total+=parseInt(subtotal.current.value),t_disc_amount:(input.total*input.t_disc_perc/100),net_amount:input.total-(input.total*input.t_disc_perc/100),
        quotation_details:[
            ...input.quotation_details,{
            id:count,
            productname: productname.current.value,
            rate: rate.current.value,
            qty: qty.current.value,
            unit: unit.current.value,
            subtotal: subtotal.current.value,
            discount_amount: discount_amount.current.value,
            discount_perc: discount_perc.current.value

        }
    ]
    })
;
    setCount(prev=>prev+1);
   productname.current.value='';
    rate.current.value='';
      unit.current.value='';
    subtotal.current.value='';
     qty.current.value='';
    discount_perc.current.value=0;
    discount_amount.current.value=0;
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

   /// Customer CHange
const customerchange=(e)=>{

   handleInput({...input,customer:e.target.value})
let m=company.filter(l=>l._id==e.target.value).reduce(l=>l);

handleAttention(m.staff);
}
const dchange=(e)=>{
 
    handleInput({...input,t_disc_perc:e.target.value,t_disc_amount:input.total*(e.target.value/100),net_amount:input.total-input.total*(e.target.value/100)})
 
 }
   // For KEYUP RATE UNIT DISCOUNT //
   const rateChange=()=>{
       if(discount_perc.current.value>100){
           alert('Discount Perc Cannot Be Greater than 100');
           discount_perc.current.value=0;
           discount_amount.current.value=(discount_perc.current.value*rate.current.value*qty.current.value)/100;
           subtotal.current.value=(rate.current.value*qty.current.value)-discount_amount.current.value;
       }
       else{
       discount_amount.current.value=(discount_perc.current.value*rate.current.value*qty.current.value)/100;
subtotal.current.value=(rate.current.value*qty.current.value)-discount_amount.current.value;
    } }
   

    const handleConfirm=()=>{
   

if(input.customer=='' || input.date=='' || input.remarks=='' || input.total==0 ){
    input.customer==''?handleError(prev=>({...prev,customer:'is-invalid'})):handleError(prev=>({...prev,customer:''}));
    input.date==''?handleError(prev=>({...prev,date:'is-invalid'})):handleError(prev=>({...prev,date:''}));
    input.remarks==''?handleError(prev=>({...prev,remarks:'is-invalid'})):handleError(prev=>({...prev,remarks:''}));
    if(input.total==0){
        handleError(prev=>({...prev,total:'is-invalid'}))
        handleError1(prev=>({...prev,productname:'is-invalid'}))
        handleError1(prev=>({...prev,unit:'is-invalid'}))
        handleError1(prev=>({...prev,rate:'is-invalid'}))
        handleError1(prev=>({...prev,qty:'is-invalid'}))
      
    }
        else{
            handleError(prev=>({...prev,total:''}));
            handleError1(prev=>({...prev,productname:''}))
            handleError1(prev=>({...prev,unit:''}))
            handleError1(prev=>({...prev,rate:''}))
            handleError1(prev=>({...prev,qty:''}))
    }
  
}
else{
axios.post('http://localhost:3010/quotation/generate',input).then(res=>{
    inputEl.current.click();
    handleInput({customer:'',date:'',t_disc_amount:0,t_disc_perc:0,remarks:'',attention:'',quotation_valid:'',total:0,net_amount:0,quotation_details:[]});
setCount(1);
handleAttention([]);
handleSuccesshide('');

    const timer = setTimeout(() => {
        handleSuccesshide('d-none')
      }, 3000);


})
        }
        }

        const handleConfirmPrint=()=>{
   

            if(input.customer=='' || input.date=='' || input.remarks=='' || input.total==0 ){
                input.customer==''?handleError(prev=>({...prev,customer:'is-invalid'})):handleError(prev=>({...prev,customer:''}));
                input.date==''?handleError(prev=>({...prev,date:'is-invalid'})):handleError(prev=>({...prev,date:''}));
                input.remarks==''?handleError(prev=>({...prev,remarks:'is-invalid'})):handleError(prev=>({...prev,remarks:''}));
                if(input.total==0){
                    handleError(prev=>({...prev,total:'is-invalid'}))
                    handleError1(prev=>({...prev,productname:'is-invalid'}))
                    handleError1(prev=>({...prev,unit:'is-invalid'}))
                    handleError1(prev=>({...prev,rate:'is-invalid'}))
                    handleError1(prev=>({...prev,qty:'is-invalid'}))
                  
                }
                    else{
                        handleError(prev=>({...prev,total:''}));
                        handleError1(prev=>({...prev,productname:''}))
                        handleError1(prev=>({...prev,unit:''}))
                        handleError1(prev=>({...prev,rate:''}))
                        handleError1(prev=>({...prev,qty:''}))
                }
              
            }
            else{
            axios.post('http://localhost:3010/quotation/generate',input).then(res=>{
                inputEl.current.click();
                handleInput({customer:'',date:'',t_disc_amount:0,t_disc_perc:0,remarks:'',attention:'',quotation_valid:'',total:0,net_amount:0,quotation_details:[]});
            setCount(1);
            handleAttention([]);
            history.push({
                pathname:  "/print-quotation",
                state: {
                  response: 'asd'
                }} );
            
            })
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
                                        <h4 className="card-title">Generate Quotation</h4>
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
                                
                                                <div className="col-md-6 ">
                                                <div className="form-group">
                                                        <label>Select Customer</label>
             <select type="text" id="customer" value={input.customer} onChange={(e)=>customerchange(e)} className={"form-control "+errors.customer} >
            <option value="">Select Customer</option>
            {company.map((list)=>{
return(
    <option value={list._id}>{list.name}</option>
 
         )
        })} 
            </select>
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                <div className="col-md-6 ">
                                                <div className="form-group">
                                                        <label>Date</label>
        <input type="date" id="date"  value={input.date} onChange={(e)=>handleInput({...input,date:e.target.value})} className={"form-control "+errors.date}   placeholder="Enter FullName" />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                        
 
                                                
                                               </div> 
                                               <div className={"row mt-0 "} >
                                                   <div className="col-md-12">

                                                       <h4 className="mt-0">Add Products</h4>
                                                   </div>
                                                   </div>
                                                   <div className={"row mt-0 "} >
                                                   
                                                <div className="col-md-3">
                                                <div className="form-group">
                                                        <label>Product Name</label>
        <input type="text" id="productname"    ref={productname} className={'form-control '+errors1.productname}  placeholder="Enter Name " />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                <div className="col-md-1">
                                                <div className="form-group">
                                                        <label>unit</label>
        <input type="text" id="unit" ref={unit}  className={'form-control '+errors1.unit}  placeholder="Unit " />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                <div className="col-md-1 ">
                                                <div className="form-group">
                                                        <label>rate</label>
        <input type="number" id="rate"   ref={rate} className={'form-control '+errors1.rate} onChange={()=>rateChange()}              placeholder="Rate " />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                <div className="col-md-1 ">
                                                <div className="form-group">
                                                        <label>qty(Kg)</label>
        <input type="number" id="qty"   ref={qty} className={'form-control '+errors1.qty}  onChange={()=>rateChange()}  placeholder="Qty " />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                <div className="col-md-1">
                                                <div className="form-group">
                                                        <label>Dis. %</label>
        <input type="number" id="discount_perc"  defaultValue='0'  ref={discount_perc} onChange={()=>rateChange()}  className={'form-control '+errors1.discount_perc}  placeholder="1-99"  />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                <div className="col-md-2 ">
                                                <div className="form-group">
                                                        <label>Discount A.</label>
        <input type="number" id="discount_amount"   ref={discount_amount} defaultValue='0' readonly='' className={'form-control '+errors1.discount_amount}  placeholder="D.Amount " />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                <div className="col-md-2 ">
                                                <div className="form-group">
                                                        <label>Total</label>
        <input type="number" id="subtotal"   ref={subtotal}  defaultValue='0' readonly='false' className={'form-control '+errors1.subtotal}  placeholder="Total " />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                <div className="col-md-1">
                     <button type="button" className="btn btn-primary mt-4 btn-fill" onClick={()=>handleAdd()} title="Add Manager"><i className="fa fa-plus"></i></button>  </div>
                                                    
                                                
                                               </div>
                                       
                                               <div className={"row "}>
                                               <div className="col-md-12">
            <table className="table">
                <thead>
                <tr>
                        <th>S#</th>
                        <th>Product Name</th>
                        <th>Unit</th>
                         <th>Rate</th>
                         <th>Quantity</th>
                          <th>D%</th>
                         <th>D Amnt</th>
                         <th>Total</th>
                          <th>Action</th>
                     
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        input.quotation_details.map((list,index)=>{
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

          <div className="col-md-12  text-center">
            <button type="button" className="btn btn-info btn-fill "  data-target="#myModal1" data-toggle='modal'>Confirm</button>
                                                
                                                </div>
                                             
                                                </div>
                                          
                                                </div>
                                            </form>
                                        
                                           
                                 
                                </div>
                            </div>
                            
                            </div>
                       
                        </div>
                    </div>
                    <div class='modal fade 'id="myModal1" >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
      
       
        <div class="modal-header">
          <h4 class="modal-title mt-0"> Confirm Quotation</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
       
        <div class="modal-body">
       <div className="row">
                                                <div className="col-md-6 ">
                                                <div className="form-group">
                                                        <label>Total Amount</label>
        <input type="text" id="total_amount"  readOnly='true' value={input.total} onChange={(e)=>handleInput({...input,total_amount:e.target.value})} className={"form-control "+errors.total}   placeholder="Total Amount" />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>

                                                <div className="col-md-6 ">
                                                <div className="form-group">
                                                        <label>Discount %</label>
        <input type="number" id=""   value={input.t_disc_perc} onChange={(e)=>dchange(e)} className={"form-control "}   placeholder="D %" />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                <div className="col-md-6 ">
                                                <div className="form-group">
                                                        <label>Discount Amount</label>
        <input type="number" id=""   readonly="" value={input.t_disc_amount} onChange={(e)=>handleInput({...input,t_disc_amount:e.target.value})} className={"form-control "+errors.name}   placeholder="D Amount" />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                <div className="col-md-6 ">
                                                <div className="form-group">
                                                        <label>Net Amount</label>
        <input type="text" id="net_amount"  readOnly='true' value={input.net_amount} onChange={(e)=>handleInput({...input,net_amount:e.target.value})} className={"form-control "+errors.name}   placeholder="Net Amount" />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                <div className="col-md-6">
                                                <div className="form-group">
                                                        <label>Remarks</label>
        <input type="texx" id="remarks"    value={input.remarks} onChange={(e)=>handleInput({...input,remarks:e.target.value})} className={"form-control " +errors.remarks}  placeholder="Enter  Remarks" />
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>

                                                <div className="col-md-6 ">
                                                <div className="form-group">
                                                        <label>Attention</label>
                                                    
             <select type="text" id="attention" value={input.attention} onChange={(e)=>handleInput({...input,attention:e.target.value})} className={"form-control " }>
            <option value="">Select Attention</option>
         {
            attention.map((list)=>{
return(
    <option value={list.id}>{list.name}</option>
 
         )
        })
        }  
            </select>
        <span className="text-danger"></span>   </div>
                                                    
                                                </div>
                                                </div>
                                              
                                            
                                        
        </div>
        
       
        <div class="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal" ref={inputEl} >Close</button>
          <button type="button" className="btn btn-info btn-fill" onClick={()=>handleConfirm()}  >Save</button>
          <button type="button" className="btn btn-info btn-fill" onClick={()=>handleConfirmPrint()}  >Save And Print</button>
        </div>
        
      </div>
    </div>
  </div>
  </div>
            </Fragment>  

)


}


export default GenerateQuotation;

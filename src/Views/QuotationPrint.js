import React, { Fragment ,useState, useEffect,useRef} from 'react';
import axios from 'axios';import Sidebar from '../components/layouts/Sidebar';
import Navbar from '../components/layouts/Navbar';
import { useReactToPrint } from 'react-to-print';
import { useLocation, useHistory } from 'react-router-dom';
 
const QuotationPrint=()=>{
const history=useHistory();
  useEffect(()=>{
    let token=localStorage.getItem('token');
  
    if(token==null){
        history.push({pathname:'/login'})
    }
    },[])
  const location = useLocation();
    let componentRef = useRef();
let [data,changeData]=useState([{customer:'',date:'',c:{name:''},t_disc_amount:0,t_disc_perc:0,remarks:'',attention:'',quotation_valid:'',total:0,net_amount:0,quotation_details:[{id:0,productname:'',subtotal:0,unit:0,qty:0,rate:0}],staff:[{id:'',name:'as',designation:'',address:'',email:'',phone:''}]}]);
    useEffect(()=>{
     if(location.state.id){
      axios.get('http://localhost:3010/quotation/print-quotation-id',{params:{
        id:location.state.id
      }}).then((res)=>{
 console.log(res);
        changeData(res.data);
        })
     }else{
axios.get('http://localhost:3010/quotation/last-quotation').then((res)=>{
 
changeData(res.data);
})
     }
setTimeout(()=>{
    handlePrint();
},100)
},[])

let handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
 
return(
<React.Fragment>
              
<Sidebar/>  
     
        
     <div className="main-panel">
     <Navbar/>
<div className="content" ref={componentRef} >
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title"></h4>
                                </div>
                                <div className="card-body">
                                   
                                    <div class="row ">
        <div class="col-12  text-center terms" >
               <address className="address bg-dark text-light">
          <span style={{fontSize:'30'}} id="heading">Quotation</span>
        </address>
      </div>
      </div>
        <div class="row ">
          <div class="col-6">
             <p>Quotation Ref :  
             <span style={{borderBottom:'1px solid'} } > SMS/ <span id="quatation_ref" ></span>
          </span>

</p>         
        </div>

<div class="col-6" >
   

        <p>Date:
      <span id="date" style={{borderBottom:'1px solid'}}>
{data.date}</span>
       </p>
        
               
        </div>
        </div>
    
              <div class="row ">
         <div class="col-6" >
             <p>
               Company : 
             <span style={{borderBottom:'1px solid'}}>{data[0].c.name}<span id="company_name" ></span>
            {data.staff} </span></p>

            
</div>
    <div class="col-6" >
                        <p>Attention :
            <span style={{borderBottom:'1px solid'}} >{data[0].staff[0]?data[0].staff[0].name:'' }<span id="attention"  ></span>
                </span>
                </p>
                </div>
            </div>
    <div className="row">
        < div class="col-6">
 

                   <p>Designation :
    <span style={{borderBottom: '1px solid'}} class="">
<span id="designation"  >{data[0].staff[0]?data[0].staff[0].designation:''}</span>
</span></p>

</div>
         <div class="col-6">
                          <p>Tel :

                    
            <span style={{borderBottom:'1px solid'}} >
            {data[0].staff[0]?data[0].staff[0].phone:''}
<span id="tel"  ></span>
</span></p>
</div>
</div>
       <div className="row">
        <div class="col-6">
        
             <p>Email:

<span style={{borderBottom:'1px solid'}} >
    <span id="email " >{data[0].staff[0]?data[0].staff[0].email:''}</span>
    </span>
    </p>

    </div>

          {/* <div class="col-6">
                  
               <p>Subject :

<span style={{borderBottom:'1px solid'}} class="">
    
    <span id="subject"  ></span>
    </span></p>
    </div> */}
</div>

 <div class="row ">
    <div class="col-12">
<p>Dear Sir,</p>
<p><b>Reference to above inquiry,we are pleased to quote you the best competitive price as under.</b></p>
        </div>
        
        </div>
        
    
      <div class="row">
        <div class="col-12 "> 
         <table border="1" className=""  style={{width:'100%'}}>
              <thead >
                <tr  >
                                    <th class="text-center " style={{width:'5%'}} >   Sr#</th>
                        <th class="text-center" style={{overflowWrap:'anywhere'}}  >Description</th>
                        <th class="text-center"  style={{width:'10%'}} >Unit</th>
                         <th class="text-center"style={{width:'10%'}}  >Rate</th>
                       <th class="text-center" style={{width:'10%'}} >Quantity </th>
                         
                         <th class="text-center"style={{width:'10%'}}  >Total</th>
                                        
                                        

                            </tr>
                            </thead>
               
                           
                    <tbody id="showPrice">
                        { data[0].quotation_details.map(list=>{
                            return(
                            <tr>
                                    <td className="text-center">{list.id}</td>
                                    <td   >{list.productname}</td>
                            <td className="text-center">{list.unit}</td>
                            <td className="text-center">{list.rate}</td>
                            <td className="text-center">{list.qty}</td>
                          
                            <td>{list.subtotal}</td>
                            </tr>)
                        })}
                    </tbody>
                    
                    </table>
                    </div>
    
      </div>
     

      <div class="row">
       
        
         
        <div class="col-12 mt-4">
        
          
            <table class=""  width="100%" style={{marginBottom: '20px'}}>
            
             
           <tr >
                <td style={{border:'1px solid',width:'20%'}} > <span><b>Total <span id="total"></span></b></span></td> 
                  <td style={{border:'1px solid',width:'60%'}}></td> 
               
                    <td style={{border:'1px solid',width:'20%'}}> <span><b><span  id="amount">Rs {data[0].total_amount}</span> </b></span></td>
                         
              </tr>
                  <tr >
                <td style={{border:'1px solid',width:'20%'}}> <span><b> Discount</b></span></td> 
                  <td style={{border:'1px solid',width:'60%'}}> </td> 
               
                    <td style={{border:'1px solid',width:'20%'}}> <span><b><span  id="discount">Rs {data[0].discount_amount}</span> </b></span></td>
                         
              </tr>
               <tr >
                <td style={{border:'1px solid',width:'20%'}}> <span><b>Net Total</b> </span> </td> 
                  <td style={{border:'1px solid',width:'60%'}}> <span><b><span id="words"></span></b></span></td> 
               
               <td style={{border:'1px solid',width:'20%'}}> <span><b><span  id="subtotal">Rs {data[0].net_amount}</span> </b></span></td>
                         
              </tr>
       
            </table>
        </div>
        </div>
        <div className="row">
                  <div class="col-md-12">
           <p>Remarks : <b> {data[0].remarks}</b><span id="remarks"></span></p>
  
          <br></br><br></br>
         
           <p >Manager _____________________</p>
           </div>
                  </div>         </div>
                           </div>
                           </div>
                           </div>
                               </div>       </div>
                               </div>
</React.Fragment>
)

}
export default QuotationPrint;
import React, { useEffect } from 'react';
 
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import * as $ from 'jquery'
 
import pdfmake from 'pdfmake';
 
require( 'datatables.net-buttons-bs4' )();
require( 'datatables.net-buttons/js/buttons.flash.js' )();
require( 'datatables.net-buttons/js/buttons.html5.js' )();
require( 'datatables.net-buttons/js/buttons.print.js' )();

function App() {
   useEffect(()=>{
    $('#example1').DataTable({  "paging": true,
   "lengthChange": false,
   "searching": true,
   "ordering": true,
   "info": true,
   "autoWidth": false,  
   
   dom: 'Bfrtip',
    buttons: [
     'copy', 'excel', 'pdf','csv','print'
 ],
     })
   },[])


   
  return (
    
    <div className="App">
    
  
  
    <div className="wrapper">
  
    <BrowserRouter>
   <PrivateRoute/>
     
 </BrowserRouter>
 
    </div>
   
 
    </div>
  );
}

export default App;

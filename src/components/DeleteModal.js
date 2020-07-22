import React, { Fragment } from 'react';
const  DeleteModal=({name,deleteData,closeDelete,id})=>{

    return (
        <Fragment>
        <div class="modal fade" id={id}>
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
          
           
            <div class="modal-header">
              <h4 class="modal-title mt-0">Delete {name}</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
             
            <div class="modal-body">
            <div className="col-md-12 ">
                  <p>Are you sure want to delete this modal</p>                     
                                                    
                                                </div>
            </div>
            
           
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" ref={closeDelete}>Close</button>
              <button type="button" class="btn btn-danger btn-fill " onClick={()=>deleteData()}  >Delete</button>
            </div>
            
          </div>
        </div>
      </div>
      </Fragment>
        )
}
export default DeleteModal
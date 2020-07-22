import React from 'react';
import { useHistory } from 'react-router-dom';
const  Navbar=()=>{
    const history=useHistory();
    const logout=()=>{
        localStorage.removeItem('token');
        history.push({
            pathname:'/login'
        })
        
    }

    return (
<nav className="navbar navbar-expand-lg no-print " color-on-scroll="500">
<div className="container-fluid">
    <a className="navbar-brand" href="/"> Home </a>
    <button href="" className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-bar burger-lines"></span>
        <span className="navbar-toggler-bar burger-lines"></span>
        <span className="navbar-toggler-bar burger-lines"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-end" id="navigation">
        <ul className="nav navbar-nav mr-auto">
            <li className="nav-item">
                <a href="#" className="nav-link" data-toggle="dropdown">
                    <i className="nc-icon nc-palette"></i>
                    <span className="d-lg-none">Dashboard</span>
                </a>
            </li>
            
            <li className="nav-item">
                <a href="#" className="nav-link">
                    <i className="nc-icon nc-zoom-split"></i>
                    <span className="d-lg-block">&nbsp;Search</span>
                </a>
            </li>
        </ul>
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <a className="nav-link" href="#pablo">
                    <span className="no-icon">Account</span>
                </a>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="no-icon">Dropdown</span>
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                    <div className="divider"></div>
                    <a className="dropdown-item" href="#">Separated link</a>
                </div>
            </li>
            <li className="nav-item">
                <a className="nav-link"   onClick={()=>logout()}>
                    <span className="no-icon">Log out</span>
                </a>
            </li>
        </ul>
    </div>
</div>
</nav>
)
}

export default Navbar;

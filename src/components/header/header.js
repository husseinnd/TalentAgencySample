import React from 'react';
import logo from '../../assets/img/logo.png';
import Login from "../login/login";
import {BoxArrowLeft, PersonFill } from 'react-bootstrap-icons';
import userApi from "../../api/user";


class Header extends React.Component {

    logout = (e) => {
        e.preventDefault(); 
        userApi.logout();
    } 

    render (){
       return <header className="header">
           <a className="header-logo" href="/">
                <img className="header-logo-img" src={logo} alt="logo img"/>
           </a>
            <div className="header-links">
                {(localStorage.getItem('agency-loggedin'))? 
                    <>
                        <a className="header-profile-link" href="/profile"><PersonFill/> Profile</a>
                        <a className="header-logout-link" href="/#" onClick={this.logout}><BoxArrowLeft /> Logout</a>
                    </>
                    : <Login />
                }
            </div>
       </header>;
    }
}

export default Header;
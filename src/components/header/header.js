import React from 'react';
import logo from '../../assets/img/logo.png';
import Login from "../login/login";
import {BoxArrowLeft, PersonFill } from 'react-bootstrap-icons';


class Header extends React.Component {

    render (){
       return <header className="header">
           <a className="header-logo" href="/">
                <img className="header-logo-img" src={logo} alt="logo img"/>
           </a>
            <div className="header-links">
                <a className="header-profile-link" href="/profile"><PersonFill/> Profile</a>
                <Login />
                <a className="header-logout-link" href="/#"><BoxArrowLeft /> Logout</a>
            </div>
       </header>;
    }
}

export default Header;
import React from 'react';
import {Route, Switch, withRouter } from "react-router-dom";
import './App.css';
import Home from './views/home';
import Profile from './views/profile';
import Header from './components/header/header';
import Footer from './components/footer/footer';

class App extends React.Component {

  userLogged = () => {
    return true;
  }

  render (){
    return (
      <div className="App">
        <Header/>

        <Switch>        
          {(this.userLogged()) ?
          <Route path="/profile">
            <Profile />
          </Route> :  
          <Route path="/">
            <Home />
          </Route> }
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(App);

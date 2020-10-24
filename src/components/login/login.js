import React from "react";
import {Modal} from 'react-bootstrap';
import logo from '../../assets/img/logo.png';
import {InputGroup, FormControl} from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { BoxArrowInRight, EnvelopeFill, LockFill, ExclamationCircleFill} from 'react-bootstrap-icons';
import Signup from "../signup/signup";
import userApi from "../../api/user";
import NotificationAlert from "react-notification-alert";


class Login extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        modalShow : false,
        data: {
          email: "",
          password: ""
        }
      }
    }

    
    submit = (e) => {
      e.preventDefault();

      const {data} = this.state;

      if(! this.isValid(data)) return;

      userApi.login(data)
      .then((res) => {
        userApi.signupLoginCallback(res.data.data)
      });
    }

    renderInput = (icon, placeholder, label, id, val="", type="text") => {
      return <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id={id}>{icon}</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          value={val}
          type={type}
          placeholder={placeholder + ' *'}
          aria-label={label}
          aria-describedby={id}
          onChange={(e) => {this.onInputChange(e, id);}}
        />
      </InputGroup>;
    };

    setModalShow = (bool) => {
      this.setState({modalShow: bool})
    }

    onInputChange = (e, inputId) => {
      this.setState({
        data: {
          ...this.state.data,
          [inputId]: e.target.value
        }
      })
    }
  
    isValid = (data) => {
      if(data.email && data.password) return true;

      this.refs.loginsignup.notificationAlert({
          place: 'tc',
          message: (
              <div>
                  <ExclamationCircleFill/> Fill all the required fields
              </div>
          ),
          type: "danger",
          autoDismiss: 3
      });
      return false;
  }

  notifyError = (options) => {
    return this.refs.loginsignup.notificationAlert(options);
  }

  render(){

    const {email, password} = this.state.data;
    return (
      <>
        <NotificationAlert ref="loginsignup" />
        <a className="header-login-link" href="/#" onClick={(e) => {e.preventDefault(); this.setModalShow(true);}}>
            <BoxArrowInRight/> Login
        </a>
        <Modal
            show={this.state.modalShow}
            onHide={() => this.setModalShow(false)}
            size="sm"
            aria-labelledby="login-modal"
            centered
        >
          <Modal.Header closeButton>
              <Modal.Title id="login-modal">
                  <img src={logo} alt="logo "/>
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
                <Row><Col>{this.renderInput(<EnvelopeFill/>, "Email", "Email", 'email', email, "email")}</Col></Row>
                <Row><Col>{this.renderInput(<LockFill/>, "Password", "Password", 'password', password, "password")}</Col></Row>
                <Row><Col className="text-center mb-2"><a href="/#" className="btn-style btn-style-sm" onClick={this.submit}>Login</a></Col></Row>
                <Row><Col className="text-center have-account">Don't have an account? <Signup notify={this.notifyError}/></Col></Row>
            </Container>
          </Modal.Body>
        </Modal>

      </>
    );

  }
}

export default Login;
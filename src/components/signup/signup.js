import React from "react";
import {Modal} from 'react-bootstrap';
import logo from '../../assets/img/logo.png';
import {InputGroup, FormControl} from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import {EnvelopeFill, LockFill, PersonFill, ExclamationCircleFill} from 'react-bootstrap-icons';
import userApi from "../../api/user";
import NotificationAlert from "react-notification-alert";

class SignUp extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        modalShow: false,
        data: {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }
      }
    }
    
    onInputChange = (e, inputId) => {
      this.setState({data: {
        ...this.state.data, 
        [inputId]: e.target.value
      }});
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
          onChange={(e)=>{this.onInputChange(e, id)}}
        />
      </InputGroup>;
    };

    setModalShow = (bool) => {
      this.setState({modalShow: bool});
    }

    isValid = (data) => {
      if(data.firstName && data.lastName && data.email && data.password) return true;

      this.props.notify({
          place: 'tc',
          message: (
              <div>
                  <ExclamationCircleFill/> Fill all the required fields
              </div>
          ),
          type: "danger",
          autoDismiss: 100
      });
      return false;
    }

    submit = (e) => {
      e.preventDefault();

      const {data} = this.state;

      if(! this.isValid(data)) return;

      userApi.signup(data)
      .then((res) => {
        userApi.signupLoginCallback(res.data)
      });
    }

    render(){

      const {firstName, lastName, email, password} = this.state.data;
      return (
        <>
          <a className="signup-link" href="/#" onClick={(e) => {e.preventDefault(); this.setModalShow(true);}}>
            Sign Up
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
                  <Row><Col>{this.renderInput(<PersonFill/>, "First name", "First name", 'firstName', firstName)}</Col></Row>
                  <Row><Col>{this.renderInput(<PersonFill/>, "Last name", "Last name", 'lastName', lastName)}</Col></Row>
                  <Row><Col>{this.renderInput(<EnvelopeFill/>, "Email", "Email", 'email', email, "email")}</Col></Row>
                  <Row><Col>{this.renderInput(<LockFill/>, "Password", "Password", 'password', password, "password")}</Col></Row>
                  <Row><Col className="text-center mb-2"><a href="/#" className="btn-style btn-style-sm" onClick={this.submit}>Sign Up</a></Col></Row>
              </Container>
            </Modal.Body>
          </Modal>
        </>
      );
    }
}

export default SignUp;
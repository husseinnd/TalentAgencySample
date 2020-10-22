import React from "react";
import {Modal} from 'react-bootstrap';
import logo from '../../assets/img/logo.png';
import {InputGroup, FormControl} from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { BoxArrowInRight, EnvelopeFill, LockFill} from 'react-bootstrap-icons';
import Signup from "../signup/signup";

function ModalRender(props) {
    const renderInput = (icon, placeholder, label, id, val="", type="text") => {
        return <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id={id}>{icon}</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          value={val}
          type={type}
          placeholder={placeholder}
          aria-label={label}
          aria-describedby={id}
        />
      </InputGroup>;
    };

    return (
        <Modal
            {...props}
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
               <Row><Col>{renderInput(<EnvelopeFill/>, "Email", "Email", 'email-input', "", "email")}</Col></Row>
               <Row><Col>{renderInput(<LockFill/>, "Password", "Password", 'pass-input', "", "password")}</Col></Row>
               <Row><Col className="text-center mb-2"><a href="/#" className="btn-style btn-style-sm">Login</a></Col></Row>
               <Row><Col className="text-center have-account">Don't have an account? <Signup /></Col></Row>
           </Container>
        </Modal.Body>
        </Modal>
    );
}

function Login() {
    const [modalShow, setModalShow] = React.useState(false);
  
    return (
      <>
        <a className="header-login-link" href="/#" onClick={(e) => {e.preventDefault(); setModalShow(true);}}>
            <BoxArrowInRight/> Login
        </a>
  
        <ModalRender
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
}

export default Login;
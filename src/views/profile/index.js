import React from 'react';
//import {DropdownButton, Dropdown} from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import {InputGroup, FormControl} from 'react-bootstrap';
import Avatar from "../../assets/img/avatar.png";
import { PersonFill, PhoneFill, Calendar3, FilePersonFill } from 'react-bootstrap-icons';
import Select from 'react-select';

class Profile extends React.Component{
    constructor (props){
        super(props);
        this.options = [
            { value: 'singer', label: 'singer' },
            { value: 'actor', label: 'actor' },
            { value: 'director', label: 'director' }
        ];

        this.state = {
           data: {
            id: 1,
            firstName: 'Fadi',
            lastName: 'Majed',
            type: 'Actor',
            age: "28",
            bio: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
            img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
            email: 'blabla@gmail.com',
            phone: "876543"
           }
        };
    }

    renderInput = (icon, placeholder, label, id, val="", type="text") => {
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
    }

    renderLeftSection = () => {
        const {img, email} = this.state.data;
        return <div className="profile-left-section">
            <div className="profile-image-uploader margin-btm-30">
                <img src={img? img : Avatar} alt="profile" />
                <input type="file" />
            </div>
            <div className="profile-email">{email}</div>
        </div>
    }

    renderRightSection = () => {
        const {firstName, lastName, phone, age, bio} = this.state.data;
        return <div className="profile-right-section">
            <Container>
                <Row>   
                    <Col>
                        {this.renderInput(<PersonFill />, "First Name", "First Name", 'first-name-input', firstName)}
                    </Col> 
                </Row>
                <Row>   
                    <Col>
                        {this.renderInput(<PersonFill />, "Last Name", "Last Name", 'last-name-input', lastName)}
                    </Col>                 
                </Row>
                <Row>   
                    <Col>
                        {this.renderInput(<PhoneFill />, "Number", "Number", 'nb-input', phone, 'number')}
                    </Col>  
                </Row>   
                <Row>   
                    <Col>
                        {this.renderInput(<Calendar3 />, "Age", "Age", 'age-input', age, 'number')}
                    </Col>  
                </Row> 
                <Row>
                    <Col className="mb-3">
                        <Select options={this.options} placeholder="Talent Type" isMulti={true}/>
                    </Col>                 
                </Row>
                <Row>  
                    <Col>
                        <InputGroup>
                            <InputGroup.Prepend>
                            <InputGroup.Text><FilePersonFill/></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl as="textarea" aria-label="Tell us about yourself!" value={bio} />
                        </InputGroup>
                    </Col>                 
                </Row>
                <Row>   
                    <Col><button className="btn btn-style btn-style-sm mt-3">Save</button></Col>                 
                </Row>
            </Container>
        </div>;
    }

    render() {
        return <div className="profile-section"> 
            <Row className="mx-0">
                <Col sm={4} className="px-0">{this.renderLeftSection()}</Col>
                <Col sm={8}>{this.renderRightSection()}</Col>
            </Row>
        </div>;
    }  
}

export default Profile;
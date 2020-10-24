import React from 'react';
//import {DropdownButton, Dropdown} from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import {InputGroup, FormControl} from 'react-bootstrap';
import Avatar from "../../assets/img/avatar.png";
import { PersonFill, PhoneFill, Calendar3, FilePersonFill, Check2, ExclamationCircleFill} from 'react-bootstrap-icons';
import Select from 'react-select';
import talentApi from '../../api/talent';
import userApi from '../../api/user';
import NotificationAlert from "react-notification-alert";


class Profile extends React.Component{
    constructor (props){
        super(props);
        
        this.state = {
            talentOptions: null,
            data: {},
            selectedTalent: null
        }

        talentApi.list()
        .then((res)=>{
            // mapping the response to how the select fields needs them to be
            const talentOptions = res.data.map((obj) => {
                return {label: obj.label, value: obj.label}
            });   
            this.setState({talentOptions});
        });

        userApi.show()
        .then((res) => {
            this.setState({
                data: res.data, 
                selectedTalent: {
                    label: res.data.talents,
                    value: res.data.talents
                }
            });
        });
    }

    onInputChange = (e, inputId) => {
        this.setState({
          data: {
            ...this.state.data,
            [inputId]: e.target.value
          }
        })
    }

    renderInput = (icon, placeholder, label, id, val="", type="text") => {
        return <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id={id}>{icon}</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          onChange={(e) => {this.onInputChange(e, id);}}
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

    setTalent = (selectedTalent) => {
        this.setState({
            selectedTalent,
            data: {
                ...this.state.data,
                talents: selectedTalent.label
            }
        });
    }

    isValid = (data) => {
        if(data.firstName && data.lastName) return true;

        this.refs.notify.notificationAlert({
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

    submit = (e) => {
        e.preventDefault();
        const {data} = this.state;

        if(! this.isValid(data)) return;

        userApi.update(data)
        .then((res) => {
            this.refs.notify.notificationAlert({
                place: 'tc',
                message: (
                    <div>
                        <Check2 /> Saved successfully!
                    </div>
                ),
                type: "success",
                autoDismiss: 3
            });
        });
    }

    renderRightSection = () => {
        const {firstName, lastName, phone, age, bio} = this.state.data;
        return <div className="profile-right-section">
            <Container>
                <Row>   
                    <Col>
                        {this.renderInput(<PersonFill />, "First Name *", "First Name", 'firstName', firstName)}
                    </Col> 
                </Row>
                <Row>   
                    <Col>
                        {this.renderInput(<PersonFill />, "Last Name *", "Last Name", 'lastName', lastName)}
                    </Col>                 
                </Row>
                <Row>   
                    <Col>
                        {this.renderInput(<PhoneFill />, "Number", "Number", 'phone', phone, 'number')}
                    </Col>  
                </Row>   
                <Row>   
                    <Col>
                        {this.renderInput(<Calendar3 />, "Age", "Age", 'age', age, 'number')}
                    </Col>  
                </Row> 
                <Row>
                    <Col className="mb-3">
                        <Select 
                            options={this.state.talentOptions} 
                            placeholder="Talent Type" 
                            value={this.state.selectedTalent}
                            onChange={this.setTalent}
                        />
                    </Col>                 
                </Row>
                <Row>  
                    <Col>
                        <InputGroup>
                            <InputGroup.Prepend>
                            <InputGroup.Text><FilePersonFill/></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl as="textarea" aria-label="Tell us about yourself!" value={bio}  onChange={(e) => {this.onInputChange(e, 'bio');}}/>
                        </InputGroup>
                    </Col>                 
                </Row>
                <Row>   
                    <Col><button className="btn btn-style btn-style-sm mt-3" onClick={this.submit}>Save</button></Col>                 
                </Row>
            </Container>
        </div>;
    }

    render() {
        return <div className="profile-section"> 
            <NotificationAlert ref="notify" />
            <Row className="mx-0">
                <Col sm={4}>{this.renderLeftSection()}</Col>
                <Col sm={8} className="px-0">{this.renderRightSection()}</Col>
            </Row>
        </div>;
    }  
}

export default Profile;
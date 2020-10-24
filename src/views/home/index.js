import React from 'react';
import logo from '../../assets/img/logo.png';
import {DropdownButton, Dropdown} from 'react-bootstrap';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import TalentCard from './../../components/talent-card/talent-card';
import { Container, Row, Col } from 'react-bootstrap';
import userApi from "../../api/user";
import talentApi from "../../api/talent";

class Home extends React.Component{

    constructor (props){
        super(props);

        this.state = {
            talentSelected: null,
            talentOptions: [],
            profiles: []
        };

        talentApi.list()
        .then((res) => {
            const talentOptions = res.data.map((obj) => {
                return obj.label
            });   
            this.setState({talentOptions});
        });

        this.getProfiles();
    }

    getProfiles = (talentSelected = null) => {
        userApi.listFilterByTalent(talentSelected)
        .then((res) => {
            this.setState({profiles: res.data});
        });
    }

    filterTalents = (e, talentSelected) => {
        e.preventDefault();
        // set the talent selected
        this.setState({talentSelected});
        // filter the talents selected
        this.getProfiles(talentSelected);
    }

    renderBackgroundSection = () => {
        return <div className="home-background-section">
            <div className="logo-div">
                <img src={logo} alt="ageny logo"/>
            </div>
            <h1>The talent you need!</h1>
            <AnchorLink href='#talentsection' className="btn-style">Search For Talents</AnchorLink>
        </div>;
    }

    renderProfiles = () => {
        const {profiles} = this.state;
        return profiles.map((profile, ind)=>{
            return <Col key={profile.id+'-'+profile.name+'-'+ind} sm={3} className="margin-btm-30"> <TalentCard talent={profile} /> </Col>
        });
    }

    renderTalentsDropdown = () => {
        const {talentOptions, talentSelected} = this.state;
        return <DropdownButton className="margin-btm-30 home-filter-talent" title={(!talentSelected)? "Filter talents": "Filtered by: " + talentSelected}>
            <Dropdown.Item href="/#" onClick={(e) => {this.filterTalents(e, null)}}>All</Dropdown.Item>
            {talentOptions.map((talent, index) => {
                return <Dropdown.Item key={talent+'-'+index} href="/#" onClick={(e) => {this.filterTalents(e, talent)}}>{talent}</Dropdown.Item>
            })}
        </DropdownButton>;
    }

    renderSearchSection = () => {
        return <div className="home-search-section section-style" id="talentsection">
            <Container>
                <Row>
                    <Col>
                        {this.renderTalentsDropdown()}
                    </Col>
                </Row>
                    
                
                <Row>
                    {this.renderProfiles()}
                </Row>
            </Container>
            
        </div>
    }

    render() {
        return <> 
            {this.renderBackgroundSection()}
            {this.renderSearchSection()}
        </>;
    }    
}

export default Home;
import React from 'react';
import logo from '../../assets/img/logo.png';
import {DropdownButton, Dropdown} from 'react-bootstrap';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import TalentCard from './../../components/talent-card/talent-card';
import { Container, Row, Col } from 'react-bootstrap';

class Home extends React.Component{

    constructor (props){
        super(props);
        this.talents = [
            {
                id: 1,
                name: 'F. Majed',
                type: 'Actor',
                age: "28",
                bio: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
                img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
            },            
            {
                id: 1,
                name: 'F. Majed',
                type: 'Actor',
                age: "28",
                bio: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
                img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
            },            
            {
                id: 1,
                name: 'F. Majed',
                type: 'Actor',
                age: "28",
                bio: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
                img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
            },
            {
                id: 1,
                name: 'F. Majed',
                type: 'Actor',
                age: "28",
                bio: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
                img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
            }           
        ];
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

    renderTalents = () => {

        return this.talents.map((talent, ind)=>{
            return <Col key={talent.id+'-'+talent.name+'-'+ind} sm={3} className="margin-btm-30"> <TalentCard talent={talent} /> </Col>
        });
    }

    renderSearchSection = () => {
        return <div className="home-search-section section-style" id="talentsection">
            <Container>
                <Row>
                    <Col>
                        <DropdownButton className="margin-btm-30 home-filter-talent" title="Filter talents">
                            <Dropdown.Item href="#/action-1">Singer</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Actor</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                </Row>
                    
                
                <Row>
                    {this.renderTalents()}
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
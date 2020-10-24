import React from 'react';
import Avatar from "../../assets/img/avatar.png";


class TalentCard extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
            isReadMore: false
        }
    }   

    setReadmore = (e) => {
        e.preventDefault();
        this.setState({isReadMore: !this.state.isReadMore});
    }

    renderCard = () => {
        const {img, firstName, lastName, talents, age, bio} = this.props.talent;
        const {isReadMore} = this.state;
        const name  = <><span>{firstName.substring(0, 1)}.</span> <span>{lastName}</span></>;
        const isBioLong = bio && bio.length > 43;
        return <div className={`talent-card ${(isReadMore)? "talent-readmore" : ""}`}>
            <div className="talent-image">
                <img src={img? img : Avatar} alt="talent"/>
            </div>
            <div className="talent-name">{name}</div>
            <div className="talent-type">{talents}</div>
            <div className="talent-age">{(age)? age + ' years old' : 'Age not specified'}</div>
            <div className={`talent-bio-short ${(isReadMore)? "d-none" : ""}`}>{(isBioLong)? bio.substring(0, 40) + "..." : bio}</div>
            <div className={`talent-bio-long ${(isReadMore)? "" : "d-none"}`}>{bio}</div>
            <div className="talent-readmore">
                <a href="/#" className={`btn-style btn-style-sm ${(isBioLong)? '': 'd-none'}`} onClick={this.setReadmore}>{(isReadMore)? "Read less" : "Read more"}</a>
            </div>
        </div>
    }

    render () {
        return <>{this.renderCard()}</>;
    }

}

export default TalentCard;

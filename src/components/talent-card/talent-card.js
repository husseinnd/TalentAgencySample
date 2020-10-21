import React from 'react';

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
        const {img, name, type, age, bio} = this.props.talent;
        const {isReadMore} = this.state;
        
        return <div className={`talent-card ${(isReadMore)? "talent-readmore" : ""}`}>
            <div className="talent-image">
                <img src={img} alt="talent"/>
            </div>
            <div className="talent-name">{name}</div>
            <div className="talent-type">{type}</div>
            <div className="talent-age">{age} years old</div>
            <div className={`talent-bio-short ${(isReadMore)? "d-none" : ""}`}>{(bio.length > 43)? bio.substring(0, 40) + "..." : bio}</div>
            <div className={`talent-bio-long ${(isReadMore)? "" : "d-none"}`}>{bio}</div>
            <div className="talent-readmore">
                <a href="/#" className="btn-style btn-style-sm" onClick={this.setReadmore}>{(isReadMore)? "Read less" : "Read more"}</a>
            </div>
        </div>
    }

    render () {
        return <>{this.renderCard()}</>;
    }

}

export default TalentCard;

import React from 'react';

class TalentCard extends React.Component{

    renderCard = () => {
        const {img, name, type, age, bio} = this.props.talent;
        return <div className="talent-card">
            <div className="talent-image">
                <img src={img} alt="talent"/>
            </div>
            <div className="talent-name">{name}</div>
            <div className="talent-type">{type}</div>
            <div className="talent-age">{age} years old</div>
            <div className="talent-bio-short">{(bio.length > 43)? bio.substring(0, 40) + "..." : bio}</div>
            <div className="talent-bio-long d-none">{bio}</div>
            <div className="talent-readmore">
                <a href="/#" className="btn-style btn-style-sm">Read more</a>
            </div>
        </div>
    }

    render () {
        return <>{this.renderCard()}</>;
    }

}

export default TalentCard;

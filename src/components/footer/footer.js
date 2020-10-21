import React from 'react';

class Footer extends React.Component {
    render (){
        const d = new Date();
       return (
        <footer className="footer">
            <div className="footer-container text-center">
                © {d.getFullYear()} <span>Talent Agency | Beirut - Lebanon.</span> All Rights Reserved.
            </div>
            
        </footer>
       );
    }
}

export default Footer;
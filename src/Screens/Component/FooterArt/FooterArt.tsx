import React from 'react';
import './FooterArt.css';

const FooterArt: React.FC = () => {
    return (
        <div className="About_us">
            <div className="about_main">
                {/* <img style={{ paddingLeft: 52 }} src={arrow} /> */}
                <p className="about_line"></p>
                <p>ABOUT US</p>
                <div style={{ display: 'flex', paddingRight: 50 }}>
                    <p style={{ paddingRight: 4.76, color: '#01A19A' }}>SWE</p>
                    {/* <img src={down_arrow} /> */}
                </div>
            </div>
        </div>
    );
}

export default FooterArt;

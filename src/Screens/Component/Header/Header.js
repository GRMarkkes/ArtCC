import React, { useEffect, useState } from "react";
import staller_header_logo from '../../../Asset/Images/main_logo.png'
import search_icon from "../../../Asset/SVG/icon-wrapper.svg"
import { Navigate, useNavigate } from "react-router-dom";
import './Header.css'
function Header(props) {
    const navigate = useNavigate();
    const [color, setColor] = useState(false);
    const marketPlace = () => {
        console.log(props.value)
        navigate('/marketplace')
        setColor(true)
    }
    return (
        <>
            <header className='header'>
                <img style={{ width: 137, height: 48, placeItems: 'center' }} src={staller_header_logo} alt="Background" />
                <div style={{ display: 'flex', gap: 30 }}>
                    <button className="header_button">PORTFOLIO</button>
                    <button className="header_button" onClick={()=>{navigate('/ArtProject')}}>ART PROJECTS</button>
                    {color ? (
                        <button className="header_button" style={{color:"#01A19A"}} >MARKET PLACE</button>
                    ) : (
                        <button className="header_button" onClick={marketPlace}>MARKET PLACE</button>
                    )}                </div>
                <div style={{ display: 'flex', color: '#01A19A', gap: 15 }}>
                    <button className="header_button" style={{color:'#01A19A',fontSize:15,fontWeight:"400"}}>CREATE WALLET</button>
                    <p>|</p>
                    <button className="header_button" style={{color:'#01A19A',fontSize:16, fontWeight: '600' }}>CONNECT WALLET</button>
                </div>
                <div>
                    <img style={{ width: 137, height: 48, placeItems: 'center' }} src={search_icon} alt="Background" />
                </div>

            </header>
        </>
    )
}
export default Header;
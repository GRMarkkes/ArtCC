import React, { useEffect, useState } from "react";
import staller_header_logo from '../../../Asset/Images/main_logo.png'
import search_icon from "../../../Asset/SVG/icon-wrapper.svg"
import { Navigate, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, } from 'react-bootstrap';
import Menu_Icon from '../../../Asset/SVG/Menu_Icon.svg'
import './Header.css'
function Header(props) {
    const navigate = useNavigate();
    const [color, setColor] = useState();
    const marketPlace = () => {
        navigate('/marketplace')
        setColor(true)
    }

    function toggleDrawer() {
        var links = document.querySelector('.header-links');
        links.classList.toggle('show');
    }
    const [showMenu, setShowMenu] = useState(false);
    return (
        <>
            {/* <header className='header'>
                <img style={{ width: 137, height: 48, placeItems: 'center' }} src={staller_header_logo} alt="Background" />
                <div style={{ display: 'flex', gap: 30 }}>
                    <button className="header_button">PORTFOLIO</button>
                    {props.value === "clicked" ? <button className="header_button_clicked"  onClick={() => {
                        setColor(true)
                        navigate('/ArtProject')
                    }}>ART PROJECTS</button> : <button className="header_button" onClick={() => {
                        navigate('/ArtProject')
                    }}>ART PROJECTS</button>}
                    {props.color === "true" ? (
                        <button className="header_button_clicked" >MARKET PLACE</button>
                    ) : (
                        <button className="header_button" onClick={marketPlace}>MARKET PLACE</button>
                    )}                </div>
                <div style={{ display: 'flex', color: '#01A19A', gap: 15 }}>
                    <button className="header_button" style={{ color: '#01A19A', fontSize: 15, fontWeight: "400" }}>CREATE WALLET</button>
                    <p>|</p>
                    <button className="header_button" style={{ color: '#01A19A', fontSize: 16, fontWeight: '600' }}>CONNECT WALLET</button>
                </div>
                <div>
                    <img style={{ width: 137, height: 48, placeItems: 'center' }} src={search_icon} alt="Background" />
                </div>

            </header> */}
            {/* <header class="header">
                <div class="header-logo">
                    <img src={staller_header_logo} alt="Background" />
                </div>
                <div class="header-links">
                    <button class="drawer-icon" onclick="toggleDrawer()">p</button>
                    <a class="header-link" href="#">Portfolio</a>
                    <a class="header-link" href="#">Art Projects</a>
                    <a class="header-link" href="#">Marketplace</a>
                    <div class="header-wallet">
                        <a class="header-link" href="#">Create Wallet</a>
                        <span>|</span>
                        <a class="header-link" href="#">Connect Wallet</a>
                    </div>
                    <div class="header-search">
                        <img src={search_icon} alt="Background" />
                    </div>
                </div>
            </header> */}
            {/* <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={staller_header_logo} alt="ART Clubcard" width="137" height="48" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="me-auto">
                            <Link className="nav-link" to="/portfolio">PORTFOLIO</Link>
                            <Link className={`nav-link ${props.value === "clicked" ? "active" : ""}`} to="/ArtProject" onClick={() => {
                                setColor(true);
                            }}>ART PROJECTS</Link>
                            <Link className={`nav-link ${props.color === "true" ? "active" : ""}`} to="#" onClick={marketPlace}>MARKET PLACE</Link>
                        </Nav>
                        <Nav>
                            <Link className="nav-link" to="#">CREATE WALLET</Link>
                            <span className="nav-link">|</span>
                            <Link className="nav-link" to="#">CONNECT WALLET</Link>
                        </Nav>
                        <div className="d-flex align-items-center">
                            <img src={search_icon} alt="Search" width="30" height="30" />
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar> */}
            <Navbar bg="black" expand="lg" fixed="top" style={{ display: 'flex', justifyContent: 'space-between' }} >
                <Container >
                    <Navbar.Brand to="/">
                        <img
                            src={staller_header_logo}
                            width="137"
                            height="48"
                            style={{ marginLeft: 20 }}
                            alt="ART Clubcard"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle
                        aria-controls="responsive-navbar-nav"
                        style={{ marginRight: 0 }}
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        <img src={Menu_Icon} alt="toggle" />
                    </Navbar.Toggle>
                    <Navbar.Collapse id="responsive-navbar-nav"  >
                        <Nav className="me-auto" style={{ alignItems: showMenu ? 'center' : 'end' }} >
                            <Nav.Link style={{ color: 'white' }} to="/portfolio">
                                PORTFOLIO
                            </Nav.Link>
                            {props.value === "clicked" ? <Nav.Link className="header_button_clicked" onClick={() => {
                                setColor(true)
                                navigate('/ArtProject')
                            }}>ART PROJECTS</Nav.Link> : <Nav.Link style={{ color: 'white' }} className="header_button" onClick={() => {
                                navigate('/ArtProject')
                            }} to="/art-projects">
                                ART PROJECTS
                            </Nav.Link>}

                            <Nav.Link style={{ color: 'white' }} to="/market-place">
                                MARKET PLACE
                            </Nav.Link>
                        </Nav>
                        <Nav className={showMenu ? "mobile_navbar" : "Create_bar"}>
                            <Nav.Link style={{ color: '#01A19A' }}>Create Wallet</Nav.Link>
                            <Nav.Link style={{ contentVisibility: showMenu ? "hidden" : null, color: '#01A19A' }}>|</Nav.Link>
                            <Nav.Link style={{ color: '#01A19A' }}>Connect Wallet</Nav.Link>

                        </Nav>
                        <Nav.Link style={{ contentVisibility: showMenu ? "hidden" : null }}>
                            <img src={search_icon} alt="Background" />
                        </Nav.Link>
                    </Navbar.Collapse>
                </Container>
                {showMenu && (
                    <div className="mobile-menu" style={{ display: showMenu ? 'flex' : 'None' }}>
                        {/* <Nav style={{backgroundColor:'red'}}>
                            <Nav.Link  to="/portfolio" onClick={() => (alert("a"))}>
                                PORTFOLIO
                            </Nav.Link>
                            <Nav.Link to="/art-projects" onClick={() => setShowMenu(false)}>
                                ART PROJECTS
                            </Nav.Link>
                            <Nav.Link to="/market-place" onClick={() => setShowMenu(false)}>
                                MARKET PLACE
                            </Nav.Link>
                            <Nav.Link onClick={() => setShowMenu(false)}>Create Wallet</Nav.Link>
                            <Nav.Link>|</Nav.Link>
                            <Nav.Link onClick={() => setShowMenu(false)}>Connect Wallet</Nav.Link>
                        </Nav> */}
                    </div>
                )}
            </Navbar>



        </>
    )
}
export default Header;

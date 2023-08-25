import { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import staller_header_logo from "../../../Asset/Images/main_logo.png";
import search_icon from "../../../Asset/SVG/icon-wrapper.svg";
import Menu_Icon from "../../../Asset/SVG/Menu_Icon.svg";
import "./Header.css";

interface HeaderProps {
  value?: string;
}

function Header(props: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  // const [color, setColor] = useState<boolean>();

  // const marketPlace = () => {
  //   navigate("/marketplace");
  //   setColor(true);
  // };

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <div>
      <Navbar bg="black" expand="lg" fixed="top" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src={staller_header_logo}
              width="137"
              height="48"
              alt="ART Clubcard"
              className="logo"
              style={{ marginLeft: "25%" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="menu-toggle"
            onClick={toggleMenu}
          >
            <img src={Menu_Icon} alt="toggle" />
          </Navbar.Toggle>

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto" style={{ flex: 1, marginLeft: "20%" }}>
              {props.value === "clicked" ? (
                <Nav.Link
                  className="header_button_clicked"
                  onClick={() => {
                    // setColor(true);
                    navigate("/ArtProject");
                  }}
                >
                  ART PROJECTS
                </Nav.Link>
              ) : (
                <Nav.Link
                  style={{ color: "white" }}
                  className="header_button"
                  onClick={() => {
                    navigate("/ArtProject");
                  }}
                 
                >
                  ART PROJECTS
                </Nav.Link>
              )}

              <Nav.Link
                style={{ color: "white" }}
                onClick={() => {
                  navigate("/marketplace");
                }}
              >
                MARKET PLACE
              </Nav.Link>
            </Nav>
            <Nav style={{ marginLeft: "20%" }}>
              <Nav.Link style={{ color: "#01A19A", marginTop: '3%' }}>
                Create Wallet
              </Nav.Link>
              <Nav.Link
                style={{ color: "#01A19A", marginTop: '3%' }}
                onClick={() => {
                  navigate("/MainApp");
                }}
              >
                Connect Wallet
              </Nav.Link>
              <Nav.Link>
                <img src={search_icon} alt="Search" />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {showMenu && (
        <div className="mobile-menu">
          <Nav>
            <Nav.Link as={Link} to="/portfolio" onClick={toggleMenu}>
              PORTFOLIO
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/art-projects"
              onClick={toggleMenu}
              className={
                props.value === "clicked"
                  ? "header_button_clicked"
                  : "header_button"
              }
            >
              ART PROJECT
            </Nav.Link>
            <Nav.Link as={Link} to="/market-place" onClick={toggleMenu}>
              MARKET PLACE
            </Nav.Link>
            <Nav.Link onClick={toggleMenu}>Create Wallet</Nav.Link>
            <span>|</span>
            <Nav.Link onClick={toggleMenu}>Connect Wallet</Nav.Link>
          </Nav>
        </div>
      )}
    </div>
  );
}

export default Header;

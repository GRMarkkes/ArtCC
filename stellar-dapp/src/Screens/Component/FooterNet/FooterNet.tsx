import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaYoutube, FaInstagram } from 'react-icons/fa';
import './FooterNet.css'; // Import the custom CSS file

const FooterNet: React.FC = () => {
    return (
        <div className="netflix-footer">
            <Container>
                <Row style={{ marginLeft: "10%", marginTop: "5%" }}>
                    <Col md={4} sm={6}>
                        <p>About</p>
                        <ul>
                            <li><a href="#">Company</a></li>
                            <li><a href="#">Jobs</a></li>
                            <li><a href="#">Press</a></li>
                        </ul>
                    </Col>
                    <Col md={4} sm={6}>
                        <p>Help</p>
                        <ul>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">Account</a></li>
                        </ul>
                    </Col>
                    <Col md={4} sm={6}>
                        <p>Legal</p>
                        <ul>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Cookie Policy</a></li>
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <hr className="footer-hr" />
                        <div className="footer-social-icons">
                            <a href="#">
                                <FaFacebookF />
                            </a>
                            <a href="#">
                                <FaYoutube />
                            </a>
                            <a href="#">
                                <FaInstagram />
                            </a>
                        </div>
                        <p className="footer-text" style={{ marginLeft: "38%", marginTop: "2%" }}>
                            &copy; 2023 Your Netflix-Like Website. All rights reserved.
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default FooterNet;

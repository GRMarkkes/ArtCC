import  { useEffect, useState } from "react";
import Header from "../Component/Header/Header";
import bgimage from '../../Asset/Images/Main_Page.png'
import { CgArrowLongLeft, CgArrowLongRight } from 'react-icons/cg';
import act_icon from '../../Asset/Images/art_icon.svg'
import './MainPage.css'
import portfolio_image from '../../Asset/Images/portfolio_image.png'
import Portfolio_image_mobile from '../../Asset/Images/Portfolio_image_mobile.png'
import Netflix_image from '../../Asset/Images/Netflix_image.png'
import Art_Credit from '../../Asset/Images/Art_Credit.png'
import Footer from '../Component/Footer/Footer'
import AboutFooter from "../Component/Footer2/AboutFooter";
import { useNavigate } from "react-router-dom";

function MainPage() {
    const navigate = useNavigate();
    const [isWideScreen, setIsWideScreen] = useState<boolean>(window.innerWidth >= 970);

    useEffect(() => {
        const handleResize = () => {
            setIsWideScreen(window.innerWidth >= 970);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [number, setNumber] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setNumber(prevNumber => prevNumber + 1);
        }, Math.floor(Math.random() * 5000) + 1000); // set random interval time between 1 to 6 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <>
           <Header/>
            <div className="position-relative">
                <img className="bg-image" style={{ backgroundSize: "cover", height: "100vh" }} src={bgimage} alt="imagebgd" />
                <div>
                    {isWideScreen ? (
                        <div className="position-absolute top-50 start-0 translate-middle-y d-flex align-items-center text-white" style={{ zIndex: 1, paddingLeft: 20 }} onClick={() => { navigate('/ArtProject') }}>
                            <h1><CgArrowLongLeft /></h1>
                            <h2 style={{ fontSize: 24 }}>Project</h2>
                        </div>
                    ) : (
                        <div className="position-absolute start-0 translate-middle-y d-flex align-items-center text-white" style={{ zIndex: 1, paddingLeft: 40, top: '80%' }}>
                            <h1 style={{ paddingRight: 10 }}><CgArrowLongLeft /></h1>
                            <h2 style={{ fontSize: 24 }}>Project</h2>
                        </div>
                    )}
                </div>
                {isWideScreen ? (
                    <div className="position-absolute top-50 translate-middle d-flex flex-column align-items-center" style={{ zIndex: 1, left: '48%' }}>
                        <img className="bg-image" style={{ height: 229, width: 229 }} src={act_icon} alt="imagebgd" />
                        <p className="text-center empowering-text">EMPOWERING CREATIVITY THROUGH COLLABORATION &amp; REWARD</p>
                        <p className="text-center Art_club" style={{ marginTop: "30px" }}>ART CLUBCARD</p>
                    </div>
                ) : (
                    <div className="position-absolute top-45 translate-middle d-flex flex-column align-items-center" style={{ zIndex: 1, left: '48%', top: '45%' }}>
                        <img className="bg-image" style={{ height: 229, width: 229 }} src={act_icon} alt="imagebgd" />
                        <p className="text-center empowering-text-mobile">EMPOWERING CREATIVITY THROUGH COLLABORATION &amp; REWARD</p>
                        <p className="text-center Art_club_mobile" style={{ marginTop: 10 }}>ART CLUBCARD</p>
                    </div>
                )}
                <div>
                    {isWideScreen ? (
                        <div className="position-absolute top-50 end-0 translate-middle-y d-flex align-items-center text-white" style={{ zIndex: 1, paddingRight: 40 }}>
                            <h2 style={{ fontSize: 24 }}>Market</h2>
                            <h1><CgArrowLongRight /></h1>
                        </div>
                    ) : (
                        <div className="position-absolute end-0 translate-middle-y d-flex align-items-center text-white" style={{ zIndex: 1, paddingRight: 40, top: '85%' }}>
                            <h2 style={{ fontSize: 24 }}>Market</h2>
                            <h1><CgArrowLongRight /></h1>
                        </div>
                    )}
                </div>
            </div>
            {isWideScreen ?
                <div className="position-absolute bottom-10 start-0 translate-middle-y container-fluid pl-3" style={{ paddingLeft: 60 }}>
                    <div className={isWideScreen ? "count-bar" : "count-bar-mobile"}>
                        <h2 className="text-center text-sm-start text-md-center text-lg-start">OVERVIEW</h2>
                        <div className="border-white border-1 h-50 border-end "></div>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: 13, fontWeight: 400, margin: 0 }}>User</p>
                            <p style={{ fontSize: 36, fontWeight: 500 }}>3,9876,456</p>
                        </div>
                        <div className="border-white border-1 h-50 border-end "></div>

                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: 13, fontWeight: 400, margin: 0 }}>Logins last 24h</p>
                            <p style={{ fontSize: 36, fontWeight: 500 }}>6,456</p>
                        </div>
                        <div className="border-white border-1 h-50 border-end "></div>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: 13, fontWeight: 400, margin: 0 }}>Projects</p>
                            <p style={{ fontSize: 36, fontWeight: 500 }}>124,656,456</p>
                        </div>
                        <div className="border-white border-1 h-50 border-end "></div>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: 13, fontWeight: 400, margin: 0 }}>Marketplaces</p>
                            <p style={{ fontSize: 36, fontWeight: 500 }}>{number}</p>
                        </div>
                    </div>
                </div>
                : <div className="position-absolute bottom-10 start-0 translate-middle-y container-fluid pl-3" style={{ marginTop: 40 }}>
                    <div className="count-bar-mobile">
                        <h2 className="text-center text-sm-start text-md-center text-lg-start">OVERVIEW</h2>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <div style={{ textAlign: 'center' }}>
                                <p style={{ fontSize: 13, fontWeight: 400, margin: 0 }}>User</p>
                                <p style={{ fontSize: 24, fontWeight: 500 }}>3,9876,456</p>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <p style={{ fontSize: 13, fontWeight: 400, margin: 0 }}>Projects</p>
                                <p style={{ fontSize: 24, fontWeight: 500 }}>124,656,456</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <div style={{ textAlign: 'center' }}>
                                <p style={{ fontSize: 13, fontWeight: 400, margin: 0 }}>Marketplaces</p>
                                <p style={{ fontSize: 24, fontWeight: 500 }}>124,656,456</p>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <p style={{ fontSize: 13, fontWeight: 400, margin: 0 }}>Logins last 24h</p>
                                <p style={{ fontSize: 24, fontWeight: 500 }}>6,456</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {isWideScreen ?
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: 181, width: '100%' }}>
                    <div style={{ width: '50%', paddingLeft: 50, paddingRight: 50 }}>
                        <h1 style={{ color: '#2196CC', paddingTop: 30, }}>A BETTER WAY</h1>
                        <h1 style={{ paddingTop: 0, width: '95%' }}>TO CO-FUNDING AND SUPPORTING CULTURAL PROJECTS</h1>
                        <p style={{ fontSize: 13, paddingTop: 20, fontWeight: 400, width: '85%' }}>ART ClubCard is a platform that allows individuals and organizations to co-fund and support cultural projects in a new and innovative way.
                            <br /> By joining the ART ClubCard, you can contribute to a wide range of creative projects, from art installations to performances and more.<br /> In return, you'll receive ART credit tokens that can be redeemed for discounts and other rewards from a variety of partner businesses, including hotels, shops, and more.<br /> With ART ClubCard, you can support the projects you care about while also enjoying great discounts and rewards. Whether you're an artist looking for funding or a business seeking to support the arts & reward your loyal customers, ART ClubCard is the perfect platform for you.</p>
                    </div>
                    <div style={{ width: '50%' }}>
                        <img src={portfolio_image} alt="Portfolio_Image" style={{ margin: 0, width: '100%', height: "100%" }} />
                    </div>
                </div> :
                <div className="container-fluid d-flex flex-wrap" style={{ marginTop: 181, padding: 0 }}>
                    <div className="col-12 col-md-6" style={{ width: '100%', paddingLeft: 30, paddingRight: 30 }}>
                        <h1 style={{ color: '#2196CC', paddingTop: 60, fontSize: 24, fontWeight: 500 }}>A BETTER WAY</h1>
                        <h1 style={{ fontSize: 24, fontWeight: 500 }}>TO CO-FUNDING AND SUPPORTING CULTURAL PROJECTS</h1>
                        <p style={{ fontSize: 13, paddingTop: 20, fontWeight: 400, width: '100%' }}>ART ClubCard is a platform that allows individuals and organizations to co-fund and support cultural projects in a new and innovative way.
                            <br /> By joining the ART ClubCard, you can contribute to a wide range of creative projects, from art installations to performances and more.<br /> In return, you'll receive ART credit tokens that can be redeemed for discounts and other rewards from a variety of partner businesses, including hotels, shops, and more.<br /> With ART ClubCard, you can support the projects you care about while also enjoying great discounts and rewards. Whether you're an artist looking for funding or a business seeking to support the arts & reward your loyal customers, ART ClubCard is the perfect platform for you.</p>
                    </div>
                    <div className="col-12 col-md-6" style={{ paddingLeft: 0, margin: 0, width: '100%' }}>
                        <img src={Portfolio_image_mobile} className="img-fluid" alt="Portfolio_Image" style={{ margin: 0 }} />
                    </div>
                </div>}
            {isWideScreen ?
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: 181, width: '100%', }}>
                    <div style={{ width: '50%' }}>
                        <img src={Netflix_image} alt="Portfolio_Image" style={{ margin: 0, width: '100%', height: "100%" }} />
                    </div>
                    <div style={{ width: '50%', paddingLeft: 50, paddingRight: 50, marginTop: 80 }}>
                        <h1 style={{ color: '#01A19A', paddingTop: 30, }}>DISCOVER PROJECTS</h1>
                        <h1 style={{ paddingTop: 0, width: '100%' }}>EXPLORE THE MARKETPLACE</h1>
                        <p style={{ fontSize: 13, paddingTop: 20, fontWeight: 400, width: '100%' }}>Now you can easily discover projects in your local area and beyond, and explore a variety of markets offering discounts and rewards.<br />
                            Plus, anyone can create their own projects or offer discounts and rewards through the platform. Explore the world of ART ClubCard today and discover all the benefits of being part of it.
                        </p>
                    </div>
                </div> :
                <div className="container-fluid d-flex flex-wrap" style={{ padding: 0 }}>
                    <div className="col-12 col-md-6" style={{ width: '100%', paddingLeft: 30, paddingRight: 30 }}>
                        <h1 style={{ color: '#01A19A', paddingTop: 30, fontSize: 24, fontWeight: 500 }}>DISCOVER PROJECTS</h1>
                        <h1 style={{ fontSize: 24, fontWeight: 500, width: "100%" }}>EXPLORE THE MARKETPLACE</h1>
                        <p style={{ fontSize: 13, paddingTop: 20, fontWeight: 400, width: '100%' }}>
                            Now you can easily discover projects in your local area and beyond, and explore a variety of markets offering discounts and rewards.<br />
                            Plus, anyone can create their own projects or offer discounts and rewards through the platform. Explore the world of ART ClubCard today and discover all the benefits of being part of it.
                        </p>
                    </div>
                    <div className="col-12 col-md-6" style={{ paddingLeft: 0, margin: 0, width: '100%' }}>
                        <img src={Netflix_image} className="img-fluid" alt="Portfolio_Image" style={{ margin: 0 }} />
                    </div>
                </div>}
            {isWideScreen ?
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: 'black', marginTop: 80 }}>
                    <div style={{ width: '50%', paddingLeft: 50, paddingRight: 50, color: "white" }}>
                        <h1 style={{ color: '#01A19A', paddingTop: 30, }}>ART CREDITS</h1>
                        <h1 style={{ paddingTop: 0, width: '95%' }}>HOW DO THEY WORK?</h1>
                        <p style={{ fontSize: 13, paddingTop: 20, fontWeight: 400, width: '85%', fontFamily: 'Montserrat' }}>
                            ART credits are digital tokens that are earned through the ART ClubCard platform by supporting projects and participating in the marketplace.<br />
                            These tokens are like membership points, a utility medium for trading, and they use blockchain technology to make them fully transparent, traceable, and secure. When you contribute to a project on the platform, you'll receive a certain number of ART credits that can be used to redeem discounts and rewards from businesses in the ART ClubCard marketplace. These businesses offer a wide range of products and services.<br />
                            By using your ART credits to redeem discounts and rewards, you can save money on your everyday purchases while supporting the projects you care about.<br />
                            Users can also trade ART credits on decentralized exchanges in the same way that they would trade other digital assets, with other users around the world. These exchanges use blockchain technology to record and verify transactions, making them  secure and transparent.
                        </p>
                    </div>
                    <div style={{ width: '50%' }}>
                        <img src={Art_Credit} alt="Portfolio_Image" style={{ margin: 0, width: '100%', height: "100%" }} />
                    </div>
                </div> :
                <div className="container-fluid d-flex flex-wrap" style={{ padding: 0, backgroundColor: 'black' }}>
                    <div className="col-12 col-md-6" style={{ width: '100%', paddingLeft: 30, paddingRight: 30, color: 'white' }}>
                        <h1 style={{ color: '#01A19A', paddingTop: 60, fontSize: 24, fontWeight: 500 }}>ART CREDITS</h1>
                        <h1 style={{ fontSize: 24, fontWeight: 500 }}>HOW DO THEY WORK?</h1>
                        <p style={{ fontSize: 13, paddingTop: 20, fontWeight: 400, width: '100%' }}>ART credits are digital tokens that are earned through the ART ClubCard platform by supporting projects and participating in the marketplace.<br /><br />
                            These tokens are like membership points, a utility medium for trading, and they use blockchain technology to make them fully transparent, traceable, and secure. When you contribute to a project on the platform, you'll receive a certain number of ART credits that can be used to redeem discounts and rewards from businesses in the ART ClubCard marketplace. These businesses offer a wide range of products and services.<br /><br />
                            By using your ART credits to redeem discounts and rewards, you can save money on your everyday purchases while supporting the projects you care about.<br /><br />
                            Users can also trade ART credits on decentralized exchanges in the same way that they would trade other digital assets, with other users around the world. These exchanges use blockchain technology to record and verify transactions, making them secure and transparent.
                        </p>
                    </div>
                    <div className="col-12 col-md-6" style={{ paddingLeft: 0, margin: 0, width: '100%' }}>
                        <img src={Art_Credit} className="img-fluid" alt="Portfolio_Image" style={{ margin: 0 }} />
                    </div>
                </div>}
            <div className="about-footer">
                <AboutFooter />
            </div>
            <Footer />
        </>
    )
}

export default MainPage;

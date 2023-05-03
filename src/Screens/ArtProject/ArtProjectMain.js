import React from "react";
import './ArtProjectMain.css'
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";
import artMainBackGround_image from '../../Asset/Images/ArtProject_main.png'
import Card_image from "../../Asset/Images/Card_Image.png"
import arrow from '../../Asset/SVG/arrow.svg'
import down_arrow from '../../Asset/SVG/down_arrow.svg'
// import card_image from '../../Asset/Images/card_image.png'
function ArtProject() {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']; // array of items for the flat list
    const big_discount = [{ title: 'Art Title Name', company: 'Company', }]

    return (
        <div className='Art_main'>
            <div class="container_1">
                <Header />
                <img src={artMainBackGround_image} alt="background image" class="bg-image" />
                <div class="card">
                    <div className="card_div_1">
                        <div style={{ display: 'flex' }}><img className="card_image" src={Card_image} />
                        </div>
                        <div className="card_text_div_1">
                            <h4 style={{ margin: 0, padding: 0 }}>Art Title Name</h4>
                            <p style={{ margin: 0, paddingTop: 5 }}>Company</p>
                            <div style={{ color: '#2196CC', display: 'flex', margin: 0, paddingTop: 5 }}>
                                <p>Lahore,</p>
                                <p>Punjab,</p>
                                <p>Pakistan</p>
                            </div>
                        </div>
                    </div>
                    <div className="card_div_1">
                        <img className="card_image" src={Card_image} />
                        <div className="card_text_div_1">
                            <h4 style={{ margin: 0, padding: 0 }}>Art Title Name</h4>
                            <p style={{ margin: 0, paddingTop: 5 }}>Company</p>
                            <div style={{ color: '#2196CC', display: 'flex', margin: 0, paddingTop: 5 }}>
                                <p>Lahore,</p>
                                <p>Punjab,</p>
                                <p>Pakistan</p>
                            </div>
                        </div>
                    </div>
                    <div className="card_div_1">
                        <img className="card_image" src={Card_image} />
                        <div className="card_text_div_1">
                            <h4 style={{ margin: 0, padding: 0 }}>Art Title Name</h4>
                            <p style={{ margin: 0, paddingTop: 5 }}>Company</p>
                            <div style={{ color: '#2196CC', display: 'flex', margin: 0, paddingTop: 5 }}>
                                <p>Lahore,</p>
                                <p>Punjab,</p>
                                <p>Pakistan</p>
                            </div>
                        </div>
                    </div>
                    <div className="card_div_1">
                        <img className="card_image" src={Card_image} />
                        <div className="card_text_div_1">
                            <h4 style={{ margin: 0, padding: 0 }}>Art Title Name</h4>
                            <p style={{ margin: 0, paddingTop: 5 }}>Company</p>
                            <div style={{ color: '#2196CC', display: 'flex', margin: 0, paddingTop: 5 }}>
                                <p>Lahore,</p>
                                <p>Punjab,</p>
                                <p>Pakistan</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='body'></div> */}


            <div style={{margin:20}}><div className="card_div_1">
                <img className="card_image" src={Card_image} />
                <div className="card_text_div_1">
                    <h4 style={{ margin: 0, padding: 0 }}>Art Title Name</h4>
                    <p style={{ margin: 0, paddingTop: 5 }}>Company</p>
                    <div style={{ color: '#2196CC', display: 'flex', margin: 0, paddingTop: 5 }}>
                        <p>Lahore,</p>
                        <p>Punjab,</p>
                        <p>Pakistan</p>
                    </div>
                </div>
            </div>
            </div>
            <div className="About_us">
                <div className="about_main">
                    <img style={{ paddingLeft: 52 }} src={arrow} />
                    <p className="about_line"></p>
                    <p>ABOUT US</p>
                    <div style={{ display: 'flex', paddingRight: 50 }}>
                        <p style={{ paddingRight: 4.76, color: '#01A19A' }}>SWE</p>
                        <img src={down_arrow} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>)
}
export default ArtProject;
{/* <div style={{backgroundImage: `url(${marketplacebackground_image})`, backgroundSize: 'cover',display:'flex',flexDirection:'column'}}>
<div></div>
<div style={{paddingTop:500}}><p>hello</p></div>
</div> */}
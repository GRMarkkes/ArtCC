import React from "react";
import './marketPlace.css';
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";
import marketplacebackground_image from '../../Asset/Images/MarketPlace_main.png'
// import card_image from '../../Asset/Images/card_image.png'
function marketplace() {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']; // array of items for the flat list
    const big_discount=[{title:'Art Title Name',company:'Company',}]

    return (
        <div >
            <Header color={'yellow'}/>
            <div class="container">
                <img src={marketplacebackground_image} alt="background image" class="bg-image" />
                <div class="card">
                    <div className="card_div">
                        <div style={{display:'flex'}}><img className="card_image" src={marketplacebackground_image} />
                        <div className="discount_div">
                            <p className='discount_tag'>80% off</p>
                            {/* <p>b</p>
                            <p>c</p> */}
                        </div></div>
                        <div className="card_text_div">
                            <h4 style={{ margin: 0, padding: 0 }}>Art Title Name</h4>
                            <p style={{ margin: 0, paddingTop: 5 }}>Company</p>
                            <div style={{ color: '#2196CC', display: 'flex', margin: 0, paddingTop: 5 }}>
                                <p>Lahore,</p>
                                <p>Punjab,</p>
                                <p>Pakistan</p>
                            </div>
                        </div>
                    </div>
                    <div className="card_div">
                        <img className="card_image" src={marketplacebackground_image} />
                        <div className="card_text_div">
                            <h4 style={{ margin: 0, padding: 0 }}>Art Title Name</h4>
                            <p style={{ margin: 0, paddingTop: 5 }}>Company</p>
                            <div style={{ color: '#2196CC', display: 'flex', margin: 0, paddingTop: 5 }}>
                                <p>Lahore,</p>
                                <p>Punjab,</p>
                                <p>Pakistan</p>
                            </div>
                        </div>
                    </div>
                    <div className="card_div">
                        <img className="card_image" src={marketplacebackground_image} />
                        <div className="card_text_div">
                            <h4 style={{ margin: 0, padding: 0 }}>Art Title Name</h4>
                            <p style={{ margin: 0, paddingTop: 5 }}>Company</p>
                            <div style={{ color: '#2196CC', display: 'flex', margin: 0, paddingTop: 5 }}>
                                <p>Lahore,</p>
                                <p>Punjab,</p>
                                <p>Pakistan</p>
                            </div>
                        </div>
                    </div>
                    <div className="card_div">
                        <img className="card_image" src={marketplacebackground_image} />
                        <div className="card_text_div">
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
            <div className='body'></div>
            <div className='mid_header'>
                <p className="mid_header_p1"> OVERVIEW USABILITY</p>

                <div className="hor_line"></div>
                {/* <div style={{ height: 72, width: 154, display: 'flex', flexDirection: 'column' }}> */}
                {/* <p className="mid_header_title">Discount Opportunities</p> */}
                {/* <p className="mid_header_number">3,456</p> */}
                <ul style={{ display: 'flex', flexDirection: 'column', color: 'white', margin: 0, padding: 20 }}>
                    <p style={{ height: 0, paddingBottom: 10 }}>Discount Opportunities</p>
                    <p className="mid_header_number">3,456</p>
                </ul>
                {/* </div> */}
                <div className="hor_line"></div>

                <ul style={{ display: 'flex', flexDirection: 'column', color: 'white', margin: 0, padding: 15 }}>
                    <p style={{ display: 'flex', height: 0, paddingBottom: 10, justifyContent: 'center' }}>Savings</p>
                    <p className="mid_header_number">8,765</p>
                </ul>


                <div className="hor_line"></div>
                {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}> */}
                <ul style={{ display: 'flex', flexDirection: 'column', color: 'white', margin: 0, padding: 20 }}>
                    <p style={{ height: 0, paddingBottom: 10 }}>(average 1000sek per discount) and still counting</p>
                    <p className="mid_header_number">450,532 SEK</p>
                </ul>
                {/* </div> */}
            </div>

            <div className="card_div">
                <img className="card_image" src={marketplacebackground_image} />
                <div className="card_text_div">
                    <h4 style={{ margin: 0, padding: 0 }}>Art Title Name</h4>
                    <p style={{ margin: 0, paddingTop: 5 }}>Company</p>
                    <div style={{ color: '#2196CC', display: 'flex', margin: 0, paddingTop: 5 }}>
                        <p>Lahore,</p>
                        <p>Punjab,</p>
                        <p>Pakistan</p>
                    </div>
                </div>
            </div>
            
            
            <Footer />
        </div>)
}
export default marketplace;
{/* <div style={{backgroundImage: `url(${marketplacebackground_image})`, backgroundSize: 'cover',display:'flex',flexDirection:'column'}}>
<div></div>
<div style={{paddingTop:500}}><p>hello</p></div>
</div> */}
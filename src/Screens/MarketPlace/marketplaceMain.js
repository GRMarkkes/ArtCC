import React from "react";
import './marketPlace.css';
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";
import marketplacebackground_image from '../../Asset/Images/MarketPlace_main.png'
// import card_image from '../../Asset/Images/card_image.png'
import discount_arrow_icon from '../../Asset/SVG/Discount_arrow_icon.svg'
function marketplace() {
    const big_discount = [{ title: 'Art Title Name', company: 'Company', Address: { City: 'Lahore', Pro: "punjab", Country: "pakistan" } },
    { title: 'Art 101', company: 'Company', Address: { City: 'Lahore', Pro: "punjab", Country: "pakistan" } },
    { title: 'Art 102 Name', company: 'Company', Address: { City: 'Kalam', Pro: "KPK", Country: "pakistan" } },
    { title: 'Art 103 Name', company: 'Company', Address: { City: 'Skardu', Pro: "KPK", Country: "pakistan" } }]
    const Component = (item) => {
        return (
            <div style={{ width: "23.5%", height: 251, display: 'flex', flexDirection: "column", }} className="box_dump">
                <div style={{ position: "relative", display: "inline-block", display: 'flex' }}>
                    <img className="card_image" src={marketplacebackground_image} />

                    <div style={{ position: "absolute", bottom: 0, left: 0, display: 'flex', width: "100%",justifyContent:"space-around" }} className="discount_div">
                        <div className="discount_tag"><p style={{ margin: 0, fontSize: 20, fontWeight: 500, }}>80%</p>
                            <p style={{ margin: 2.5, font: 12 }}> off</p></div>
                        <img style={{ paddingRight: 0 }} src={discount_arrow_icon} />
                        <p style={{ paddingRight: 10, fontWeight: 400, fontSize: 13 }}>1000 ARTcredits</p>
                    </div>


                </div>
                <div className="card_text_div">
                    <h4 style={{ margin: 0, padding: 0 }}>{item?.title}</h4>
                    <p style={{ margin: 0, paddingTop: 5 }}>{"item?.company"}</p>
                    <div style={{ color: '#2196CC', display: 'flex', height: 30, width: "100%", margin: 0, paddingTop: 5 }}>
                        <p>{"Lahore,"}</p>
                        <p>{"Punjab,"}</p>
                        <p>pakistan</p>
                    </div>
                </div>
            </div>
        )

    }
    return (
        <div >

            <div class="container">
                <Header color={'true'} />
                <img src={marketplacebackground_image} alt="background image" class="bg-image" />
                <div class="card_1">
                    {
                        big_discount.map((item) => {
                            return (
                                <>{Component(item)}</>
                            )
                        })
                    }
                </div>
            </div>
            <div className='body'></div>
            <div className='mid_header'>
                <p className="mid_header_p1"> OVERVIEW USABILITY</p>
                <div className="hor_line"></div>
                <ul style={{ display: 'flex', flexDirection: 'column', color: 'white', margin: 0, padding: 20 }}>
                    <p style={{ height: 0, paddingBottom: 10 }}>Discount Opportunities</p>
                    <p className="mid_header_number">3,456</p>
                </ul>
                <div className="hor_line"></div>
                <ul style={{ display: 'flex', flexDirection: 'column', color: 'white', margin: 0, padding: 15 }}>
                    <p style={{ display: 'flex', height: 0, paddingBottom: 10, justifyContent: 'center' }}>Savings</p>
                    <p className="mid_header_number">8,765</p>
                </ul>
                <div className="hor_line"></div>
                <ul style={{ display: 'flex', flexDirection: 'column', color: 'white', margin: 0, padding: 20 }}>
                    <p style={{ height: 0, paddingBottom: 10 }}>(average 1000sek per discount) and still counting</p>
                    <p className="mid_header_number">450,532 SEK</p>
                </ul>
            </div>
            <div style={{display:'flex',justifyContent:"space-around"}}>
                {/* <div class="card"> */}
                    {
                        big_discount.map((item) => {
                            return (
                                <>{Component(item)}</>
                            )
                        })
                    }
                {/* </div> */}
                {/* <div style={{ width: "23.5%", height: 251, display: 'flex', flexDirection: "column", }} className="box_dump">
                <div style={{ position: "relative", display: "inline-block", display: 'flex' }}>
                    <img className="card_image" src={marketplacebackground_image} />

                    <div style={{ position: "absolute", bottom: 0, left: 0, display: 'flex', width: "100%" }} className="discount_div">
                        <div className="discount_tag"><p style={{ margin: 0, fontSize: 20, fontWeight: 500 }}>80%</p>
                            <p style={{ margin: 2.5, font: 12 }}> off</p></div>
                        <img style={{ paddingRight: 0 }} src={discount_arrow_icon} />
                        <p style={{ paddingRight: 10, fontWeight: 400, fontSize: 13 }}>1000 ARTcredits</p>
                    </div>
                </div>
                <div className="card_text_div">
                    <h4 style={{ margin: 0, padding: 0 }}>{"item?.title"}</h4>
                    <p style={{ margin: 0, paddingTop: 5 }}>{"item?.company"}</p>
                    <div style={{ color: '#2196CC', display: 'flex', height: 30, width: "100%", margin: 0, paddingTop: 5 }}>
                        <p>{"Lahore,"}</p>
                        <p>{"Punjab,"}</p>
                        <p>pakistan</p>
                    </div>
                </div>
            </div> */}
            </div>
            <Footer />
        </div>)
}
export default marketplace;
{/* <div style={{backgroundImage: `url(${marketplacebackground_image})`, backgroundSize: 'cover',display:'flex',flexDirection:'column'}}>
<div></div>
<div style={{paddingTop:500}}><p>hello</p></div>
</div> */}
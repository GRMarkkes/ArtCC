import React, { useState } from "react";
import './ArtProjectMain.css'
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";
import artMainBackGround_image from '../../Asset/Images/ArtProject_main.png'
import Card_image from "../../Asset/Images/Card_Image.png"
import arrow from '../../Asset/SVG/arrow.svg'
import down_arrow from '../../Asset/SVG/down_arrow.svg'
import info_icon from '../../Asset/SVG/Info_icon.svg'
import { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import SwiperCore, { Navigation, Pagination } from 'swiper';
SwiperCore.use([Navigation, Pagination]);
// import card_image from '../../Asset/Images/card_image.png'
function ArtProject() {
    const [isMobile, setIsMobile] = useState(false);
    // const isMobile = useMediaQuery({ maxDeviceWidth: 800 });
    const [swiper, setSwiper] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const big_discount = [{ id: 1, title: 'Art Title Name', company: 'Company', Address: { City: 'Lahore', Pro: "punjab", Country: "pakistan" }, testData: { bgcolor: "#45AFD9", completed: "15" } },
    { id: 2, title: 'Art 101', company: 'Company', Address: { City: 'Lahore', Pro: "punjab", Country: "pakistan" }, testData: { bgcolor: "#45AFD9", completed: 30 } },
    { id: 3, title: 'Art 102 Name', company: 'Company', Address: { City: 'Kalam', Pro: "KPK", Country: "pakistan" }, testData: { bgcolor: "#45AFD9", completed: 50, } },
    { title: 'Art 103 Name', company: 'Company', Address: { City: 'Skardu', Pro: "KPK", Country: "pakistan" }, testData: { bgcolor: "#45AFD9", completed: 70 } }]
    const handleSlideChange = () => {
        if (swiper !== null) {
            setCurrentIndex(swiper.activeIndex);
            swiper.slideTo(currentIndex + 1);
        }
    };
    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < 780);

        }
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const ProgressBar = (props) => {
        const { bgcolor, completed } = props;
        const containerStyles = {
            height: 5,
            width: '100%',
            backgroundColor: "#e0e0de",
            borderRadius: 50,
            marginLeft: 0,
            marginTop: 10,
            marginRight: 10,
        }

        const fillerStyles = {
            height: '100%',
            width: `${completed}%`,
            backgroundColor: bgcolor,
            borderRadius: 'inherit',
            textAlign: 'right'
        }

        const labelStyles = {
            padding: 5,
            color: 'white',
            fontWeight: 'bold'
        }


        return (
            <div style={containerStyles}>
                <div style={fillerStyles}>
                    <span style={labelStyles}></span>
                </div>
            </div>
        );
    };
    // SwiperCore.use([Navigation, Pagination]);






    const component = (value) => {
        return (
            <div className="card_div_1 ">
                <div style={{ display: 'flex' }}><img className="card_image" src={Card_image} />
                </div>
                <div className="card_text_div_1 ">
                    <h4 style={{ margin: 0, paddingLeft: 10 }}>{value?.title}</h4>
                    <p style={{ margin: 0, paddingTop: 5, paddingLeft: 10, height: 15 }}>{value?.company}</p>
                    <div style={{ color: '#2196CC', display: 'flex', flexDirection: "column", margin: 0, paddingLeft: 10 }}>
                        <div style={{ display: 'flex', marginTop: "20px" }}>
                            <p style={{ height: 5 }}>{value?.Address?.City},</p>
                            <p style={{ height: 5 }}>{value?.Address?.Pro},</p>
                            <p style={{ height: 5 }}>{value?.Address?.Country}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                                <><p style={{ height: 5, paddingRight: 5 }}>Kr. 4.799</p>
                                    <p style={{ height: 5, }}>SEK</p></>
                                <p style={{ height: 5, paddingRight: 10 }}>100 Supporters</p>
                            </div>
                            <div style={{ display: 'flex', padding: 0 }}>
                                {ProgressBar(value?.testData)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

    return (
        <div className=' Art_main bg-custom'>
            <div class="container_1">
                <Header value={"clicked"} />
                <img src={artMainBackGround_image} alt="background image" class="img-fluid" />
                <div style={{ display: 'flex', width: '98%', marginTop: 10 }}>
                    {isMobile ?
                        
                        <Swiper
                            spaceBetween={5}
                            slidesPerView={1}
                            navigation={true}
                            pagination={{ clickable: true }}
                            onSlideChange={handleSlideChange}
                            onSwiper={setSwiper}
                        >
                            {big_discount.map((item) => (
                                <SwiperSlide key={item.id}>{component(item)}</SwiperSlide>
                            ))}
                        </Swiper>
                        :
                        <div style={{ display: 'flex', width: "98%", marginTop: 10 }}>
                            {big_discount.map((item) => {
                                return (component(item))
                            })}
                        </div>
                    }
                </div>
                {/* <div style={{ display: 'flex', width: '98%', marginTop: 10 }}>
                    <div style={{ display: 'flex', width: "98%", marginTop: 10 }}>{big_discount?.map((item) => {
                        return (component(item))
                    })}</div>
                </div> */}
                {/* <Swiper
                    spaceBetween={10}
                    slidesPerView={isMobile ? 1 : 3}
                    navigation={true}
                    pagination={{ clickable: true }}
                    onSlideChange={handleSlideChange}
                    onSwiper={setSwiper}
                >
                    {big_discount.map((item) => (
                        <SwiperSlide key={item.id}>{component(item)}</SwiperSlide>
                    ))}
                </Swiper> */}

            </div>
            <div style={{ display: "flex" }}>
                <div style={{ display: 'flex', alignSelf: "center", alignItems: "center" }}>
                    <p className="p_tag">NEAR TO ME</p>
                    <p className="p_1">Current Location:</p>
                    <p className="p_1">Warsaw, Poland</p>
                </div>
                <div></div>
            </div>
            <div style={{ display: 'flex', width: "98%", marginTop: 10 }}>
                {
                    isMobile ? (

                        <div style={{ marginLeft: 70, width: 1000 }}>
                            {component(big_discount[0])}
                        </div>
                    ) : (
                        <div style={{ display: 'flex', width: '98%', marginTop: 10 }}>{big_discount.map(item => component(item))}</div>
                    )
                }
            </div>
            <div style={{ display: "flex" }}>
                <div style={{ display: 'flex', alignSelf: "center", alignItems: "center" }}>
                    <p className="p_tag">PERFORMING ART</p>
                </div>
                <div></div>
            </div>
            <div style={{ display: 'flex', width: "98%", marginTop: 10 }}>{big_discount?.map((item) => {
                {/* return (component(item)) */ }
            })}</div>
            <div style={{ display: 'flex', width: "98%", marginTop: 30 }}>{big_discount?.map((item) => {
                {/* return (component(item)) */ }
            })}</div>
            <div style={{ borderRadius: '1px', borderBottom: '1px solid Neutral/10', paddingTop: 20 }}></div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: 'flex', alignItems: "center" }}>
                    <p className="p_tag">OPEN CALL</p>
                    <div className="icon-container">
                        <img className="info-icon" style={{ paddingLeft: 10 }} src={info_icon} alt="info-icon" />
                        <div className="info-text"><p style={{ margin: 0, fontWeight: 700 }}>INFO</p><br />Organizations, public entities, or others can create <br />
                            open-calls where artists who apply are rewarded with ART <br />
                            credits for their time spent on the application. Follow <br />
                            the instructions in the project description. The public <br />
                            can also show support to reach the funding goal.</div>
                    </div>
                </div>
                <div></div>
                <div style={{ display: 'flex', width: "98%", marginTop: 30, paddingBottom: 60 }}>{big_discount?.map((item) => {
                    {/* return (component(item)) */ }
                })}</div>
            </div>
            {/* <div className="About_us">
                <div className="about_main">
                    <img style={{ paddingLeft: 52 }} src={arrow} />
                    <p className="about_line"></p>
                    <p>ABOUT US</p>
                    <div style={{ display: 'flex', paddingRight: 50 }}>
                        <p style={{ paddingRight: 4.76, color: '#01A19A' }}>SWE</p>
                        <img src={down_arrow} />
                    </div>
                </div>
            </div> */}
            <Footer />
        </div>)
}
export default ArtProject;
{/* <div style={{backgroundImage: `url(${marketplacebackground_image})`, backgroundSize: 'cover',display:'flex',flexDirection:'column'}}>
<div></div>
<div style={{paddingTop:500}}><p>hello</p></div>
</div> */}
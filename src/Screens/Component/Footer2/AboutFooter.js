import React, { useEffect, useState } from "react";
import arrow from '../../../Asset/SVG/arrow.svg'
import down_arrow from '../../../Asset/SVG/down_arrow.svg'
import './AboutFooter.css'
import { useNavigate } from "react-router-dom";
function AboutFooter(props) {
    const navigate = useNavigate();
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 970);

    useEffect(() => {
        const handleResize = () => {
            setIsWideScreen(window.innerWidth >= 970);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <>
            <div className={isWideScreen ? "start_now" : "start_now_mobile"}>
                <div class="d-flex flex-column align-items-center">
                    <h1 class="text-white mt-5">START NOW</h1>
                    <button class="btn mt-3" style={{ backgroundColor: '#01A19A', borderRadius: 2 }}>CONNECT WALLET</button>
                    <div class="about_main mt-5">
                        <img class="mr-3" src={arrow} alt="arrow" onClick={()=>{
                            navigate(props.onvalue)
                        }} />
                        {isWideScreen ? <p class="about_line m-0"></p> : null}
                        <p class="text-white ml-3 about_text" style={{ paddingTop: 15 }}>ABOUT US</p>
                        <div class="d-flex align-items-center ml-auto">
                            <p class="mb-0 mr-2" style={{ color: '#01A19A' }}>SWE</p>
                            <img style={{ marginLeft: 5 }} src={down_arrow} alt="down arrow" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AboutFooter
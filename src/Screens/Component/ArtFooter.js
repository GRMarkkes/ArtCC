import React, { useEffect, useState } from "react";
import arrow from '../../Asset/SVG/arrow.svg'
import down_arrow from '../../Asset/SVG/down_arrow.svg'
import '../Component/CardSlider/CardSlider.css'
import { useNavigate } from "react-router-dom";
function ArtFooter(props) {
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
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      };
    return (
        <>
            <div className={isWideScreen ? "start_noww" : "start_now_mobilee"}>
                <div class="d-flex flex-column align-items-center">
                    <div class="about_mainn" style={{marginTop:'8%'}}>
                        <img class="mr-3" src={arrow} alt="arrow" style={{cursor: "pointer"}} onClick={scrollToTop}
                         />
                        {isWideScreen ? <p class="about_linee m-0"></p> : null}
                        <p class="text-white ml-3 about_textt" style={{ paddingTop: 15 }}>ABOUT US</p>
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
export default ArtFooter
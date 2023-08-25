import  { useEffect, useState } from "react";
import arrow from '../../Asset/SVG/arrow.svg'
import down_arrow from '../../Asset/SVG/down_arrow.svg'
import '../Component/CardSlider/CardSlider.css'
// import { useNavigate } from "react-router-dom";

function ArtFooter() {
    // const navigate = useNavigate();
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

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
    };

    return (
        <>
            <div className={isWideScreen ? "start_noww" : "start_now_mobilee"}>
                <div className="d-flex flex-column align-items-center">
                    <div className="about_mainn" style={{ marginTop: '8%' }}>
                        <img className="mr-3" src={arrow} alt="arrow" style={{ cursor: "pointer" }} onClick={scrollToTop} />
                        {isWideScreen ? <p className="about_linee m-0"></p> : null}
                        <p className="text-white ml-3 about_textt" style={{ paddingTop: 15 }}>ABOUT US</p>
                        <div className="d-flex align-items-center ml-auto">
                            <p className="mb-0 mr-2" style={{ color: '#01A19A' }}>SWE</p>
                            <img style={{ marginLeft: 5 }} src={down_arrow} alt="down arrow" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ArtFooter;

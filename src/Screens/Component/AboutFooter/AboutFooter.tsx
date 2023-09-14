import  { useEffect, useState } from "react";
import arrow from '../../../Asset/SVG/arrow.svg';
import down_arrow from '../../../Asset/SVG/down_arrow.svg';
import './AboutFooter.css';

function AboutFooter() {
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
            <div className={isWideScreen ? "start_now" : "start_now_mobile"}>
                <div className="d-flex flex-column align-items-center">
                    <h1 className="text-white mt-5">START NOW</h1>
                    <button className="btn mt-3" style={{ backgroundColor: '#01A19A', borderRadius: 2 }}>CONNECT WALLET</button>
                    <div className="about_main mt-5">
                        <img className="mr-3" src={arrow} alt="arrow" onClick={scrollToTop} />
                        {isWideScreen ? <p className="about_line m-0"></p> : null}
                        <p className="text-white ml-3 about_text" style={{ paddingTop: 15 }}>ABOUT US</p>
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

export default AboutFooter;

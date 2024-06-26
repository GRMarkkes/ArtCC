import "./AboutFooter.css";

import { useEffect, useState } from "react";

import arrow from "../../../assets/arrow.png";
import down_arrow from "../../../assets/down_arrow.png";
import { useNavigate } from "react-router-dom";

interface AboutFooterProps {
  onvalue?: string;
}

function AboutFooter(props: AboutFooterProps) {
  const navigate = useNavigate();
  const [isWideScreen, setIsWideScreen] = useState<boolean>(
    window.innerWidth >= 970
  );

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 970);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className={isWideScreen ? "start_now" : "start_now_mobile"}>
        <div className="d-flex flex-column align-items-center">
          <h1 className="text-white mt-5">START NOW</h1>
          <button
            className="btn mt-3"
            style={{ backgroundColor: "#01A19A", borderRadius: 2 }}
          >
            CONNECT WALLET
          </button>
          <div className="about_main mt-5">
            <img
              className="mr-3"
              src={arrow}
              alt="arrow"
              onClick={() => {
                if (props.onvalue) {
                  navigate(props.onvalue);
                }
              }}
            />
            {isWideScreen ? <p className="about_line m-0"></p> : null}
            <p
              className="text-white ml-3 about_text"
              style={{ paddingTop: 15 }}
            >
              ABOUT US
            </p>
            <div className="d-flex align-items-center ml-auto">
              <p className="mb-0 mr-2" style={{ color: "#01A19A" }}>
                SWE
              </p>
              <img
                style={{ marginLeft: 5 }}
                src={down_arrow}
                alt="down arrow"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutFooter;

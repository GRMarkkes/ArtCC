import React from "react";
import imgcard from "../../../Asset/Images/Card_Image.png";
import { FaPlay } from "react-icons/fa";

import {
  AiOutlinePlus,
  AiOutlineCloseCircle,
  AiFillLike,
  AiFillPlayCircle,
} from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import "./Modal.css";

const Modal = () => {
  return (
    <div style={{width:"66.77%", marginLeft:"16%"}}> 
      <div class="col-md-12 ">
        <img src={imgcard} alt="movie" class="img-fluid" />
      </div>
      {/* <div className="buttonss flex">
        <button className="flex j-center a-center">
          <FaPlay />
          Play
        </button>
        <div className="controls flex" style={{ gap: "2%", marginTop: "13px" }}>
          <RiThumbUpFill title="Like" style={{ fontSize: "25px" }} />
          <AiOutlinePlus
            title="Add to my list"
            style={{ fontSize: "25px", marginLeft: "20px" }}
          />
        </div>
      </div> */}
      <div className="container bg-black " >
        <div className="row" style={{display:"flex", gap:"8%"}}>
          <div className="col-md-6">
            <div className="descing" style={{marginLeft:"6%", marginTop:"6%"}}>
              <span className="matching">98% Match</span>{" "}
              <span className="aging">18+</span>{" "}
              <span className="seasoing">2021 New Adventure season</span>
              <p className="pagging" style={{marginTop:"14%"}}>
                The wisecracking doll possessed by a psychopathic killer returns
                to terrorize a young woman in a wheelchair and her troubled
                family.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div style={{marginTop:"10%", marginLeft:"6%"}}>
              <p className="Gener" >
                Genre:{" "}
                <span className="Genering">
                  Harry & Meghan, Conversations with a Killer, The Jeffrey
                  Dahmer Tapes
                </span>
              </p>
              <p className="Gener" style={{marginTop:"8%"}}>
                Genre:{" "}
                <span  className="Genering">
                  Harry & Meghan, Conversations with a Killer, The Jeffrey
                  Dahmer Tapes
                </span>
              </p>
              <p className="Gener"  style={{marginTop:"8%"}}>
                Genre:{" "}
                <span className="Genering">
                  Harry & Meghan, Conversations with a Killer, The Jeffrey
                  Dahmer Tapes
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

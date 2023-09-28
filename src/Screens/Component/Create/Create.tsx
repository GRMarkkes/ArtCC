// import React from "react";
import ImageCreate from "../../../Asset/Rectangle 4.png";
import "./Create.css";
import deleteIcon from "../../../Asset/wrapper.png";
const Create = () => {
  return (
    <div className="Create">
      <div style={{ position: "relative" }}>
        <img src={ImageCreate} alt="ImageCreate" />
        <img
          src={deleteIcon}
          alt="deleteIcons"
          style={{ position: "absolute", top: "2%", right: "2%" }}
        />
      </div>
      <div>
        <p>Title</p>
      </div>
    </div>
  );
};

export default Create;

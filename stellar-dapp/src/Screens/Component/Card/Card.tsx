import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { MdOutlineReportProblem } from "react-icons/md";
import decimg from "../../../Asset/ModalImg.png";
import {
  AiOutlineCloseCircle,
  AiOutlineCalendar,
  AiFillStar,
} from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import "bootstrap/dist/css/bootstrap.min.css";
import "../NewCard/NewCard.css";
import cardimg from "../../../Asset/Images/Card_Image.png";
import "./Card.css";
import Modal from "react-modal";
import { motion } from "framer-motion";
interface CardProps {
  index: number;
  movieData: {
    image: string;
    name: string;
  };
  isLiked?: boolean;
}

const Card: React.FC<CardProps> = React.memo(({ index, movieData }) => {
  // const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 1220);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 1220);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const openModal = () => {
    setIsHovered(false);
    setIsModalOpen(true);

  };

  const closeModal = () => {
    setIsModalOpen(false);
    // setIsHovered(false);
  };
  interface TagProps {
    text: string;
  }
  
  const Tag: React.FC<TagProps> = ({ text }) => {
    return <div className="tag">{text}</div>;
  };
  const rating = 4.5; // Replace with the actual star rating

  const renderStarRating = () => {
    const roundedRating = Math.round(rating * 2) / 2;
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
        stars.push(<AiFillStar key={i} className="star filled" />);
      } else {
        stars.push(<AiFillStar key={i} className="star" />);
      }
    }

    return stars;
  };
  const Review = () => {
    return (
      <div className="review-box" style={{ marginTop: "2%" }}>
        <h4>Name</h4>
        <div style={{ display: "flex", gap: "20%" }}>
          <p style={{ color: "white" }}>
            {" "}
            <FaStar style={{ color: "#FAAD14" }} />
            <FaStar style={{ color: "#FAAD14" }} />
            <FaStar style={{ color: "#FAAD14" }} />
            <FaStar style={{ color: "#FAAD14" }} />
            <FaStar style={{ color: "#FAAD14" }} /> Rating
          </p>
          <p style={{ color: "#FA541C" }}>
            {" "}
            <MdOutlineReportProblem
              style={{
                color: "#FA541C",
                marginLeft: "2px",
                marginRight: "5px",
              }}
            />
            Report{" "}
          </p>
        </div>
        <p className="rating-para" style={{ marginRight: "3%" }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard{" "}
        </p>
      </div>
    );
  };
 
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("disable-pointer-events");
    } else {
      document.body.classList.remove("disable-pointer-events");
    }
  }, [isModalOpen]);
  console.log(isHovered);
  return (
    <Container
      onMouseEnter={() => {
        if (isModalOpen) {
          setIsHovered(false);
        } else {
          setIsHovered(true);
        }
      }}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        marginLeft:
          (index === 0 || index === 5 || index === 10 || index === 15) &&
          isHovered
            ? "60px"
            : (index === 4 || index === 9 || index === 14 || index === 19) &&
              isHovered
            ? "-50px"
            : "0",
      }}
    >
      {isWideScreen ? (
        <img src={movieData.image} alt="card" />
      ) : (
        <img src={movieData.image} alt="card" onClick={openModal} />
      )}

      {isHovered && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 1,
            translateY: isHovered ? "-50%" : 0, // Adjust the initial translateY value
            translateX: isHovered ? "-50%" : 0, // Adjust the initial translateX value
            transformOrigin: "center center",
          }}
          animate={{
            opacity: 1,
            scale: isHovered ? 1.2 : 1, // Apply scale of 1.2 when hovered, otherwise 1
            translateY: isHovered ? "-50%" : 0, // Apply translateY of -50% when hovered, otherwise 0
            translateX: isHovered ? "-50%" : 0, // Apply translateX of -50% when hovered, otherwise 0
            transformOrigin: "center center",
          }}
          transition={{ duration: 0.1, delay: 0, ease: "easeOut" }}
          className="hover"
        >
          <div className="image-video-container">
            <img src={movieData.image} alt="card" />
            {/* <video src={video} autoPlay={true} loop muted /> */}
          </div>
          <div className="info-container flex column" style={{ color: "#fff" }}>
            <h3
              style={{ fontSize: "15px", fontWeight: "700" }}
              className="name"
            >
              {movieData.name}
            </h3>

            <div className="icons flex j-between">
              <div className="controls flex">
                <MdOutlineLocationOn
                  style={{ color: "#2196CC", marginLeft: "-5px" }}
                />
                <p
                  style={{
                    color: "#2196CC",
                    marginTop: "-4px",
                    marginLeft: "-3px",
                  }}
                >
                  Bemowo, Warsaw, Poland
                </p>
              </div>
              <div
                className="info"
                style={{
                  color: "#2196CC",
                  marginTop: "-30px",
                  fontSize: "24px",
                }}
                onClick={openModal}
              >
                <BiChevronDown title="More Info" />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "-8px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <>
                  <p style={{ height: 5, paddingRight: 5, color: "#45AFD9" }}>
                    Kr. 4.799
                  </p>
                  <p style={{ height: 5, color: "#45AFD9" }}>SEK</p>
                </>
                <p style={{ height: 5, paddingRight: 10 }}>100 Supporters</p>
              </div>
             
            </div>
           
          </div>
        </motion.div>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, translateY: -100 }}
          animate={{ opacity: 1, scale: 1, translateY: 0 }}
          transition={{ duration: 0.5 }}
          className="modal-header"
        >
          <div>
            <AiOutlineCloseCircle onClick={closeModal} className="close-icon" />
            <div className="modal-length">
              <div className="col-md-12">
                <img src={cardimg} alt="movie" className="img-fluid" />
              </div>
              <div className="container bg-custom">
                <div className="modal-main" style={{ marginLeft: "3%" }}>
                  <div>
                    <p
                      className="modal-main-heading"
                      style={{ paddingTop: "4%" }}
                    >
                      CAMILLO FRANCESCO VILLA
                    </p>
                    <p className="modal-after-main">
                      Creator: Goncalo Marques, John Simms
                    </p>
                  </div>
                  <div className="modal-tags">
                    <Tag text="green" />
                    <Tag text="green" />
                    <Tag text="green" />
                  </div>
                  <div>
                    <p className="modal-paragraph ">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.
                    </p>
                  </div>

                  <div className="modal-rating-location">
                    <div className="modal-rating">
                      <div className="star-rating">{renderStarRating()}</div>
                      <p>234567 Ratings</p>
                    </div>
                    <div className="modal-location-date">
                      <div className="modal-location">
                        <MdOutlineLocationOn />
                        <p>Bemowo, Warsaw, Poland</p>
                      </div>
                      <div className="modal-date">
                        <AiOutlineCalendar />
                        <p>Jan 2023</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="modal-description">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book
                      <br />
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.Lorem Ipsum is simply dummy text of the
                      printing and typesetting industry. Lorem Ipsum has been
                      the industry's standard dummy text ever since the 1500s,
                      when an unknown printer took a galley of type and
                      scrambled it to make a type specimen book.
                    </p>
                  </div>
                  <div className="modal-des-img">
                    <div className="modal-des1-img">
                      <img src={decimg} alt="dec" />
                      <p>Lorem Ipsum is simply</p>
                    </div>
                    <div className="modal-des2-img">
                      <img src={decimg} alt="dec" />
                      <p>Lorem Ipsum is simply</p>
                    </div>
                  </div>
                  <div className="review-container ">
                    <p className="review-heading">REVIEWS</p>
                    <div className="row">
                      <div className="col-md-4">
                        <Review />
                      </div>
                      <div className="col-md-4">
                        <Review />
                      </div>
                      <div className="col-md-4">
                        <Review />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <p
                      className="modal-footer"
                      style={{
                        textAlign: "center",
                        color: "#FA541C",
                        margin: "3% 3% 5%",
                        paddingBottom: "5%",
                      }}
                    >
                      <MdOutlineReportProblem style={{ marginRight: "5px" }} />{" "}
                      Flag for Inappropriate Content
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Modal>
    </Container>
  );
});
export default Card;
const Container = styled.div`
  max-width: 222px;
  width: 222px;
  height: 100%;
  cursor: pointer;
  position: relative;

  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
  }

  .hover {
    opacity: 1;
    //transform: translateY(-50%) translateX(-50%) scale(1.2);
    z-index: 9998;
    height: max-content;
    width: 18rem;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    pointer: none;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        position: absolute;
      }

      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        position: absolute;
      }
    }

    .info-container {
      padding: 1rem;
      gap: 0.5rem;
      position: relative;

      background: #181818;

      .icons {
        position: relative;
        .controls {
          display: flex;
          gap: 1rem;
          margin-top: -16px;
        }

        svg {
          font-size: 1rem;
          cursor: pointer;
          transition: 0.3s ease-in-out;

          &:hover {
            color: #b8b8b8;
          }
        }
      }

      .genres {
        margin-left: -30px;

        ul {
          gap: 1rem;
          margin-top: 0; /* Adjust the top margin here */

          li {
            list-style-type: none;
            margin: 0;
            padding: 0;
            color: #fff;
          }
        }
      }
    }
  }

  @media (max-width: 1220px) {
    .hover {
      display: none;
    }
  }
`;


import "./CardMarketPlace.css";

import { AiOutlineCloseCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { Box, Typography } from "@mui/material";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { MdOutlineDiscount, MdOutlineReportProblem } from "react-icons/md";

import { CiLocationOn } from "react-icons/ci";
import Modal from "react-modal";
import Rating from "@mui/material/Rating";
import SwapIcons from "../../../assets/Swap.png";
import { motion } from "framer-motion";
import { useState } from "react";

const CardMarketPlace = () => {
  const [isHovered, setIsHovered] = useState(false);
  const isWideScreen = window.innerWidth <= 1220;
  const isModalScreen = window.innerHeight <= 768;
  const value = 3;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  const [showFeedBack, setShowFeedBack] = useState(false);
  const handleGetDiscountClick = () => {
    setShowDiscount(true);
  };
  const handleGetEmailClick = () => {
    setShowFeedBack(true);
    setShowDiscount(false);
  };
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
    return <div className="tag-marketplace-modal">{text}</div>;
  };
  const Review = () => {
    return (
      <div className="review-box" style={{ marginTop: "2%" }}>
        <Typography
          style={{
            color: "var(--character-title-85, rgba(0, 0, 0, 0.85))",
            fontWeight: 700,
            fontSize: "13px",
            fontFamily: "Montserrat",
          }}
        >
          Name
        </Typography>
        <div style={{ display: "flex", gap: "40%" }}>
          <CardText
            style={{
              color: "#FAAD14",
              fontWeight: "400",
              fontSize: "12px",
              fontFamily: "Montserrat",
            }}
          >
            <Rating
              name="read-only"
              value={value}
              readOnly
              style={{ fontSize: "18px" }}
            />
          </CardText>
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
        <p
          className="rating-para"
          style={{ marginRight: "3%", color: "black" }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard{" "}
        </p>
      </div>
    );
  };

  const Dicount = () => {
    return (
      <Box
        sx={{
          background:
            "var(--gradient, linear-gradient(90deg, #312783 0%, #00A19A 100%))",
          width: "100%",
          paddingBottom: "5%",
          paddingTop: "5%",
          paddingLeft: "10%",
        }}
      >
        <div className="Disocunt-Review">
          <Box
            sx={{
              width: isModalScreen ? "90%" : "45%",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                sx={{
                  color: "var(--character-primary-inverse, #FFF)",
                  fontSize: "16px",
                  fontWeight: 400,
                }}
              >
                Your ARTcredits Balance{" "}
              </Typography>
              <Typography
                sx={{
                  color: "var(--character-primary-inverse, #FFF)",
                  fontSize: "16px",
                  fontWeight: 400,
                }}
              >
                2,000
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "6.5%",
              }}
            >
              <Typography
                sx={{
                  color: "var(--character-primary-inverse, #FFF)",
                  fontSize: "16px",
                  fontWeight: 400,
                }}
              >
                Your ARTcredits Balance{" "}
              </Typography>
              <Typography
                sx={{
                  color: "var(--character-primary-inverse, #FFF)",

                  fontSize: "16px",
                  fontWeight: 400,
                }}
              >
                2,000
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "6.5%",
              }}
            >
              <Typography
                sx={{
                  color: "var(--character-primary-inverse, #FFF)",

                  fontSize: "16px",
                  fontWeight: 400,
                }}
              >
                Your ARTcredits Balance{" "}
              </Typography>
              <Typography
                sx={{
                  color: "var(--character-primary-inverse, #FFF)",
                  fontSize: "16px",
                  fontWeight: 400,
                }}
              >
                1,000
              </Typography>
            </Box>
            <Box sx={{ marginTop: "3%" }}>
              <Typography
                sx={{
                  color: "var(--character-primary-inverse, #FFF)",
                  fontSize: "16px",
                  fontWeight: 400,
                }}
              >
                Email that will receive discount
              </Typography>
              <input
                placeholder="Email"
                type="text"
                style={{
                  marginTop: "3%",
                  background:
                    "var(--gradient, linear-gradient(90deg, #312783 0%, #00A19A 100%))",
                  width: "100%",
                  border: "1px solid var(--neutral-5, #D9D9D9)",
                  color: "var(--character-primary-inverse, #FFF)",
                  fontSize: "14px",
                  fontWeight: 400,
                  height: "4vh",
                  paddingLeft: "5%",
                }}
              />
              <button className="discountNow" onClick={handleGetEmailClick}>
                GET DISCOUNT NOW!
              </button>
            </Box>
          </Box>
          <div className="Preview">
            <Typography
              sx={{
                color: "var(--character-primary-inverse, #FFF)",
                fontFamily: "Montserrat",
                fontSize: "15px",
              }}
            >
              Your Portfolio Preview
            </Typography>
          </div>
        </div>
      </Box>
    );
  };
  const ThankYou = () => {
    return (
      <Box
        sx={{
          background:
            "var(--gradient, linear-gradient(90deg, #312783 0%, #00A19A 100%))",
          width: "100%",
          paddingBottom: "5%",
          paddingTop: "5%",
          paddingLeft: "10%",
        }}
      >
        <div className="Download-Review">
          <Typography
            sx={{
              color: "var(--character-primary-inverse, #FFF)",
              fontWeight: 700,
              fontSize: "17px",
              textAlign: "center",
            }}
          >
            THANK YOU!
          </Typography>
          <Typography
            sx={{
              color: "var(--character-primary-inverse, #FFF)",
              fontWeight: 400,
              fontSize: "14px",
              marginTop: "5%",
              fontFamily: "Montserrat",
              textAlign: "center",
            }}
          >
            Thank you for choosing to redeem your ART credits for a discount in
            the marketplace!
          </Typography>
          <Typography
            sx={{
              color: "var(--character-primary-inverse, #FFF)",
              fontWeight: 400,
              fontSize: "14px",
              marginTop: "3%",
              fontFamily: "Montserrat",
              textAlign: "center",
            }}
          >
            Your discount was sent to your email: XXXXXXXX@XXXX.xcc
          </Typography>
          <Typography
            sx={{
              color: "var(--character-primary-inverse, #FFF)",
              fontWeight: 400,
              fontSize: "14px",
              marginTop: "3%",
              fontFamily: "Montserrat",
              textAlign: "center",
            }}
          >
            Please be sure to follow the instructions provided in the discount
            description to redeem your discount and enjoy your reward. We
            appreciate your support and look forward to seeing you in the
            marketplace again soon.
          </Typography>
          <div className="button-pervious">
            <button className="button-portfolio"> Go to Your Portfolio</button>
            <button className="button-portfolio">Go to Marketplace</button>
          </div>
        </div>
      </Box>
    );
  };

  return (
    <div className="container-fluid">
      <Card
        style={{
          width: "300px",
          borderRadius: "0px",
        }}
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          style={{ height: "162px" }}
          alt="Sample"
          src="https://picsum.photos/300/200"
        />

        <CardBody color="#FFFFFF00">
          <CardTitle
            tag="p"
            color="var(--neutral-13, #000)"
            style={{
              fontWeight: "700",
              fontSize: "16px",
              fontFamily: "Roboto",
            }}
          >
            ART TITLE NAME
          </CardTitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="p"
            style={{
              fontWeight: "400",
              fontSize: "13px",
              fontFamily: "Montserrat",
            }}
          >
            Company
          </CardSubtitle>
          <CardText
            style={{
              color: "var(--secondary-5, #2196CC)",
              fontSize: "14px",
              fontWeight: "400",
              fontFamily: "Montserrat",
            }}
          >
            <CiLocationOn style={{ marginTop: "-1%", fontSize: "18px" }} />{" "}
            Bemowo, Warsaw, Poland
          </CardText>
        </CardBody>
      </Card>
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
          <Card
            style={{
              borderRadius: "0px",
            }}
          >
            <img
              style={{ height: "162px" }}
              alt="Sample"
              src="https://picsum.photos/300/200"
            />
            {isWideScreen ? (
              <AiOutlineCloseCircle
                onClick={() => {
                  setIsHovered(false);
                }}
                className="header-modal-close-icon"
              />
            ) : null}
            <CardBody color="#FFFFFF00">
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <CardTitle
                    tag="p"
                    color="var(--neutral-13, #000)"
                    style={{
                      fontWeight: "700",
                      fontSize: "16px",
                      fontFamily: "Roboto",
                    }}
                  >
                    ART TITLE NAME
                  </CardTitle>
                  <CardSubtitle
                    className="mb-2 text-muted"
                    tag="p"
                    style={{
                      fontWeight: "400",
                      fontSize: "13px",
                      fontFamily: "Montserrat",
                    }}
                  >
                    Company
                  </CardSubtitle>
                  <CardSubtitle
                    className="mb-2 text-muted"
                    tag="p"
                    style={{
                      fontWeight: "400",
                      fontSize: "13px",
                      fontFamily: "Montserrat",
                    }}
                  >
                    site.com
                  </CardSubtitle>
                </div>
                <div>
                  <CardText
                    style={{
                      color: "var(--neutral-7, #8C8C8C)",
                      fontSize: "16px",
                      fontWeight: "500",
                      textDecorationLine: "line-through",
                      fontFamily: "Roboto",
                    }}
                  >
                    50$
                  </CardText>
                  <CardText
                    style={{
                      color: "var(--primary-6, #01A19A)",
                      fontSize: "24px",
                      fontWeight: "500",
                      fontFamily: "Roboto",
                    }}
                  >
                    40$
                  </CardText>
                </div>
              </Box>
              <Box sx={{ display: "flex" }}>
                <CardText
                  style={{
                    color: "#FAAD14",
                    fontWeight: "400",
                    fontSize: "12px",
                    fontFamily: "Montserrat",
                  }}
                >
                  <Rating
                    name="read-only"
                    value={value}
                    readOnly
                    style={{ fontSize: "18px" }}
                  />
                </CardText>
                <CardText
                  style={{
                    color: "var(--character-primary-85, rgba(0, 0, 0, 0.85))",
                    fontWeight: "400",
                    fontSize: "12px",
                    fontFamily: "Montserrat",
                  }}
                >
                  &nbsp; &nbsp; &nbsp; 234567 Ratings
                </CardText>
              </Box>
              <CardText
                style={{
                  color: "var(--character-title-85, rgba(0, 0, 0, 0.85))",
                  fontSize: "12px",
                  fontWeight: "400",
                  fontFamily: "Montserrat",
                  marginTop: "-2%",
                }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </CardText>
              <Box sx={{ display: "flex" }}>
                <div>
                  <button className="card-off-button">
                    80% <span style={{ fontSize: "11px" }}>OFF</span>
                  </button>
                </div>
                <div className="swap-button">
                  <img src={SwapIcons} alt="swap" />
                  <CardText>1000 ARTS</CardText>
                </div>
                <div>
                  <button className="card-more-button" onClick={openModal}>
                    <AiOutlineInfoCircle style={{ marginTop: "-1%" }} />
                    See More
                  </button>
                </div>
              </Box>
              <CardText
                style={{
                  color: "var(--secondary-5, #2196CC)",
                  fontSize: "10px",
                  fontWeight: "400",
                  fontFamily: "Montserrat",
                  textAlign: "center",
                  marginTop: "7%",
                }}
              >
                <CiLocationOn style={{ marginTop: "-1%", fontSize: "18px" }} />{" "}
                Bemowo, Warsaw, Poland
              </CardText>
            </CardBody>
          </Card>
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
                <img
                  src="https://picsum.photos/300/200"
                  alt="card"
                  className="img-fluid"
                  style={{ width: "100%" }}
                />
              </div>
              <div
                className="container bg-custom"
                style={{ background: "white" }}
              >
                <div
                  className="modal-main"
                  style={{
                    marginLeft: "3%",
                    background: "white",
                    marginRight: "3%",
                  }}
                >
                  <div className="Marketplace-title-modal">
                    <Box sx={{ display: "flex" }}>
                      <div>
                        <CardTitle
                          tag="p"
                          color="var(--neutral-13, #000)"
                          style={{
                            fontWeight: "700",
                            fontSize: "16px",
                            fontFamily: "Roboto",
                          }}
                        >
                          ART TITLE NAME
                        </CardTitle>
                        <CardSubtitle
                          className="mb-2 text-muted"
                          tag="p"
                          style={{
                            fontWeight: "400",
                            fontSize: "13px",
                            fontFamily: "Montserrat",
                          }}
                        >
                          Company
                        </CardSubtitle>
                        <CardSubtitle
                          className="mb-2 text-muted"
                          tag="p"
                          style={{
                            fontWeight: "400",
                            fontSize: "13px",
                            fontFamily: "Montserrat",
                          }}
                        >
                          site.com
                        </CardSubtitle>
                      </div>
                      <div>
                        <CardText
                          style={{
                            color: "var(--neutral-7, #8C8C8C)",
                            fontSize: "16px",
                            fontWeight: "500",
                            textDecorationLine: "line-through",
                            fontFamily: "Roboto",
                          }}
                        >
                          50$
                        </CardText>
                        <CardText
                          style={{
                            color: "var(--primary-6, #01A19A)",
                            fontSize: "24px",
                            fontWeight: "500",
                            fontFamily: "Roboto",
                          }}
                        >
                          40$
                        </CardText>
                      </div>
                    </Box>
                    <Box sx={{ display: "flex", width: "40%" }}>
                      <div>
                        <button className="card-off-button-modal">
                          80% <span style={{ fontSize: "11px" }}>OFF</span>
                        </button>
                      </div>
                      <div className="swap-button">
                        <img src={SwapIcons} alt="swap" />
                        <CardText>1000 ARTS</CardText>
                      </div>
                      <div>
                        <button
                          className="card-more-button-modal"
                          onClick={handleGetDiscountClick}
                        >
                          <MdOutlineDiscount style={{ marginTop: "-1%" }} />
                          Get Discount
                        </button>
                      </div>
                    </Box>
                  </div>
                  <Typography
                    className="modal-rating-above"
                    style={{
                      marginTop: "2%",
                      color: "var(--character-title-85, rgba(0, 0, 0, 0.85))",
                      fontSize: "15px",
                      fontWeight: 400,
                      fontFamily: "Montserrat",
                    }}
                  >
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </Typography>

                  <div className="modal-rating-location">
                    <Box sx={{ display: "flex" }}>
                      <CardText
                        style={{
                          color: "#FAAD14",
                          fontWeight: "400",
                          fontSize: "12px",
                          fontFamily: "Montserrat",
                        }}
                      >
                        <Rating
                          name="read-only"
                          value={value}
                          readOnly
                          style={{ fontSize: "18px" }}
                        />
                      </CardText>
                      <CardText
                        style={{
                          color:
                            "var(--character-primary-85, rgba(0, 0, 0, 0.85))",
                          fontWeight: "400",
                          fontSize: "12px",
                          fontFamily: "Montserrat",
                        }}
                      >
                        &nbsp; &nbsp; &nbsp; 234567 Ratings
                      </CardText>
                    </Box>
                    <CardText
                      style={{
                        color: "var(--secondary-5, #2196CC)",
                        fontSize: "12px",
                        fontWeight: "400",
                        fontFamily: "Montserrat",
                        textAlign: "center",
                        marginTop: "-3%",
                      }}
                    >
                      <CiLocationOn
                        style={{ marginTop: "-1%", fontSize: "12px" }}
                      />{" "}
                      Bemowo, Warsaw, Poland
                    </CardText>
                  </div>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "3%",
                    }}
                  >
                    <Typography
                      style={{
                        color: "var(--character-title-85, rgba(0, 0, 0, 0.85))",
                        fontFamily: "Roboto",
                        fontSize: "16px",
                        fontWeight: "700",
                        lineHeight: "24px",
                      }}
                    >
                      Category
                    </Typography>
                    <Box sx={{ display: "flex" }}>
                      <Tag text="green" />
                      <Tag text="green" />
                      <Tag text="green" />
                    </Box>
                  </Box>

                  {showDiscount && (
                    <div>
                      <Box sx={{ marginTop: "3%" }}>
                        <Dicount />
                      </Box>
                    </div>
                  )}
                  {showFeedBack && (
                    <Box sx={{ marginTop: "3%" }}>
                      <ThankYou />
                    </Box>
                  )}

                  <Box sx={{ marginTop: "3%" }}>
                    <Typography
                      style={{
                        color: "var(--character-title-85, rgba(0, 0, 0, 0.85))",
                        fontFamily: "Montserrat",
                        fontSize: "13px",
                        fontWeight: "400",
                      }}
                    >
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.
                    </Typography>
                    <Typography
                      style={{
                        color: "var(--character-title-85, rgba(0, 0, 0, 0.85))",
                        fontFamily: "Montserrat",
                        fontSize: "13px",
                        fontWeight: "400",
                        marginTop: "2%",
                      }}
                    >
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.Lorem Ipsum is simply dummy text of the
                      printing and typesetting industry. Lorem Ipsum has been
                      the industry's standard dummy text ever since the 1500s,
                      when an unknown printer took a galley of type and
                      scrambled it to make a type specimen book.
                    </Typography>
                  </Box>
                  <div className="modal-des-img" style={{ marginTop: "3%" }}>
                    <div className="modal-des1-img">
                      <img src="https://picsum.photos/300/200" alt="dec" />
                      <p
                        style={{
                          color: "black",
                        }}
                      >
                        Lorem Ipsum is simply
                      </p>
                    </div>
                    <div className="modal-des2-img">
                      <img src="https://picsum.photos/300/200" alt="dec" />
                      <p
                        style={{
                          color: "black",
                        }}
                      >
                        Lorem Ipsum is simply
                      </p>
                    </div>
                  </div>
                  <div className="review-container ">
                    <p
                      className="review-heading"
                      style={{
                        color: "var(--character-title-85, rgba(0, 0, 0, 0.85))",
                        fontSize: "16px",
                        fontWeight: "700",
                        fontFamily: "Roboto",
                        marginTop: "3%",
                      }}
                    >
                      REVIEWS
                    </p>
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
                  <div
                    className="d-flex justify-content-start align-items-center"
                    style={{ marginTop: "5%", marginBottom: "3%" }}
                  >
                    <p
                      className="modal-footer"
                      style={{
                        textAlign: "center",
                        color: "#FA541C",
                      }}
                    >
                      <MdOutlineReportProblem style={{ marginRight: "5px" }} />
                      Flag for Inappropriate Content
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Modal>
    </div>
  );
};

export default CardMarketPlace;

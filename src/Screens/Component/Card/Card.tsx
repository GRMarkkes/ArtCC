/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "../CardMarketPlace/CardMarketPlace.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../NewCard/NewCard.css";
import "./Card.css";

import {
  AiFillStar,
  AiOutlineAreaChart,
  AiOutlineCalendar,
  AiOutlineCloseCircle,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { Box, Rating, Typography } from "@mui/material";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Progress,
} from "reactstrap";
import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Campaign } from "../../../../types";
import { CiLocationOn } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdOutlineReportProblem } from "react-icons/md";
import Modal from "react-modal";
import { NetworkDetails } from "../../../helper/network";
import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit";
import decimg from "../../../assets/ModalImg.png";
import graphimage from "../../../assets/Graphic.png";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useWallet } from "../../../hooks";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import wrapperswap from "../../../assets/wrapper 2.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Make sure you have the carousel CSS
import { Carousel } from "react-responsive-carousel";

// import { Link } from "react-router-dom";

// import { BiChevronDown } from "react-icons/bi";

interface Web3PageProps {
  networkDetails: NetworkDetails;
  setPubKey: (pubKey: string) => void;
  swkKit: StellarWalletsKit;
  pubKey: string;
  index: number;
  onPress?: (created: any) => void;
  movieData: u32;
  isLiked?: boolean;
}

export type u32 = number;
export type i32 = number;
export type u64 = bigint;
export type i64 = bigint;
export type u128 = bigint;
export type i128 = bigint;
export type u256 = bigint;
export type i256 = bigint;
export type Address = string;
export type Option<T> = T | undefined;
export type Typepoint = bigint;
export type Duration = bigint;

const CardArtProject = (props: Web3PageProps) => {
  const [singleCampaign, setSingleCampaign] = useState<Campaign>();
  const [metadata, setMetadata] = useState<any>();
  const [dataImage, setDataImage] = useState<any>();
  const { donateToCampaign, getCampaignById, loading } = useWallet(props);
  const movieData = props?.movieData;

  useEffect(() => {
    if (movieData) {
      getCampaingByID(movieData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieData]);

  const getCampaingByID = async (id: number) => {
    try {
      const data = await getCampaignById(id);
      setSingleCampaign(data);
      const parsedMetadata = JSON.parse(data?.metadata);

      setMetadata(parsedMetadata);
      if (data?.image) {
        try {
          const parsedImages = JSON.parse(data.image);
          setDataImage(parsedImages);
        } catch (error) {
          console.log("Error parsing images", error);
        }
      }
      // setDataImage(JSON.parse(data?.image));
    } catch (error) {
      console.log(error);
    }
  };
  console.log(dataImage, "thishshs");

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day}${month}${year}`;
  };

  const [isHovered, setIsHovered] = useState(false);
  const [compaingData, setCompaingData] = useState<unknown>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 1220);
  const isModalScreen = window.innerHeight <= 768;
  const [showDiscount, setShowDiscount] = useState(false);
  const [showFeedBack, setShowFeedBack] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");

  // ... (other parts of your component)
  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    const stringValue = event?.target?.value as string;
    const numericValue = stringValue?.replace(/\D/g, "");
    setDonationAmount(numericValue);
  };
  const handleGetDiscountClick = () => {
    setShowDiscount(true);
  };
  const handleGetEmailClick = () => {
    setShowFeedBack(true);
    setShowDiscount(false);
  };

  async function donateToCampaignById(id: u32) {
    try {
      await donateToCampaign(id, donationAmount);

      if (props?.onPress) {
        props?.onPress(true);
      }
      alert("Donated Successfully");
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 1220);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const openCardModal = () => {
    setIsHovered(false);
    setIsModalOpen(false);
    setIsCardModalOpen(true);
    setIsHovered(false);
  };
  const closeCardModal = () => {
    setIsCardModalOpen(false);
  };
  const openModal = () => {
    setIsHovered(false);
    setCompaingData(singleCampaign);
    setIsModalOpen(true);
    setIsCardModalOpen(false);
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
  const handleButtonClick = (campaignId: any) => {
    if (campaignId) {
      donateToCampaignById(campaignId);
      handleGetEmailClick(); // Call handleGetEmailClick after donateToCampaign
    }
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
        <div
          className="Disocunt-Review"
          style={{ paddingTop: "15%", paddingBottom: "15%" }}
        >
          <Box
            sx={{
              width: isModalScreen ? "90%" : "45%",
            }}
          >
            <Box sx={{ marginTop: "3%" }}>
              <Typography
                sx={{
                  color: "var(--character-primary-inverse, #FFF)",
                  fontSize: "16px",
                  fontWeight: 400,
                }}
              >
                Your Support
              </Typography>
              <input
                placeholder="0.00"
                value={donationAmount}
                autoFocus
                onChange={handleInputChange}
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
              <Typography style={{ textAlign: "end", color: "#FFFFFF" }}>
                {donationAmount}0 <span>ARTcredits</span>
              </Typography>
              <button
                disabled={parseInt(donationAmount) > 0 ? false : true}
                className="discountNow"
                onClick={() => handleButtonClick(singleCampaign?.id)}
              >
                Support Now
              </button>
            </Box>
          </Box>
          <div
            className="Preview"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                color: "var(--character-primary-inverse, #FFF)",
                fontFamily: "Montserrat",
                fontSize: "15px",
              }}
            >
              Your Portfolio Preview
              <img src={graphimage} alt="graph" />
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
            <button className="button-portfolio">
              {" "}
              <a
                href="/"
                style={{ textDecoration: "none" }}
                className="button-portfolio"
              >
                Go&nbsp;to&nbsp;Your&nbsp;Portfolio
              </a>
            </button>

            <button className="button-portfolio">
              <a
                href="/"
                style={{ textDecoration: "none" }}
                className="button-portfolio"
              >
                Go&nbsp;to&nbsp;Marketplace
              </a>
            </button>
          </div>
        </div>
      </Box>
    );
  };
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("disable-pointer-events");
    } else {
      document.body.classList.remove("disable-pointer-events");
    }
  }, [isModalOpen]);

  const getSupportButton = (data: any) => {
    let donateDisabled = false;
    let message = "Support this project!";
    let date: any = null;
    const todayDate = new Date();

    if (data?.deadline) {
      date = new Date(parseInt(data.deadline.toString()) * 1000);
    }

    if (data?.owner.toString() == props?.pubKey) {
      donateDisabled = true;
      message = "You cannot donate to your own campgain.";
    } else if (data?.donations?.length > 0) {
      const sum = data.donations.reduce(
        (accumulator: any, currentValue: any) => accumulator + currentValue
      );
      if (sum?.toString() >= data?.target) {
        donateDisabled = true;
        message = "The donation target has been reached.";
      }
    }

    if (todayDate >= date) {
      donateDisabled = true;
      message = "The deadline for this project has passed.";
    }

    return { donateDisabled, message };
  };
  const supportButtonData = getSupportButton(compaingData);

  // const imageUrls = Object.keys(dataImage).map(key => dataImage[key]);
  console.log(dataImage, "dataImage");

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
          (props.index === 0 ||
            props.index === 5 ||
            props.index === 10 ||
            props.index === 15) &&
          isHovered
            ? "60px"
            : (props.index === 4 ||
                props.index === 9 ||
                props.index === 14 ||
                props.index === 19) &&
              isHovered
            ? "-50px"
            : "0",
      }}
    >
      {isWideScreen ? (
        <img
          src={
            dataImage?.url1
              ? dataImage.url1
              : singleCampaign?.image.includes("s.com")
              ? singleCampaign.image
              : ""
          }
          alt="card"
        />
      ) : (
        <img
          src={
            dataImage?.url1
              ? dataImage.url1
              : singleCampaign?.image.includes("s.com")
              ? singleCampaign.image
              : ""
          }
          alt="card"
          onClick={openModal}
        />
      )}

      {!isCardModalOpen && isHovered && (
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
          onClick={openCardModal}
        >
          <div className="image-video-container">
            <img
              src={
                dataImage?.url1
                  ? dataImage.url1
                  : singleCampaign?.image.includes("s.com")
                  ? singleCampaign.image
                  : ""
              }
              alt="card"
            />
          </div>
          <div
            className="info-container flex column"
            style={{ color: "#FFFFFF" }}
          >
            <h3
              style={{ fontSize: "15px", fontWeight: "700" }}
              className="name"
            >
              {singleCampaign?.title}
            </h3>

            <div className="icons flex j-between">
              <div className="controls flex">
                <p
                  style={{
                    color: "#8C8C8C",
                    marginTop: "-4px",
                    fontWeight: "500",
                    fontSize: "13px",
                    lineHeight: "22px",
                  }}
                >
                  {singleCampaign?.description}
                </p>
              </div>
              {/* <div
              className="info"
              style={{
                color: "#2196CC",
                marginTop: "-30px",
                fontSize: "24px",
              }}
              onClick={openModal}
            >
              <BiChevronDown title="More Info" />
            </div> */}
            </div>
            <div
              className="modal-location"
              style={{
                marginTop: "-5%",
                fontWeight: "400",
                fontSize: "12px",
              }}
            >
              <MdOutlineLocationOn style={{ marginTop: "-1%" }} />
              <p>{singleCampaign?.main_location}</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "-7%",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <>
                  <p
                    style={{
                      height: 5,
                      paddingRight: 5,
                      color: "#45AFD9",
                      fontWeight: 400,
                      fontSize: "13px",
                    }}
                  >
                    Kr. 4.799 &nbsp; SEK
                  </p>
                  {/* <p style={{ height: 5, color: "#45AFD9" }}>SEK</p> */}
                </>
                <>
                  <p
                    style={{
                      height: 5,
                      paddingRight: 5,
                      color: "#FFFFFF",
                      fontWeight: 400,
                      fontSize: "13px",
                    }}
                  >
                    100&nbsp; Supporters
                  </p>
                  {/* <p style={{ height: 5, color: "#45AFD9" }}>SEK</p> */}
                </>
                {/* <button
                onClick={() => {
                  if (singleCampaign?.id)
                    donateToCampaign(singleCampaign?.id);
                }}
                style={{ border: "none", color: "#45AFD9" }}
              ></button> */}
              </div>
            </div>
            <Progress
              color="primary"
              value={22}
              style={{ height: "5px", marginTop: "-2%" }}
            />
          </div>
        </motion.div>
      )}

      <Modal
        isOpen={isCardModalOpen}
        onRequestClose={closeCardModal}
        className="modal-content-card"
        overlayClassName="modal-overlay-card"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, translateY: -100 }}
          animate={{ opacity: 1, scale: 1, translateY: 0 }}
          transition={{ duration: 0.5 }}
          className="modal-header"
        >
          <div>
            <AiOutlineCloseCircle
              onClick={closeCardModal}
              className="close-icon"
            />
            <Card
              style={{
                borderRadius: "0px",
              }}
            >
              <img
                style={{ height: "162px" }}
                alt="Sample"
                src={
                  dataImage?.url1
                    ? dataImage.url1
                    : singleCampaign?.image.includes("s.com")
                    ? singleCampaign.image
                    : ""
                }
              />

              <CardBody color="white" style={{ background: "#1F1F1F" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <CardTitle
                      tag="p"
                      style={{
                        fontWeight: "700",
                        fontSize: "16px",
                        color: "#FFFFFF",
                        fontFamily: "Roboto",
                      }}
                    >
                      {singleCampaign?.title}
                    </CardTitle>
                    <CardSubtitle
                      color="white"
                      tag="p"
                      style={{
                        fontWeight: "400",
                        fontSize: "13px",
                        fontFamily: "Montserrat",
                        color: "white",
                      }}
                    >
                      Creator: {metadata?.createrName}
                    </CardSubtitle>
                  </div>
                </Box>
                <div className="modal-tags" style={{ marginTop: "3%" }}>
                  <Tag text="green" />
                  <Tag text="green" />
                  <Tag text="green" />
                </div>
                <CardText
                  style={{
                    color: "#FFFFFF",
                    fontSize: "13px",
                    fontWeight: "400",
                    fontFamily: "Montserrat",
                    marginTop: "2%",
                  }}
                >
                  {singleCampaign?.description}
                </CardText>
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
                      value={5}
                      readOnly
                      style={{ fontSize: "18px" }}
                    />
                  </CardText>
                  <CardText
                    style={{
                      color: "white",
                      fontWeight: "400",
                      fontSize: "12px",
                      fontFamily: "Montserrat",
                    }}
                  >
                    &nbsp; &nbsp; &nbsp; 234567 Ratings
                  </CardText>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "1%",
                  }}
                >
                  <CardText
                    style={{
                      color: "var(--secondary-5, #2196CC)",
                      fontSize: "10px",
                      fontWeight: "400",
                      fontFamily: "Montserrat",
                    }}
                  >
                    <CiLocationOn
                      style={{ marginTop: "-1%", fontSize: "18px" }}
                    />{" "}
                    {singleCampaign?.main_location}
                  </CardText>
                  <CardText
                    style={{
                      color: "var(--secondary-5, #2196CC)",
                      fontSize: "10px",
                      fontWeight: "400",
                      fontFamily: "Montserrat",
                    }}
                  >
                    <AiOutlineCalendar
                      style={{ marginTop: "-1%", fontSize: "18px" }}
                    />{" "}
                    {metadata?.date ? formatDate(metadata.date) : ""}
                  </CardText>
                </Box>
                <CardText
                  style={{
                    color: "#FFFFFF",
                    fontSize: "13px",
                    fontWeight: 400,
                    fontFamily: "Montserrat",
                    textAlign: "center",
                    marginTop: "4%",
                  }}
                >
                  <span style={{ color: "#BFBFBF" }}>Example:</span> &nbsp; 10
                  UDC{" "}
                  <img
                    src={wrapperswap}
                    alt="swap"
                    style={{ height: "17px" }}
                  />{" "}
                  100 ARTcredits
                  <br />
                  <span style={{ color: "#BFBFBF" }}>
                    Support with minimum of 1 USDC and get ART credits
                  </span>
                </CardText>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "5%",
                  }}
                >
                  <button
                    style={{
                      background: "#52C41A",
                      color: "white",
                      border: "none",
                      paddingTop: "2%",
                      paddingBottom: "2%",
                      paddingLeft: "5%",
                      paddingRight: "5%",
                    }}
                    onClick={openModal}
                  >
                    <AiOutlineInfoCircle style={{ marginTop: "-1%" }} />
                    &nbsp; &nbsp; More about the project
                  </button>
                </div>
              </CardBody>
            </Card>
          </div>
        </motion.div>
      </Modal>

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
            <AiOutlineCloseCircle
              onClick={closeModal}
              className="close-icon-main"
            />
            {loading ? (
              <>
                <Box
                  sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent black overlay
                    zIndex: 999, // higher z-index to ensure it's above other content
                  }}
                />
                <Box
                  sx={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1000, // higher z-index than the overlay
                  }}
                >
                  <CircularProgress />
                </Box>
              </>
            ) : (
              <div className="modal-length">
                <div className="col-md-12">
                  {dataImage && Object.keys(dataImage).length > 1 ? (
                    <Carousel
                      showThumbs={false}
                      showStatus={false}
                      showIndicators={true}
                    >
                      {(Object.values(dataImage) as string[]).map(
                        (url, index) => (
                          <div key={index}>
                            <img
                              src={url}
                              alt={`Carousel ${index + 1}`}
                              style={{
                                width: "100%",
                                background: "#6c757d",
                                height: "80vh",
                              }}
                            />
                          </div>
                        )
                      )}
                    </Carousel>
                  ) : (
                    <img
                      src={
                        dataImage && dataImage.url1
                          ? dataImage.url1
                          : singleCampaign?.image &&
                            singleCampaign.image.includes("s.com")
                          ? singleCampaign.image
                          : ""
                      }
                      alt="card"
                      className="img-fluid"
                      style={{ width: "100%", background: "#6c757d" }}
                    />
                  )}
                </div>
                <div className="container bg-custom">
                  <div className="modal-main" style={{ marginLeft: "3%" }}>
                    <div>
                      <p
                        className="modal-main-heading"
                        style={{ paddingTop: "4%" }}
                      >
                        {singleCampaign?.title}
                      </p>
                    </div>

                    <div>
                      <p className="modal-paragraph ">
                        Description: {singleCampaign?.description}
                      </p>
                    </div>
                    <div>
                      <p className="modal-paragraph ">
                        DeadLine: {singleCampaign?.deadline.toString()}
                      </p>
                    </div>
                    <div>
                      <p className="modal-paragraph ">
                        Target: {singleCampaign?.target.toString()}
                      </p>
                    </div>
                    <div>
                      <p className="modal-paragraph ">
                        Total donation: {singleCampaign?.donations.toString()}
                      </p>
                    </div>
                    <div>
                      <p className="modal-paragraph">Donators:</p>
                      <ul>
                        {singleCampaign?.donators.map(
                          (donator, index: number) => (
                            <li
                              key={index}
                              style={{
                                color: "white",
                              }}
                              className="list-donation"
                            >
                              {donator.toString()}
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div>
                      <p
                        className="modal-paragraph ownercampgain"
                        style={{
                          color: "white",
                        }}
                      >
                        Owner: {singleCampaign?.owner.toString()}
                      </p>
                    </div>
                    <div className="modal-tags">
                      <Tag text="green" />
                      <Tag text="green" />
                      <Tag text="green" />
                    </div>

                    <div className="modal-rating-location">
                      <div className="modal-rating">
                        <div className="star-rating">{renderStarRating()}</div>
                        <p>234567 Ratings</p>
                      </div>
                      <div className="modal-location-date">
                        <div className="modal-location">
                          <MdOutlineLocationOn />
                          <p>{singleCampaign?.main_location}</p>
                        </div>
                        <div className="modal-date">
                          <AiOutlineCalendar />
                          <p>
                            {" "}
                            {metadata?.date ? formatDate(metadata.date) : ""}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="modal-support-project">
                      <CardText
                        style={{
                          color: "#FFFFFF",
                          fontSize: "13px",
                          fontWeight: 400,
                          fontFamily: "Montserrat",
                          textAlign: "center",
                          marginTop: "4%",
                        }}
                      >
                        <span style={{ color: "#BFBFBF" }}>Example:</span>{" "}
                        &nbsp; 10 UDC{" "}
                        <img
                          src={wrapperswap}
                          alt="swap"
                          style={{ height: "17px" }}
                        />{" "}
                        100 ARTcredits
                        <br />
                        <span style={{ color: "#BFBFBF" }}>
                          Support with minimum of 1 USDC and get ART credits
                        </span>
                      </CardText>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginBottom: "5%",
                        }}
                      >
                        <button
                          style={{
                            background: supportButtonData.donateDisabled
                              ? "grey"
                              : "#52C41A",
                            color: "white",
                            border: "none",
                            paddingTop: "2%",
                            paddingBottom: "2%",
                            paddingLeft: "2%",
                            paddingRight: "2%",
                            fontSize: "15px",
                          }}
                          disabled={supportButtonData.donateDisabled}
                          onClick={handleGetDiscountClick}
                        >
                          <AiOutlineAreaChart style={{ marginTop: "-1%" }} />
                          &nbsp; &nbsp; {supportButtonData.message}
                        </button>
                        {/* {supportButtonData.donateDisabled && (
                          <p style={{ color: "red" }}>
                            {supportButtonData.message}
                          </p>
                        )} */}
                      </div>
                    </div>
                    {showDiscount && (
                      <div>
                        <Box sx={{ marginTop: "3%", marginBottom: "3%" }}>
                          <Dicount />
                        </Box>
                      </div>
                    )}
                    {showFeedBack && (
                      <Box sx={{ marginTop: "3%", marginBottom: "3%" }}>
                        <ThankYou />
                      </Box>
                    )}

                    <div>
                      <p className="modal-description">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book
                        <br />
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.Lorem Ipsum is
                        simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard
                        dummy text ever since the 1500s, when an unknown printer
                        took a galley of type and scrambled it to make a type
                        specimen book.
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
                        <MdOutlineReportProblem
                          style={{ marginRight: "5px" }}
                        />{" "}
                        Flag for Inappropriate Content
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </Modal>
    </Container>
  );
};

export default CardArtProject;
const Container = styled.div`
  max-width: 222px;
  width: 222px;
  height: 100%;
  cursor: pointer;
  position: relative;

  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 13vh;
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

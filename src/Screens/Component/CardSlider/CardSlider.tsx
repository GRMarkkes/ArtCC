import "./CardSlider.css";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import React, { useEffect, useRef, useState } from "react";

import { Campaign } from "../../../../crowdfund/dist/types";
import Card from "../Card/Card";
import { NetworkDetails } from "../../../helper/network";
import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit";
import { motion } from "framer-motion";
import styled from "styled-components";

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

interface Web3PageProps {
  networkDetails: NetworkDetails;
  setPubKey: (pubKey: string) => void;
  swkKit: StellarWalletsKit;
  pubKey: string;
  data: Campaign[];
  title: string;
  onPress?: (created: any) => void;
}

const CardSlider = React.memo(function (props: Web3PageProps) {
  const [data, setData] = useState<Campaign[]>([]);
  const isWideScreen = window.innerWidth >= 1220;
  useEffect(() => {
    if (props?.data) {
      setData(props?.data);
    }
  }, [props]);
  const listRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  // const [duplicatedDataCard, setDuplicatedDataCard] =useState<Crowdfund.Campaign[]>([]);
  // const duplicatedData = [...data, ...data];

  const handleDirection = (direction: "left" | "right") => {
    const slideWidth = 240;
    const numVisibleCards = isMobileView ? 1 : 5;
    const totalSlides = data.length;
    let newPosition = sliderPosition;

    if (data.length <= numVisibleCards && isWideScreen) {
      // If there are 5 or fewer cards and it's a wide screen, don't slide.
      return;
    }

    if (direction === "left") {
      newPosition -= numVisibleCards;
      if (newPosition < 0) {
        newPosition = totalSlides - 1;
      }
    } else if (direction === "right") {
      newPosition += numVisibleCards;
      if (newPosition >= totalSlides) {
        newPosition = 0; // Reset to the beginning
      }
      setShowLeftArrow(true);
    }

    if (listRef.current) {
      listRef.current.style.transform = `translateX(-${
        slideWidth * newPosition
      }px)`;
      // listRef.current.classList.add("left-to-right-transition");
      listRef.current.classList.remove("right-to-left-transition");
    }
    setSliderPosition(newPosition);
  };

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsMobileView(screenWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleTouchStart = (event: React.TouchEvent) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const touchEndX = event.changedTouches[0].clientX;
    const swipeDistance = touchEndX - touchStartX;
    const swipeThreshold = 50;

    if (swipeDistance > swipeThreshold) {
      handleDirection(isMobileView ? "left" : "right");
    } else if (swipeDistance < -swipeThreshold) {
      handleDirection(isMobileView ? "right" : "left");
    }
  };

  return (
    <Container
      className="flex column"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <h1 style={{ fontWeight: "600", fontSize: "20px" }}>{props.title}</h1>
      <div className="wrapper">
        {!isMobileView && showLeftArrow && (
          <div
            className={`slider-action left ${
              !showControls ? "none" : ""
            } flex j-center a-center`}
          >
            <AiOutlineLeft onClick={() => handleDirection("left")} />
          </div>
        )}

        <motion.div
          className="slider left-to-right-transition flex"
          ref={listRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {data?.map((movie, index) => (
            <motion.div
              key={movie.id}
              className="card-wrapper"
              initial={{ opacity: 0, x: -100 }}
              animate={{
                opacity: 1,
                x: 0,
                // transition: { duration: 0.5, delay: index * 0.1 },
              }}
            >
              <Card
                networkDetails={props.networkDetails}
                setPubKey={props.setPubKey}
                swkKit={props.swkKit}
                pubKey={props.pubKey}
                movieData={movie.id}
                index={index}
                onPress={props.onPress}
              />
            </motion.div>
          ))}
        </motion.div>
        {!isMobileView && (
          <div
            className={`slider-action right ${
              !showControls ? "none" : ""
            } flex j-center a-center`}
          >
            <AiOutlineRight onClick={() => handleDirection("right")} />
          </div>
        )}
      </div>
    </Container>
  );
});

export default CardSlider;

const Container = styled.div`
    gap: 1rem;
    position: relative;
    padding: 2.5rem 0;
   
    h1 {
      margin-left: 50px;
      color: #fff;
      margin-top: -25px;
  
    }
    .wrapper {
      
      z-index: 2;
      
      .left-to-right-transition {
        -webkit-transition: transform 0.5s ease;
        -moz-transition: transform 0.5s ease;
        -ms-transition: transform 0.5s ease;
        transition: transform 0.5s ease;
        transform-origin: left;
    }
    
      
    .right-to-left-transition {
        transform-origin: right;
        transform: translateX(100%);
        transition: transform 0.5s ease;
        
    }
    
      .slider {
        scroll-behavior: smooth;
        background-color: transparent;
        border: none;
        width: max-content;
        gap: 1rem;
        transform: translateX(0px);
        transition: 0.3s ease-in-out;
        margin-left: 50px;
        overflow: visible; 
        z-index: 
        
        &:hover {
          background-color: rgba(255, 255, 255, 0.2);
          z-index: 1;
        }

      }
      
      .slider-action {
        position: absolute;
        z-index: 1;
        height: 100%;
        top: 0;
        bottom: 0;
        width: 50px;
        transition: 0.3s ease-in-out;
        
        svg {
          font-size: 2rem;
          color: white;
        }
        
        &:hover {
          margin-top:50px;
          height:60%;
          background: hsla(0,0%,8%,.5);
          
        }
      }
      
      .none {
        display: none;
      }
      
      .left {
        left: 0;
        top: 0;
        bottom : 2%
        transform: translate(-50%, -50%);
      }
      
      .right {
        right: 0;
        top: 0;
        bottom : 2%
        transform: translate(-50%, -50%);
      }
    }
    @media (max-width: 768px) {
      .slider-action {
        display: none;
      }
    }
  
    
  `;

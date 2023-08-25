import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Card from "../Card/Card";
import { motion } from "framer-motion";

interface MovieData {
  id: number;
  image: string;
  name: string;
}

interface CardSliderProps {
  data: MovieData[];
  title: string;
}

const CardSlider: React.FC<CardSliderProps> = React.memo(
  function ({ data, title }) {
    const listRef = useRef<HTMLDivElement>(null);
    const [sliderPosition, setSliderPosition] = useState(0);
    const [showControls, setShowControls] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const [touchStartX, setTouchStartX] = useState(0);
    const [showLeftArrow, setShowLeftArrow] = useState(false);

    const handleDirection = (direction: "left" | "right") => {
      const slideWidth = 240;
      const numVisibleCards = isMobileView ? 1 : 5;
      const totalSlides = data.length;
      var newPosition = sliderPosition; // Initialize with a default value
    
      if (direction === "left") {
        newPosition -= numVisibleCards;
        if (newPosition < 0) {
          newPosition = totalSlides - Math.abs(newPosition % totalSlides);
        }
      } else if (direction === "right") {
        newPosition += numVisibleCards;
        if (newPosition >= totalSlides) {
          newPosition %= totalSlides;
        }
        setShowLeftArrow(true);
      }
    
      // const distance = slideWidth * numVisibleCards;
      if (listRef.current) {
        listRef.current.style.transform = `translateX(-${slideWidth * newPosition}px)`;
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
        <h1 style={{ fontWeight: "300", fontSize: "20px" }}>{title}</h1>
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
            className="slider flex"
            ref={listRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {data.map((movie, index) => (
              <motion.div
                key={movie.id}
                className="card-wrapper"
                initial={{ opacity: 0, x: -100 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.5, delay: index * 0.1 },
                }}
              >
                <Card movieData={movie} index={index} />
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
  }
);

export default CardSlider;

const Container = styled.div`
    gap: 1rem;
    position: relative;
    padding: 2.5rem 0;
   
    h1 {
      margin-left: 50px;
      color: #fff;
      margin-top: -30px;
  
    }
    .wrapper {
      
      z-index: 2;
      
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

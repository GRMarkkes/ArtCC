import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NewCard from "../NewCard/NewCard";
import "./ListData.css"; // Import custom CSS file for styling

const ListData: React.FC = () => {
  return (
    <Carousel
      showThumbs={true}
      infiniteLoop={true}
      autoPlay={true}
      interval={5000}
      showArrows={true}
      showStatus={false}
      swipeable={true}
      emulateTouch={true}
      dynamicHeight={false}
      showIndicators={true}
      selectedItem={0}
      axis="horizontal"
      // Explicitly type as an array of ReactNode
    >
      <div className="carousel-item">
        <NewCard />
      </div>
      <div className="carousel-item">
        <NewCard />
      </div>
      <div className="carousel-item">
        <NewCard />
      </div>
      <div className="carousel-item">
        <NewCard />
      </div>
      <div className="carousel-item">
        <NewCard />
      </div>
      <div className="carousel-item">
        <NewCard />
      </div>
    </Carousel>
  );
};

export default ListData;

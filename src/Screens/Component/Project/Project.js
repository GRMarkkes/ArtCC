import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { cardData } from "../../../Asset/CardData";
import ReactPaginate from "react-paginate";
import "./Project.css";
const Project = () => {
  const [pageNumber, setPageNumber] = useState(0);

  const perPage = 4; // number of cards per page
  const [isMobileView, setIsMobileView] = useState(false);
  const pageCount = Math.ceil(cardData.length / perPage);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setPageNumber(selectedPage);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1600, // extra large screens
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1200, // large screens
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992, // medium screens
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // small screens
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576, // extra small screens
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          position: "absolute",
          left: "-40px",
          top: "px",
          transform: "translateY(-50%)",
          color: "#01A19A",
          fontSize: "2rem",
        }}
        onClick={onClick}
      >
        <AiOutlineArrowLeft />
      </div>
    );
  }

  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          position: "absolute",
          // right: "100%",
          left: -40,
          top: "px", // Update the top property value
          color: "#01A19A",
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
        onClick={onClick}
      >
        <AiOutlineArrowRight />
      </div>
    );
  }

  return (
    <div
      className="card-container "
      style={{ background: "#1F1F1F", paddingTop: "2%" }}
    >
      <div>
        <p
          className="textallover"
          style={
            isMobileView
              ? { color: "white", marginLeft: "14%" }
              : { color: "white", position: "absolute", marginLeft: "5%" }
          }
        >
          NEAR TO ME &nbsp;&nbsp;&nbsp;&nbsp;<span>Current Location:</span>
        </p>

        {isMobileView ? ( // Render pagination on laptop screens
          <div style={{ marginLeft: "15%" }}>
            <Slider {...settings}>
              {cardData.map((data, index) => (
                <div>
                  <Card
                    title={data?.title}
                    image={data?.image}
                    author={data?.author}
                    location={data?.location}
                    price={data.price}
                    currency={data?.currency}
                    supporters={data?.supporters}
                    supporters2={data?.supporters2}
                    progress={data?.progress}
                  />
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          // Render slider on mobile screens
          <div className="position-relative">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 mx-md-5">
              {cardData
                .slice(pageNumber * perPage, (pageNumber + 1) * perPage)
                .map((data, index) => (
                  <div className="col mb-4" key={index}>
                    <Card
                      title={data?.title}
                      image={data?.image}
                      author={data?.author}
                      location={data?.location}
                      price={data.price}
                      currency={data?.currency}
                      supporters={data?.supporters}
                      supporters2={data?.supporters2}
                      progress={data?.progress}
                    />
                  </div>
                ))}
            </div>
            <div className="position-absolute top-0 end-0 me-5">
              <ReactPaginate
                previousLabel={
                  <>
                    <span>&#8249;</span>
                  </>
                }
                nextLabel={
                  <>
                    <span>&#8250;</span>
                  </>
                }
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
                disabledClassName={"pagination-disabled"}
                activeClassName={"pagination-active"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Project;

import "swiper/css";
import "./CardNewSlider.css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";

import { Campaign } from "../../../../types";
import Card from "../Card/Card";
import { Navigation } from "swiper/modules";
import { NetworkDetails } from "../../../helper/network";
import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit";
import { motion } from "framer-motion";

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

const CardNewSlider = (props: Web3PageProps) => {
  const [data, setData] = useState<Campaign[]>([]);
  useEffect(() => {
    if (props?.data) {
      setData(props?.data);
    }
  }, [props]);

 
  return (
    <div className="container" style={{ paddingTop: "2rem" }}>
      <h1
        style={{
          fontWeight: "600",
          fontSize: "20px",
          color: "#fff",
          marginBottom: "2.5%",
          marginTop: "2.6%",
        }}
      >
        {props.title}
      </h1>
      <Swiper
        loop={true}
        className="swiper-container"
        centeredSlides={true}
        slidesPerGroup={1}
        slidesPerView={4}
        modules={[Navigation]}
        navigation={true}
        breakpoints={{
          600: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 5,
            centeredSlides: true,
          },
          900: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 5,
            centeredSlides: false,
          },
          1200: {
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween: 5,
            centeredSlides: false,
          },

          1500: {
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween: 5,
            centeredSlides: false,
          },

          1800: {
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween: 5,
            centeredSlides: false,
          },
        }}
      >
        <motion.div className="slider">
          {data?.reverse()?.map((movie, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className="card-wrapper"
                initial={{ opacity: 0, x: -100 }}
                animate={{
                  opacity: 1,
                  x: 2,
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
            </SwiperSlide>
          ))}
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </motion.div>
      </Swiper>
    </div>
  );
};
export default CardNewSlider;

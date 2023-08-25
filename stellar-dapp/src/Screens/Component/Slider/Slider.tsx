import React from "react";
import styled from "styled-components";
import CardSlider from "../CardSlider/CardSlider";

interface Movie {
  genres?: string[];
  id: number;
  image: string;
  name: string;
}

interface SliderProps {
  movies: Movie[];
}

const Slider: React.FC<SliderProps> = ({ movies }) => {
  const getMoviesFromRange = (from: number, to: number) => {
    return movies.slice(from, to);
  };

  return (
    <Container>
      <CardSlider data={getMoviesFromRange(0, 20)} title="Trending Now" />
      <CardSlider data={getMoviesFromRange(10, 30)} title="New Releases" />
      <CardSlider data={getMoviesFromRange(10, 30)} title="Blockbuster Movies" />
      <CardSlider data={getMoviesFromRange(10, 30)} title="Popular on Netflix" />
      <CardSlider data={getMoviesFromRange(10, 30)} title="Action Movies" />
      <CardSlider data={getMoviesFromRange(10, 30)} title="Epics" />
    </Container>
  );
};

export default Slider;

const Container = styled.div`
  .title{
    font-family: Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif;
  display: table-cell;
    font-size: 1.4vw;
    line-height: 1.3;
    line-height: 1.25vw;
    font-weight: 500; 
    
  }
`;
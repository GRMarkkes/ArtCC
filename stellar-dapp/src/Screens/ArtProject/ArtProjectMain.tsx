// import  { useState } from "react";
import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
import Slider from "../Component/Slider/Slider";
import cardimg from "../../Asset/Images/Card_Image.png";
import Header from "../Component/Header/Header";
import artimg from "../../Asset/Images/ArtProject_main.png";
import './ArtProjectMain.css'
import ArtFooter from "../Component/ArtFooter";
// interface Movie {
//   genres: string[];
//   id: number;
//   image: string[];
//   name: string;
// }

function ArtProject() {
  // const [isScrolled, setIsScrolled] = useState(false);
  
  const movies = [
    {
      genres: ["Animation", "Family", "Adventure"],
      id: 502356,
      image: cardimg,
      name: "PROJECT TITLE",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "PROJECT TITLE",
    },
    {
      genres: ["Adventure", "Fantasy", "Comedy"],
      id: 493529,
      image: cardimg,
      name: "PROJECT TITLE",
    },
    {
      genres: ["Thriller", "Horror", "Fantasy"],
      id: 713704,
      image: cardimg,
      name: "Evil Dead Rise",
    },
    {
      genres: ["Science Fiction", "Adventure", "Action"],
      id: 447365,
      image: cardimg,
      name: "PROJECT TITLE",
    },
    {
      genres: ["Action", "Adventure", "Science Fiction"],
      id: 640146,
      image: cardimg,
      name: "PROJECT TITLE",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
    {
      genres: ["Action", "Crime", "Thriller"],
      id: 385687,
      image: cardimg,
      name: "Fast X",
    },
  ];
 
  
  // const navigate = useNavigate();
  // // const [showModal, setShowModal] = useState(false);

  

  // window.onscroll = () => {
  //   setIsScrolled(window.pageYOffset === 0 ? false : true);
  //   return () => (window.onscroll = null);
  // };
  // const toggleModal = () => {
  //   setShowModal(!showModal);
  // };
  


  return (
    <div>
      <Header />
      <img className="img-fluid" src={artimg} alt="art" />
      <Container>
        {/* <Navbar isScrolled={isScrolled} /> */}
        <div className="hero">
          {/* <img
          src={backgroundImage}
          alt="background"
          className="background-image"
        /> */}
          <div className="container">
            {/* <div className="logo">
              <img src={MovieLogo} alt="Movie Logo" />
            </div> */}
            {/* <div className="buttons flex">
              <button
                className="flex j-center a-center"
              >
                <FaPlay />
                Play
              </button>
              <button
                className="flex j-center a-center"
              >
                <AiOutlineInfoCircle />
                More Info
              </button>
            </div> */}
          </div>
        </div>
        <Slider movies={movies} />
      </Container>
     {/* <AboutFooter onvalue={'/ArtProject'}/> */}
     <ArtFooter />
    
    </div>
  );
}

const Container = styled.div`
  background-color: black;
 
  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;
   
      bottom: 5rem;
      .logo {
        img {
          width: 100%;
          height: 100%;
          margin-left: 5rem;
        }
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
`;
export default ArtProject;

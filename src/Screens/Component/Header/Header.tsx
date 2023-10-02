/* eslint-disable react/jsx-pascal-case */
import { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import staller_header_logo from "../../../Asset/Images/main_logo.png";
import Search_icon from "../../../Asset/icon-wrapper.png";
import Menu_Icon from "../../../Asset/Menu_Icon.png";
import "./Header.css";
import { NetworkDetails, signTx } from "../../../helper/network";
import { StellarWalletsKit } from "stellar-wallets-kit";
import Modal from "react-modal";
import { AiOutlineCloseCircle, AiFillEnvironment } from "react-icons/ai";

import { motion } from "framer-motion";
import Create from "../Create/Create";
// import { motion } from "framer-motion";
import {
  BASE_FEE,
  createNewCampaign,
  getServer,
  getTxBuilder,
  submitTx,
} from "helper/soroban";

interface Web3PageProps {
  networkDetails: NetworkDetails;
  setPubKey: (pubKey: string) => void;
  swkKit: StellarWalletsKit;
  pubKey: string;
  value?: string;
  onPress?: (created: any) => void;
}
function Header(props: Web3PageProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const contractIdCrowdFund =
    "CDVKXAJB2UZYVETKZSKEFXAGKEB2D3GBLVWKQ25UE5LSYBNLDWVJFT6O";

  function toggleMenu() {
    setShowMenu(!showMenu);
  }
  const openModal = () => {
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
  async function createCampaign() {
    try {
      console.log("create campaign");

      const server = getServer(props.networkDetails);

      const txBuilder = await getTxBuilder(
        props.pubKey,
        BASE_FEE,
        server,
        props.networkDetails.networkPassphrase
      );

      const preparedTransaction = await createNewCampaign({
        contractID: contractIdCrowdFund,
        artistPubKey: props.pubKey,
        title: "Food Campaign",
        desc: "Fund to Food Campaign",
        imageUrl: "image url food",
        target: "5000",
        deadline: "1700613645",
        memo: "",
        category: "Art",
        date: "1700613645",
        main_location: "lahore",
        txBuilderC: txBuilder,
        server: server,
        networkPassphrase: props.networkDetails.networkPassphrase,
      });

      console.log("preparedTransaction", preparedTransaction);

      try {
        const signedTx = await signTx(
          preparedTransaction,
          props.pubKey,
          props.swkKit
        );

        const result = await submitTx(
          signedTx,
          props.networkDetails.networkPassphrase,
          server
        );

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        props?.onPress(true);
        console.log("result", result);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Navbar bg="black" expand="lg" fixed="top" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src={staller_header_logo}
              width="137"
              height="48"
              alt="ART Clubcard"
              className="logo"
              style={{ marginLeft: "25%" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="menu-toggle"
            onClick={toggleMenu}
          >
            <img src={Menu_Icon} alt="toggle" />
          </Navbar.Toggle>

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto" style={{ flex: 1, marginLeft: "20%" }}>
              {props.value === "clicked" ? (
                <Nav.Link
                  className="header_button_clicked"
                  onClick={() => {
                    // setColor(true);
                    navigate("/ArtProject");
                  }}
                >
                  ART PROJECTS
                </Nav.Link>
              ) : (
                <Nav.Link
                  style={{ color: "white" }}
                  className="header_button"
                  onClick={() => {
                    navigate("/ArtProject");
                  }}
                >
                  ART PROJECTS
                </Nav.Link>
              )}

              <Nav.Link
                style={{ color: "white" }}
                onClick={() => {
                  navigate("/marketplace");
                }}
              >
                MARKET PLACE
              </Nav.Link>
            </Nav>
            <Nav style={{ marginLeft: "20%" }}>
              <Nav.Link
                style={{ color: "#01A19A", marginTop: "3%" }}
                onClick={openModal}
              >
                Create Campgain
              </Nav.Link>
              <Nav.Link
                style={{ color: "#01A19A", marginTop: "3%" }}
                onClick={() => {
                  navigate("/MainApp");
                }}
              >
                Connect Wallet
              </Nav.Link>
              <Nav.Link>
                <img src={Search_icon} alt="Search" />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {showMenu && (
        <div className="mobile-menu">
          <Nav>
            <Nav.Link as={Link} to="/portfolio" onClick={toggleMenu}>
              PORTFOLIO
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/art-projects"
              onClick={toggleMenu}
              className={
                props.value === "clicked"
                  ? "header_button_clicked"
                  : "header_button"
              }
            >
              ART PROJECT
            </Nav.Link>
            <Nav.Link as={Link} to="/market-place" onClick={toggleMenu}>
              MARKET PLACE
            </Nav.Link>
            <Nav.Link onClick={toggleMenu}>Create Wallet</Nav.Link>
            <span>|</span>
            <Nav.Link onClick={toggleMenu}>Connect Wallet</Nav.Link>
          </Nav>
        </div>
      )}
      <div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="Header-Modal-Content"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, translateY: -100 }}
            animate={{ opacity: 1, scale: 1, translateY: 0 }}
            transition={{ duration: 0.5 }}
            className="modal-header-opening"
          >
            <div className="ProjectInput">
              <p>PROJECT INPUT</p>
              <AiOutlineCloseCircle
                onClick={closeModal}
                className="header-modal-close-icon"
              />
            </div>
            <div>
              <form>
                <div className="All-label">
                  <div className="Input-Text">
                    <label>Creater Name</label>
                    <input placeholder="Name" type="text" />
                  </div>
                  <div className="Input-Text">
                    {" "}
                    <label>Enter your name:</label>
                    <input placeholder="0.00" type="text" />
                  </div>
                </div>
                <div className="All-label">
                  <div className="Input-Text">
                    <label>Email</label>
                    <input placeholder="Email" type="text" />
                  </div>
                  <div className="Input-Text">
                    {" "}
                    <label>Category</label>
                    <input placeholder="Choose Category" type="text" />
                  </div>
                </div>
                <div className="All-label">
                  <div className="Input-Text">
                    <label>Project Ttile</label>
                    <input placeholder="Title" type="text" />
                  </div>
                </div>
                <div className="All-label">
                  <div className="Input-Text">
                    <label>Address Account</label>
                    <input
                      placeholder="Wallet account used for login"
                      type="text"
                    />
                  </div>
                </div>
                <div className="All-label">
                  <div className="Input-Text">
                    <label>Short Description</label>
                    <input placeholder="Short Description" type="text" />
                  </div>
                  <div className="Input-Text">
                    {" "}
                    <label>Main Location</label>
                    <input placeholder="Set Location" type="text" />
                  </div>
                </div>

                <div
                  className="Input-Text"
                  style={{ marginTop: "3%", height: "40%" }}
                >
                  <label>Project Description</label>
                  <input
                    placeholder="A design system for enterprise-level products. Create an efficient and enjoyable work experience."
                    type="text"
                  />
                </div>
                <div className="All-label">
                  <div className="Input-Text">
                    <label>Temporary Location</label>
                    <input placeholder="Set Location" type="text" />
                  </div>
                  <div className="Input-Text">
                    {" "}
                    <label>Main Location</label>
                    <i style={{ position: "absolute", top: "3%" }}>
                      <AiFillEnvironment />
                    </i>
                    <input
                      placeholder="Set Location"
                      type="text"
                      style={{
                        paddingRight: "30px", // Adjust the padding to accommodate the icon
                        backgroundImage: 'url("../../")', // Replace with your icon image
                        backgroundPosition: "right center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "20px 20px", // Adjust the size of the icon
                      }}
                    />
                  </div>
                </div>
                <div className="All-label-all">
                  <div className="Input-Text-green">
                    <input placeholder="Set Location" type="text" />
                    <Tag text="green" />
                    <Tag text="green" />
                  </div>
                </div>
              </form>
              <div className="Create-Header">
                <Create />
                <Create />
                <Create />
                <Create />
                <Create />
                <Create />
              </div>
            </div>
          </motion.div>
        </Modal>
      </div>
      <button onClick={createCampaign}>hello</button>
    </div>
  );
}

export default Header;

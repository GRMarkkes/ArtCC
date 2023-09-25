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
  const navigate = useNavigate();
  const contractIdCrowdFund =
  "CDYEIAFYOU7SUTV4JJCESIJDUYCQGNDMDK7LK5TOBZ7MKDGSVGI3ZDX6";

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

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
      alert(error);
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
                onClick={createCampaign}
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
    </div>
  );
}

export default Header;

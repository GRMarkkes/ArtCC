/* eslint-disable react/jsx-pascal-case */
import { ChangeEvent, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import staller_header_logo from "../../../Asset/Images/main_logo.png";
import Search_icon from "../../../Asset/icon-wrapper.png";
import Menu_Icon from "../../../Asset/Menu_Icon.png";
import "./Header.css";
import { NetworkDetails, signTx } from "../../../helper/network";
import { StellarWalletsKit } from "stellar-wallets-kit";
import Modal from "react-modal";
import { AiOutlineCloseCircle } from "react-icons/ai";

import { motion } from "framer-motion";
// import Create from "../Create/Create";
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
  const [file, setFile] = useState<string>(""); // Change the type to 'string'
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    targ: "",
    addressAccount: "",
    mainLocation: "",
    projectDescription: "",
    deadline: "",
    date: "",
    memo: "",
  });

  console.log(formData, "drtdd");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      console.log(selectedFile);
      setFile(URL.createObjectURL(selectedFile));
    }
  }

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
  // interface TagProps {
  //   text: string;
  // }
  // const Tag: React.FC<TagProps> = ({ text }) => {
  //   return <div className="tag">{text}</div>;
  // };
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
      const test = {
        contractID: contractIdCrowdFund,
        artistPubKey: props.pubKey,
        title: formData.title,
        desc: formData.projectDescription,
        category: formData.category,
        main_location: formData.mainLocation,
        date: formData.date,
        imageUrl: "image url food",
        target: formData.targ,
        deadline: "1700613645",
        memo: "",
        txBuilderC: txBuilder,
        // category: "Art",
        server: server,
        networkPassphrase: props.networkDetails.networkPassphrase,
      };
      console.log(test, "this is create campgain");
      const preparedTransaction = await createNewCampaign(test);

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
              <div className="All-label">
                <div className="Input-Text">
                  <label>Creater Name</label>
                  <input placeholder="Name" type="text" />
                </div>
                <div className="Input-Text">
                  <label>Budget</label>
                  <div style={{ display: "flex" }}>
                    <input
                      placeholder="0.00"
                      type="text"
                      onChange={(e) => {
                        formData.targ = e?.target?.value;
                        setFormData({ ...formData });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="All-label">
                <div className="Input-Text">
                  <label>Email</label>
                  <input placeholder="Email" type="text" />
                </div>
                <div className="Input-Text">
                  <label>Category</label>
                  <select
                    onChange={(e) => {
                      formData.category = e?.target?.value;
                      setFormData({ ...formData });
                    }}
                  >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
              </div>
              <div className="All-label">
                <div className="Input-Text">
                  <label>Project Ttile</label>
                  <input
                    placeholder="Title"
                    type="text"
                    onChange={(e) => {
                      formData.title = e?.target?.value;
                      setFormData({ ...formData });
                    }}
                  />
                </div>
              </div>
              <div className="All-label">
                <div className="Input-Text">
                  <label>Address Account</label>
                  <input
                    placeholder="Wallet account used for login"
                    type="text"
                    onChange={(e) => {
                      formData.addressAccount = e?.target?.value;
                      setFormData({ ...formData });
                    }}
                  />
                </div>
              </div>
              <div className="All-label">
                <div className="Input-Text">
                  <label>Short Description</label>
                  <input
                    placeholder="Short Description"
                    type="text"
                    onChange={(e) => {
                      formData.deadline = e?.target?.value;
                      setFormData({ ...formData });
                    }}
                  />
                </div>
                <div className="Input-Text">
                  {" "}
                  <label>Main Location</label>
                  <input
                    placeholder="Set Location"
                    type="text"
                    onChange={(e) => {
                      formData.mainLocation = e?.target?.value;
                      setFormData({ ...formData });
                    }}
                  />
                </div>
              </div>
              <div className="Input-Text" style={{ marginTop: "2%" }}>
                <label>Project Description</label>
                <textarea
                  placeholder="A design system for enterprise-level products. Create an efficient and enjoyable work experience."
                  style={{
                    resize: "vertical", // Allow vertical resizing
                    minHeight: "100px", // Set a minimum height
                  }}
                  onChange={(e) => {
                    formData.projectDescription = e?.target?.value;
                    setFormData({ ...formData });
                  }}
                />
              </div>

              <div className="All-label">
                <div className="Input-Text">
                  <label>Temporary Location</label>
                  <input placeholder="Set Location" type="text" />
                </div>
                <div className="Input-Text">
                  {" "}
                  <label>Date</label>
                  <i style={{ position: "absolute", top: "3%" }}></i>
                  <input
                    placeholder="Set Location"
                    type="date"
                    style={{
                      paddingRight: "4%",
                    }}
                    onChange={(e) => {
                      formData.date = e?.target?.value;
                      setFormData({ ...formData });
                    }}
                  />
                </div>
              </div>
              <div className="All-label-all">
                <div className="Input-Text-green">
                  <input placeholder="Set Location" type="text" />
                </div>
              </div>
              <div className="App-image">
                <input type="file" onChange={handleChange} />{" "}
                <div>
                  <h3>Click or drag file to this area to upload</h3>
                  <p>
                    Support for a single or bulk upload. Strictly prohibit from
                    uploading company data or other band files
                  </p>
                </div>
              </div>
              <div className="image-file">
                <img
                  src={file}
                  style={{ width: "20%", height: "20vh" }}
                  alt="haia"
                />
              </div>
              <div
                style={{
                  marginTop: "10%",
                  marginBottom: "10%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <button className="app-button" onClick={createCampaign}>
                    Post
                  </button>
                </div>
                <div>
                  <button className="app-button">save</button>
                </div>
              </div>
            </div>
          </motion.div>
        </Modal>
      </div>
    </div>
  );
}

export default Header;

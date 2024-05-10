/* eslint-disable react/jsx-pascal-case */

import "./Header.css";

import { AiOutlineCloseCircle, AiOutlineSave } from "react-icons/ai";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import React, { ChangeEvent, DragEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Avitar from "../../../assets/Avatar.png";
import Create from "../Create/Create";
import ImageCreate from "../../../assets/Rectangle 3.png";
import Inbox from "../../../assets/Inbox.png";
import { MdOutlineLocationSearching } from "react-icons/md";
import Menu_Icon from "../../../assets/Menu_Icon.png";
import Modal from "react-modal";
import { NetworkDetails } from "../../../helper/network";
import { RiArrowDropDownLine } from "react-icons/ri";
import Search_icon from "../../../assets/icon-wrapper.png";
import { SlEnergy } from "react-icons/sl";
import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit";
import axios from "axios";
import { motion } from "framer-motion";
import staller_header_logo from "../../../assets/Images/main_logo.png";
import { useWallet } from "../../../hooks";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// import Cookies from 'universal-cookie';

// import Create from "../Create/Create";
// import { motion } from "framer-motion";

const validationSchema = z.object({
  createrName: z.string().min(1, { message: "Create Name is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  addressAccount: z.string().min(1, { message: "Address Account is required" }),
  shortDescription: z
    .string()
    .min(1, { message: "Short Description is required" }),
  tempLocation: z
    .string()
    .min(1, { message: "Temporary Location is required" }),
  desc: z.string().min(1, { message: "Description is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  mainLocation: z.string().min(1, { message: "Main Location is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  // imageUrl: z.string().min(1, { message: "Date is required" }),
  target: z.string().refine(
    (v) => {
      let n = Number(v);
      return !isNaN(n) && v?.length > 0;
    },
    { message: "Invalid number" }
  ),
  // deadline: z.string().min(1, { message: "Confirm Password is required" }),
});
type ValidationSchema = z.infer<typeof validationSchema>;

interface Web3PageProps {
  networkDetails: NetworkDetails;
  setPubKey: (pubKey: string) => void;
  swkKit: StellarWalletsKit;
  pubKey: string;
  value?: string;
  onPress?: (created: any) => void;
  setConnectWallet: (connectWallet: boolean) => void;
}

function Header(props: Web3PageProps) {
  const [CreateList, setCreateList] = useState([
    ImageCreate,
    ImageCreate,
    ImageCreate,
  ]);
  const [showMenu, setShowMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setInputValue(newValue);
  };

  // const [file, setFile] = useState<string>(""); // Change the type to 'string'

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const [baseImage, setBaseImage] = useState<any>();
  const [displayImage, setDisplayImage] = useState<string>("false");

  const { setConnectWallet, networkDetails, pubKey, swkKit } = props;
  const { createCampaign } = useWallet({
    pubKey,
    networkDetails,
    swkKit,
  });

  localStorage.setItem("pubKey", pubKey);
  const getPubKeyOne = localStorage.getItem("pubKey");

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setBaseImage(file);
    }

    if (file) {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target && event.target.result) {
          setDisplayImage(event.target.result as string);
          let array: any = [event.target.result, ...CreateList];
          setCreateList([...array]);
        }
      };

      reader.readAsDataURL(file);
    }
  };
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0]; // Get the dropped file

    if (file) {
      setBaseImage(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setDisplayImage(event.target.result as string);
          let array: any = [event.target.result, ...CreateList];
          setCreateList([...array]);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const navigate = useNavigate();

  function toggleMenu() {
    setShowMenu(!showMenu);
  }
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
    // setIsHovered(false);
  };
  // interface TagProps {
  //   text: string;
  // }
  // const Tag: React.FC<TagProps> = ({ text }) => {
  //   return <div className="tag">{text}</div>;
  // };
  interface TagProps {
    text: string;
  }
  const Tag: React.FC<TagProps> = ({ text }) => {
    return <div className="tag">{text}</div>;
  };

  const create: SubmitHandler<ValidationSchema> = async (values) => {
    setLoading(true);

    try {
      const bodyFormData = new FormData();
      bodyFormData.append("image", baseImage);
      let imageUrl = "";
      await axios({
        method: "post",
        url: `${import.meta.env.VITE_IMAGE_SERVER_URL}/upload`,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(function ({ data }) {
        imageUrl = data.url;
      });

      await createCampaign({
        title: values.title,
        desc: values.desc,
        category: values.category,
        main_location: values.mainLocation,
        metaData: JSON.stringify({
          date: values.date,
          createrName: values.createrName,
          addressAccount: values.addressAccount,
          email: values.email,
          shortDescription: values.shortDescription,
          tempLocation: values.tempLocation,
        }),
        imageUrl,
        target: values.target.toString(),
      });

      closeModal();
      props?.onPress && props?.onPress(true);
      setLoading(false);
      closeModal();
    } catch (error) {
      setLoading(false);
      closeModal();
      console.log(error);
    }
  };
  const handleDelete = (index: number) => {
    // Create a new array excluding the item to be deleted
    const updatedList = [...CreateList];
    updatedList.splice(index, 1);
    setCreateList(updatedList);
  };

  return (
    <div>
      {getPubKeyOne === "" ? (
        <div>
          <Navbar
            bg="black"
            expand="lg"
            fixed="top"
            variant="dark"
            style={{ zIndex: "980" }}
          >
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
                  <Nav.Link
                    style={{ color: "white", fontSize: "12px" }}
                    onClick={() => {
                      navigate("/Portfolio");
                    }}
                  >
                    PORTFOLIO
                  </Nav.Link>
                  {props.value === "clicked" ? (
                    <Nav.Link
                      className="header_button_clicked"
                      onClick={() => {
                        // setColor(true);
                        navigate("/ArtProject");
                      }}
                    >
                      ART&nbsp;PROJECTS
                    </Nav.Link>
                  ) : (
                    <Nav.Link
                      style={{ color: "white", fontSize: "12px" }}
                      className="header_button"
                      onClick={() => {
                        navigate("/ArtProject");
                      }}
                    >
                      ART&nbsp;PROJECTS
                    </Nav.Link>
                  )}

                  <Nav.Link
                    style={{ color: "white", fontSize: "12px" }}
                    onClick={() => {
                      navigate("/marketplace");
                    }}
                  >
                    MARKET&nbsp;PLACE
                  </Nav.Link>
                </Nav>
                <Nav style={{ marginLeft: "20%" }}>
                  <Nav.Link
                    style={{
                      color: "#01A19A",
                      marginTop: "3%",
                      fontSize: "12px",
                    }}
                    href="https://www.northernsustainablefutures.com/artclubcard-info"
                  >
                    CREATE&nbsp;WALLET
                  </Nav.Link>
                  <Nav.Link
                    style={{
                      color: "#01A19A",
                      marginTop: "3%",
                      fontSize: "12px",
                    }}
                    onClick={() => {
                      setConnectWallet(true);
                    }}
                  >
                    CONNECT&nbsp;WALLET
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
                  ART&nbsp;PROJECT
                </Nav.Link>
                <Nav.Link as={Link} to="/market-place" onClick={toggleMenu}>
                  MARKET&nbsp;PLACE
                </Nav.Link>
                <Nav.Link onClick={toggleMenu}>Create&nbsp;Wallet</Nav.Link>
                <span>|</span>
                <Nav.Link onClick={toggleMenu}>Connect&nbsp;Wallet</Nav.Link>
              </Nav>
            </div>
          )}
        </div>
      ) : (
        <div>
          <Navbar
            bg="black"
            expand="lg"
            fixed="top"
            variant="dark"
            className="custom-navbar"
          >
            <div className="container-fluid">
              <Navbar.Brand as={Link} to="/">
                <img
                  src={staller_header_logo}
                  width="137"
                  height="48"
                  alt="ART Clubcard"
                  className="logo"
                  style={{ marginLeft: "6%" }}
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
                <Nav
                  className="mr-auto"
                  style={{ width: "50%", marginLeft: "8%" }}
                >
                  <Nav.Link
                    style={{ color: "white", fontSize: "12px" }}
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    PORTFOLIO
                  </Nav.Link>
                  {props.value === "clicked" ? (
                    <Nav.Link
                      className="header_button_clicked"
                      onClick={() => {
                        // setColor(true);
                        navigate("/ArtProject");
                      }}
                    >
                      ART&nbsp;PROJECTS
                    </Nav.Link>
                  ) : (
                    <Nav.Link
                      style={{ color: "white", fontSize: "12px" }}
                      className="header_button"
                      onClick={() => {
                        navigate("/ArtProject");
                      }}
                    >
                      ART&nbsp;PROJECTS
                    </Nav.Link>
                  )}

                  <Nav.Link
                    style={{ color: "white", fontSize: "12px" }}
                    onClick={() => {
                      navigate("/marketplace");
                    }}
                  >
                    MARKET&nbsp;PLACE
                  </Nav.Link>
                  <Nav style={{ marginLeft: "5%" }}>
                    <Nav.Link
                      style={{
                        color: "white",
                        fontSize: "12px",
                        marginTop: "-2%",
                      }}
                      onClick={() => {
                        navigate("/");
                      }}
                      className=""
                    >
                      LOAD&nbsp;WALLET
                      <RiArrowDropDownLine style={{ fontSize: "25px" }} />
                    </Nav.Link>
                  </Nav>
                </Nav>
                <Nav style={{ marginLeft: "4%", marginTop: "5px" }}>
                  <Nav.Link
                    style={{ color: "white", fontSize: "12px" }}
                    onClick={openModal}
                  >
                    NEW&nbsp;ART&nbsp;PROJECT
                  </Nav.Link>
                  <Nav.Link
                    style={{ color: "white", fontSize: "12px" }}
                    onClick={() => {
                      navigate("/marketplace");
                    }}
                  >
                    NEW&nbsp;MARKETPLACE
                  </Nav.Link>
                  <Nav.Link style={{ marginTop: "-2%" }}>
                    <img src={Search_icon} alt="Search" />
                  </Nav.Link>
                </Nav>
                <Nav style={{ marginLeft: "2%" }}>
                  <Nav.Link style={{ display: "flex" }}>
                    <img style={{ height: "80%" }} src={Avitar} alt="Search" />
                    <p
                      style={{ color: "white", width: "5%", fontSize: "12px" }}
                    >
                      Account
                      <br />
                      UserName
                    </p>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </div>
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
      )}

      <div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="Header-Modal-Content"
          overlayClassName="modal-overlay"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, translateY: -100 }}
            animate={{ opacity: 1, scale: 1, translateY: 0 }}
            transition={{ duration: 0.5 }}
            className="modal-header-opening"
          >
            <div className="ProjectInput">
              <h4>PROJECT INPUT</h4>
              <AiOutlineCloseCircle
                onClick={closeModal}
                className="header-modal-close-icon"
              />
            </div>
            <form onSubmit={handleSubmit(create)}>
              <div>
                <div className="All-label">
                  <div className="Input-Text">
                    <label>Creater Name</label>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <input
                        placeholder="Name"
                        type="text"
                        {...register("createrName")}
                      />
                      <span style={{ color: "white" }}>
                        {errors?.createrName?.message}
                      </span>
                    </div>
                  </div>
                  <div className="Input-Text">
                    <label>Financing Goal</label>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <input
                        placeholder="0.00"
                        type="text"
                        {...register("target")}
                        onChange={handleInputChange}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span style={{ color: "white" }}>
                          {errors.target?.message}
                        </span>
                        <p
                          style={{
                            color: " var(--character-primary-inverse, #FFF)",
                            fontSize: "13px",
                            fontWeight: "700",
                            lineHeight: "22px",
                          }}
                        >
                          {inputValue * 10}ARTcredits
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="All-label">
                  <div className="Input-Text">
                    <label>Email</label>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {" "}
                      <input
                        placeholder="Email"
                        {...register("email")}
                        type="text"
                      />
                      <span style={{ color: "white" }}>
                        {errors?.email?.message}
                      </span>
                    </div>
                  </div>
                  <div className="Input-Text">
                    <label>Category</label>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <select {...register("category")}>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                      </select>
                      <span style={{ color: "white" }}>
                        {errors?.category?.message}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="All-label">
                  <div className="Input-Text">
                    <label>Project Ttile</label>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <input
                        placeholder="Title"
                        type="text"
                        {...register("title")}
                      />
                      <span style={{ color: "white" }}>
                        {errors?.title?.message}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="All-label">
                  <div className="Input-Text">
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {" "}
                      <label>Address Account</label>
                      <input
                        placeholder="Wallet account used for login"
                        type="text"
                        {...register("addressAccount")}
                      />
                      <span style={{ color: "white" }}>
                        {errors?.addressAccount?.message}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="All-label">
                  <div className="Input-Text">
                    <label>Short Description</label>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <input
                        placeholder="Short Description"
                        {...register("shortDescription")}
                        type="text"
                      />
                      <span style={{ color: "white" }}>
                        {errors?.shortDescription?.message}
                      </span>
                    </div>
                  </div>
                  <div className="Input-Text">
                    {" "}
                    <label>Main Location</label>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <input
                        placeholder="Set Location"
                        type="text"
                        {...register("mainLocation")}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span style={{ color: "white" }}>
                          {errors?.mainLocation?.message}
                        </span>
                        <p
                          style={{
                            color: "var(--primary-6, #01A19A)",
                            fontSize: "13px",
                            fontWeight: "700",
                            lineHeight: "22px",
                            marginTop: "3%",
                          }}
                        >
                          <MdOutlineLocationSearching />
                          Set Current Location
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Input-Text" style={{ marginTop: "2%" }}>
                  <label>Project Description</label>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <textarea
                      placeholder="A design system for enterprise-level products. Create an efficient and enjoyable work experience."
                      style={{
                        resize: "vertical", // Allow vertical resizing
                        minHeight: "100px", // Set a minimum height
                      }}
                      {...register("desc")}
                    />
                    <span style={{ color: "white" }}>
                      {errors?.desc?.message}
                    </span>
                  </div>
                </div>

                <div className="All-label">
                  <div className="Input-Text">
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <label>Temporary Location</label>
                      <input
                        placeholder="Set Location"
                        {...register("tempLocation")}
                        type="text"
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span style={{ color: "white" }}>
                          {errors?.tempLocation?.message}
                        </span>
                        <p
                          style={{
                            color: "var(--primary-6, #01A19A)",
                            fontSize: "13px",
                            fontWeight: "700",
                            lineHeight: "22px",
                            marginTop: "3%",
                          }}
                        >
                          <MdOutlineLocationSearching />
                          Set Current Location
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="Input-Text">
                    {" "}
                    <label>Date</label>
                    <i style={{ position: "absolute", top: "3%" }}></i>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <input
                        placeholder="Set Location"
                        type="date"
                        style={{
                          paddingRight: "4%",
                        }}
                        {...register("date")}
                      />
                      <span style={{ color: "white" }}>
                        {errors?.date?.message}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="All-label-all">
                  <div className="Input-Text-green">
                    <input placeholder="Set Location" type="text" />
                    <div className="modal-tags">
                      <Tag text="green" />
                      <Tag text="green" />
                    </div>
                  </div>
                </div>
                <div
                  className="App-image"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <label htmlFor="file-input" className="image-input-field">
                    {baseImage ? (
                      <img src={displayImage} alt="baseImage" />
                    ) : (
                      <img src={Inbox} alt="inbox" />
                    )}
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    onChange={handleFileInputChange}
                    style={{ display: "none" }}
                  />

                  <div style={{ marginLeft: "5%" }}>
                    <h3>Click or drag file to this area to upload</h3>
                    <p>
                      Support for a single or bulk upload. Strictly prohibit
                      from uploading company data or other banned files.
                    </p>
                  </div>
                </div>
                <div className="image-file">
                  {CreateList?.map((images, index) => (
                    <Create
                      key={index}
                      ImageCreate={images}
                      onDelete={() => handleDelete(index)}
                    />
                  ))}
                </div>
                <div
                  style={{
                    marginTop: "10%",
                    marginBottom: "10%",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                  className="button-modal"
                >
                  <div>
                    <button className="app-button">
                      {" "}
                      <AiOutlineSave style={{ marginLeft: "-2%" }} />
                      Save
                    </button>
                  </div>
                  <div>
                    {loading ? (
                      <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                          <span className="sr-only"></span>
                        </div>
                      </div>
                    ) : (
                      <button className="app-button other" type="submit">
                        <SlEnergy />
                        Post
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        </Modal>
      </div>
    </div>
  );
}

export default Header;

import React from "react";
// import { Navigate } from "react-router-dom";
import mainbackground from "../../Asset/Images/Main_background.png";
import wallet_icon from "../../Asset/SVG/wallet.svg";
import leager from "../../Asset/SVG/Leager.svg";
import './walletConnect.css';

const WalletConnection: React.FC = () => {
  return (
    <div
      className="main-container w-100 vh-100"
      style={{
        backgroundImage: `url(${mainbackground})`,
        backgroundSize: "cover",
        backgroundColor: "black",
      }}
    >
      <div
        className="child-container d-flex justify-content-center align-items-center flex-column bg-black position-absolute top-50 start-50 translate-middle vw-60"
        style={{ zIndex: 1, height: '60%' }}
      >
        <p className="fs-5 fw-bold text-white">CONNECT YOUR WALLET </p>
        <p className="text-white">Select a wallet or log in with email</p>
        <button className="btn btn-dark m-2 w-95">
          <img
            src={wallet_icon}
            alt="Button Image"
            className="me-2"
            style={{ color: "white" }}
          />
          <span style={{ color: "white" }}>Wallet Connect</span>
        </button>
        <button className="btn btn-dark m-2 w-95">
          <img
            src={leager}
            alt="Button Image"
            style={{ marginRight: "10px", color: "white" }}
          />
          <span style={{ color: "white" }}>LEDGER</span>
        </button>
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 20,
            width: "98%",
            placeContent: "center",
          }}
        >
          <div className="line"></div>
          <span style={{ color: "#595959" }}>or</span>
          <div className="line"></div>
        </div>
        <button className="btn btn-dark m-2 w-95">
          <img
            src={leager}
            alt="Button Image"
            style={{ marginRight: "10px", color: "white" }}
          />
          <span style={{ color: "white" }}>MAIL</span>
        </button>
        <p className="Account_notExist">
          Don't have an Account? Create Account!
        </p>
        {/* {props.txnHash && <p>View your transaction <a href={`https://stellarchain.io/${props.txnHash}`} target="_blank" rel="noreferrer">here</a>!</p>} */}
      </div>
    </div>
  );
}

export default WalletConnection;

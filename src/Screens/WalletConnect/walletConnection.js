// import './App.css';
import { useState } from 'react';

import WalletConnectClient from '@walletconnect/sign-client';
import { Navigate, useNavigate } from "react-router-dom";
import * as StellarSdk from 'stellar-sdk';
import { Web3Modal } from "@web3modal/standalone";
import mainbackground from '../../Asset/Images/Main_background.png'
import wallet_icon from '../../Asset/SVG/wallet.svg'
import leager from '../../Asset/SVG/Leager.svg'
import Message_Icon from '../../Asset/SVG/Message_Icon.svg'
import Footer from '../../Screens/Component/Footer/Footer';
import Header from '../../Screens/Component/Header/Header';

function walletconnection(props) {
  return (
    // <div className='container-fluid'>
    //   <div className='row'>
    //     <div className='col-12 col-lg-6 main_div w-100 vh-100' style={{ backgroundImage: `url(${mainbackground})`, backgroundSize: 'cover', backgroundColor: 'black' }}>
    //       <div className='container vh-100'>
    //         <div class="main_sub_div1 d-flex justify-content-center align-items-center">
    //           <div className='main_center_modal'>
    //             <p class="fs-4 fw-bold text-white">CONNECT YOUR WALLET {props.accounts}</p>
    //             <p className="text-white mb-4">Select a wallet or log in with email</p>
    //             <button onClick={props.handleConnect} class="btn btn-dark m-2 w-95">
    //               <img src={wallet_icon} alt="Button Image" class="me-2" style={{ color: 'white' }} />
    //               <span style={{ color: 'white' }}>Wallet Connect</span>
    //             </button>
    //             <button onClick={props.handleDisconnect} class="btn btn-dark m-2 w-95">
    //               <img src={leager} alt="Button Image" style={{ marginRight: '10px', color: 'white' }} />
    //               <span style={{ color: 'white' }}>LEDGER</span>
    //             </button>
    //             <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
    //               <div className="line"></div>
    //               <span style={{ color: '#595959' }}>or</span>
    //               <div className="line"></div>
    //             </div>
    //             <button onClick={props.handleDisconnect} class="btn btn-dark m-2 w-95">
    //               <img src={leager} alt="Button Image" style={{ marginRight: '10px', color: 'white' }} />
    //               <span style={{ color: 'white' }}>MAIL</span>
    //             </button>
    //             <p className="Account_notExist">Don't have an Account? Create Account!</p>
    //             {props.txnHash && <p>View your transaction <a href={`https://stellarchain.io/${props.txnHash}`} target="_blank" rel="noreferrer">here</a>!</p>}
    //           </div>
    //         </div>
    //       </div>

    //     </div>
    //   </div>
    // </div>
    <div class="main-container w-100 vh-100" style={{ backgroundImage: `url(${mainbackground})`, backgroundSize: 'cover', backgroundColor: 'black' }}>
      <div class="child-container d-flex justify-content-center align-items-center flex-column bg-black position-absolute top-50 start-50 translate-middle" style={{ zIndex: 1}}>
        <p class="fs-5 fw-bold text-white">CONNECT YOUR WALLET {props.accounts}</p>
        <p className="text-white">Select a wallet or log in with email</p>
        <button onClick={props.handleConnect} class="btn btn-dark m-2 w-95">
          <img src={wallet_icon} alt="Button Image" className="me-2" style={{ color: 'white' }} />
          <span style={{ color: 'white' }}>Wallet Connect</span>
        </button>
        <button onClick={props.handleDisconnect} class="btn btn-dark m-2 w-95">
          <img src={leager} alt="Button Image" style={{ marginRight: '10px', color: 'white' }} />
          <span style={{ color: 'white' }}>LEDGER</span>
        </button>
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, width: '98%', placeContent: 'center' }}>
          <div className="line"></div>
          <span style={{ color: '#595959' }}>or</span>
          <div className="line"></div>
        </div>
        <button onClick={props.handleDisconnect} class="btn btn-dark m-2 w-95">
          <img src={leager} alt="Button Image" style={{ marginRight: '10px', color: 'white' }} />
          <span style={{ color: 'white' }}>MAIL</span>
        </button>
        <p className="Account_notExist">Don't have an Account? Create Account!</p>
        {props.txnHash && <p>View your transaction <a href={`https://stellarchain.io/${props.txnHash}`} target="_blank" rel="noreferrer">here</a>!</p>}

      </div>
    </div>
  );
}

export default walletconnection;
{/* <div className='main_sub_div1'>
  
</div> */}
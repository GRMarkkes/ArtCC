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
    <div style={{ backgroundImage: `url(${mainbackground})`, backgroundSize: 'cover' }}>

      <Header value={"value"}/>
      <div className='main_div'>
        <div className='main_sub_div1'>
          <div className='img_div'>
            {/* <img style={{ width: '100%', height: '100%' }} src={mainbackground} alt="Background" /> */}
          </div>
          <div className='main_center_modal'>
            <p className='text_1'>CONNECT YOUR WALLET {props.accounts}</p>
            <p className='text_2'>Select a wallet or log in with email</p>
            {/* <p>Account: {accounts}</p> */}
            {/* <p>Balance : {balance}</p> */}
            {/* <button onClick={handleConnect}>Wallet Connect</button> */}
            {/* <button style={{backgroundColor:'#141414',width:293,height:28,borderRadius:2}}> */}
            <button onClick={props.handleConnect} className='wallet_button'>
              <img src={wallet_icon} alt="Button Image" style={{ marginRight: '10px', color: 'white' }} />
              <span style={{ color: 'white  ' }}>Wallet Connect</span>
            </button>
            <button onClick={props.handleDisconnect} className='wallet_button'>
              <img src={leager} alt="Button Image" style={{ marginRight: '10px', color: 'white' }} />
              <span style={{ color: 'white  ' }}>LEDGER</span>
            </button>
            <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
              <div className="line"></div>
              <span style={{ color: '#595959' }}>or</span>
              <div className="line"></div>
            </div>
            <button className='wallet_button'>
              <img src={Message_Icon} alt="Button Image" style={{ marginRight: '10px', color: 'white' }} />
              <span style={{ color: 'white  ' }}>mail</span>
            </button>
            <p className="Account_notExist">Don't have an Account? Create Account!</p>
            {/* </button> */}
            {/* <button onClick={handleDisconnect}> Disconnect</button> */}
            {/* <button onClick={handleSend}>Send</button> */}
            {props.txnHash && <p>View your transaction <a href={`https://stellarchain.io/${props.txnHash}`} target="_blank" rel="noreferrer">here</a>!</p>}
          </div>
        </div>


      </div>
      <Footer />
    </div>
  );
}

export default walletconnection;

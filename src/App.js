import React, { useState } from "react";
import StellarSdk from "stellar-sdk";
import QRCode from "qrcode.react";
import { Server } from 'stellar-sdk';

const App = () => {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState("");
  const [qrCodeModalOpen, setQrCodeModalOpen] = useState(false);

  const handleConnect = async () => {
    try {
      // Set the Stellar server endpoint
      const server = new Server('https://horizon.stellar.org');
      server.loadAccount('GCQ6BP4ZBB7BR4AMHCJPXISKDER2COM4RIKMS4QYIXA3J2LINNDQBELN')
      .then((account) => {
        console.log(account);
      })
      .catch((error) => {
        console.error(error);
      });
      setPublicKey('GCQ6BP4ZBB7BR4AMHCJPXISKDER2COM4RIKMS4QYIXA3J2LINNDQBELN');
      // var server = new StellarSdk.Server("https://horizon.stellar.org");
      // const server = new StellarSdk.Server("https://horizon.stellar.org");
      // Generate a new Stellar keypair
      // const keypair = StellarSdk.Keypair.random();

      // // Load the account details for the keypair
      // const account = await server.loadAccount(keypair.publicKey());

      // // Log the account details to the console
      // console.log("Account ID:", account.id);
      // console.log("Balances:");
      // account.balances.forEach((balance) => {
      //   console.log(`  Type: ${balance.asset_type}, Balance: ${balance.balance}`);
      // });

      // // Set the public key and connection status
      // setPublicKey(keypair.publicKey());
      setConnected(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenQrCodeModal = () => {
    setQrCodeModalOpen(true);
  };

  const handleCloseQrCodeModal = () => {
    setQrCodeModalOpen(false);
  };

  return (
    <div>
      {!connected ? (
        <button onClick={handleConnect}>Connect to Stellar</button>
      ) : (
        <div>
          <p>Connected to Stellar!</p>
          <p>Public Key: {publicKey}</p>
          <button onClick={handleOpenQrCodeModal}>Show QR Code</button>
        </div>
      )}

      {qrCodeModalOpen && (
        <div className="qr-code-modal">
          <div className="qr-code-wrapper">
            <QRCode value={publicKey} size={200} />
          </div>
          <button onClick={handleCloseQrCodeModal}>Close</button>
        </div>
      )}

      <style>
        {`
          .qr-code-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .qr-code-wrapper {
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: center;
            position: relative;
          }

          .qr-code-wrapper::after {
            content: "";
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translateX(-50%);
            border-style: solid;
            border-width: 0 10px 10px 10px;
            border-color: transparent transparent #fff transparent;
          }
        `}
      </style>
    </div>
  );
};

export default App;
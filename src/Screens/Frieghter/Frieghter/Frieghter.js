import React from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { isConnected, signTransaction } from "@stellar/freighter-api";
import * as StellarSdk from "stellar-sdk";

function Frieghter() {
  const server = new StellarSdk.Server("https://horizon.stellar.org");

  async function handleSend() {
    
    const StellarSdk = require("stellar-sdk");
    const sourceSecretKey =
      "SCALMKS5KZJ53VY4RPUCOY2BJMV2WMKCYQLE7SHZXV5Y7AK5JEWZVC6R";
    const sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
    const sourcePublicKey = sourceKeypair.publicKey();
    const receiverPublicKey =
      "GCQ6BP4ZBB7BR4AMHCJPXISKDER2COM4RIKMS4QYIXA3J2LINNDQBELN";
    const server = new StellarSdk.Server("https://horizon.stellar.org");

    (async function main() {
      const account = await server.loadAccount(sourcePublicKey);
      const fee = await server.fetchBaseFee();
      const transaction = new StellarSdk.TransactionBuilder(account, {
        fee,
        networkPassphrase: StellarSdk.Networks.PUBLIC,
      })
        .addOperation(
          StellarSdk.Operation.payment({
            destination: receiverPublicKey,
            asset: StellarSdk.Asset.native(),
            amount: "0.03000",
          })
        )
        .setTimeout(30)
        .build();
      transaction.sign(sourceKeypair);
      let xdr = transaction.toEnvelope().toXDR("base64");
      handleSignTransection(xdr);
      console.log(xdr, " xdrxdr");

      try {
        const transactionResult = await server.submitTransaction(transaction);
        console.log(JSON.stringify(transactionResult, null, 2));
        console.log("\nSuccess! View the transaction at: ");
        console.log(transactionResult._links.transaction.href);
      } catch (e) {
        console.log("An error has occured:");
        console.log(e);
      }
    })();
  }

  const handleConnection = async () => {
    if (await isConnected()) {
      try {
        const result =
          "GAUGL6PE3CRDMUQ2BXCHTHPYIG5ZICQACJJ6JKP5MUQWY6D56KD2W3TO";
        server
          .loadAccount(result)
          .then((account) => {
            const balances = account.balances;
            const xlmBalance = balances.find(
              (balance) => balance.asset_type === "native"
            ).balance;
            alert(`XLM balance: ${xlmBalance}`);
            console.log(JSON.stringify(account, null, 2));

          })
          .catch((error) => {
            alert(JSON.stringify(error, null, 2));
          });
      } catch (e) {
        alert("error it is");

        console.log(e);
      }
    }else {
      alert("Please add extension first for frieghter!");
    }
  };

  const handleSignTransection = async (xdr) => {
    if (await isConnected()) {
      let transection = await signTransaction(
        xdr,
        "PUBLIC",
        "GCQ6BP4ZBB7BR4AMHCJPXISKDER2COM4RIKMS4QYIXA3J2LINNDQBELN"
      );
      alert(JSON.stringify(transection, null, 2));
    } else {
      alert("Please add extension first for frieghter!");
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerMode: true,
          centerPadding: "10%",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerMode: true,
          centerPadding: "10%",
        },
      },
      {
        breakpoint: 968,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerMode: true,
          centerPadding: "5%",
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerMode: true,
          centerPadding: "10%",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          centerMode: true,
          centerPadding: "10%",
        },
      },
    ],
  };
  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          position: "absolute",
          left: "0",
          top: "-75px",
          transform: "translateY(-50%)",
          color: "#01A19A", // set the arrow's color to blue
          fontSize: "2rem",
          border: "none",
          background: "none",
          outline: "none",
          zIndex: 1,
        }}
        onClick={onClick}
      >
        <AiOutlineArrowLeft />
        {/* <i className="fa fa-angle-left" aria-hidden="true"></i> */}
      </div>
    );
  }
  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          position: "absolute",
          right: "5%",
          top: "-75px",
          transform: "translateY(-50%)",
          color: "#01A19A", // set the arrow's color to blue
          fontSize: "2rem",
          border: "none",
          background: "none",
          outline: "none",
          zIndex: 1,
        }}
        onClick={onClick}
      >
        <AiOutlineArrowRight />
        {/* <i className="fa fa-angle-right" aria-hidden="true"></i> */}
      </div>
    );
  }
  return (
    <div>
      <div style={{ position: "relative" }}>
        <div>
          <button onClick={handleConnection}>Frieghter</button>
        </div>
        <div>
          <button onClick={handleSend}>SignTransection</button>
        </div>
      </div>
      <div className="card-container"></div>
    </div>
  );
}
export default Frieghter;
import "./marketPlace.css";
import Header from "../Component/Header/Header";
import { NetworkDetails } from "../../helper/network";
import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit";
import Web3Page from "../Component/Web3Page/Web3Page";

// import PaginationMarketPlace from "Screens/Component/PaginationMarketPlace/PaginationMarketPlace";
// import Footer from "../Component/Footer/Footer";
// import marketplacebackground_image from '../../Asset/Images/MarketPlace_main.png'

interface MarketplaceMainProps {
  networkDetails: NetworkDetails;
  setPubKey: (pubKey: string) => void;
  swkKit: StellarWalletsKit;
  pubKey: string;
  setConnectWallet: (connectWallet: boolean) => void;
}

const MarketplaceMain = (props: MarketplaceMainProps) => {
  return (
    <div>
      <Header
        networkDetails={props.networkDetails}
        setPubKey={props.setPubKey}
        swkKit={props.swkKit}
        pubKey={props.pubKey}
        setConnectWallet={props.setConnectWallet}
      />
      {/* <div
        style={{
          marginTop: "20%",
          marginLeft: "5%",
          marginRight: "5%",
        }}
      >
        <PaginationMarketPlace />
      </div> */}

      <div style={{ marginTop: "20%", marginLeft: "20%" }}>
        <Web3Page
          networkDetails={props.networkDetails}
          swkKit={props.swkKit}
          pubKey={props.pubKey}
        />
      </div>
    </div>
  );
};

export default MarketplaceMain;

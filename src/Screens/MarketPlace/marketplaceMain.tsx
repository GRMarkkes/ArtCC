import "./marketPlace.css";

import Header from "../Component/Header/Header";
import { NetworkDetails } from "../../helper/network";
import { StellarWalletsKit } from "stellar-wallets-kit";
import Web3Page from "../Component/Web3Page/Web3Page";

// import Footer from "../Component/Footer/Footer";
// import marketplacebackground_image from '../../Asset/Images/MarketPlace_main.png'


interface MarketplaceMainProps {
  networkDetails: NetworkDetails;
  setPubKey: (pubKey: string) => void;
  swkKit: StellarWalletsKit;
  pubKey: string;
}

const MarketplaceMain = (props: MarketplaceMainProps) => {
  return (
    <div>
      <Header
        networkDetails={props.networkDetails}
        setPubKey={props.setPubKey}
        swkKit={props.swkKit}
        pubKey={props.pubKey}
      />
      
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

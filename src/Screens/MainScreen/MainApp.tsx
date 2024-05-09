import Header from "../Component/Header/Header";
import { NetworkDetails } from "../../helper/network";
import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit";

interface Web3PageProps {
  networkDetails: NetworkDetails;
  setPubKey: (pubKey: string) => void;
  swkKit: StellarWalletsKit;
  pubKey: string;
  setConnectWallet: (connectWallet: boolean) => void;
}

function MainApp(props: Web3PageProps) {
  return (
    <>
      <Header
        networkDetails={props.networkDetails}
        setPubKey={props.setPubKey}
        swkKit={props.swkKit}
        pubKey={props.pubKey}
        setConnectWallet={props.setConnectWallet}
      />
      {/* <Wallet/>
            <Footer /> */}
    </>
  );
}

export default MainApp;

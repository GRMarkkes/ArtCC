import React from "react";
import Header from "../Component/Header/Header";
import Footer from "../Component/Footer/Footer";
// import Walletconnection from './Screens/WalletConnect/walletConnection';
import MarketPlace from "../MarketPlace/marketplaceMain";
function MainApp() {

    return (<>
        <Header/>
        <MarketPlace/>
        <Footer />

    </>)
}
export default MainApp;
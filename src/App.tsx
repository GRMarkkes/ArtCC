import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import ArtProject from "./Screens/ArtProject/ArtProjectMain";
import MainApp from "./Screens/MainScreen/MainApp";
import MainPage from "./Screens/MainPage/MainPage";
import MarketPlace from "./Screens/MarketPlace/marketplaceMain";
import Portfolio from "./Screens/Portfolio/Portfolio";
import { useConnect } from "./hooks/useConnect";

function App(): JSX.Element {
  // Default to Futurenet network, only supported network for now
  const { networkDetails, pubKey, setConnectWallet, swkKit, setPubKey } =
    useConnect();

  return (
    <Router>
      <Routes>
        <Route
          path="/MainApp"
          element={
            <MainApp
              networkDetails={networkDetails}
              setPubKey={setPubKey}
              swkKit={swkKit}
              pubKey={pubKey}
              setConnectWallet={setConnectWallet}
            />
          }
        />
        <Route
          path="/"
          element={
            <MainPage
              networkDetails={networkDetails}
              setPubKey={setPubKey}
              swkKit={swkKit}
              pubKey={pubKey}
              setConnectWallet={setConnectWallet}
            />
          }
        />
        <Route
          path="/marketplace"
          element={
            <MarketPlace
              networkDetails={networkDetails}
              setPubKey={setPubKey}
              swkKit={swkKit}
              pubKey={pubKey}
              setConnectWallet={setConnectWallet}
            />
          }
        />
        <Route
          path="/ArtProject"
          element={
            <ArtProject
              networkDetails={networkDetails}
              setPubKey={setPubKey}
              swkKit={swkKit}
              pubKey={pubKey}
              setConnectWallet={setConnectWallet}
            />
          }
        />
        <Route
          path="/Portfolio"
          element={
            <Portfolio
              networkDetails={networkDetails}
              setPubKey={setPubKey}
              swkKit={swkKit}
              pubKey={pubKey}
              setConnectWallet={setConnectWallet}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

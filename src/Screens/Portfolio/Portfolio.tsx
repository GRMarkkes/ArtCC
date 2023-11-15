import Header from "Screens/Component/Header/Header";
import { NetworkDetails } from "../../helper/network";
import { StellarWalletsKit } from "stellar-wallets-kit";
import { Box, Typography } from "@mui/material";
import { AiOutlineSetting } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import "./Portfolio.css";
import TablePortfolio from "Screens/Component/TablePortfolio/TablePortfolio";
interface PortfolioMainProps {
  networkDetails: NetworkDetails;
  setPubKey: (pubKey: string) => void;
  swkKit: StellarWalletsKit;
  pubKey: string;
  setConnectWallet: (connectWallet: boolean) => void;
}
const Portfolio = (props: PortfolioMainProps) => {
  return (
    <div>
      <Header
        networkDetails={props.networkDetails}
        setPubKey={props.setPubKey}
        swkKit={props.swkKit}
        pubKey={props.pubKey}
        setConnectWallet={props.setConnectWallet}
      />
      <Box
        sx={{
          background: "var(--neutral-11, #1F1F1F)",
          marginTop: "4%",
          height: "auto",
          position: "fixed",
          width: "100%",
          paddingLeft: "12%",
        }}
      >
        <div className="Portfolio">
          <Box>
            <Typography
              style={{
                color: "var(--neutral-1, #FFF)",
                fontFamily: "Roboto",
                fontSize: "24px",
                fontWeight: "500",
              }}
            >
              Portfolio - Admin Account
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "10%", width: "30%" }}>
            <Typography
              sx={{
                display: "flex",
                color: "var(--primary-6, #01A19A)",
                fontFamily: "Montserrat",
              }}
            >
              {" "}
              <AiOutlineSetting style={{ fontSize: "24px" }} />
              &nbsp;&nbsp; General Settings
            </Typography>

            <Box
              sx={{
                display: "flex",
                color: "var(--primary-6, #01A19A)",
                fontFamily: "Montserrat",
              }}
            >
              <CgProfile style={{ fontSize: "24px" }} />
              <Typography> &nbsp;&nbsp;Profile</Typography>
            </Box>
          </Box>
        </div>
        <TablePortfolio />
      </Box>
    </div>
  );
};

export default Portfolio;

// import  { useState } from "react";
import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
import Slider from "../Component/Slider/Slider";
import Header from "../Component/Header/Header";
import * as Crowdfund from "CrowdFund";
import artimg from "../../Asset/Images/ArtProject_main.png";
import "./ArtProjectMain.css";
import ArtFooter from "../Component/ArtFooter";
import { useCallback, useEffect, useState } from "react";
import { NetworkDetails } from "helper/network";
import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit";

// interface Movie {
//   genres: string[];
//   id: number;
//   image: string[];
//   name: string;
// }
interface Web3PageProps {
  networkDetails: NetworkDetails;
  setPubKey: (pubKey: string) => void;
  swkKit: StellarWalletsKit;
  pubKey: string;
  setConnectWallet: (connectWallet: boolean) => void;
}

export type u32 = number;
export type i32 = number;
export type u64 = bigint;
export type i64 = bigint;
export type u128 = bigint;
export type i128 = bigint;
export type u256 = bigint;
export type i256 = bigint;
export type Address = string;
export type Option<T> = T | undefined;
export type Typepoint = bigint;
export type Duration = bigint;

const networkUrl = "https://still-magical-meadow.stellar-mainnet.quiknode.pro/c4ad23482bb8b07d64af9498be18ffdd3d7aca53";

const contractIdCrowdFund =
  "CBYMFAAA3OIFXXBHH7C2JKXDCNB547VGZSURPUPFDDSF2MBNYKJUZXMB";

const crowdFund = new Crowdfund.Contract({
  contractId: contractIdCrowdFund,
  networkPassphrase: "Public Global Stellar Network ; September 2015",
  rpcUrl: networkUrl,
});

const ArtProject = (props: Web3PageProps) => {
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState<Crowdfund.Campaign[]>([]);
  const [categoriesCampgains, setCategoriesCampgains] = useState<any>([]);

  const fetchData = useCallback(() => {
    const uniqueCategories = [
      ...new Set(campaigns.map((campaign) => campaign.category)),
    ];
    const allCampgainGroup: any = [];
    uniqueCategories.forEach((category) => {
      const matchingCampaigns = campaigns.filter(
        (item) => item.category === category
      );

      if (matchingCampaigns.length > 0) {
        allCampgainGroup.push({
          category: category,
          data: matchingCampaigns,
        });
      }
    });
    console.log(allCampgainGroup, "allCampgainGroup");
    setCategoriesCampgains(allCampgainGroup);
  }, [campaigns]);

  console.log(categoriesCampgains, "categoriesCampgains");
  const getCampaigns = useCallback(async () => {
    try {
      setLoading(true);
      console.log("getCampaigns");
      console.log("props.pubKey", props.pubKey);

      let data = await crowdFund.getCampaigns();
      const campaignsData = data.result; 

      setCampaigns(campaignsData);
      setLoading(false);

      // console.log(data);
    } catch (error) {
      // Handle errors here
      console.error(error);
    }
  }, [props.pubKey]);

  useEffect(() => {
    getCampaigns();
  }, [getCampaigns]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getResult = (res: any) => {
    if (res === true) {
      getCampaigns();
    }
  };

  return (
    <div>
      <Header
        networkDetails={props.networkDetails}
        setPubKey={props.setPubKey}
        swkKit={props.swkKit}
        pubKey={props.pubKey}
        onPress={getResult}
        setConnectWallet={props.setConnectWallet}
      />
      <img
        className="img-fluid"
        src={artimg}
        alt="art"
        style={{ height: "90vh", width: "100%" }}
      />
      <Container>
        {/* <Navbar isScrolled={isScrolled} /> */}
        <div className="hero">
          {/* <img
          src={backgroundImage}
          alt="background"
          className="background-image"
        /> */}
          <div className="container">
            {/* <div className="logo">
              <img src={MovieLogo} alt="Movie Logo" />
            </div> */}
            {/* <div className="buttons flex">
              <button
                className="flex j-center a-center"
              >
                <FaPlay />
                Play
              </button>
              <button
                className="flex j-center a-center"
              >
                <AiOutlineInfoCircle />
                More Info
              </button>
            </div> */}
          </div>
        </div>

        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        ) : (
          <Slider
            networkDetails={props.networkDetails}
            setPubKey={props.setPubKey}
            swkKit={props.swkKit}
            pubKey={props.pubKey}
            // campaigns={campaigns}
            onPress={getResult}
            categoriesData={categoriesCampgains}
          />
        )}
      </Container>
      {/* <AboutFooter onvalue={'/ArtProject'}/> */}
      <ArtFooter />
    </div>
  );
};

const Container = styled.div`
  background: var(--neutral-10, #262626);

  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;

      bottom: 5rem;
      .logo {
        img {
          width: 100%;
          height: 100%;
          margin-left: 5rem;
        }
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
`;
export default ArtProject;

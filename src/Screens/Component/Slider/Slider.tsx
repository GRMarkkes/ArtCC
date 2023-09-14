import { useEffect, useState } from "react";
import styled from "styled-components";
import CardSlider from "../CardSlider/CardSlider";
import { NetworkDetails } from "helper/network";
import { StellarWalletsKit } from "stellar-wallets-kit";

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

interface Campaign {
  amount_collected: i128;
  deadline: u64;
  description: string;
  donations: Array<i128>;
  donators: Array<Address>;
  id: u32;
  image: string;
  owner: Address;
  status: boolean;
  target: i128;
  title: string;
}

interface Web3PageProps {
  networkDetails: NetworkDetails;
  setPubKey: (pubKey: string) => void;
  swkKit: StellarWalletsKit;
  pubKey: string;
  campaigns: Campaign[];
  onPress?: (created: any) => void;
}

const Slider = (props: Web3PageProps) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    if (props?.campaigns) {
      setCampaigns(props?.campaigns);
    }
  }, [props]);
  // const getMoviesFromRange = (from: number, to: number) => {
  //   return movies.slice(from, to);
  // };

  return (
    <Container>
      <CardSlider
        networkDetails={props.networkDetails}
        setPubKey={props.setPubKey}
        swkKit={props.swkKit}
        pubKey={props.pubKey}
        data={campaigns}
        title="Trending Now"
        onPress={props.onPress}
      />
      {/* <CardSlider data={getMoviesFromRange(10, 30)} title="New Releases" />
      <CardSlider data={getMoviesFromRange(10, 30)} title="Blockbuster Movies" />
      <CardSlider data={getMoviesFromRange(10, 30)} title="Popular on Netflix" />
      <CardSlider data={getMoviesFromRange(10, 30)} title="Action Movies" />
      <CardSlider data={getMoviesFromRange(10, 30)} title="Epics" /> */}
    </Container>
  );
};

export default Slider;

const Container = styled.div`
  .title {
    font-family: Netflix Sans, Helvetica Neue, Segoe UI, Roboto, Ubuntu,
      sans-serif;
    display: table-cell;
    font-size: 1.4vw;
    line-height: 1.3;
    line-height: 1.25vw;
    font-weight: 500;
  }
`;

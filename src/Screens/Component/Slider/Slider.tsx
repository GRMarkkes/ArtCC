import { Campaign } from "../../../../types";
import CardSlider from "../CardNewSlider/CardNewSlider";
import { NetworkDetails } from "../../../helper/network";
import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit";
import styled from "styled-components";

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

interface CategoryData {
  category: string;
  data: Campaign[];
}

interface Web3PageProps {
  networkDetails: NetworkDetails;
  setPubKey: (pubKey: string) => void;
  swkKit: StellarWalletsKit;
  pubKey: string;
  // campaigns: Crowdfund.Campaign[];
  categoriesData: CategoryData[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPress?: (created: any) => void;
}

const Slider = (props: Web3PageProps) => {

  
  return (
    <Container>
      {props.categoriesData.map((categoryItem) => (
        <CardSlider
          key={categoryItem.category}
          networkDetails={props.networkDetails}
          setPubKey={props.setPubKey}
          swkKit={props.swkKit}
          pubKey={props.pubKey}
          data={categoryItem.data}
          title={categoryItem.category}
          onPress={props.onPress}
        />
      ))}
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

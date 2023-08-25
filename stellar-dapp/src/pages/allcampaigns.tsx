import { useEffect, useState } from "react";
import * as crowdFund from "CrowdFund";
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

type Campaign = {
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
};

const AllCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  // const [donators, setDonators] = useState<string[]>([]);

  async function getCampaings() {
    console.log("getCampaings");
    console.log("crowdFund.CONTRACT_ID", crowdFund.CONTRACT_ID);

    let data = await crowdFund.getCampaigns();

    setCampaigns(data);

    console.log(data);
  }

  // async function getDonators() {
  //   console.log("getDonators");

  //   let data = await crowdFund.getDonators({ id: 1 });
  //   setDonators(data.unwrap);

  //   console.log(data);
  // }

  useEffect(() => {
    console.log(crowdFund.CONTRACT_ID);
    getCampaings();
  });

  return (
    <div
      style={{
        // display: 'flex',
        justifyContent: "left",
        alignItems: "Right",
        height: "100vh",
        marginLeft: "100px",
      }}
    >
      <h1>All Campaigns</h1>
      {/* <button onClick={getCampaings}>Get All Campaings</button>
      <button onClick={getDonators}>Get Donators</button> */}
      <div>
        {campaigns.map((campaign) => (
          <div key={campaign.id}>
            <h2>ID: {campaign.id}</h2>
            <h2>Title: {campaign.title}</h2>
            <h4>Image URL: {campaign.image}</h4>
            <h4>Description: {campaign.description}</h4>
            <h4>Deadline: {campaign.deadline.toString()}</h4>
            <h4>Target: {campaign.target.toString()}</h4>
            <h4>Total donation: {campaign.donations.toString()}</h4>
            <h5>Donators: [ {campaign.donators} ]</h5>
            <h5>Owner: {campaign.owner}</h5>
            <h5>----------------------------------------------------------------------</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCampaigns;

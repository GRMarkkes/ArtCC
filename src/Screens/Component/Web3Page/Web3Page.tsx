import { NetworkDetails } from "../../../helper/network";
import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit";
import { useWallet } from "../../../hooks";

interface Web3PageProps {
  networkDetails: NetworkDetails;
  swkKit: StellarWalletsKit;
  pubKey: string;
}

const dataTransform = (data: string, key: string): string => {
  try {
    const dataObj = JSON.parse(data);

    return dataObj[key] || "";
  } catch (error) {
    return data;
  }
};
const Web3Page = (props: Web3PageProps) => {
  const {
    createCampaign,
    campaigns,
    tokenAddress,
    donateToCampaign,
  } = useWallet(props);
  async function create() {
    await createCampaign({
      title: "Hook Campaign",
      desc: "Hook to Food Campaign",
      category: "Hook Art",
      main_location: "lahore",
      metaData: "{}",
      imageUrl: "image url food",
      target: "5000",
    });
  }

  return (
    <div>
      <div style={{ marginBottom: "5%" }}>
        Connected Wallet Address: {props.pubKey}
      </div>
      <h3>Token Detail</h3>
      <h4>Token Name:</h4>
      <h4>Symbol:</h4>
      <h5>Token Contract Address: {tokenAddress}</h5>
      <h3>
        Balance: 
      </h3>
      <div>
        <h1>Create Campaign</h1>
        <button
          onClick={create}
          className="btn btn-primary"
          style={{ marginTop: "3%", marginBottom: "4%" }}
        >
          Create Campaign
        </button>
      </div>

      <div>
        <h1>Donate To Campaign</h1>
        <button
          onClick={() => {
            donateToCampaign(1, "125");
          }}
          className="btn btn-primary"
          style={{ marginTop: "3%", marginBottom: "4%" }}
        >
          Donate To Campaign
        </button>
      </div>

      <h1>All Campaigns</h1>
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
            <h5>Donators: [ {campaign.donators.toString()} ]</h5>
            <h5>Owner: {campaign.owner.toString()}</h5>
            <h5>Cateogry: {campaign.category.toString()}</h5>
            <h5>Date: {dataTransform(campaign.category, "category2")}</h5>
            <h5>
              Creater Name: {dataTransform(campaign.category, "category3")}
            </h5>
            <h5>
              ----------------------------------------------------------------------
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Web3Page;

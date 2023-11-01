import { Typography } from "@mui/material";
import CardMarketPlace from "../CardMarketPlace/CardMarketPlace";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationMarketPlace = () => {
  return (
    <div className="container-fluid">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "95%",
        }}
      >
        <Typography sx={{ marginLeft: "2%" }}>NEAR TO ME</Typography>
        <Stack spacing={2}>
          <Pagination count={5} shape="rounded" />
        </Stack>
      </div>
      <div style={{ display: "flex", marginTop: "2%" }}>
        <CardMarketPlace />
        <CardMarketPlace />
        <CardMarketPlace />
        <CardMarketPlace />
      </div>
    </div>
  );
};

export default PaginationMarketPlace;

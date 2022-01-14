import { Box, Grid, useTheme, Zoom } from "@material-ui/core";

import { useState } from "react";
import "./auction.scss";

import CommitmentsTable from "./CommitmentsTable";
import AuctionBanner from "./AuctionBanner";
import AuctionTitle from "./AuctionTitle";
import AuctionDetails from "./AuctionDetails";

const Auction = () => {
  const theme = useTheme();

  const [auctionStatus, setAuctionStatus] = useState("ongoing"); // ongoing || finished

  function createData(address, amountCommitted, claimable, txHash, blockNumber) {
    return {
      address,
      amountCommitted,
      claimable,
      txHash,
      blockNumber,
    };
  }

  const [account, setAccount] = useState("0x3DCa07E1…5451f885");

  const rows = [
    createData("0x3DCa07E1…5451f887", "160,000", "72", "0xef420356…233f91a4", "13771303"),
    createData("0xF5518925…C7dE4cCc", "200,000", "90", "0x7e984ed3…c2792c69", "13771304"),
    createData("0x3DCa07E1…5451f887", "160,000", "72", "0xef420356…233f91a4", "13771305"),
    createData("0xF5518925…C7dE4cCc", "200,000", "90", "0x7e984ed3…c2792c69", "13771306"),
    createData("0x3DCa07E1…5451f885", "160,000", "72", "0xef420356…233f91a4", "13771307"),
    createData("0xF5518925…C7dE4cCc", "200,000", "90", "0x7e984ed3…c2792c69", "13771308"),
    createData("0xF5518925…C7dE4cCc", "200,000", "90", "0x7e984ed3…c2792c69", "13771309"),
    createData("0x3DCa07E1…5451f885", "200,000", "90", "0x7e984ed3…c2792c69", "137713010"),
    createData("0xF5518925…C7dE4cCc", "200,000", "90", "0x7e984ed3…c2792c69", "137713011"),
    createData("0x3DCa07E1…5451f885", "200,000", "90", "0x7e984ed3…c2792c69", "137713012"),
  ];

  return (
    <div id="auction-view">
      <Zoom in={true}>
        <Box
          sx={{
            marginTop: theme.spacing(4),
            width: "80%",
          }}
        >
          <AuctionTitle />
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <AuctionBanner />
            </Grid>
            <Grid item xs={12} md={8}>
              <AuctionDetails auctionStatus={auctionStatus} />
            </Grid>
            <Grid item xs={12}>
              <CommitmentsTable rows={rows} account={account} />
            </Grid>
          </Grid>
        </Box>
      </Zoom>
    </div>
  );
};

export default Auction;

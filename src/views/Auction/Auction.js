import { Box, Grid, useTheme, Zoom } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BigNumber, ethers } from "ethers";

import { useWeb3Context } from "../../hooks/web3Context";
import { commitTokens, loadAuctionDetails, loadAllCommitments } from "../../slices/AuctionSlice";
import { error } from "../../slices/MessagesSlice";
import CommitmentsTable from "./CommitmentsTable";
import AuctionBanner from "./AuctionBanner";
import AuctionTitle from "./AuctionTitle";
import AuctionDetails from "./AuctionDetails";
import SkeletonLoader from "./SkeletonLoader";
import "./auction.scss";

function createData(address, amountCommitted, claimable, txHash, blockNumber) {
  return {
    address,
    amountCommitted,
    claimable,
    txHash,
    blockNumber,
  };
}

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

const Auction = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { provider, chainID, address } = useWeb3Context();

  const {
    tokenPrice,
    totalTokens,
    totalTokensCommitted,
    commitedFrax,
    auctionEnded,
    isOpen,
    startPrice,
    minimumPrice,
    startTime,
    endTime,
    commitments,
    myCommitments,
    loading,
    auctionToken,
  } = useSelector(state => state.auction);
  const isLoading = !startTime && !endTime; //
  const tokensClaimable = useSelector(state => state.account.auction && state.account.auction.tokensClaimable);
  const fraxBalance = useSelector(state => state.account?.balances?.frax);
  const auctionStatus = auctionEnded && !isOpen ? "finished" : !auctionEnded && !isOpen ? "notstarted" : "ongoing";

  useEffect(() => {
    dispatch(loadAllCommitments());
  }, []);

  useEffect(() => {
    if (auctionStatus === "nostarted") {
      // query auction data when it starts
      const msDiff = new Date(startTime * 1000).getTime() - new Date().getTime();
      setTimeout(() => {
        dispatch(loadAuctionDetails({ provider, networkID: chainID }));
      }, msDiff);
    }
  }, [auctionStatus]);

  const onCommitTokens = async quantity => {
    if (isNaN(quantity) || quantity === 0 || quantity === "") {
      return dispatch(error("Please enter a value!"));
    }

    const gweiValue = ethers.utils.parseUnits((Math.floor(quantity * 1000) / 1000).toString(), "gwei");
    if (gweiValue.gt(ethers.utils.parseUnits((Math.floor(fraxBalance * 1000) / 1000).toString(), "gwei"))) {
      return dispatch(error("You cannot commit more than your FRAX balance."));
    }

    await dispatch(commitTokens({ address, quantity: quantity, provider, networkID: chainID }));
  };

  return (
    <div id="auction-view">
      <Zoom in={true}>
        <Box
          sx={{
            marginTop: theme.spacing(4),
            width: "80%",
          }}
        >
          <AuctionTitle endTime={endTime} auctionStatus={auctionStatus} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <AuctionBanner auctionStatus={auctionStatus} tokenPrice={tokenPrice} auctionToken={auctionToken} />
            </Grid>
            <Grid item xs={12} md={8}>
              <AuctionDetails
                isLoading={isLoading}
                address={address}
                auctionStatus={auctionStatus}
                tokenPrice={tokenPrice}
                totalTokens={totalTokens}
                tokensClaimable={tokensClaimable}
                totalTokensCommitted={totalTokensCommitted}
                commitedFrax={commitedFrax}
                startPrice={startPrice}
                minimumPrice={minimumPrice}
                fraxBalance={fraxBalance}
                startTime={startTime}
                onCommitTokens={onCommitTokens}
              />
            </Grid>
            <Grid item xs={12}>
              <CommitmentsTable rows={rows} account={address} />
            </Grid>
          </Grid>
        </Box>
      </Zoom>
    </div>
  );
};

export default Auction;

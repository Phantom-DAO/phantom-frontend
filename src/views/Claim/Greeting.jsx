import { Box, Grid, Paper, Typography, Button } from "@material-ui/core";
import { useWeb3Context } from "src/hooks/web3Context";
import { useState } from "react";
import { ReactComponent as CheckGold } from "../../assets/icons/check-gold.svg";

import LoaderButton from "./LoaderButton";
import "./claim.scss";

const Greeting = ({ isMobileScreen }) => {
  return (
    <Paper className="claim-card">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CheckGold />
        <Typography variant="h3" style={{ marginTop: "16px", fontWeight: 600 }}>
          Successfully claimed
        </Typography>
        <Typography variant="subtitle1" style={{ marginTop: "10px" }} color="textSecondary">
          THANKS FOR BEING PART OF THE PHAMILY
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: isMobileScreen ? "column" : "row",
            justifyContent: "space-between",
            marginTop: "24px",
            gap: "24px",
            overflow: "hidden",
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            style={{
              fontSize: "16px",
            }}
          >
            Swap fPHM for gPHM
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            style={{
              fontSize: "16px",
            }}
          >
            Add fPHM to wallet
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Greeting;

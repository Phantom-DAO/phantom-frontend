import { Box, Grid, Paper, Typography, Zoom, SvgIcon } from "@material-ui/core";
import "./claim.scss";

// for wallet access see const in swap function
import { useWeb3Context } from "src/hooks/web3Context";

// maintain state for some settings
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Skeleton } from "@material-ui/lab";
import { getOhmTokenImage, getTokenImage, trim } from "../../helpers";

// TODO: 1 Implementation
// add getimage to ./helpers/index.tsx
//const aPHMImg = getaPHMTokenImage("");
//const fPHMImg = getfPHMTokenImage("");

function Claim() {
  const { provider, address, connected, connect, chainID } = useWeb3Context();
  const [zoomed, setZoomed] = useState(false);
  const [view, setView] = useState(0);
  const [quantity, setQuantity] = useState("");
  const isAppLoading = useSelector(state => state.app.loading);

  const ohmBalance = useSelector(state => {
    return state.account.balances && state.account.balances.ohm;
  });
  const sohmBalance = useSelector(state => {
    return state.account.balances && state.account.balances.sohm;
  });

  return (
    <div id="claim-view">
      <Zoom in={true}>
        <Paper className={`claim-card`}>
          <Grid container direction="column" spacing={7}>
            <Grid item>
              <Box className="claim-header">
                <Typography variant="h1">Phantom</Typography>
                <Typography variant="h5">Claim your whitelist allocation</Typography>
              </Box>
            </Grid>
            <Grid item>
              <div className="claim">
                <Grid container spacing={2} alignItems="flex-end">
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <div className="claim-balance">
                      <Typography variant="h5">YOUR ALLOCATION</Typography>
                      <Typography variant="h4">
                        {isAppLoading ? <Skeleton width="80px" /> : <>{trim(ohmBalance, 4)} OHM</>}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <div className="claim-button">
                      <Typography variant="h4">button</Typography>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Zoom>
    </div>
  );
}

export default Claim;

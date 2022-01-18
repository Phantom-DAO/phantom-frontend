import { Box, Grid, Paper, Typography, Zoom, SvgIcon } from "@material-ui/core";
import "./swap.scss";

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

function Swap() {
  const { provider, address, connected, connect, chainID } = useWeb3Context();
  const [zoomed, setZoomed] = useState(false);
  const [view, setView] = useState(0);
  const [quantity, setQuantity] = useState("");
  const isAppLoading = useSelector(state => state.app.loading);

  const aphmBalance = useSelector(state => {
    return state.account.balances && state.account.balances.aphm;
  });
  const fphmBalance = useSelector(state => {
    return state.account.balances && state.account.balances.fphm;
  });

  return (
    <div id="swap-view">
      <Zoom in={true}>
        <Paper className={`swap-card`}>
          <Grid container direction="column" spacing={7}>
            <Grid item>
              <Box className="swap-header">
                <Typography variant="h3">Swap tokens</Typography>
                <Typography variant="h5">Swap your aPHM or fPHM tokens</Typography>
              </Box>
            </Grid>
            <Grid item>
              <div className="swap">
                <Grid container spacing={2} alignItems="flex-end">
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <div className="swap-tokens">
                      <Typography variant="h5">SWAP</Typography>
                      <Typography variant="h4">image aPHM to PHM</Typography>
                      <Typography variant="h4">image fPHM to PHM</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <div className="swap-balance">
                      <Typography variant="h5">BALANCE</Typography>
                      <Typography variant="h4">
                        {isAppLoading ? <Skeleton width="80px" /> : <>{trim(aphmBalance, 4)} OHM</>}
                      </Typography>
                      <Typography variant="h4">
                        {isAppLoading ? <Skeleton width="80px" /> : <>{trim(fphmBalance, 4)} sOHM</>}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <div className="swap-unlocked">
                      <Typography variant="h5">UNLOCKED</Typography>
                      <Typography variant="h4">
                        {isAppLoading ? <Skeleton width="80px" /> : <>{trim(aphmBalance, 4)} OHM</>}
                      </Typography>
                      <Typography variant="h4">
                        {isAppLoading ? <Skeleton width="80px" /> : <>{trim(fphmBalance, 4)} sOHM</>}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <div className="swap-button">
                      <Typography variant="h4">button</Typography>
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

export default Swap;

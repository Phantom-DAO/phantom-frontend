// Start of imports
// stake.jsx is template
// core import not all libs in use
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Paper,
  Tab,
  Tabs,
  Typography,
  Zoom,
  Divider,
  SvgIcon,
} from "@material-ui/core";

// css formatting
import "./claim.scss";

// for wallet access see const in swap function
import { useWeb3Context } from "src/hooks/web3Context";
//import { ethers } from "ethers";

// use connect button from library
import ConnectButton from "src/components/ConnectButton";

// maintain state for some settings
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { Skeleton } from "@material-ui/lab";

// get images (svg)
// use trim on balance in return
import { getOhmTokenImage, getTokenImage, trim } from "../../helpers";

// end of imports

// TODO: 1 Implementation
// add getimage to ./helpers/index.tsx
//const aPHMImg = getaPHMTokenImage("");
//const fPHMImg = getfPHMTokenImage("");

// start claim code
function Claim() {
  // set constants
  // get wallet values from web3context
  const { provider, address, connected, chainID } = useWeb3Context();
  const wConnect = ConnectButton();
  // not implemented in this page (yet)
  //const [zoomed, setZoomed] = useState(false);
  //const [view, setView] = useState(0);
  //const [quantity, setQuantity] = useState("");

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
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Box className="claim-header">
                <Typography variant="h1">Phantom</Typography>
                <Typography variant="h5">Claim your whitelist allocation</Typography>
              </Box>
            </Grid>
            <Grid item>
              <div className="claim">
                {!address ? (
                  <div className="claim-wallet-notification">
                    <div className="wallet-menu" id="wallet-menu">
                      {wConnect}
                    </div>
                    <Typography variant="h5">Connect your wallet to stake</Typography>
                  </div>
                ) : (
                  <Grid container spacing={2} direction="row" alignItems="flex-end">
                    <Grid item xs={4} sm={1} md={1} lg={1}>
                      <div className="claim-balance">
                        <Typography variant="h5">YOUR ALLOCATION</Typography>
                        <Typography variant="h4">
                          {isAppLoading ? <Skeleton width="80px" /> : <>{trim(ohmBalance, 4)} OHM</>}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={4} sm={1} md={1} lg={1}>
                      <div className="claim-menu">
                        <Typography variant="h4">
                          <Button variant="contained" color="primary" className="claim-button" onClick="">
                            Connect Wallet
                          </Button>
                        </Typography>
                      </div>
                    </Grid>
                  </Grid>
                )}
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Zoom>
    </div>
  );
}

export default Claim;

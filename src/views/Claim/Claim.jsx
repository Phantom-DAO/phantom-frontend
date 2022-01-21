import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import NewReleases from "@material-ui/icons/NewReleases";
import RebaseTimer from "../../components/RebaseTimer/RebaseTimer";
import TabPanel from "../../components/TabPanel";
import { getOhmTokenImage, getTokenImage, trim } from "../../helpers";
import { changeApproval, changeStake } from "../../slices/StakeThunk";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useWeb3Context } from "src/hooks/web3Context";
import { isPendingTxn, txnButtonText } from "src/slices/PendingTxnsSlice";
import { Skeleton } from "@material-ui/lab";
import { error } from "../../slices/MessagesSlice";
import { ethers } from "ethers";
import { ReactComponent as WavesLeft } from "../../assets/icons/waves-left.svg";
import { ReactComponent as WavesRight } from "../../assets/icons/waves-right.svg";
import "./claim.scss";

function Claim() {
  const { provider, address, connect, connected, chainID } = useWeb3Context();
  const isAppLoading = useSelector(state => state.app.loading);
  const ohmBalance = useSelector(state => {
    return state.account.balances && state.account.balances.ohm;
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
                      Connect
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

import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Grid, Paper, Typography, Zoom, Divider, SvgIcon } from "@material-ui/core";

import { changeApproval, changeStake } from "../../slices/StakeThunk";
import "./whitelist.scss";
import { useWeb3Context } from "src/hooks/web3Context";
import { isPendingTxn, txnButtonText } from "src/slices/PendingTxnsSlice";
import { Skeleton } from "@material-ui/lab";
import { error } from "../../slices/MessagesSlice";
import { ethers } from "ethers";
import { ReactComponent as WavesLeft } from "../../assets/icons/waves-left.svg";
import { ReactComponent as WavesRight } from "../../assets/icons/waves-right.svg";

function Whitelist() {
  const dispatch = useDispatch();
  const { provider, address, connected, connect, chainID } = useWeb3Context();

  const [zoomed, setZoomed] = useState(false);
  const [view, setView] = useState(0);

  const isAppLoading = useSelector(state => state.app.loading);

  const ohmBalance = useSelector(state => {
    return state.account.balances && state.account.balances.ohm;
  });
  const pendingTransactions = useSelector(state => {
    return state.pendingTransactions;
  });
  const stakeAllowance = useSelector(state => {
    return state.account.staking && state.account.staking.ohmStake;
  });

  const onSeekApproval = async token => {
    await dispatch(changeApproval({ address, token, provider, networkID: chainID }));
  };

  const onChangeStake = async action => {
    // 1st catch if quantity > balance
    let gweiValue = ethers.utils.parseUnits(quantity, "gwei");
    if (action === "stake" && gweiValue.gt(ethers.utils.parseUnits(ohmBalance, "gwei"))) {
      return dispatch(error("You cannot stake more than your OHM balance."));
    }

    await dispatch(changeStake({ address, action, value: quantity.toString(), provider, networkID: chainID }));
  };

  const hasAllowance = useCallback(
    token => {
      if (token === "ohm") return stakeAllowance > 0;
      return 0;
    },
    [stakeAllowance],
  );

  const isAllowanceDataLoading = stakeAllowance == null;

  let claimButton = [];

  claimButton.push(
    <Button variant="contained" color="primary" className="connect-button" onClick={connect} key={1}>
      Connect Wallet
    </Button>,
  );

  return (
    <div id="claim-view">
      <Zoom in={true} onEntered={() => setZoomed(true)}>
        <Paper className={`ohm-card`}>
          <Grid container direction="column" spacing={7}>
            <Grid item>
              <Box className="card-header">
                <Typography variant="h5">Whitelist Claim</Typography>
              </Box>
            </Grid>
            <Grid item>
              {!address ? (
                <div className="whitelist-info">
                  <Typography variant="h6">
                    Connect your wallet to claim <strong>fPHM</strong>.
                  </Typography>
                </div>
              ) : (
                <div className={`claim-user-data`}>
                  <div className="data-row">
                    <Typography variant="subtitle1">
                      Eligible to claim <strong>fPHM</strong>
                    </Typography>
                    <Typography variant="subtitle1">
                      {isAppLoading ? <Skeleton width="80px" /> : <>{true ? "YES" : "NO"}</>}
                    </Typography>
                  </div>
                  <Divider color="secondary" />
                  <div className="data-row">
                    <Typography variant="body1">Claimable amount</Typography>
                    <Typography variant="body1">{isAppLoading ? <Skeleton width="80px" /> : <>2 fPHM</>}</Typography>
                  </div>
                  <div className="data-row">
                    <Typography variant="body1">Claimed amount</Typography>
                    <Typography variant="body1">{isAppLoading ? <Skeleton width="80px" /> : <>2 fPHM</>}</Typography>
                  </div>
                </div>
              )}
            </Grid>

            <div className="staking-area">
              {!address ? (
                <div className="stake-wallet-notification">
                  <div className="wallet-menu" id="wallet-menu">
                    {claimButton}
                  </div>
                </div>
              ) : (
                <div className="stake-wallet-notification">
                  <div className="wallet-menu" id="wallet-menu">
                    <Button
                      variant="contained"
                      color="primary"
                      className="connect-button"
                      disabled={isPendingTxn(pendingTransactions, "approve_staking")}
                      onClick={() => {
                        onSeekApproval("ohm");
                      }}
                    >
                      {txnButtonText(pendingTransactions, "approve_staking", "Claim")}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Grid>
          <div className="waves-left">
            <SvgIcon
              style={{ minHeight: 105, minWidth: 200 }}
              htmlColor="black"
              component={WavesLeft}
              viewBox="0 0 248 105"
            />
          </div>
          <div className="waves-right">
            <SvgIcon
              style={{ minHeight: 105, minWidth: 200 }}
              htmlColor="black"
              component={WavesRight}
              viewBox="0 0 248 105"
            />
          </div>
        </Paper>
      </Zoom>
    </div>
  );
}

export default Whitelist;

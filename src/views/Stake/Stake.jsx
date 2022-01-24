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
import "./stake.scss";
import { useWeb3Context } from "src/hooks/web3Context";
import { isPendingTxn, txnButtonText } from "src/slices/PendingTxnsSlice";
import { Skeleton } from "@material-ui/lab";
import { error } from "../../slices/MessagesSlice";
import { ethers } from "ethers";
import { ReactComponent as WavesLeft } from "../../assets/icons/waves-left.svg";
import { ReactComponent as WavesRight } from "../../assets/icons/waves-right.svg";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const sOhmImg = getTokenImage("sohm");
const ohmImg = getOhmTokenImage(16, 16);

function Stake() {
  const dispatch = useDispatch();
  const { provider, address, connected, connect, chainID } = useWeb3Context();

  const [zoomed, setZoomed] = useState(false);
  const [view, setView] = useState(0);
  const [quantity, setQuantity] = useState("");

  const isAppLoading = useSelector(state => state.app.loading);
  const currentIndex = useSelector(state => {
    return state.app.currentIndex;
  });
  const fiveDayRate = useSelector(state => {
    return state.app.fiveDayRate;
  });
  const ohmBalance = useSelector(state => {
    return state.account.balances && state.account.balances.ohm;
  });
  const oldSohmBalance = useSelector(state => {
    return state.account.balances && state.account.balances.oldsohm;
  });
  const sohmBalance = useSelector(state => {
    return state.account.balances && state.account.balances.sohm;
  });
  const fsohmBalance = useSelector(state => {
    return state.account.balances && state.account.balances.fsohm;
  });
  const wsohmBalance = useSelector(state => {
    return state.account.balances && state.account.balances.wsohm;
  });
  const wsohmAsSohm = useSelector(state => {
    return state.account.balances && state.account.balances.wsohmAsSohm;
  });
  const stakeAllowance = useSelector(state => {
    return state.account.staking && state.account.staking.ohmStake;
  });
  const unstakeAllowance = useSelector(state => {
    return state.account.staking && state.account.staking.ohmUnstake;
  });
  const stakingRebase = useSelector(state => {
    return state.app.stakingRebase;
  });
  const stakingAPY = useSelector(state => {
    return state.app.stakingAPY;
  });
  const stakingTVL = useSelector(state => {
    return state.app.stakingTVL;
  });

  const pendingTransactions = useSelector(state => {
    return state.pendingTransactions;
  });

  const setMax = () => {
    if (view === 0) {
      setQuantity(ohmBalance);
    } else {
      setQuantity(sohmBalance);
    }
  };

  const onSeekApproval = async token => {
    await dispatch(changeApproval({ address, token, provider, networkID: chainID }));
  };

  const onChangeStake = async action => {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(quantity) || quantity === 0 || quantity === "") {
      // eslint-disable-next-line no-alert
      return dispatch(error("Please enter a value!"));
    }

    // 1st catch if quantity > balance
    let gweiValue = ethers.utils.parseUnits(quantity, "gwei");
    if (action === "stake" && gweiValue.gt(ethers.utils.parseUnits(ohmBalance, "gwei"))) {
      return dispatch(error("You cannot stake more than your PHM balance."));
    }

    if (action === "unstake" && gweiValue.gt(ethers.utils.parseUnits(sohmBalance, "gwei"))) {
      return dispatch(error("You cannot unstake more than your sPHM balance."));
    }

    await dispatch(changeStake({ address, action, value: quantity.toString(), provider, networkID: chainID }));
  };

  const hasAllowance = useCallback(
    token => {
      if (token === "phm") return stakeAllowance > 0;
      if (token === "sphm") return unstakeAllowance > 0;
      return 0;
    },
    [stakeAllowance, unstakeAllowance],
  );

  const isAllowanceDataLoading = (stakeAllowance == null && view === 0) || (unstakeAllowance == null && view === 1);

  let modalButton = [];

  modalButton.push(
    <Button variant="contained" color="primary" className="connect-button" onClick={connect} key={1}>
      Connect Wallet
    </Button>,
  );

  const changeView = (event, newView) => {
    setView(newView);
  };

  const trimmedBalance = Number(
    [sohmBalance, fsohmBalance, wsohmAsSohm]
      .filter(Boolean)
      .map(balance => Number(balance))
      .reduce((a, b) => a + b, 0)
      .toFixed(4),
  );
  const trimmedStakingAPY = trim(stakingAPY * 100, 1);
  const stakingRebasePercentage = trim(stakingRebase * 100, 4);
  const nextRewardValue = trim((stakingRebasePercentage / 100) * trimmedBalance, 4);

  return (
    <div id="stake-view">
      <Zoom in={true} onEntered={() => setZoomed(true)}>
        <Paper className={`ohm-card`}>
          <Grid container direction="column" spacing={7}>
            <Grid item>
              <Box className="card-header">
                <Typography variant="h5">Single Stake (3, 3)</Typography>
                {/* <RebaseTimer /> */}
                {/* {address && oldSohmBalance > 0.01} */}
              </Box>
            </Grid>
            <Grid item>
              <div className="stake-top-metrics">
                <Grid container spacing={2} alignItems="flex-end">
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <div className="stake-apy">
                      <Typography variant="h5" color="textSecondary">
                        APY
                      </Typography>
                      <Typography variant="h4">
                        {stakingAPY ? (
                          <>{new Intl.NumberFormat("en-US").format(trimmedStakingAPY)}%</>
                        ) : (
                          <Skeleton width="150px" />
                        )}
                      </Typography>
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <div className="stake-tvl">
                      <Typography variant="h5" color="textSecondary">
                        Total Value Deposited
                      </Typography>
                      <Typography variant="h4">
                        {stakingTVL ? (
                          new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            maximumFractionDigits: 0,
                            minimumFractionDigits: 0,
                          }).format(stakingTVL)
                        ) : (
                          <Skeleton width="150px" />
                        )}
                      </Typography>
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <div className="stake-index">
                      <Typography variant="h5" color="textSecondary">
                        Current Index
                      </Typography>
                      <Typography variant="h4">
                        {currentIndex ? <>{trim(currentIndex, 1)} OHM</> : <Skeleton width="150px" />}
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>

            <div className="staking-area">
              {!address ? (
                <div className="stake-wallet-notification">
                  <div className="wallet-menu" id="wallet-menu">
                    {modalButton}
                  </div>
                  <Typography variant="h6">Connect your wallet to stake OHM</Typography>
                </div>
              ) : (
                <>
                  <Box className="stake-action-area">
                    <Tabs
                      key={String(zoomed)}
                      centered
                      value={view}
                      textColor="primary"
                      indicatorColor="primary"
                      className="stake-tab-buttons"
                      onChange={changeView}
                      aria-label="stake tabs"
                      //hides the tab underline sliding animation in while <Zoom> is loading
                      TabIndicatorProps={!zoomed && { style: { display: "none" } }}
                    >
                      <Tab label="Stake" {...a11yProps(0)} />
                      <Tab label="Unstake" {...a11yProps(1)} />
                    </Tabs>

                    <Box className="stake-action-row " display="flex" alignItems="center">
                      {address && !isAllowanceDataLoading ? (
                        (!hasAllowance("ohm") && view === 0) || (!hasAllowance("sohm") && view === 1) ? (
                          <Box className="help-text">
                            <Typography variant="body1" className="stake-note" color="textSecondary">
                              {view === 0 ? (
                                <>
                                  First time staking <b>OHM</b>?
                                  <br />
                                  Please approve Phantom Dao to use your <b>OHM</b> for staking.
                                </>
                              ) : (
                                <>
                                  First time unstaking <b>sOHM</b>?
                                  <br />
                                  Please approve Phantom Dao to use your <b>sOHM</b> for unstaking.
                                </>
                              )}
                            </Typography>
                          </Box>
                        ) : (
                          <FormControl className="ohm-input" variant="outlined" color="primary">
                            <InputLabel htmlFor="amount-input"></InputLabel>
                            <OutlinedInput
                              id="amount-input"
                              type="number"
                              placeholder="Enter an amount"
                              className="stake-input"
                              value={quantity}
                              onChange={e => setQuantity(e.target.value)}
                              labelWidth={0}
                              endAdornment={
                                <InputAdornment position="end">
                                  <Button variant="text" onClick={setMax} color="inherit">
                                    MAX
                                  </Button>
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        )
                      ) : (
                        <Skeleton width="150px" />
                      )}
                    </Box>
                  </Box>
                  <Box className="stake-action-row " display="flex" alignItems="center">
                    <TabPanel value={view} index={0} className="stake-tab-panel">
                      {isAllowanceDataLoading ? (
                        <Skeleton />
                      ) : address && hasAllowance("ohm") ? (
                        <Button
                          className="stake-button"
                          variant="contained"
                          color="primary"
                          disabled={isPendingTxn(pendingTransactions, "staking")}
                          onClick={() => {
                            onChangeStake("stake");
                          }}
                        >
                          {txnButtonText(pendingTransactions, "staking", "Stake OHM")}
                        </Button>
                      ) : (
                        <Button
                          className="stake-button"
                          variant="contained"
                          color="primary"
                          disabled={isPendingTxn(pendingTransactions, "approve_staking")}
                          onClick={() => {
                            onSeekApproval("ohm");
                          }}
                        >
                          {txnButtonText(pendingTransactions, "approve_staking", "Approve")}
                        </Button>
                      )}
                    </TabPanel>
                    <TabPanel value={view} index={1} className="stake-tab-panel">
                      {isAllowanceDataLoading ? (
                        <Skeleton />
                      ) : address && hasAllowance("sohm") ? (
                        <Button
                          className="stake-button"
                          variant="contained"
                          color="primary"
                          disabled={isPendingTxn(pendingTransactions, "unstaking")}
                          onClick={() => {
                            onChangeStake("unstake");
                          }}
                        >
                          {txnButtonText(pendingTransactions, "unstaking", "Unstake OHM")}
                        </Button>
                      ) : (
                        <Button
                          className="stake-button"
                          variant="contained"
                          color="primary"
                          disabled={isPendingTxn(pendingTransactions, "approve_unstaking")}
                          onClick={() => {
                            onSeekApproval("sohm");
                          }}
                        >
                          {txnButtonText(pendingTransactions, "approve_unstaking", "Approve")}
                        </Button>
                      )}
                    </TabPanel>
                  </Box>
                  <div className={`stake-user-data`}>
                    <div className="data-row">
                      <Typography variant="body1">Unstaked Balance</Typography>
                      <Typography variant="body1">
                        {isAppLoading ? <Skeleton width="80px" /> : <>{trim(ohmBalance, 4)} OHM</>}
                      </Typography>
                    </div>

                    <div className="data-row">
                      <Typography variant="body1">Staked Balance</Typography>
                      <Typography variant="body1">
                        {isAppLoading ? <Skeleton width="80px" /> : <>{trimmedBalance} sOHM</>}
                      </Typography>
                    </div>

                    <div className="data-row" style={{ paddingLeft: "10px" }}>
                      <Typography variant="body2" color="textSecondary">
                        Single Staking
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {isAppLoading ? <Skeleton width="80px" /> : <>{trim(sohmBalance, 4)} sOHM</>}
                      </Typography>
                    </div>

                    <div className="data-row" style={{ paddingLeft: "10px" }}>
                      <Typography variant="body2" color="textSecondary">
                        Staked Balance in Fuse
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {isAppLoading ? <Skeleton width="80px" /> : <>{trim(fsohmBalance, 4)} fsOHM</>}
                      </Typography>
                    </div>

                    <div className="data-row" style={{ paddingLeft: "10px" }}>
                      <Typography variant="body2" color="textSecondary">
                        Wrapped Balance
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {isAppLoading ? <Skeleton width="80px" /> : <>{trim(wsohmBalance, 4)} wsOHM</>}
                      </Typography>
                    </div>

                    <Divider color="secondary" />

                    <div className="data-row">
                      <Typography variant="subtitle1">Next Reward Amount</Typography>
                      <Typography variant="subtitle1">
                        {isAppLoading ? <Skeleton width="80px" /> : <>{nextRewardValue} sOHM</>}
                      </Typography>
                    </div>

                    <div className="data-row">
                      <Typography variant="subtitle1">Next Reward Yield</Typography>
                      <Typography variant="subtitle1">
                        {isAppLoading ? <Skeleton width="80px" /> : <>{stakingRebasePercentage}%</>}
                      </Typography>
                    </div>
                    <div className="data-row">
                      <Typography variant="subtitle1">ROI (5-Day Rate)</Typography>
                      <Typography variant="subtitle1">
                        {isAppLoading ? <Skeleton width="80px" /> : <>{trim(fiveDayRate * 100, 4)}%</>}
                      </Typography>
                    </div>
                  </div>
                </>
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

export default Stake;

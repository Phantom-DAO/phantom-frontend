import {
  useTheme,
  Button,
  Zoom,
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  TabIndicatorProps,
  TextField,
  SvgIcon,
  useMediaQuery,
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useWeb3Context } from "../../hooks/web3Context";
import { wrapSPHM, unwrapGPHM, approveSPHM, approveGPHM } from "../../slices/WrapSlice";
import { error } from "../../slices/MessagesSlice";
import { ReactComponent as WavesLeft } from "../../assets/icons/waves-left.svg";
import { ReactComponent as WavesRight } from "../../assets/icons/waves-right.svg";
import { ReactComponent as SPHM } from "../../assets/icons/sPHM.svg";
import { ReactComponent as GPHM } from "../../assets/icons/gPHM.svg";
import "./wrap.scss";

const Wrap = () => {
  const theme = useTheme();
  const isMobileScreen = useMediaQuery("(max-width: 700px)");
  // tab bar
  const [value, setValue] = useState(0);
  const [inputValue, setInputValue] = useState(0);
  const handleChange = newValue => {
    setValue(newValue);
  };
  const dispatch = useDispatch();
  const { provider, chainID, address } = useWeb3Context();
  // controlled sPHM input
  const [wrapValue, setWrapValue] = useState(0);
  // controlled gPHM input
  const [unwrapValue, setUnwrapValue] = useState(0);
  const { wrapLoading, unwrapLoading, sPHMApprovalLoading, gPHMApprovalLoading } = useSelector(state => state.wrap);
  const { sPHM: sPHMBalance, gPHM: gPHMBalance } = useSelector(state => state.account && state.account.balances);
  const { wrapAllowance, unwrapAllowance } = useSelector(state => state.account && state.account.wrapping);
  const needsSPHMApproval = sPHMBalance > wrapAllowance;
  const needsGPHMApproval = gPHMBalance > unwrapAllowance;
  const { currentIndex } = useSelector(state => state.app);

  const handleApproveSPHM = () => {
    dispatch(approveSPHM({ provider, networkID: chainID, address, value: sPHMBalance }));
  };

  const handleApproveGPHM = () => {
    dispatch(approveGPHM({ provider, networkID: chainID, address, value: gPHMBalance }));
  };

  const handleWrapSPHM = async () => {
    if (isNaN(wrapValue) || wrapValue === 0 || wrapValue === "") {
      return dispatch(error("Please enter a value!"));
    }

    if (wrapValue > sPHMBalance) {
      return dispatch(error("You cannot wrap more than your sPHM balance."));
    }

    await dispatch(wrapSPHM({ address, provider, networkID: chainID, value: wrapValue }));
  };

  const handleUnwrapGPHM = async () => {
    if (isNaN(wrapValue) || wrapValue === 0 || wrapValue === "") {
      return dispatch(error("Please enter a value!"));
    }

    if (wrapValue > sPHMBalance) {
      return dispatch(error("You cannot wrap more than your sPHM balance."));
    }

    await dispatch(unwrapGPHM({ address, provider, networkID: chainID, value: wrapValue }));
  };

  // @todo: add loaders to 'Pending...' buttons
  return (
    // <div>
    //   {needsSPHMApproval ? (
    //     <Button onClick={handleApproveSPHM} disabled={sPHMBalance === 0}>
    //       {sPHMApprovalLoading ? "Pending..." : "Approve"}
    //     </Button>
    //   ) : (
    //     <Button onClick={handleWrapSPHM} disabled={sPHMBalance === 0}>
    //       {wrapLoading ? "Pending..." : "Wrap"}
    //     </Button>
    //   )}

    //   {needsGPHMApproval ? (
    //     <Button onClick={handleApproveGPHM} disabled={gPHMBalance === 0}>
    //       {gPHMApprovalLoading ? "Pending..." : "Approve"}
    //     </Button>
    //   ) : (
    //     <Button onClick={handleUnwrapGPHM} disabled={gPHMBalance === 0}>
    //       {unwrapLoading ? "Pending..." : "Unwrap"}
    //     </Button>
    //   )}
    // </div>
    <div id="swap-view">
      <Zoom in={true}>
        <Box
          sx={{
            marginTop: theme.spacing(4),
            width: "80%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              marginBottom: "24px",
            }}
          >
            <Box>
              <Typography variant="h3" color="textPrimary" style={{ fontWeight: "bold", marginBottom: "4px" }}>
                Wrap/unwrap to gPHM
              </Typography>
              <Typography variant="h6" color="textSecondary">
                Wrap your staked PHM to gPHM to enable participation in governance
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              marginBottom: theme.spacing(2),
            }}
          >
            <Paper className="swap-card">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    paddingTop: theme.spacing(3),
                    marginBottom: theme.spacing(2),
                    borderBottom: "1px solid #707070",
                    cursor: "pointer",
                  }}
                >
                  <Box
                    className={value === 0 ? "active-tab" : ""}
                    sx={{ width: "50%", padding: "0px 16px" }}
                    onClick={() => handleChange(0)}
                  >
                    <Typography variant="h6" color="textPrimary">
                      Wrap
                    </Typography>
                  </Box>
                  <Box
                    className={value === 1 ? "active-tab" : ""}
                    sx={{ width: "50%", padding: "0px 16px" }}
                    onClick={() => handleChange(1)}
                  >
                    <Typography variant="h6" color="textPrimary">
                      Unwrap
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    margin: theme.spacing(1),
                  }}
                >
                  <Box
                    sx={{
                      width: "30%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: theme.spacing(1),
                      borderRadius: "28px 0px 0px 28px",
                      backgroundColor: "rgba(255, 255, 255, 0.09);",
                    }}
                  >
                    {value === 0 ? <SPHM /> : <GPHM />}
                    <Typography style={{ marginLeft: "5px" }} variant="h6">
                      {value === 0 ? "sPHM" : "gPHM"}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "70%",
                      // minWidth: "300px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: theme.spacing(1),
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "0px 28px 28px 0px",
                      "& .MuiInput-underline::before, & .MuiInput-underline::after": {
                        visibility: "hidden",
                        content: "",
                        display: "none",
                      },
                    }}
                  >
                    <Box
                      component={TextField}
                      type="number"
                      value={inputValue}
                      onChange={e => {
                        // need numeric check
                        setInputValue(e.target.value);
                      }}
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{
                        backgroundColor: "#161429",
                        borderRadius: "10px",
                        padding: "2px 10px",
                        margin: "2px 10px",
                        height: "auto",
                        width: "auto",
                        fontSize: "14px",
                        color: "white",
                      }}
                    >
                      MAX
                    </Button>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "90%",
                    margin: theme.spacing(1),
                  }}
                >
                  <Typography variant="p" color="textPrimary">
                    Based on the current index of 3.33 you’ll receive 1001 gPHM
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "90%",
                    margin: theme.spacing(2),
                  }}
                >
                  {!isMobileScreen ? (
                    <Button
                      variant="contained"
                      color="primary"
                      size="medium"
                      style={{
                        fontSize: "16px",
                        minWidth: "100px",
                      }}
                    >
                      {value === 0 ? "Wrap" : "Unwrap"}
                    </Button>
                  ) : (
                    <Button variant="contained" color="primary" style={{ width: "100%" }} size="small">
                      {value === 0 ? "Wrap" : "Unwrap"}
                    </Button>
                  )}
                </Box>
              </Box>
              {isMobileScreen ? (
                <></>
              ) : (
                <>
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
                </>
              )}
            </Paper>
          </Box>
        </Box>
      </Zoom>
    </div>
  );
};

export default Wrap;

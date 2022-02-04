import {
  useTheme,
  Button,
  Zoom,
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  CircularProgress,
  TextField,
  SvgIcon,
  useMediaQuery,
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";

import { useWeb3Context } from "../../hooks/web3Context";
import { wrapSPHM, unwrapGPHM, approveSPHM, approveGPHM } from "../../slices/WrapSlice";
import { error } from "../../slices/MessagesSlice";
import { ReactComponent as WavesLeft } from "../../assets/icons/waves-left.svg";
import { ReactComponent as WavesRight } from "../../assets/icons/waves-right.svg";
import { ReactComponent as SPHM } from "../../assets/icons/sPHM.svg";
import { ReactComponent as GPHM } from "../../assets/icons/gPHM.svg";
import { trim } from "../../helpers";
import "./wrap.scss";
import ConnectButton from "src/components/ConnectButton";

const Wrap = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobileScreen = useMediaQuery("(max-width: 700px)");
  const [activeToken, setActiveToken] = useState(0);
  const { provider, chainID, address, connected } = useWeb3Context();
  const [wrapValue, setWrapValue] = useState(0);
  const [unwrapValue, setUnwrapValue] = useState(0);

  const { currentIndex } = useSelector(state => state.app);
  const { wrapLoading, unwrapLoading, sPHMApprovalLoading, gPHMApprovalLoading } = useSelector(state => state.wrap);
  const { sPHM: sPHMBalance, gPHM: gPHMBalance } = useSelector(state => state.account && state.account.balances);
  const { wrapAllowance, unwrapAllowance } = useSelector(state => state.account && state.account.wrapping);
  const needsSPHMApproval = Number(sPHMBalance) > Number(wrapAllowance) && Number(sPHMBalance) > 0;
  const needsGPHMApproval = Number(gPHMBalance) > Number(unwrapAllowance) && Number(gPHMBalance) > 0;

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

    if (
      ethers.utils.parseUnits(wrapValue.toString(), "ether").gt(ethers.utils.parseUnits(sPHMBalance.toString(), "gwei"))
    ) {
      return dispatch(error("You cannot wrap more than your sPHM balance."));
    }

    const result = await dispatch(wrapSPHM({ address, provider, networkID: chainID, value: wrapValue })).unwrap();
    if (!result?.error) {
      setWrapValue(0);
    }
  };

  const handleUnwrapGPHM = async () => {
    if (isNaN(unwrapValue) || unwrapValue === 0 || unwrapValue === "") {
      return dispatch(error("Please enter a value!"));
    }

    if (
      ethers.utils
        .parseUnits(unwrapValue.toString(), "ether")
        .gt(ethers.utils.parseUnits(gPHMBalance.toString(), "gwei"))
    ) {
      return dispatch(error("You cannot wrap more than your gPHM balance."));
    }

    const result = await dispatch(unwrapGPHM({ address, provider, networkID: chainID, value: unwrapValue })).unwrap();
    if (!result?.error) {
      setUnwrapValue(0);
    }
  };

  const ctaProps = isMobileScreen
    ? {
        variant: "contained",
        color: "primary",
        style: { width: "100%" },
        size: "small",
      }
    : {
        variant: "contained",
        color: "primary",
        size: "medium",
        style: {
          fontSize: "16px",
          minWidth: "100px",
        },
      };

  const wrapButton = needsSPHMApproval ? (
    <Button {...ctaProps} disabled={+sPHMBalance === 0} onClick={handleApproveSPHM}>
      {sPHMApprovalLoading && (
        <Box mr={1} mt={1}>
          <CircularProgress size={22} />
        </Box>
      )}
      Approve
    </Button>
  ) : (
    <Button {...ctaProps} disabled={+sPHMBalance === 0} onClick={handleWrapSPHM}>
      {wrapLoading && (
        <Box mr={1} mt={1}>
          <CircularProgress size={22} />
        </Box>
      )}
      Wrap
    </Button>
  );

  const unwrapButton = needsGPHMApproval ? (
    <Button {...ctaProps} disabled={gPHMBalance === 0} onClick={handleApproveGPHM}>
      {gPHMApprovalLoading && (
        <Box mr={1} mt={1}>
          <CircularProgress size={22} />
        </Box>
      )}
      Approve
    </Button>
  ) : (
    <Button {...ctaProps} disabled={gPHMBalance === 0} onClick={handleUnwrapGPHM}>
      {unwrapLoading && (
        <Box mr={1} mt={1}>
          <CircularProgress size={22} />
        </Box>
      )}
      Unwrap
    </Button>
  );

  const CTA = connected ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "90%",
        margin: theme.spacing(2),
      }}
    >
      {activeToken === 0 ? wrapButton : unwrapButton}
    </Box>
  ) : (
    <Box sx={{ margin: theme.spacing(2) }}>
      <ConnectButton />
    </Box>
  );

  return (
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
                    className={activeToken === 0 ? "active-tab" : ""}
                    sx={{ width: "50%", padding: "0px 16px" }}
                    onClick={() => setActiveToken(0)}
                  >
                    <Typography variant="h6" color="textPrimary">
                      Wrap
                    </Typography>
                  </Box>
                  <Box
                    className={activeToken === 1 ? "active-tab" : ""}
                    sx={{ width: "50%", padding: "0px 16px" }}
                    onClick={() => setActiveToken(1)}
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
                    {activeToken === 0 ? <SPHM /> : <GPHM />}
                    <Typography style={{ marginLeft: "5px" }} variant="h6">
                      {activeToken === 0 ? "sPHM" : "gPHM"}
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
                      value={activeToken === 0 ? wrapValue : unwrapValue}
                      onChange={e => {
                        activeToken === 0 ? setWrapValue(e.target.value) : setUnwrapValue(e.target.value);
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
                      onClick={() => {
                        activeToken === 0 ? setWrapValue(+sPHMBalance / 1e9) : setUnwrapValue(gPHMBalance / 1e9);
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
                    Based on the current index of {trim(currentIndex || 1, 2)} you’ll receive{" "}
                    {activeToken === 0
                      ? `${trim(wrapValue / currentIndex, 2)} gPHM`
                      : `${trim(unwrapValue * currentIndex, 2)} sPHM`}
                  </Typography>
                </Box>
                {CTA}
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

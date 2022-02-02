import {
  Box,
  CircularProgress,
  Paper,
  Typography,
  Zoom,
  useTheme,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Button,
  useMediaQuery,
} from "@material-ui/core";
import { ethers } from "ethers";
import { useWeb3Context } from "src/hooks/web3Context";
// maintain state for some settings
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@material-ui/lab";

import { getOhmTokenImage, getTokenImage, trim } from "../../helpers";
import { ReactComponent as APHMToPHM } from "../../assets/icons/aphm-to-phm.svg";
import { ReactComponent as FPHMToGPHM } from "../../assets/icons/fphm-to-gphm.svg";
import { ReactComponent as FRAXToAPHM } from "../../assets/icons/frax-to-aphm.svg";
import FRAXTOAPHM from "../../assets/icons/frax-to-aphm.png";
import {
  swapFPHMToGPHM,
  swapAPHMToPHM,
  approveFPHM,
  approveAPHM,
  loadSwapBalances,
  approveFrax,
  purchaseAPHM,
} from "../../slices/SwapSlice";
import MobileCard from "./MobileCard";
import { addresses } from "../../constants";
import "./swap.scss";

const Swap = () => {
  const theme = useTheme();
  const isMobileScreen = useMediaQuery("(max-width: 700px)");
  const { provider, address, hasCachedProvider, connected, connect, chainID } = useWeb3Context();
  const dispatch = useDispatch();

  useEffect(() => {
    if (connected) {
      dispatch(loadSwapBalances({ address, networkID: chainID, provider }));
    }
  }, [connected]);

  const {
    balancesLoading,
    approveAPHMLoading,
    approveFPHMLoading,
    FPHMToGPHMLoading,
    APHMToPHMLoading,
    unlockedFPHM,
    fPHMBalance,
    aPHMBalance,
    fPHMAllowance,
    aPHMAllowance,
    fraxAllowance,
    purchaseAPHMLoading,
    remainingAllotment,
    approveFraxLoading,
    error,
  } = useSelector(state => state.swap);

  const handleSwapAPHM = async () => {
    dispatch(swapAPHMToPHM({ provider, address, networkID: chainID, value: aPHMBalance }));
  };

  const handleApproveAPHM = () => {
    dispatch(approveAPHM({ provider, address, value: aPHMBalance, networkID: chainID }));
  };

  const handleApproveFrax = () => {
    dispatch(
      approveFrax({
        provider,
        address,
        value: ethers.utils.parseUnits(remainingAllotment.toString(), "wei").mul(51),
        networkID: chainID,
      }),
    );
  };

  const handlePurchaseAPHM = () => {
    dispatch(purchaseAPHM({ provider, address, networkID: chainID }));
  };

  const handleSwapFPHM = async () => {
    dispatch(swapFPHMToGPHM({ provider, address, value: fPHMBalance, networkID: chainID }));
  };

  const handleApproveFPHM = () => {
    dispatch(approveFPHM({ provider, address, value: fPHMBalance, networkID: chainID }));
  };

  const handleAddToken = async token => {
    if (!window.ethereum) return;
    const images = {
      aPHM: "https://i.ibb.co/MG2BM9n/APHM.png",
      gPHM: "https://i.ibb.co/VTB5xYM/Token-g-PHM-Style-Alt.png",
      PHM: "https://i.ibb.co/HtxRm9r/Token-PHM-Style-Alt.png",
    };
    await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: addresses[chainID][token],
          symbol: token,
          decimals: 18,
          image: images[token],
        },
      },
    });
  };

  const loadingBalance = useCallback(
    balance => {
      return balancesLoading ? <Skeleton width="50px" height="20px" style={{ marginLeft: "60%" }} /> : trim(balance, 2);
    },
    [balancesLoading],
  );

  const aPHMAllowanceWei = ethers.utils.parseUnits(aPHMAllowance.toString(), "wei");
  const aPHMBalanceWei = ethers.utils.parseUnits(aPHMBalance.toString(), "wei");
  const approveOrSwapAPHM = aPHMAllowanceWei.gte(aPHMBalanceWei) && +aPHMBalance > 0 ? "swap" : "approve";

  const fPHMAllowanceWei = ethers.utils.parseUnits(fPHMAllowance.toString(), "wei");
  const fPHMBalanceWei = ethers.utils.parseUnits(fPHMBalance.toString(), "wei");
  const approveOrSwapFPHM = fPHMAllowanceWei.gte(fPHMBalanceWei) && +fPHMBalance > 0 ? "approve" : "approve";

  const fraxAllowanceWei = ethers.utils.parseUnits(fraxAllowance.toString(), "wei");
  const remainingAllotmentWei = ethers.utils.parseUnits(remainingAllotment.toString(), "wei");
  const approveOrSwapFrax =
    fraxAllowanceWei.gte(remainingAllotmentWei.mul(51)) && +remainingAllotment > 0 ? "swap" : "approve";
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
                Swap Tokens
              </Typography>
              <Typography variant="h6" color="textSecondary">
                Swap your aPHM or fPHM tokens
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
              {isMobileScreen ? (
                <>
                  <MobileCard
                    icon={<APHMToPHM />}
                    swapText={"aPHM to PHM"}
                    // balance={loadingBalance(aPHMBalance)}
                    balance={0} // disable swap temporarily
                    unlocked={loadingBalance(aPHMBalance)}
                    buttonLabel={approveOrSwapAPHM === "approve" ? "Approve" : "Swap"}
                    loading={approveOrSwapAPHM === "approve" ? approveAPHMLoading : APHMToPHMLoading}
                    onClick={approveOrSwapAPHM === "approve" ? handleApproveAPHM : handleSwapAPHM}
                  />
                  <MobileCard
                    icon={<FPHMToGPHM />}
                    swapText={"fPHM to gPHM"}
                    balance={loadingBalance(trim(+fPHMBalance / 1e18, 2))}
                    unlocked={loadingBalance(trim(+unlockedFPHM / 1e18, 2))}
                    buttonLabel={approveOrSwapFPHM === "approve" ? "Approve" : "Swap"}
                    loading={approveOrSwapFPHM === "approve" ? approveFPHMLoading : FPHMToGPHMLoading}
                    onClick={approveOrSwapFPHM === "approve" ? handleApproveFPHM : handleSwapFPHM}
                  />
                  <MobileCard
                    icon={<FRAXToAPHM />}
                    swapText={"FRAX to aPHM"}
                    balance={"N/A"}
                    unlocked={loadingBalance(trim(+remainingAllotment / 1e18, 2))}
                    buttonLabel={approveOrSwapFrax === "approve" ? "Approve" : "Swap"}
                    loading={approveOrSwapFrax === "approve" ? approveFraxLoading : purchaseAPHMLoading}
                    onClick={approveOrSwapFrax === "approve" ? handleApproveFrax : handlePurchaseAPHM}
                  />
                </>
              ) : (
                <TableContainer>
                  <Table
                    sx={{
                      minWidth: 650,
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell width="40%">
                          <Typography variant="p">SWAP</Typography>
                        </TableCell>
                        <TableCell align="right" width="20%">
                          <Typography variant="p">LOCKED</Typography>
                        </TableCell>
                        <TableCell align="right" width="20%">
                          <Typography variant="p">UNLOCKED</Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell width="40%" align="left">
                          <Box className="swap-token">
                            <APHMToPHM />
                            <Typography style={{ marginLeft: "5px" }} variant="h6">
                              aPHM to PHM
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell width="20%" align="right">
                          N/A
                        </TableCell>
                        <TableCell width="20%" align="right">
                          {loadingBalance(trim(+aPHMBalance / 1e18, 2))}
                        </TableCell>
                        <TableCell width="20%" align="right">
                          {approveOrSwapAPHM === "swap" ? (
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              // disabled={+aPHMBalance === 0}
                              disabled={true}
                              onClick={handleSwapAPHM}
                            >
                              {APHMToPHMLoading && (
                                <Box mr={1} mt={1}>
                                  <CircularProgress size={22} />
                                </Box>
                              )}
                              Swap
                            </Button>
                          ) : (
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              // disabled={+aPHMBalance === 0}
                              disabled={true}
                              onClick={handleApproveAPHM}
                            >
                              {approveAPHMLoading && (
                                <Box mr={1} mt={1}>
                                  <CircularProgress size={22} />
                                </Box>
                              )}
                              Approve
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell width="40%" align="left">
                          <Box className="swap-token">
                            <FPHMToGPHM />
                            <Typography style={{ marginLeft: "5px" }} variant="h6">
                              fPHM to gPHM
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell width="20%" align="right">
                          {loadingBalance(trim(+fPHMBalance / 1e18, 2))}
                        </TableCell>
                        <TableCell width="20%" align="right">
                          {loadingBalance(trim(+unlockedFPHM / 1e18, 2))}
                        </TableCell>
                        <TableCell width="20%" align="right">
                          {approveOrSwapFPHM === "swap" ? (
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              disabled={+fPHMBalance === 0}
                              onClick={handleSwapFPHM}
                            >
                              {FPHMToGPHMLoading && (
                                <Box mr={1} mt={1}>
                                  <CircularProgress size={22} />
                                </Box>
                              )}
                              Swap
                            </Button>
                          ) : (
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              disabled={+fPHMBalance === 0}
                              onClick={handleApproveFPHM}
                            >
                              {approveFPHMLoading && (
                                <Box mr={1} mt={1}>
                                  <CircularProgress size={22} />
                                </Box>
                              )}
                              Approve
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell width="40%" align="left">
                          <Box className="swap-token">
                            <img src={FRAXTOAPHM}></img>
                            <Typography style={{ marginLeft: "5px" }} variant="h6">
                              FRAX to aPHM
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell width="20%" align="right">
                          N/A
                        </TableCell>
                        <TableCell width="20%" align="right">
                          {loadingBalance(trim(+remainingAllotment / 1e18, 2))}
                        </TableCell>
                        <TableCell width="20%" align="right">
                          {approveOrSwapFrax === "swap" ? (
                            <Button variant="outlined" color="primary" size="small" onClick={handlePurchaseAPHM}>
                              {purchaseAPHMLoading && (
                                <Box mr={1} mt={1}>
                                  <CircularProgress size={22} />
                                </Box>
                              )}
                              Swap
                            </Button>
                          ) : (
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              disabled={+remainingAllotment === 0}
                              onClick={handleApproveFrax}
                            >
                              {approveFraxLoading && (
                                <Box mr={1} mt={1}>
                                  <CircularProgress size={22} />
                                </Box>
                              )}
                              Approve
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          </Box>
          <Box className={isMobileScreen ? "add-tokens-container-mobile" : "add-tokens-container"}>
            <Button
              variant="outlined"
              color="secondary"
              size="medium"
              style={{
                fontSize: "16px",
              }}
              onClick={() => handleAddToken("PHM")}
            >
              Add PHM to wallet
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="medium"
              style={{
                fontSize: "16px",
              }}
              onClick={() => handleAddToken("gPHM")}
            >
              Add gPHM to wallet
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="medium"
              style={{
                fontSize: "16px",
              }}
              onClick={() => handleAddToken("aPHM")}
            >
              Add aPHM to wallet
            </Button>
          </Box>
        </Box>
      </Zoom>
    </div>
  );
};

export default Swap;

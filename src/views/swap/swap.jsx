import {
  Box,
  Grid,
  Paper,
  Typography,
  Zoom,
  SvgIcon,
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
import MobileCard from "./MobileCard";
import "./swap.scss";

// for wallet access see const in swap function
import { useWeb3Context } from "src/hooks/web3Context";

// maintain state for some settings
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Skeleton } from "@material-ui/lab";
import { getOhmTokenImage, getTokenImage, trim } from "../../helpers";

import { ReactComponent as APHMToPHM } from "../../assets/icons/aphm-to-phm.svg";
import { ReactComponent as FPHMToGPHM } from "../../assets/icons/fphm-to-gphm.svg";

// TODO: 1 Implementation
// add getimage to ./helpers/index.tsx
//const aPHMImg = getaPHMTokenImage("");
//const fPHMImg = getfPHMTokenImage("");

const Swap = () => {
  const theme = useTheme();
  const isMobileScreen = useMediaQuery("(max-width: 700px)");
  const { provider, address, connected, connect, chainID } = useWeb3Context();
  const [zoomed, setZoomed] = useState(false);
  const [view, setView] = useState(0);
  const [quantity, setQuantity] = useState("");
  const isAppLoading = useSelector(state => state.app.loading);

  const sampleData = [
    { swap: 1, balance: 10, unlocked: 20 },
    { swap: 2, balance: 10, unlocked: 20 },
  ];
  const renderSwapTable = (swap, balance, unlocked) => (
    <TableRow>
      <TableCell width="40%" align="left">
        <Box className="swap-token">
          {swap === 1 ? <APHMToPHM /> : <FPHMToGPHM />}
          <Typography style={{ marginLeft: "5px" }} variant="h6">
            {swap === 1 ? "aPHM to PHM" : "fPHM to gPHM"}
          </Typography>
        </Box>
      </TableCell>
      <TableCell width="20%" align="right">
        {balance}
      </TableCell>
      <TableCell width="20%" align="right">
        {unlocked}
      </TableCell>
      <TableCell width="20%" align="right">
        <Button variant="outlined" color="primary" size="small">
          Approve
        </Button>
      </TableCell>
    </TableRow>
  );

  const ohmBalance = useSelector(state => {
    return state.account.balances && state.account.balances.ohm;
  });
  const sohmBalance = useSelector(state => {
    return state.account.balances && state.account.balances.sohm;
  });

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
                    balance={100}
                    unlocked={100}
                    onApprove={() => {}}
                  />
                  <MobileCard
                    icon={<FPHMToGPHM />}
                    swapText={"fPHM to gPHM"}
                    balance={100}
                    unlocked={100}
                    onApprove={() => {}}
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
                    <TableBody>{sampleData.map(e => renderSwapTable(e.swap, e.balance, e.unlocked))}</TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          </Box>
        </Box>
      </Zoom>
    </div>
  );
};

export default Swap;

import { useSelector } from "react-redux";
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Zoom,
  useTheme,
} from "@material-ui/core";
import { t, Trans } from "@lingui/macro";
import { BondDataCard, BondTableData } from "./BondRow";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { formatCurrency } from "../../helpers";
import useBonds from "../../hooks/Bonds";
import { useWeb3Context } from "src/hooks/web3Context";

import "./choosebond.scss";
import { Skeleton } from "@material-ui/lab";
import ClaimBonds from "./ClaimBonds";
import isEmpty from "lodash/isEmpty";
import { allBondsMap } from "src/helpers/AllBonds";
import { NetworkID } from "src/lib/Bond";
import { fakeBonds } from "src/helpers/FakeBonds";

function ChooseBond() {
  const { chainID } = useWeb3Context();
  // const { bonds } = useBonds(chainID);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width: 820px)"); // change to breakpoint query
  const isVerySmallScreen = useMediaQuery("(max-width: 710px)");

  const isAppLoading = useSelector(state => state.app.loading);
  const isAccountLoading = useSelector(state => state.account.loading);

  // Fake Data
  const bonds = fakeBonds;
  const accountBonds = [fakeBonds[0]];
  const marketPrice = 143.23;
  const treasuryBalance = 10234432.29;

  // const accountBonds = useSelector(state => {
  //   const withInterestDue = [];
  //   for (const bond in state.account.bonds) {
  //     if (state.account.bonds[bond].interestDue > 0) {
  //       withInterestDue.push(state.account.bonds[bond]);
  //     }
  //   }
  //   return withInterestDue;
  // });

  // const marketPrice = useSelector(state => {
  //   return state.app.marketPrice;
  // });

  // const treasuryBalance = useSelector(state => {
  //   if (state.bonding.loading == false) {
  //     let tokenBalances = 0;
  //     for (const bond in allBondsMap) {
  //       if (state.bonding[bond]) {
  //         tokenBalances += state.bonding[bond].purchased;
  //       }
  //     }
  //     return tokenBalances;
  //   }
  // });

  return (
    <div id="choose-bond-view">
      {!isAccountLoading && !isEmpty(accountBonds) && <ClaimBonds activeBonds={accountBonds} />}

      <Zoom in={true}>
        <Box
          sx={{
            marginTop: theme.spacing(4),
            width: isSmallScreen ? "97%" : "80%",
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
                Bond (1,1)
              </Typography>
            </Box>
          </Box>
          <Paper className="ohm-card bond-card">
            <Grid container item xs={12} style={{ margin: "10px 0px 20px" }} className="bond-hero">
              <Grid item xs={6}>
                <Box textAlign={`${isVerySmallScreen ? "left" : "center"}`}>
                  <Typography variant="h5" color="textSecondary">
                    <Trans>Treasury Balance</Trans>
                  </Typography>
                  <Box>
                    {isAppLoading ? (
                      <Skeleton width="180px" data-testid="treasury-balance-loading" />
                    ) : (
                      <Typography variant="h4" data-testid="treasury-balance">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 0,
                          minimumFractionDigits: 0,
                        }).format(treasuryBalance)}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={6} className={`ohm-price`}>
                <Box textAlign={`${isVerySmallScreen ? "right" : "center"}`}>
                  <Typography variant="h5" color="textSecondary">
                    <Trans>PHM Price</Trans>
                  </Typography>
                  <Typography variant="h4">
                    {isAppLoading ? <Skeleton width="100px" /> : formatCurrency(marketPrice, 2)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            {!isVerySmallScreen && (
              <Grid container item>
                <TableContainer>
                  <Table aria-label="Available bonds">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">
                          <Trans>Bond</Trans>
                        </TableCell>
                        <TableCell align="left">
                          <Trans>Price</Trans>
                        </TableCell>
                        <TableCell align="left">
                          <Trans>ROI</Trans>
                        </TableCell>
                        <TableCell align="right">
                          <Trans>Purchased</Trans>
                        </TableCell>
                        <TableCell align="right"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {bonds.map(bond => (
                        <BondTableData key={bond.name} bond={bond} />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            )}
          </Paper>
        </Box>
      </Zoom>

      {isVerySmallScreen && (
        <Box className="ohm-card-container">
          <Grid container item spacing={2}>
            {bonds.map(bond => (
              <Grid item xs={12} key={bond.name}>
                <BondDataCard key={bond.name} bond={bond} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </div>
  );
}

export default ChooseBond;

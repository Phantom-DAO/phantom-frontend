import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { t, Trans } from "@lingui/macro";
import { formatCurrency, trim } from "../../helpers";
import { Backdrop, Box, Fade, Grid, Paper, Typography } from "@material-ui/core";
import BondHeader from "./BondHeader";
import BondPurchase from "./BondPurchase";
import "./bond.scss";
import { useWeb3Context } from "src/hooks/web3Context";
import { Skeleton } from "@material-ui/lab";

function Bond({ bond }) {
  const dispatch = useDispatch();
  const { provider, address, chainID } = useWeb3Context();

  const [slippage, setSlippage] = useState(0.5);
  const [recipientAddress, setRecipientAddress] = useState(address);

  const [quantity, setQuantity] = useState();

  // const isBondLoading = useSelector(state => state.bonding.loading ?? true);

  // Fake variables
  const isBondLoading = false;
  console.log(bond.bondPrice);

  const onRecipientAddressChange = e => {
    return setRecipientAddress(e.target.value);
  };

  const onSlippageChange = e => {
    return setSlippage(e.target.value);
  };

  useEffect(() => {
    if (address) setRecipientAddress(address);
  }, [provider, quantity, address]);

  return (
    <Fade in={true} mountOnEnter unmountOnExit>
      <Grid container id="bond-view">
        <Backdrop open={true}>
          <Fade in={true}>
            <Paper className="ohm-card ohm-modal">
              <BondHeader
                bond={bond}
                slippage={slippage}
                recipientAddress={recipientAddress}
                onSlippageChange={onSlippageChange}
                onRecipientAddressChange={onRecipientAddressChange}
              />

              <Box direction="row" className="bond-price-data-row">
                <div className="bond-price-data">
                  <Typography variant="h5" color="textSecondary">
                    <Trans>Bond Price</Trans>
                  </Typography>
                  <Typography variant="h3" className="price" color="primary">
                    {isBondLoading ? <Skeleton /> : formatCurrency(bond.bondPrice, 2)}
                  </Typography>
                </div>
                <div className="bond-price-data">
                  <Typography variant="h5" color="textSecondary">
                    <Trans>Market Price</Trans>
                  </Typography>
                  <Typography variant="h3" color="primary" className="price">
                    {isBondLoading ? <Skeleton /> : formatCurrency(bond.marketPrice, 2)}
                  </Typography>
                </div>
              </Box>
              <BondPurchase bond={bond} slippage={slippage} recipientAddress={recipientAddress} />
            </Paper>
          </Fade>
        </Backdrop>
      </Grid>
    </Fade>
  );
}

export function DisplayBondPrice({ bond }) {
  const { chainID } = useWeb3Context();
  return (
    <>
      {!bond.isAvailable[chainID] ? (
        <>--</>
      ) : (
        `${new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(bond.bondPrice)}`
      )}
    </>
  );
}

export function DisplayBondDiscount({ bond }) {
  const { chainID } = useWeb3Context();
  return <>{!bond.isAvailable[chainID] ? <>--</> : `${bond.bondDiscount && trim(bond.bondDiscount * 100, 2)}%`}</>;
}

export default Bond;

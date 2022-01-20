import { Box, Grid, Paper, Typography, useTheme, Zoom, Button, Link, useMediaQuery } from "@material-ui/core";
import { useWeb3Context } from "src/hooks/web3Context";
import { useState } from "react";
import { ReactComponent as PhantomTitle } from "../../assets/icons/phantom-title.svg";
import { ReactComponent as TokenGold } from "../../assets/icons/token-gold.svg";

import "./claim.scss";
import Greeting from "./Greeting.jsx";
import AllocationCard from "./AllocationCard";

const Claim = () => {
  const theme = useTheme();
  const { provider, address, connected, connect, disconnect, chainID } = useWeb3Context();
  const isMobileScreen = useMediaQuery("(max-width: 700px)");
  const [status, setStatus] = useState('not-claimed');

  const addTokenToWallet = (tokenSymbol: string, tokenAddress: string, decimals: number, image : string) => async () => {
    const tokenImage = getTokenUrl(tokenSymbol.toLowerCase());

    if (window.ethereum) {
        try {
            await window.ethereum.request({
                method: "wallet_watchAsset",
                params: {
                    type: "ERC20",
                    options: {
                        address: tokenAddress,
                        symbol: tokenSymbol,
                        decimals: TOKEN_DECIMALS,
                        image: tokenImage,
                    },
                },
            });
        } catch (error) {
            console.log(error);
        }
    }
};

  return (
    <div id="claim-view">
    {address ? (
      <div className="disconnect-button">
            <Button variant="outlined" color="secondary" size="medium" onClick={disconnect} >
                    Disconnect
            </Button>
        </div>
    ): <></>}
      
      <Zoom in={true}>
        <Grid direction="column" container alignItems="center" justifyContent="center">
          <PhantomTitle className="title" height={isMobileScreen && '50px'}/>
          <Box className="subtitle">
            <Typography variant="h4">Claim your whitelist allocation</Typography>
          </Box>
          

          <Box className="content">
              {!address ? <Box sx={{display: 'flex', justifyContent: 'center'}}>
              <Button variant="contained" color="primary" className="connect-button" onClick={connect} key={1}>
                Connect Wallet
            </Button>
              </Box>
              :
              status !== 'claimed' ? <AllocationCard status={status} setStatus={setStatus}/>
              :
            <Greeting isMobileScreen={isMobileScreen}/>
            }
          </Box>
        </Grid>
      </Zoom>
    </div>
  );
};

export default Claim;
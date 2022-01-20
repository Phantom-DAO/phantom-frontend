import { Box, Grid, Paper, Typography, useTheme, Zoom, Button, Link } from "@material-ui/core";
import { useWeb3Context } from "src/hooks/web3Context";
import { useEffect, useState } from "react";
import { ReactComponent as PhantomTitle } from "../../assets/icons/phantom-title.svg";
import { ReactComponent as TokenGold } from "../../assets/icons/token-gold.svg";
import LoaderButton from './LoaderButton';

import "./claim.scss";

const AllocationCard = ({status, setStatus}) => {

  return (
            <>
            <Paper className="claim-card" >
                <Box sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                  }}>
                    <Box>
                    <Typography variant="p" color="textSecondary">YOUR ALLOCATION</Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '12px',
                        marginTop: '16px',
                        alignItems: 'center'
                    }}>
                        <TokenGold/>
                        <Typography variant="h3">333.33 fPHM</Typography>
                    </Box>
                    </Box>

                    {status === 'not-claimed' && <Button variant="contained" color="primary" size="medium" style={{
                      fontSize: '16px',
                  }} onClick={() => {
                      setStatus('pending')
                      setTimeout(() => {
                          setStatus('claimed')
                      }, 1000)
                      }} disabled={false} >
                    Claim
                  </Button>}
                  { status==='pending' && <LoaderButton/>}
                  
                 
                  {/* Disabled version of the button which is shown if a user revisits already claimed tokens and there are no token to claim */}
                </Box>
            </Paper>
            <Typography align="center" variant="p" color="textSecondary" style={{marginTop: '24px'}}>fPHM is vested linearly over 1 year, with 25% unlocked on day one of Phantoms release <a className="info-link">Read more about fPHM</a></Typography>
        </>
  );
};

export default AllocationCard;

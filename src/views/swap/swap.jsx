import { Box, Grid, Paper, Typography, Zoom, SvgIcon } from "@material-ui/core";
import { ReactComponent as WavesLeft } from "../../assets/icons/waves-left.svg";
import { ReactComponent as WavesRight } from "../../assets/icons/waves-right.svg";

// TODO: 1 Implementation
//const aPHMImg = getaPHMTokenImage("");
//const fPHMImg = getfPHMTokenImage("");

function Swap() {
  return (
    <div id="swap-view">
      <Zoom in={true}>
        <Paper className={`swap-card`}>
          <Grid container direction="column" spacing={7}>
            <Grid item>
              <Box className="card-header">
                <Typography variant="h3">Swap tokens</Typography>
                <Typography variant="h5">
                        Swap your aPHM or fPHM tokens
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <div className="swap">
                <Grid container spacing={2} alignItems="flex-end">
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <div className="swap-tokens">
                      <Typography variant="h5">
                        SWAP
                      </Typography>
                      <Typography variant="h4">image aPHM to PHM</Typography>
                      <Typography variant="h4">image fPHM to PHM</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <div className="swap-balance">
                      <Typography variant="h5">
                        BALANCE
                      </Typography>
                      <Typography variant="h4">aphm balance 3333.33</Typography>
                      <Typography variant="h4">aphm unlocked 333.33</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <div className="swap-unlocked">
                      <Typography variant="h5">
                        UNLOCKED
                      </Typography>
                      <Typography variant="h4">aphm unlocked 333.33</Typography>
                      <Typography variant="h4">fphm unlocked 33.33</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <div className="swap-button">
                      <Typography variant="h4">button</Typography>
                      <Typography variant="h4">button</Typography>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Zoom>
    </div>
  );
}

export default Swap;

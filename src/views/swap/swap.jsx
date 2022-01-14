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
                <Typography variant="h5">Swap tokens</Typography>
              </Box>
            </Grid>
            <Grid item>
              <div className="swap">
                <Grid container spacing={2} alignItems="flex-end">
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <div className="swap-tokens">
                      <Typography variant="h5" color="textSecondary">
                        SWAP
                      </Typography>
                      <Typography variant="h1">image aPHM to PHM</Typography>
                      <Typography variant="h1">image fPHM to PHM</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <div className="swap-balance">
                      <Typography variant="h5" color="textSecondary">
                        BALANCE
                      </Typography>
                      <Typography variant="h1">aphm balance 3333.33</Typography>
                      <Typography variant="h1">aphm unlocked 333.33</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <div className="swap-unlocked">
                      <Typography variant="h5" color="textSecondary">
                        UNLOCKED
                      </Typography>
                      <Typography variant="h1">aphm unlocked 333.33</Typography>
                      <Typography variant="h1">fphm unlocked 33.33</Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <div className="swap-button">
                      <Typography variant="h5" color="textSecondary">
                        space
                      </Typography>
                      <Typography variant="h1">aphm button</Typography>
                      <Typography variant="h1">fphm button</Typography>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
          <Grid container direction="column" spacing={7}>
            <Grid item>
              <div className="waves-left">
                <SvgIcon
                  style={{ minHeight: 105, minWidth: 200 }}
                  htmlColor="black"
                  component={WavesLeft}
                  viewBox="0 0 248 105"
                />
              </div>
            </Grid>
            <Grid item>
              <div className="waves-right">
                <SvgIcon
                  style={{ minHeight: 105, minWidth: 200 }}
                  htmlColor="black"
                  component={WavesRight}
                  viewBox="0 0 248 105"
                />
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Zoom>
    </div>
  );
}

export default Swap;

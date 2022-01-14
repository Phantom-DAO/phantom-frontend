import { useSelector } from "react-redux";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Zoom,
  SvgIcon,
} from "@material-ui/core";
// TODO: 1 Task
// add get phantom tokens function to helpers
//import { getOhmTokenImage, getTokenImage, trim } from "../../helpers";
import { ReactComponent as WavesLeft } from "../../assets/icons/waves-left.svg";
import { ReactComponent as WavesRight } from "../../assets/icons/waves-right.svg";

// TODO: 1 Implementation
//const aPHMImg = getaPHMTokenImage("");
//const fPHMImg = getfPHMTokenImage("");

function Swap() {

//    const dispatch = useDispatch();
//    const { provider, address, connected, connect, chainID } = useWeb3Context();
  
//    const [zoomed, setZoomed] = useState(false);
//    const [view, setView] = useState(0);
//    const [quantity, setQuantity] = useState("");
  
//    const isAppLoading = useSelector(state => state.app.loading);

    //TODO: 2 Task Setup correct return and verify functions for lines 41-57
    //aPHM token current balance
    // const aPHMBalance = useSelector(state => {
    //     return state.account.balances.aphm;
    // });
    // //aPHM token  current unlocked  
    // const aPHMUnlocked = useSelector(state => {
    //     return state.account.unlocked.aphm;
    // });
    
    // //fPHM token  current balance
    // const fPHMBalance = useSelector(state => {
    //     return state.account.balances.fphm;
    // });
    // //fPHM token  current unloacked
    // const fPHMUnlocked = useSelector(state => {
    //     return state.account.unlocked.fphm;
    // });

  return (
    <div id="swap-view">
      <Zoom in={true} onEntered={() => setZoomed(true)}>
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
                      <Typography variant="h4">
                        image aPHM to PHM
                      </Typography>
                      <Typography variant="h4">
                        image fPHM to PHM
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <div className="swap-balance">
                      <Typography variant="h5" color="textSecondary">
                        BALANCE
                      </Typography>
                      <Typography variant="h4">
                        aphm balance 3333.33
                      </Typography>
                      <Typography variant="h4">
                        aphm unlocked 333.33
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <div className="swap-unlocked">
                      <Typography variant="h5" color="textSecondary">
                        UNLOCKED
                      </Typography>
                      <Typography variant="h4">
                        aphm unlocked 333.33
                      </Typography>
                      <Typography variant="h4">
                        fphm unlocked 33.33
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <div className="swap-button">
                      <Typography variant="h5" color="textSecondary">
                        space
                      </Typography>
                      <Typography variant="h4">
                        aphm button
                      </Typography>
                      <Typography variant="h4">
                        fphm button
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
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
        </Paper>
      </Zoom>
    </div>
  );    
}

export default Swap;
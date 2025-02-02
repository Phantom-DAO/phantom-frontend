import { ThemeProvider } from "@material-ui/core/styles";
import { useEffect, useState, useCallback } from "react";
import { Route, Redirect, Switch, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useTheme from "./hooks/useTheme";
import useBonds from "./hooks/Bonds";
import { useAddress, useWeb3Context } from "./hooks/web3Context";
import useSegmentAnalytics from "./hooks/useSegmentAnalytics";
import { segmentUA } from "./helpers/userAnalyticHelpers";
import { shouldTriggerSafetyCheck } from "./helpers";

import { calcBondDetails } from "./slices/BondSlice";
import { loadAppDetails } from "./slices/AppSlice";
import { loadAccountDetails, calculateUserBondDetails } from "./slices/AccountSlice";
import { loadAuctionDetails, loadMyCommitments } from "./slices/AuctionSlice";
import { info } from "./slices/MessagesSlice";

import { Stake, ChooseBond, Bond, Wrap, TreasuryDashboard, Auction, Swap, Claim } from "./views";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import TopBar from "./components/TopBar/TopBar.jsx";
import NavDrawer from "./components/Sidebar/NavDrawer.jsx";
import Messages from "./components/Messages/Messages";
import NotFound from "./views/404/NotFound";

import { dark as darkTheme } from "./themes/dark.js";
import { light as lightTheme } from "./themes/light.js";
import { girth as gTheme } from "./themes/girth.js";
import WhiteList from "./Whitelist";
import "./style.scss";
import { getFPHMAllocation } from "./slices/ClaimSlice";

// TODO: This is fake bond data until contracts are done
import { fakeBonds } from "./helpers/FakeBonds";

// 😬 Sorry for all the console logging
const DEBUG = false;

// 🛰 providers
if (DEBUG) console.log("📡 Connecting to Mainnet Ethereum");
// 🔭 block explorer URL
// const blockExplorer = targetNetwork.blockExplorer;

const drawerWidth = 280;
const transitionDuration = 969;
let auctionInterval = null as any;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: transitionDuration,
    }),
    height: "100%",
    overflow: "auto",
    marginLeft: drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: transitionDuration,
    }),
    marginLeft: 0,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
}));

function App() {
  useSegmentAnalytics();
  const dispatch = useDispatch();
  const [theme, toggleTheme, mounted] = useTheme();
  const location = useLocation();
  const currentPath = location.pathname + location.search + location.hash;
  const classes = useStyles();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isSmallerScreen = useMediaQuery("(max-width: 1280px)");
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const { connect, hasCachedProvider, provider, chainID, connected, uri } = useWeb3Context();
  const address = useAddress();

  const [walletChecked, setWalletChecked] = useState(false);

  // const { bonds } = useBonds(chainID);
  const bonds = fakeBonds;
  async function loadDetails(whichDetails: string) {
    // NOTE (unbanksy): If you encounter the following error:
    // Unhandled Rejection (Error): call revert exception (method="balanceOf(address)", errorArgs=null, errorName=null, errorSignature=null, reason=null, code=CALL_EXCEPTION, version=abi/5.4.0)
    // it's because the initial provider loaded always starts with chainID=1. This causes
    // address lookup on the wrong chain which then throws the error. To properly resolve this,
    // we shouldn't be initializing to chainID=1 in web3Context without first listening for the
    // network. To actually test rinkeby, change setChainID equal to 4 before testing.
    let loadProvider = provider;

    if (whichDetails === "app") {
      loadApp(loadProvider);
    }

    // don't run unless provider is a Wallet...
    if (whichDetails === "account" && address && connected) {
      loadAccount(loadProvider);
    }
  }

  const loadApp = useCallback(
    loadProvider => {
      dispatch(loadAppDetails({ networkID: chainID, provider: loadProvider }));
      // bonds.map(bond => {
      //   dispatch(calcBondDetails({ bond, value: "", provider: loadProvider, networkID: chainID }));
      // });

      // load auction details + poll
      dispatch(loadAuctionDetails({ provider, networkID: chainID }));
      auctionInterval = setInterval(() => {
        dispatch(loadAuctionDetails({ provider, networkID: chainID }));
      }, 10 * 1000);
    },
    [connected],
  );

  const loadAccount = useCallback(
    loadProvider => {
      dispatch(loadAccountDetails({ networkID: chainID, address, provider: loadProvider }));
      // bonds.map(bond => {
      //   dispatch(calculateUserBondDetails({ address, bond, provider, networkID: chainID }));
      // });
      dispatch(getFPHMAllocation({ address, networkID: chainID, provider: loadProvider }));
      dispatch(loadMyCommitments({ address }));
    },
    [connected],
  );

  // The next 3 useEffects handle initializing API Loads AFTER wallet is checked
  //
  // this useEffect checks Wallet Connection & then sets State for reload...
  // ... we don't try to fire Api Calls on initial load because web3Context is not set yet
  // ... if we don't wait we'll ALWAYS fire API calls via JsonRpc because provider has not
  // ... been reloaded within App.
  useEffect(() => {
    if (hasCachedProvider()) {
      // then user DOES have a wallet
      connect().then(() => {
        setWalletChecked(true);
        segmentUA({
          type: "connect",
          provider: provider,
          context: currentPath,
        });
      });
    } else {
      // then user DOES NOT have a wallet
      setWalletChecked(true);
    }
    if (shouldTriggerSafetyCheck()) {
      dispatch(info("Safety Check: Always verify you're on app.phantomdao.xyz!"));
    }

    return () => {
      clearInterval(auctionInterval);
    };
  }, []);

  // this useEffect fires on state change from above. It will ALWAYS fire AFTER
  useEffect(() => {
    // don't load ANY details until wallet is Checked
    if (walletChecked) {
      loadDetails("app");
    }
  }, [walletChecked]);

  // this useEffect picks up any time a user Connects via the button
  useEffect(() => {
    // don't load ANY details until wallet is Connected
    if (connected) {
      loadDetails("account");
    }
  }, [connected]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarExpanded(false);
  };

  // let themeMode = theme === "light" ? lightTheme : theme === "dark" ? darkTheme : gTheme;
  let themeMode = darkTheme;

  useEffect(() => {
    themeMode = darkTheme;
  }, [theme]);

  useEffect(() => {
    if (isSidebarExpanded) handleSidebarClose();
  }, [location]);

  if (window.location.hash === "#/claim") {
    return (
      <ThemeProvider theme={themeMode}>
        <CssBaseline />
        <Claim />
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={themeMode}>
        <CssBaseline />
        {/* {isAppLoading && <LoadingSplash />} */}
        <div className={`app ${isSmallerScreen && "tablet"} ${isSmallScreen && "mobile"} ${theme}`}>
          <Messages />
          <TopBar theme={theme} toggleTheme={toggleTheme} handleDrawerToggle={handleDrawerToggle} />
          <nav className={classes.drawer}>
            {isSmallerScreen ? (
              <NavDrawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
            ) : (
              <Sidebar />
            )}
          </nav>

          <div className={`${classes.content} ${isSmallerScreen && classes.contentShift}`}>
            <Switch>
              {/* <Route exact path="/dashboard">
                <TreasuryDashboard />
              </Route>

             
              
               */}
              <Route path="/stake">
                <Stake />
              </Route>
              <Route exact path="/">
                <Redirect to="/stake" />
              </Route>
              <Route path="/claim">
                <Claim />
              </Route>

              <Route path="/auction">
                <Auction />
              </Route>

              <Route exact path="/">
                <Redirect to="/swap" />
              </Route>

              <Route path="/swap">
                <Swap />
              </Route>

              <Route path="/wrap">
                <Wrap />
              </Route>
              {/*
              <Route path="/bonds">
                {bonds.map(bond => {
                  return (
                    <Route exact key={bond.name} path={`/bonds/${bond.name}`}>
                      <Bond bond={bond} />
                    </Route>
                  );
                })}
                <ChooseBond />
              </Route> */}

              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;

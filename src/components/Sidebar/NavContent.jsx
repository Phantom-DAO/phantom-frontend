import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import Social from "./Social";
import externalUrls from "./externalUrls";
import { ReactComponent as AuctionIcon } from "../../assets/icons/auction.svg";
import { ReactComponent as StakeIcon } from "../../assets/icons/stake.svg";
import { ReactComponent as SwapIcon } from "../../assets/icons/swap.svg";
import { ReactComponent as BondIcon } from "../../assets/icons/bond.svg";
import { ReactComponent as DashboardIcon } from "../../assets/icons/dashboard.svg";
import { ReactComponent as PhantomIcon } from "../../assets/icons/phantom-nav-header.svg";
import { ReactComponent as WavesLeftIcon } from "../../assets/icons/waves-left.svg";
import { ReactComponent as GovIcon } from "../../assets/icons/governance.svg";
import { ReactComponent as WrapIcon } from "../../assets/icons/wrap.svg";
import { ReactComponent as PoolTogetherIcon } from "../../assets/icons/33-together.svg";
import { Trans } from "@lingui/macro";
import { trim, shorten } from "../../helpers";
import { useAddress, useWeb3Context } from "src/hooks/web3Context";
import useBonds from "../../hooks/Bonds";
import { Paper, Link, Box, Typography, SvgIcon } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import "./sidebar.scss";

// TODO: Fake bond data import
import { fakeBonds } from "src/helpers/FakeBonds";

function NavContent() {
  const [isActive] = useState();
  const address = useAddress();
  const { chainID } = useWeb3Context();
  // const { bonds } = useBonds(chainID);
  const bonds = fakeBonds;

  const checkPage = useCallback((match, location, page) => {
    const currentPath = location.pathname.replace("/", "");
    if (currentPath.indexOf("dashboard") >= 0 && page === "dashboard") {
      return true;
    }
    // if (currentPath.indexOf("stake") >= 0 && page === "stake") {
    //   return true;
    // }
    if ((currentPath.indexOf("bonds") >= 0 || currentPath.indexOf("choose_bond") >= 0) && page === "bonds") {
      return true;
    }
    if (currentPath.indexOf("33-together") >= 0 && page === "33-together") {
      return true;
    }
    if (currentPath.indexOf("auction") >= 0 && page === "auction") {
      return true;
    }
    if (currentPath.indexOf("swap") >= 0 && page === "swap") {
      return true;
    }
    if (currentPath.indexOf("wrap") >= 0 && page === "wrap") {
      return true;
    }
    return false;
  }, []);

  return (
    <Paper className="dapp-sidebar">
      <Box className="dapp-sidebar-inner" display="flex" justifyContent="space-between" flexDirection="column">
        <div className="dapp-menu-top">
          <Box className="branding-header">
            <Link href="https://phantomdao.xyz" target="_blank">
              <SvgIcon
                color="primary"
                component={PhantomIcon}
                viewBox="0 0 151 126"
                style={{ minWdth: "151px", minHeight: "126px", width: "151px" }}
              />
            </Link>

            {address && (
              <div className="wallet-link">
                <Link href={`https://ftmscan.com/address/${address}`} target="_blank">
                  {shorten(address)}
                </Link>
              </div>
            )}
          </Box>

          <div className="dapp-menu-links">
            <div className="dapp-nav" id="navbarNav">
              <Link
                disabled
                component={NavLink}
                id="dash-nav"
                to="/dashboard"
                isActive={(match, location) => {
                  return checkPage(match, location, "dashboard");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" component={DashboardIcon} />
                  <Trans>Dashboard</Trans>
                </Typography>
              </Link>

              <Link
                component={NavLink}
                id="auction-nav"
                to="/auction"
                isActive={(match, location) => {
                  return checkPage(match, location, "auction");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" component={AuctionIcon} />
                  <Trans>Auction</Trans>
                </Typography>
              </Link>

              <Link
                component={NavLink}
                id="stake-nav"
                to="/stake"
                isActive={(match, location) => {
                  return checkPage(match, location, "stake");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" component={StakeIcon} />
                  <Trans>Stake</Trans>
                </Typography>
              </Link>

              {/* <Link
                component={NavLink}
                id="33-together-nav"
                to="/33-together"
                isActive={(match, location) => {
                  return checkPage(match, location, "33-together");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" component={PoolTogetherIcon} />
                  3,3 Together
                </Typography>
              </Link> */}

              <Link
                // disabled
                component={NavLink}
                id="bond-nav"
                to="/bonds"
                isActive={(match, location) => {
                  return checkPage(match, location, "bonds");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" component={BondIcon} />
                  <Trans>Bond</Trans>
                </Typography>
              </Link>

              {/* <div className="dapp-menu-data discounts">
                <div className="bond-discounts">
                  {bonds.map((bond, i) => (
                    <Link
                      component={NavLink}
                      to={`${bond.isAvailable[chainID] ? `/bonds/${bond.name}` : "#"}`}
                      key={i}
                      className={`bond ${!bond.isAvailable[chainID] ? "disabled" : ""}`}
                    >
                      {!bond.bondDiscount ? (
                        <Skeleton variant="text" width={"150px"} />
                      ) : (
                        <div className="bond-item">
                          <Typography variant="body2">{bond.displayName}</Typography>
                          <Typography
                            variant="body2"
                            className={`bond-pair-roi ${!bond.isAvailable[chainID] ? "phantom-gold" : ""}`}
                          >
                            {!bond.isAvailable[chainID]
                              ? "Sold Out"
                              : `${bond.bondDiscount && trim(bond.bondDiscount * 100, 2)}%`}
                          </Typography>
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </div> */}
              <Link
                component={NavLink}
                id="swap-nav"
                to="/swap"
                isActive={(match, location) => {
                  return checkPage(match, location, "swap");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" component={SwapIcon} />
                  <Trans>Swap</Trans>
                </Typography>
              </Link>

              <Link
                component={NavLink}
                id="gov-nav"
                to="#"
                isActive={(match, location) => {
                  return checkPage(match, location, "");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" component={GovIcon} />
                  <Trans>Governance</Trans>
                </Typography>
              </Link>

              <div className="dapp-menu-data discounts">
                <div className="bond-discounts">
                  <Link
                    component={NavLink}
                    id="wrap-nav"
                    to={"/wrap"}
                    className={`gov`}
                    isActive={(match, location) => {
                      return checkPage(match, location, "wrap");
                    }}
                  >
                    <Typography variant="body2" class="gov-list">
                      <SvgIcon
                        style={{ height: "15px", width: "15px", marginRight: "5px" }}
                        color="primary"
                        component={WrapIcon}
                      />
                      <Trans>Wrap to gPHM</Trans>
                    </Typography>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Box className="dapp-menu-bottom" display="flex" justifyContent="space-between" flexDirection="column">
          <div className="dapp-menu-external-links">
            {Object.keys(externalUrls).map((link, i) => {
              return (
                <Link key={i} href={`${externalUrls[link].url}`} target="_blank">
                  <Typography variant="h6">{externalUrls[link].icon}</Typography>
                  <Typography variant="h6">{externalUrls[link].title}</Typography>
                </Link>
              );
            })}
          </div>
          <div className="dapp-menu-social">
            <Social />
          </div>
        </Box>
        <SvgIcon className="dapp-curves-icon" color="primary" component={WavesLeftIcon} viewBox="0 0 248 105" />
      </Box>
    </Paper>
  );
}

export default NavContent;

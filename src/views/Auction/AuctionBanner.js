import { Box, Divider, IconButton, Typography, Paper, useTheme } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import copy from "copy-to-clipboard";
import { FileCopyOutlined as ContentCopyIcon } from "@material-ui/icons";
import aPhmLogo from "./../../assets/icons/token-aPHM-alt.png";
import curvesImage from "./../../assets/images/Curves.png";

const AuctionBanner = ({ auctionStatus, tokenPrice, auctionToken }) => {
  const theme = useTheme();

  const handleCopyAddress = e => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    copy(auctionToken);
  };
  return (
    <Box
      component={Paper}
      sx={{
        boxShadow: "0px 0px 64px rgba(119, 34, 252, 0.1)",
        borderRadius: "10px",
        position: "relative",
        minHeight: "100%",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#0C0B17",
          borderRadius: "10px",
          position: "relative",
          borderBottomLeftRadius: "0",
          borderBottomRightRadius: "0",
        }}
      >
        <Box style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}>
          <img src={curvesImage} style={{ height: "auto" }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={aPhmLogo} style={{ width: "60%", height: "auto" }} />
        </Box>
        <Box style={{ position: "absolute", bottom: 0, right: 0, zIndex: 0 }}>
          <img src={curvesImage} style={{ height: "auto", transform: "rotate(180deg)" }} />
        </Box>
      </Box>
      <Box
        sx={{
          textAlign: "center",
          background:
            "linear-gradient(90deg, rgba(22, 20, 41, 0) 0%, #161429 26.64%, #161429 74.23%, rgba(22, 20, 41, 0) 100%)",
          padding: theme.spacing(2, 0),
          borderRadius: "10px",
          borderTopLeftRadius: "0",
          borderTopRightRadius: "0",
        }}
      >
        <Typography variant="h5" color="textSecondary">
          CURRENT PRICE
        </Typography>
        {auctionStatus === "notstarted" ? (
          <Typography variant="h5">Not available yet</Typography>
        ) : tokenPrice ? (
          <Typography variant="h5">{Math.round(tokenPrice * 100) / 100} FRAX</Typography>
        ) : (
          <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <Skeleton width="100px" height="40px" />
          </Box>
        )}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <Box
          sx={{
            backgroundColor: "#0C0B17",
            borderRadius: "10px",
            borderTopLeftRadius: "0",
            borderTopRightRadius: "0",
            padding: theme.spacing(2),
          }}
        >
          <Typography
            variant="body1"
            color="textSecondary"
            style={{ lineHeight: "1.3125rem", marginBottom: theme.spacing(2) }}
          >
            Phantom is a community-owned web3 version of Y-Combinator on Fantom.
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            style={{ lineHeight: "1.3125rem", marginBottom: theme.spacing(2) }}
          >
            A portion of Phantom’s treasury is dedicated to an Accelerator program that accepts up-and-coming DeFi,
            Metaverse, Gaming & Education startups.
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            style={{ lineHeight: "1.3125rem", marginBottom: theme.spacing(2) }}
          >
            Care about adding positive net value to the web3 ecosystem? Backing founders building cool shit? This is for
            you.
          </Typography>
        </Box>
        <Box>
          <Divider style={{ margin: theme.spacing(0, 2) }} />
          <Box
            sx={{
              display: "flex",
              padding: theme.spacing(2),
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box>
              <Typography variant="h6" color="textSecondary">
                TOKEN
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {auctionToken ? (
                  <Typography variant="body1">{auctionToken.slice(0, 13)}...</Typography>
                ) : (
                  <Skeleton width="60px" height="20px" />
                )}
                <IconButton
                  style={{
                    margin: 0,
                    padding: 0,
                  }}
                  onClick={handleCopyAddress}
                >
                  <ContentCopyIcon />
                </IconButton>
              </Box>
            </Box>
            <Box
              sx={{
                textAlign: "right",
              }}
            >
              <Typography variant="h6" color="textSecondary">
                Type
              </Typography>
              <Typography variant="body1">Dutch Auction</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AuctionBanner;

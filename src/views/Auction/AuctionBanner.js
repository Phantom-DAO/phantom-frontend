import { Box, Divider, IconButton, Link, SvgIcon, Typography, Paper, useTheme } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import {
  Folder as FolderIcon,
  Twitter as TwitterIcon,
  Telegram as TelegramIcon,
  FileCopyOutlined as ContentCopyIcon,
} from "@material-ui/icons";
import aPhmLogo from "./../../assets/icons/token-aPHM-alt.png";
import { ReactComponent as DiscordIcon } from "./../../assets/icons/discord.svg";
import curvesImage from "./../../assets/images/Curves.png";

const AuctionBanner = ({ auctionStatus, tokenPrice }) => {
  const theme = useTheme();
  return (
    <Box
      component={Paper}
      sx={{
        boxShadow: "0px 0px 64px rgba(119, 34, 252, 0.1)",
        borderRadius: "10px",
        position: "relative",
        minHeight: "100%",
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
        <Box
          sx={{
            display: "flex",
            marginTop: theme.spacing(2),
            justifyContent: "flex-start",
            flexWrap: "wrap",
            "& a": {
              marginRight: theme.spacing(2),
            },
          }}
        >
          <Link href="https://docs.phantomdao.xyz/" target={"_blank"}>
            <FolderIcon />
          </Link>
          <Link href="https://twitter.com/xPhantomDAO" target={"_blank"}>
            <TwitterIcon />
          </Link>
          <Link href="https://discord.com/invite/ZAQX75htEb" target={"_blank"}>
            <TelegramIcon />
          </Link>
          <Link href="#" target={"_blank"}>
            <SvgIcon color="primary" component={DiscordIcon} />
          </Link>
        </Box>
        <Box
          sx={{
            margin: theme.spacing(4, 0),
          }}
        >
          <Divider />
        </Box>
        <Box
          sx={{
            display: "flex",
            marginTop: theme.spacing(10),
            padding: theme.spacing(1, 0),
            justifyContent: "space-between",
            justifySelf: "space-end",
            bottom: 0,
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
              <Typography variant="body1">0x0cEd05DEe64...</Typography>
              <IconButton
                style={{
                  margin: 0,
                  padding: 0,
                }}
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
              Auction Type
            </Typography>
            <Typography variant="body1">Dutch Auction</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AuctionBanner;

import { Box, Divider, Grid, IconButton, Link, Paper, SvgIcon, Typography, useTheme, Zoom } from "@material-ui/core";
import {
  Folder as FolderIcon,
  Twitter as TwitterIcon,
  Telegram as TelegramIcon,
  FileCopyOutlined as ContentCopyIcon,
} from "@material-ui/icons";
import { useState } from "react";
import "./auction.scss";
import aPhmLogo from "./../../assets/icons/token-aPHM-alt.png";
import { ReactComponent as DiscordIcon } from "./../../assets/icons/discord.svg";
import curvesImage from "./../../assets/images/Curves.png";

const Auction = () => {
  const [zoomed, setZoomed] = useState(false);
  const theme = useTheme();
  return (
    <div id="auction-view">
      <Zoom in={true} onEntered={() => setZoomed(true)}>
        <Box
          sx={{
            marginTop: theme.spacing(4),
            width: "80%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              marginBottom: theme.spacing(2),
            }}
          >
            <Box>
              <Typography variant="h3" color="textPrimary" style={{ fontWeight: "bold" }}>
                aPHM Auction
              </Typography>
              <Typography variant="h6" color="textSecondary">
                Commit FRAX to claim aPHM
              </Typography>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="h6" color="textSecondary">
                TIME LEFT
              </Typography>
              <Typography variant="h4" style={{ fontWeight: "bold", color: "orange" }}>
                1D 17H 0Min
              </Typography>
            </Box>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box
                component={Paper}
                sx={{
                  // padding: theme.spacing(2),
                  border: "solid 1px",
                  borderColor: theme.palette.text,
                  borderRadius: "10px",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#000000",
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
                    backgroundColor: "#161429",
                    padding: theme.spacing(2, 0),
                    borderRadius: "10px",
                    borderTopLeftRadius: "0",
                    borderTopRightRadius: "0",
                  }}
                >
                  <Typography variant="h5" color="textSecondary">
                    CURRENT PRICE
                  </Typography>
                  <Typography variant="h5">2,222 FRAX</Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: "#000000",
                    borderRadius: "10px",
                    position: "relative",
                    borderTopLeftRadius: "0",
                    borderTopRightRadius: "0",
                    padding: theme.spacing(2),
                  }}
                >
                  <Typography variant="body1" color="textSecondary">
                    Phantom is a treasury-backed cccelerator on Fantom. Everything you know and love about
                    community-owned high APY protocols except one important difference. A portion of Phantom’s treasury
                    is dedicated to an Accelerator program that accepts up-and-coming DeFi startups, NFTs and more.
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
                      padding: theme.spacing(1, 0),
                      justifyContent: "space-between",
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
                      <Box>
                        <Typography variant="body1">Dutch Auction</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box
                component={Paper}
                sx={{
                  padding: theme.spacing(2),
                  border: "solid 1px",
                  borderColor: theme.palette.text,
                  borderRadius: "10px",
                }}
              >
                right
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Paper>bottom</Paper>
            </Grid>
          </Grid>
        </Box>
      </Zoom>
    </div>
  );
};

export default Auction;

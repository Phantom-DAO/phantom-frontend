import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Slider,
  SvgIcon,
  TextField,
  Typography,
  useTheme,
  Zoom,
} from "@material-ui/core";
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
import { ReactComponent as DotIcon } from "./../../assets/icons/dot.svg";
import curvesImage from "./../../assets/images/Curves.png";

const Auction = () => {
  const [zoomed, setZoomed] = useState(false);
  const theme = useTheme();

  const [commitment, setCommitment] = useState(0);

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
              <Typography variant="h4" style={{ fontWeight: "bold", color: "#FFC768" }}>
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
                  minHeight: "100%",
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
                    borderTopLeftRadius: "0",
                    borderTopRightRadius: "0",
                    padding: theme.spacing(2),
                  }}
                >
                  <Typography variant="body1" color="textSecondary" style={{ lineHeight: "1.3125rem" }}>
                    Phantom is a treasury-backed accelerator on Fantom. Everything you know and love about
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
            </Grid>
            <Grid item xs={12} md={8}>
              <Box
                component={Paper}
                sx={{
                  padding: theme.spacing(2),
                  border: "solid 1px",
                  borderColor: theme.palette.text,
                  borderRadius: "10px",
                  minHeight: "100%",
                }}
              >
                <Grid container spacing={2} justifyContent="flex-start">
                  <Grid item xs={6} md={3}>
                    <Typography variant="body1" color="textSecondary" style={{ marginBottom: theme.spacing(1) }}>
                      AMOUNT FOR SALE
                    </Typography>
                    <Typography variant="body1">333,333 aPHM</Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography variant="body1" color="textSecondary" style={{ marginBottom: theme.spacing(1) }}>
                      RAISED
                    </Typography>
                    <Typography variant="body1">9,999,999.99 FRAX</Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography variant="body1" color="textSecondary" style={{ marginBottom: theme.spacing(1) }}>
                      REMAINING
                    </Typography>
                    <Typography variant="body1">9,999,999.99 FRAX</Typography>
                  </Grid>
                  <Box
                    component={Grid}
                    item
                    xs={6}
                    md={3}
                    sx={{
                      textAlign: "right",
                    }}
                  >
                    <Typography variant="body1" color="textSecondary" style={{ marginBottom: theme.spacing(1) }}>
                      STATUS
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "right",
                        justifyContent: "flex-end",
                      }}
                    >
                      <SvgIcon>
                        <DotIcon />
                      </SvgIcon>
                      <Typography variant="body1">Ongoing</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Box
                  sx={{
                    width: "100%",
                    minHeight: "400px",
                    backgroundColor: "#000000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: theme.spacing(2),
                  }}
                >
                  GRAPH
                </Box>
                <Grid container spacing={2} justifyContent="flex-start">
                  <Grid item xs={6} md={4}>
                    <Typography variant="body1" color="textSecondary" style={{ marginBottom: theme.spacing(1) }}>
                      AMOUNT
                    </Typography>
                    <Typography variant="body1">1.5 aPHM (minimum)</Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography variant="body1" color="textSecondary" style={{ marginBottom: theme.spacing(1) }}>
                      YOUR REMAINING CAP
                    </Typography>
                    <Typography variant="body1">16,666.65 aPHM</Typography>
                  </Grid>
                  <Box
                    item
                    xs={6}
                    md={4}
                    component={Grid}
                    sx={{
                      textAlign: "right",
                    }}
                  >
                    <Typography variant="body1" color="textSecondary" style={{ marginBottom: theme.spacing(1) }}>
                      MAX
                    </Typography>
                    <Typography variant="body1">4.5 aPHM</Typography>
                  </Box>
                </Grid>
                <Box
                  sx={{
                    marginTop: theme.spacing(1),
                    "& .MuiSlider-rail": {
                      color: "#342915",
                      minHeight: "5px",
                    },
                    "& .MuiSlider-track": {
                      color: "#FFC768",
                      minHeight: "5px",
                    },
                    "& .MuiSlider-thumb": {
                      color: "#FFC768",
                      border: "solid 1px #000000",
                    },
                  }}
                >
                  <Slider defaultValue={2} getAriaValueText={val => `${val} FRAX`} />
                </Box>
                <Box
                  sx={{
                    marginTop: theme.spacing(1),
                    "& .MuiInput-underline::before, & .MuiInput-underline::after": {
                      visibility: "hidden",
                      content: "",
                      display: "none",
                    },
                    "& fieldset": {
                      borderRadius: "30px",
                    },
                    "& .MuiInputBase-root": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      paddingLeft: "10px",
                    },
                  }}
                >
                  <Box
                    component={TextField}
                    type="number"
                    value={commitment}
                    onChange={e => {
                      // need numeric check
                      setCommitment(e.target.value);
                    }}
                    InputProps={{
                      style: {
                        borderRadius: "30px",
                      },
                      endAdornment: (
                        <Box
                          component={InputAdornment}
                          position="start"
                          sx={{
                            position: "absolute",
                            right: "-1.5%",
                            zIndex: 10,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            variant="contained"
                            color="secondary"
                            style={{
                              backgroundColor: "#161429",
                              borderRadius: "10px",
                              padding: "2px 10px",
                              margin: "2px 10px",
                              height: "auto",
                              width: "auto",
                              fontSize: "14px",
                              color: "white",
                            }}
                          >
                            MAX
                          </Button>
                          <Button
                            color="primary"
                            variant="contained"
                            style={{ margin: 0, backgroundColor: "#7722FC", color: "white" }}
                          >
                            COMMIT FRAX
                          </Button>
                        </Box>
                      ),
                    }}
                    sx={{
                      borderRadius: "20px",
                      width: "100%",
                    }}
                  />
                </Box>
                <Box sx={{ marginTop: theme.spacing(1) }}>
                  <Typography variant="body2" color="textSecondary" style={{ lineHeight: "1.3125rem" }}>
                    Your commitment is for the minimum amount of aPHM. As the auction price drops, your commitment will
                    entitle you to claim even more tokens at the end. Final price per token is determined at the end of
                    the auction. Everyone who commits before the end of the auction, claims tokens at the same final
                    price.
                  </Typography>
                </Box>
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

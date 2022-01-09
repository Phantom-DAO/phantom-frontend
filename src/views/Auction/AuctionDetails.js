import {
  Box,
  Grid,
  Paper,
  SvgIcon,
  Typography,
  useTheme,
  Button,
  Slider,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { useState } from "react";
import { ReactComponent as DotIcon } from "./../../assets/icons/dot.svg";

const AuctionDetails = ({ auctionStatus }) => {
  const theme = useTheme();

  const [commitment, setCommitment] = useState(0);

  return (
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
            <SvgIcon style={{ color: auctionStatus === "ongoing" ? "green" : "red" }}>
              <DotIcon />
            </SvgIcon>
            <Typography variant="body1">{auctionStatus === "ongoing" ? "Ongoing" : "Finished"} </Typography>
          </Box>
        </Box>
      </Grid>

      {auctionStatus === "ongoing" ? (
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
      ) : (
        <Box
          sx={{
            width: "100%",
            minHeight: "400px",
            background: "radial-gradient(50% 50% at 50% 50%, #1D0443 0%, #010101 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: theme.spacing(2),
            textAlign: "center",
          }}
        >
          <Box>
            <Typography variant="h6">THIS AUCTION HAS</Typography>
            <Typography variant="h1" style={{ fontWeight: "bold" }}>
              FINISHED
            </Typography>
          </Box>
          <Box sx={{ margin: theme.spacing(4, 0) }}>
            <Typography variant="h6" style={{ color: "#FFC768", lineHeight: "27px", fontWeight: "bold" }}>
              Auction finished successfully
            </Typography>
            <Typography style={{ lineHeight: "27px" }}>You have 333.33 aPHM available to claim</Typography>
          </Box>
          <Box>
            <Button variant="contained" color="primary">
              Claim
            </Button>
          </Box>
        </Box>
      )}

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
                <Button color="primary" variant="contained" style={{ margin: 0 }}>
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
          Your commitment is for the minimum amount of aPHM. As the auction price drops, your commitment will entitle
          you to claim even more tokens at the end. Final price per token is determined at the end of the auction.
          Everyone who commits before the end of the auction, claims tokens at the same final price.
        </Typography>
      </Box>
    </Box>
  );
};

export default AuctionDetails;

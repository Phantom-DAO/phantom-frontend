import { Box, Grid, Paper, SvgIcon, Typography, useTheme, Button } from "@material-ui/core";
import { ReactComponent as DotIcon } from "./../../assets/icons/dot.svg";
import AuctionController from "./AunctionController";
import LineChartAuction from "./LineChartAuction";

const AuctionDetails = ({ auctionStatus }) => {
  const theme = useTheme();

  // sample data for line chart
  const data = [
    {
      name: "AUCTION START",
      "AUCTION PRICE": 6000,
    },
    {
      name: "",
      "AUCTION PRICE": 4398,
    },
    {
      name: "",
      "AUCTION PRICE": 1398,
    },
    {
      name: "AUCTION END",
      "AUCTION PRICE": 800,
    },
  ];

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
            marginTop: theme.spacing(2),
          }}
        >
          <LineChartAuction data={data} />
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            minHeight: "100vh",
            background: "radial-gradient(50% 50% at 50% 50%, #1D0443 0%, #010101 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(2),
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
      {auctionStatus === "ongoing" ? <AuctionController /> : <></>}
    </Box>
  );
};

export default AuctionDetails;

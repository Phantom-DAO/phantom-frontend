import { Box, Typography, useTheme } from "@material-ui/core";

const AuctionTitle = () => {
  const theme = useTheme();
  return (
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
  );
};

export default AuctionTitle;

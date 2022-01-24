import { Box, Typography, useTheme } from "@material-ui/core";
import { useEffect, useState } from "react";
import { durationAsString } from "../../helpers";

const AuctionTitle = ({ endTime, auctionStatus }) => {
  const theme = useTheme();
  const [timeLeft, setTimeLeft] = useState(durationAsString(new Date().getTime(), endTime * 1000));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(durationAsString(new Date().getTime(), endTime * 1000));
    }, 1000);
    return () => clearInterval(interval);
  });
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
          Bootstrap auction
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Commit FRAX to claim aPHM and join the phamily
        </Typography>
      </Box>
      {auctionStatus === "ongoing" && Boolean(endTime) && (
        <Box sx={{ textAlign: "right" }}>
          <Typography variant="h6" color="textSecondary">
            TIME LEFT
          </Typography>
          <Typography variant="h4" style={{ fontWeight: "bold", color: "#FFC768" }}>
            {timeLeft}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default AuctionTitle;

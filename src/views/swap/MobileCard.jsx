import { Box, Typography, CircularProgress, useTheme, Button } from "@material-ui/core";
import "./swap.scss";

const MobileCard = ({ icon, balance, unlocked, onClick, swapText, buttonLabel, loading }) => {
  const theme = useTheme();
  return (
    <Box style={{ padding: "24px " }}>
      <Box className="swap-token">
        {icon}
        <Typography style={{ marginLeft: "5px" }} variant="h6">
          {swapText || ""}
        </Typography>
      </Box>
      <Box style={{ marginTop: "14px" }} className="swap-metric-mobile">
        <Typography variant="p" color="textSecondary">
          BALANCE
        </Typography>
        <Typography variant="p">{balance}</Typography>
      </Box>
      <Box className="swap-metric-mobile">
        <Typography variant="p" color="textSecondary">
          UNLOCKED
        </Typography>
        <Typography variant="p">{unlocked}</Typography>
      </Box>
      <Button
        variant="outlined"
        onClick={onClick}
        color="primary"
        style={{ width: "100%" }}
        size="small"
        disabled={balance === 0}
      >
        {loading && (
          <Box mr={1} mt={1}>
            <CircularProgress size={22} />
          </Box>
        )}
        {buttonLabel}
      </Button>
    </Box>
  );
};

export default MobileCard;

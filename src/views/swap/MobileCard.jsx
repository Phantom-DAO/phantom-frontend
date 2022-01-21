import { Box, Typography, Zoom, SvgIcon, useTheme, Button, useMediaQuery } from "@material-ui/core";
import "./swap.scss";

const MobileCard = ({ icon, balance, unlocked, onApprove, swapText }) => {
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
      <Button variant="outlined" onClick={onApprove} color="primary" style={{ width: "100%" }} size="small">
        Approve
      </Button>
    </Box>
  );
};

export default MobileCard;

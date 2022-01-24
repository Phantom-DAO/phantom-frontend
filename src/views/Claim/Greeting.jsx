import { Box, Button, Paper, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useWeb3Context } from "src/hooks/web3Context";
import { ReactComponent as CheckGold } from "../../assets/icons/check-gold.svg";
import { addresses } from "../../constants";
import "./claim.scss";

const Greeting = ({ isMobileScreen }) => {
  const { chainID } = useWeb3Context();
  const history = useHistory();

  const handleAddFPHM = async () => {
    if (!window.ethereum) return;
    await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20", // Initially only supports ERC20, but eventually more!
        options: {
          address: addresses[chainID].fPHM,
          symbol: "fPHM", // A ticker symbol or shorthand, up to 5 chars.
          decimals: 18, // The number of decimals in the token
          image: "https://i.ibb.co/qCQYxXN/Token-f-PHM-Style-Alt.png",
        },
      },
    });
  };
  return (
    <Paper className="claim-card">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CheckGold />
        <Typography variant="h3" style={{ marginTop: "16px", fontWeight: 600 }}>
          Successfully claimed
        </Typography>
        <Typography variant="subtitle1" style={{ marginTop: "10px" }} color="textSecondary">
          THANKS FOR BEING PART OF THE PHAMILY
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: isMobileScreen ? "column" : "row",
            justifyContent: "space-between",
            marginTop: "24px",
            gap: "24px",
            overflow: "hidden",
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            onClick={() => history.push("/swap")}
            style={{
              fontSize: "16px",
            }}
          >
            Swap fPHM for gPHM
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            style={{
              fontSize: "16px",
            }}
            onClick={handleAddFPHM}
          >
            Add fPHM to wallet
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Greeting;

import { Box, Grid, Typography, useTheme, Button, Slider, TextField, InputAdornment } from "@material-ui/core";
import { useState } from "react";
import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@material-ui/lab";
import { changeFraxApproval } from "../../slices/AuctionSlice";
import { useWeb3Context } from "src/hooks/web3Context";
import { txnButtonText } from "src/slices/PendingTxnsSlice";

const AuctionController = ({ tokenPrice, fraxBalance, onCommitTokens }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { provider, address, chainID } = useWeb3Context();
  const [fraxCommitment, setFraxCommitment] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const maxTokensCommitment = Math.round((fraxBalance / tokenPrice) * 10) / 10;
  const tokensCommitment = Math.round((fraxCommitment / tokenPrice) * 10) / 10;

  const pendingTransactions = useSelector(state => state.pendingTransactions);
  const fraxAllowance = useSelector(state => state.account.auction && state.account.auction.fraxAllowance);
  const isAllowanceDataLoading = fraxAllowance === undefined;
  const needsFraxApproval = fraxCommitment > fraxAllowance;

  const handleSliderChange = (_, value) => {
    setSliderValue(value);
    const fraxShare = (value * fraxBalance) / 100;
    setFraxCommitment(Math.round(fraxShare * 100) / 100);
  };

  const handleInputChange = value => {
    setFraxCommitment(value);
    setSliderValue((value / fraxBalance) * 100);
  };

  const onSeekApproval = async () => {
    await dispatch(changeFraxApproval({ address, provider, networkID: chainID, value: fraxCommitment }));
  };

  return (
    <Box
      sx={{
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        backgroundColor: "#161429",
        borderRadius: "12px",
      }}
    >
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item xs={6} md={4}>
          <Typography variant="body1" color="textSecondary" style={{ marginBottom: theme.spacing(1) }}>
            AMOUNT
          </Typography>
          <Typography variant="body1">{tokensCommitment} aPHM (minimum)</Typography>
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
          <Typography variant="body1">{maxTokensCommitment} aPHM (minimum)</Typography>
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
        <Slider
          defaultValue={0}
          value={sliderValue}
          step={0.1}
          getAriaValueText={val => `${val} FRAX`}
          onChange={handleSliderChange}
        />
      </Box>
      {isAllowanceDataLoading ? (
        <Skeleton height="40px" />
      ) : (
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
            value={fraxCommitment}
            onChange={e => {
              // need numeric check
              handleInputChange(e.target.value);
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
                    disabled={fraxCommitment === fraxBalance}
                    onClick={() => {
                      handleInputChange(fraxBalance);
                    }}
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
                  {needsFraxApproval ? (
                    <Button
                      color="primary"
                      variant="contained"
                      style={{ margin: 0 }}
                      onClick={() => {
                        onSeekApproval();
                      }}
                    >
                      {txnButtonText(pendingTransactions, "approve_tokens", "APPROVE FRAX")}
                    </Button>
                  ) : (
                    <Button
                      color="primary"
                      variant="contained"
                      style={{ margin: 0 }}
                      onClick={() => {
                        onCommitTokens(fraxCommitment);
                      }}
                    >
                      {txnButtonText(pendingTransactions, "commit_tokens", "COMMIT FRAX")}
                    </Button>
                  )}
                </Box>
              ),
            }}
            sx={{
              borderRadius: "20px",
              width: "100%",
            }}
          />
        </Box>
      )}
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

export default AuctionController;

import { Box, Button, CircularProgress, Paper, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { useWeb3Context } from "src/hooks/web3Context";
import { ReactComponent as TokenGold } from "../../assets/icons/token-gold.svg";
import { claimFPHM } from "../../slices/ClaimSlice";
import { success } from "../../slices/MessagesSlice";
import "./claim.scss";
import LoaderButton from "./LoaderButton";

const AllocationCard = ({ status, setStatus, onClaimSuccess }) => {
  const web3Context = useWeb3Context();

  const { address, connect, provider, chainID } = useWeb3Context();
  const claimState = useSelector(s => s.claim);

  const dispatch = useDispatch();
  const handleClaim = async () => {
    await dispatch(claimFPHM({ address, provider, networkID: chainID })).unwrap();
    if (!claimState.error) {
      dispatch(success("You have claimed your fPHM allocation successfully."));
      onClaimSuccess();
    }
  };

  return (
    <>
      {claimState.error && (
        <Paper
          style={{
            padding: "2px",
            paddingLeft: "8px",
            background: "#461919",
            marginBottom: "10px",
          }}
        >
          <Box
            sx={{
              color: "tomato",
              wordBreak: "break-all",
              whiteSpace: "pre-line",
            }}
          >
            <pre
              style={{
                whiteSpace: "pre-line",
              }}
            >
              {JSON.stringify(claimState.error, null, 4)}
            </pre>
          </Box>
        </Paper>
      )}
      <Paper className="claim-card">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Box>
            <Typography variant="p" color="textSecondary">
              YOUR ALLOCATION
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "12px",
                marginTop: "16px",
                alignItems: "center",
              }}
            >
              <TokenGold />
              {!claimState.allocationLoading ? (
                claimState.pendingFPHM === 0 ? (
                  <Typography variant="h3">0 fPHM</Typography>
                ) : (
                  <Typography variant="h3">{claimState.pendingFPHM} fPHM</Typography>
                )
              ) : (
                <Skeleton width="120px" height={28} variant="text" animation="wave"></Skeleton>
              )}
            </Box>
          </Box>

          <Button
            variant="contained"
            color="primary"
            size="medium"
            style={{
              fontSize: "16px",
              minWidth: "100px",
            }}
            onClick={handleClaim}
            disabled={claimState.claimLoading || claimState.pendingFPHM === 0}
          >
            Claim
            <Box ml={1} mt={1}>
              {claimState.claimLoading && <CircularProgress size={22} />}
            </Box>
          </Button>

          {status === "pending" && <LoaderButton />}

          {/* Disabled version of the button which is shown if a user revisits already claimed tokens and there are no token to claim */}
        </Box>
      </Paper>
      <Typography align="center" variant="p" color="textSecondary" style={{ marginTop: "24px", lineHeight: "20px" }}>
        fPHM is vested linearly over 1 year, with 25% unlocked on day 1 of Phantoms release <br />
        <a className="info-link" href="https://medium.com/phantom-dao/specters-rejoice-2b286bb23b64" target="_blank">
          Read more about fPHM
        </a>
      </Typography>
    </>
  );
};

export default AllocationCard;

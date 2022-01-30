import { useTheme, Button } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useWeb3Context } from "../../hooks/web3Context";
import { wrapSPHM, unwrapGPHM, approveSPHM, approveGPHM } from "../../slices/WrapSlice";
import { error } from "../../slices/MessagesSlice";

const Wrap = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { provider, chainID, address } = useWeb3Context();
  // controlled sPHM input
  const [wrapValue, setWrapValue] = useState(0);
  // controlled gPHM input
  const [unwrapValue, setUnwrapValue] = useState(0);
  const { wrapLoading, unwrapLoading, sPHMApprovalLoading, gPHMApprovalLoading } = useSelector(state => state.wrap);
  const { sPHM: sPHMBalance, gPHM: gPHMBalance } = useSelector(state => state.account && state.account.balances);
  const { wrapAllowance, unwrapAllowance } = useSelector(state => state.account && state.account.wrapping);
  const needsSPHMApproval = sPHMBalance > wrapAllowance;
  const needsGPHMApproval = gPHMBalance > unwrapAllowance;
  const { currentIndex } = useSelector(state => state.app);

  const handleApproveSPHM = () => {
    dispatch(approveSPHM({ provider, networkID: chainID, address, value: sPHMBalance }));
  };

  const handleApproveGPHM = () => {
    dispatch(approveGPHM({ provider, networkID: chainID, address, value: gPHMBalance }));
  };

  const handleWrapSPHM = async () => {
    if (isNaN(wrapValue) || wrapValue === 0 || wrapValue === "") {
      return dispatch(error("Please enter a value!"));
    }

    if (wrapValue > sPHMBalance) {
      return dispatch(error("You cannot wrap more than your sPHM balance."));
    }

    await dispatch(wrapSPHM({ address, provider, networkID: chainID, value: wrapValue }));
  };

  const handleUnwrapGPHM = async () => {
    if (isNaN(wrapValue) || wrapValue === 0 || wrapValue === "") {
      return dispatch(error("Please enter a value!"));
    }

    if (wrapValue > sPHMBalance) {
      return dispatch(error("You cannot wrap more than your sPHM balance."));
    }

    await dispatch(unwrapGPHM({ address, provider, networkID: chainID, value: wrapValue }));
  };

  // @todo: add loaders to 'Pending...' buttons
  return (
    <div>
      {needsSPHMApproval ? (
        <Button onClick={handleApproveSPHM} disabled={sPHMBalance === 0}>
          {sPHMApprovalLoading ? "Pending..." : "Approve"}
        </Button>
      ) : (
        <Button onClick={handleWrapSPHM} disabled={sPHMBalance === 0}>
          {wrapLoading ? "Pending..." : "Wrap"}
        </Button>
      )}

      {needsGPHMApproval ? (
        <Button onClick={handleApproveGPHM} disabled={gPHMBalance === 0}>
          {gPHMApprovalLoading ? "Pending..." : "Approve"}
        </Button>
      ) : (
        <Button onClick={handleUnwrapGPHM} disabled={gPHMBalance === 0}>
          {unwrapLoading ? "Pending..." : "Unwrap"}
        </Button>
      )}
    </div>
  );
};

export default Wrap;

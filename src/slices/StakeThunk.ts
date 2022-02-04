import { ethers, BigNumber } from "ethers";
import { addresses } from "../constants";
import { abi as ierc20ABI } from "../abi/IERC20.json";
import { abi as OlympusStakingABI } from "../abi/OlympusStakingv2.json";
import { abi as StakingHelperABI } from "../abi/StakingHelper.json";
import { abi as PhantomStakingABI } from "../abi/PhantomStaking.json";
import { abi as PhantomFinanceABI } from "../abi/PhantomFinance.json";
import { clearPendingTxn, fetchPendingTxns, getStakingTypeText } from "./PendingTxnsSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAccountSuccess, getBalances } from "./AccountSlice";
import { error, info } from "../slices/MessagesSlice";
import { IActionValueAsyncThunk, IChangeApprovalAsyncThunk, IJsonRPCError } from "./interfaces";
import { segmentUA } from "../helpers/userAnalyticHelpers";
import { IERC20, PhantomStaking, PhantomFinance } from "src/typechain";
import { getOrLoadTreasuryAddress } from "./AppSlice";

interface IUAData {
  address: string;
  value: string;
  approved: boolean;
  txHash: string | null;
  type: string | null;
}

function alreadyApprovedToken(token: string, stakeAllowance: BigNumber, unstakeAllowance: BigNumber) {
  // set defaults
  let bigZero = BigNumber.from("0");
  let applicableAllowance = bigZero;

  // determine which allowance to check
  if (token === "phm") {
    applicableAllowance = stakeAllowance;
  } else if (token === "sphm") {
    applicableAllowance = unstakeAllowance;
  }

  // check if allowance exists
  if (applicableAllowance.gt(bigZero)) return true;

  return false;
}

export const changeApproval = createAsyncThunk(
  "stake/changeApproval",
  async ({ token, provider, address, networkID }: IChangeApprovalAsyncThunk, { dispatch, getState }) => {
    if (!provider) {
      dispatch(error("Please connect your wallet!"));
      return;
    }

    const treasuryAddress = await getOrLoadTreasuryAddress({ networkID, provider }, { dispatch, getState });

    const signer = provider.getSigner();
    const phmContract = new ethers.Contract(addresses[networkID].PHM as string, ierc20ABI, signer) as IERC20;
    const sphmContract = new ethers.Contract(addresses[networkID].sPHM as string, ierc20ABI, signer) as IERC20;
    let approveTx;
    let stakeAllowance = await phmContract.allowance(address, treasuryAddress);
    let unstakeAllowance = await sphmContract.allowance(address, treasuryAddress);

    // return early if approval has already happened
    if (alreadyApprovedToken(token, stakeAllowance, unstakeAllowance)) {
      dispatch(info("Approval completed."));
      return dispatch(
        fetchAccountSuccess({
          staking: {
            ohmStake: +stakeAllowance,
            ohmUnstake: +unstakeAllowance,
          },
        }),
      );
    }

    try {
      if (token === "phm") {
        // won't run if stakeAllowance > 0
        approveTx = await phmContract.approve(
          treasuryAddress,
          ethers.utils.parseUnits("1000000000", "ether").toString(),
        );
      } else if (token === "sphm") {
        approveTx = await sphmContract.approve(
          treasuryAddress,
          ethers.utils.parseUnits("1000000000", "ether").toString(),
        );
      }

      const text = "Approve " + (token === "phm" ? "Staking" : "Unstaking");
      const pendingTxnType = token === "phm" ? "approve_staking" : "approve_unstaking";
      if (approveTx) {
        dispatch(fetchPendingTxns({ txnHash: approveTx.hash, text, type: pendingTxnType }));

        await approveTx.wait();
      }
    } catch (e: unknown) {
      dispatch(error((e as IJsonRPCError).message));
      return;
    } finally {
      if (approveTx) {
        dispatch(clearPendingTxn(approveTx.hash));
      }
    }

    // go get fresh allowances
    stakeAllowance = await phmContract.allowance(address, treasuryAddress);
    unstakeAllowance = await sphmContract.allowance(address, treasuryAddress);

    return dispatch(
      fetchAccountSuccess({
        staking: {
          ohmStakeAllowance: +stakeAllowance,
          ohmUnstakeAllowance: +unstakeAllowance,
        },
      }),
    );
  },
);

export const changeStake = createAsyncThunk(
  "stake/changeStake",
  async ({ action, value, provider, address, networkID }: IActionValueAsyncThunk, { dispatch }) => {
    if (!provider) {
      dispatch(error("Please connect your wallet!"));
      return;
    }

    const signer = provider.getSigner();
    const staking = new ethers.Contract(
      addresses[networkID].PhantomFinance as string,
      PhantomFinanceABI,
      signer,
    ) as PhantomFinance;

    let stakeTx;
    let uaData: IUAData = {
      address: address,
      value: value,
      approved: true,
      txHash: null,
      type: null,
    };
    try {
      if (action === "stake") {
        uaData.type = "stake";
        stakeTx = await staking.stake(ethers.utils.parseUnits(value, "ether").toString());
      } else {
        uaData.type = "unstake";
        stakeTx = await staking.unstake(ethers.utils.parseUnits(value, "ether").toString());
      }
      const pendingTxnType = action === "stake" ? "staking" : "unstaking";
      uaData.txHash = stakeTx.hash;
      dispatch(fetchPendingTxns({ txnHash: stakeTx.hash, text: getStakingTypeText(action), type: pendingTxnType }));
      await stakeTx.wait();
    } catch (e: unknown) {
      uaData.approved = false;
      const rpcError = e as IJsonRPCError;
      if (rpcError.code === -32603 && rpcError.message.indexOf("ds-math-sub-underflow") >= 0) {
        dispatch(
          error("You may be trying to stake more than your balance! Error code: 32603. Message: ds-math-sub-underflow"),
        );
      } else {
        dispatch(error(rpcError.message));
      }
      return;
    } finally {
      if (stakeTx) {
        dispatch(clearPendingTxn(stakeTx.hash));
      }
    }
    dispatch(getBalances({ address, networkID, provider }));
  },
);

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Contract } from "ethers";
import PhantomFoundersAbi from "../abi/PhantomFounders.json";
import PhantomLaunchAbi from "../abi/PhantomLaunch.json";
import { addresses } from "../constants";
import { setAll } from "../helpers";
import { getBalances } from "./AccountSlice";
import { IBaseAddressAsyncThunk } from "./interfaces";
import { fetchPendingTxns } from "./PendingTxnsSlice";

export type IClaimSlice = {
  pendingFPHM: string;
  claimLoading: boolean;
  allocationLoading: boolean;
  error: any;
};

const initialState: IClaimSlice = {
  pendingFPHM: "0",
  claimLoading: false,
  error: null,
  allocationLoading: false,
};

export const getFPHMAllocation = createAsyncThunk(
  "claim/getFPHMAllocation",
  async ({ address, networkID, provider }: IBaseAddressAsyncThunk) => {
    // const phantomStorage = new Contract(addresses[networkID].PhantomStorage, PhantomStorageAbi, provider.getSigner());

    // const pendingFPHM = await phantomStorage.getUint(
    //   ethers.utils.keccak256(
    //     ethers.utils.solidityPack(["string", "address"], ["phantom.founder.vesting.initialAmount", address]),
    //   ),
    // );

    const phantomFounders = new Contract(
      addresses[networkID].PhantomFounders,
      PhantomFoundersAbi,
      provider.getSigner(),
    );

    const pendingFPHM = await phantomFounders.remainingAllocation(address);

    return {
      pendingFPHM: +pendingFPHM.toString() / 1e18,
    };
  },
);

export const claimFPHM = createAsyncThunk(
  "claim/fphm",
  async ({ address, networkID, provider }: IBaseAddressAsyncThunk, { dispatch }) => {
    const phantomLaunch = new Contract(addresses[networkID].PhantomLaunch, PhantomLaunchAbi, provider.getSigner());

    const tx = await phantomLaunch.claimFPHM();
    if (tx) {
      await dispatch(fetchPendingTxns({ txnHash: tx.hash, text: "Pending...", type: "claim_tokens" }));
      await tx.wait();
    }

    await dispatch(getBalances({ address, networkID, provider }));

    return {
      pendingFPHM: 0,
    };
  },
);

const claimSlice = createSlice({
  name: "whitelistClaim",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(claimFPHM.pending, state => {
        state.claimLoading = true;
        state.error = null;
      })
      .addCase(claimFPHM.fulfilled, (state, action) => {
        setAll(state, action.payload || {});
        state.claimLoading = false;
      })
      .addCase(claimFPHM.rejected, (state, { error }) => {
        state.claimLoading = false;
        state.error = error.message;
      })
      .addCase(getFPHMAllocation.pending, (state, action) => {
        setAll(state, action.payload || {});
        state.allocationLoading = true;
      })
      .addCase(getFPHMAllocation.fulfilled, (state, action) => {
        setAll(state, action.payload || {});
        state.allocationLoading = false;
      });
  },
});

export default claimSlice.reducer;

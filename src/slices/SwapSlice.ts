import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Contract, utils } from "ethers";
import PhantomFoundersAbi from "../abi/PhantomFounders.json";
import PhantomLaunchAbi from "../abi/PhantomLaunch.json";
import { abi as ierc20ABI } from "../abi/IERC20.json";
import { addresses } from "../constants";
import { setAll } from "../helpers";
import { error, success } from "./MessagesSlice";
import { IBaseAddressAsyncThunk, IValueAsyncThunk, IJsonRPCError } from "./interfaces";
import { fetchPendingTxns, clearPendingTxn } from "./PendingTxnsSlice";
import { getOrLoadTreasuryAddress } from "./AppSlice";

export type ISwapSlice = {
  balancesLoading: boolean;
  approveAPHMLoading: boolean;
  approveFPHMLoading: boolean;
  FPHMToGPHMLoading: boolean;
  APHMToPHMLoading: boolean;
  unlockedFPHM: number;
  fPHMBalance: number;
  aPHMBalance: number;
  fPHMAllowance: number;
  aPHMAllowance: number;
  error: any;
};

const initialState: ISwapSlice = {
  balancesLoading: false,
  approveAPHMLoading: false,
  approveFPHMLoading: false,
  APHMToPHMLoading: false,
  FPHMToGPHMLoading: false,
  error: null,
  unlockedFPHM: 0,
  fPHMBalance: 0,
  aPHMBalance: 0,
  fPHMAllowance: 0,
  aPHMAllowance: 0,
};

export const loadSwapBalances = createAsyncThunk(
  "swap/loadSwapBalances",
  async ({ address, networkID, provider }: IBaseAddressAsyncThunk, { dispatch, getState }) => {
    const phantomFounders = new Contract(
      addresses[networkID].PhantomFounders,
      PhantomFoundersAbi,
      provider.getSigner(),
    );
    const fPHM = new Contract(addresses[networkID].fPHM, ierc20ABI, provider.getSigner());
    const aPHM = new Contract(addresses[networkID].aPHM, ierc20ABI, provider.getSigner());
    const phantomTreasuryAddress = await getOrLoadTreasuryAddress({ networkID, provider }, { dispatch, getState });
    const [unlockedFPHM, fPHMBalance, fPHMAllowance, aPHMBalance, aPHMAllowance] = await Promise.all([
      phantomFounders.unclaimedBalance(address.toLowerCase()),
      fPHM.balanceOf(address),
      fPHM.allowance(address, phantomTreasuryAddress),
      aPHM.balanceOf(address),
      aPHM.allowance(address, phantomTreasuryAddress),
    ]);

    return {
      unlockedFPHM: +unlockedFPHM.toString() / 1e18,
      fPHMBalance: +fPHMBalance.toString() / 1e18,
      fPHMAllowance: +fPHMAllowance.toString() / 1e18,
      aPHMBalance: +aPHMBalance.toString() / 1e18,
      aPHMAllowance: +aPHMAllowance.toString() / 1e18,
    };
  },
);

export const approveAPHM = createAsyncThunk(
  "stake/approveAPHM",
  async ({ provider, address, networkID, value }: IValueAsyncThunk, { dispatch, getState }) => {
    const aPHM = new Contract(addresses[networkID].aPHM as string, ierc20ABI, provider.getSigner());
    const phantomTreasuryAddress = await getOrLoadTreasuryAddress({ networkID, provider }, { dispatch, getState });
    try {
      const tx = await aPHM.approve(phantomTreasuryAddress, utils.parseEther(value.toString()).toString());
      if (tx) {
        await tx.wait();
      }
    } catch (e: unknown) {
      const err = (e as IJsonRPCError).message;
      dispatch(error(err));
      return { error: err };
    }

    // fresh allowance
    const aPHMAllowance = await aPHM.allowance(address, phantomTreasuryAddress);
    return {
      aPHMAllowance: +aPHMAllowance.toString() / 1e18,
    };
  },
);

export const approveFPHM = createAsyncThunk(
  "stake/approveFPHM",
  async ({ provider, address, networkID, value }: IValueAsyncThunk, { dispatch, getState }) => {
    const fPHM = new Contract(addresses[networkID].fPHM as string, ierc20ABI, provider.getSigner());
    const phantomTreasuryAddress = await getOrLoadTreasuryAddress({ networkID, provider }, { dispatch, getState });
    try {
      const tx = await fPHM.approve(phantomTreasuryAddress, utils.parseEther(value.toString()).toString());
      if (tx) {
        await tx.wait();
      }
    } catch (e: unknown) {
      dispatch(error((e as IJsonRPCError).message));
      return;
    }

    // fresh allowance
    const fPHMAllowance = await fPHM.allowance(address, phantomTreasuryAddress);
    return {
      fPHMAllowance: +fPHMAllowance.toString() / 1e18,
    };
  },
);

export const swapAPHMToPHM = createAsyncThunk(
  "swap/APHMoPHM",
  async ({ address, networkID, provider }: IBaseAddressAsyncThunk, { dispatch }) => {
    const phantomLaunch = new Contract(addresses[networkID].PhantomLaunch, PhantomLaunchAbi, provider.getSigner());
    try {
      const tx = await phantomLaunch.swapAPHM();
      if (tx) {
        await tx.wait();
      }
    } catch (e) {
      console.log("swap/APHMoPHM: ", e);
      const err = e as IJsonRPCError;
      const message = err.data ? err.data.message : err.message;
      dispatch(error(message));
      return { error: message };
    }
    await dispatch(loadSwapBalances({ address, networkID, provider }));
    dispatch(success("Transaction successful"));
  },
);

export const swapFPHMToGPHM = createAsyncThunk(
  "swap/FPHMToGPHM",
  async ({ address, networkID, provider }: IBaseAddressAsyncThunk, { dispatch }) => {
    const phantomLaunch = new Contract(addresses[networkID].PhantomLaunch, PhantomLaunchAbi, provider.getSigner());
    try {
      const tx = await phantomLaunch.exerciseFPHM();
      if (tx) {
        await tx.wait();
      }
    } catch (e) {
      console.log("swap/FPHMToGPHM: ", e);
      const err = e as IJsonRPCError;
      const message = err.data ? err.data.message : err.message;
      dispatch(error(message));
      return { error: message };
    }
    await dispatch(loadSwapBalances({ address, networkID, provider }));
    dispatch(success("Transaction successful"));
  },
);

const swapSlice = createSlice({
  name: "tokensSwap",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadSwapBalances.pending, state => {
        state.balancesLoading = true;
        state.error = null;
      })
      .addCase(loadSwapBalances.fulfilled, (state, action) => {
        setAll(state, action.payload || {});
        state.balancesLoading = false;
      })
      .addCase(loadSwapBalances.rejected, (state, { error }) => {
        state.balancesLoading = false;
        state.error = error.message;
      })
      .addCase(approveAPHM.pending, state => {
        state.approveAPHMLoading = true;
        state.error = null;
      })
      .addCase(approveAPHM.fulfilled, (state, action) => {
        setAll(state, action.payload || {});
        state.approveAPHMLoading = false;
      })
      .addCase(approveAPHM.rejected, (state, { error }) => {
        state.approveAPHMLoading = false;
        state.error = error.message;
      })
      .addCase(approveFPHM.pending, state => {
        state.approveFPHMLoading = true;
        state.error = null;
      })
      .addCase(approveFPHM.fulfilled, (state, action) => {
        setAll(state, action.payload || {});
        state.approveFPHMLoading = false;
      })
      .addCase(approveFPHM.rejected, (state, { error }) => {
        state.approveFPHMLoading = false;
        state.error = error.message;
      })
      .addCase(swapAPHMToPHM.pending, state => {
        state.APHMToPHMLoading = true;
        state.error = null;
      })
      .addCase(swapAPHMToPHM.fulfilled, state => {
        state.APHMToPHMLoading = false;
      })
      .addCase(swapAPHMToPHM.rejected, (state, { error }) => {
        state.APHMToPHMLoading = false;
        state.error = error.message;
      })
      .addCase(swapFPHMToGPHM.pending, state => {
        state.FPHMToGPHMLoading = true;
        state.error = null;
      })
      .addCase(swapFPHMToGPHM.fulfilled, state => {
        state.FPHMToGPHMLoading = false;
      })
      .addCase(swapFPHMToGPHM.rejected, (state, { error }) => {
        state.FPHMToGPHMLoading = false;
        state.error = error.message;
      });
  },
});

export default swapSlice.reducer;

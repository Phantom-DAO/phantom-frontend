import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Contract, utils } from "ethers";
import PhantomFinanceAbi from "../abi/PhantomFinance.json";
import { abi as ierc20Abi } from "../abi/IERC20.json";
import { addresses } from "../constants";
import { setAll } from "../helpers";
import { getBalances, loadAccountDetails } from "./AccountSlice";
import { error } from "./MessagesSlice";
import { IValueAsyncThunk, IJsonRPCError } from "./interfaces";

export type IWrapSlice = {
  wrapLoading: boolean;
  unwrapLoading: boolean;
  sPHMApprovalLoading: boolean;
  gPHMApprovalLoading: boolean;
  error: any;
};

const initialState: IWrapSlice = {
  wrapLoading: false,
  unwrapLoading: false,
  sPHMApprovalLoading: false,
  gPHMApprovalLoading: false,
  error: null,
};

export const approveSPHM = createAsyncThunk(
  "stake/approveSPHM",
  async ({ provider, address, networkID, value }: IValueAsyncThunk, { dispatch }) => {
    const sPHM = new Contract(addresses[networkID].sPHM as string, ierc20Abi, provider.getSigner());
    try {
      const tx = await sPHM.approve(addresses[networkID].PhantomStaking, utils.parseEther(value.toString()).toString());
      if (tx) {
        await tx.wait();
      }
    } catch (e: unknown) {
      const err = (e as IJsonRPCError).message;
      dispatch(error(err));
      return { error: err };
    }
    // refresh wrapAllowance/unwrapAllowance
    dispatch(loadAccountDetails({ address, networkID, provider }));
  },
);

export const wrapSPHM = createAsyncThunk(
  "wrap/wrapSPHM",
  async ({ networkID, provider, address, value }: IValueAsyncThunk, { dispatch }) => {
    try {
      const phantomFinance = new Contract(addresses[networkID].PhantomFinance, PhantomFinanceAbi, provider.getSigner());
      const tx = await phantomFinance.wrap(utils.parseEther(value.toString()).toString());
      if (tx) {
        await tx.wait();
      }
    } catch (e: unknown) {
      const err = (e as IJsonRPCError).message;
      dispatch(error(err));
      return { error: err };
    }
    // reload sPHM/gPHM balances
    dispatch(getBalances({ address, networkID, provider }));
  },
);

export const approveGPHM = createAsyncThunk(
  "stake/approveGPHM",
  async ({ provider, address, networkID, value }: IValueAsyncThunk, { dispatch }) => {
    const gPHM = new Contract(addresses[networkID].gPHM as string, ierc20Abi, provider.getSigner());
    try {
      const tx = await gPHM.approve(addresses[networkID].PhantomStaking, utils.parseEther(value.toString()).toString());
      if (tx) {
        await tx.wait();
      }
    } catch (e: unknown) {
      const err = (e as IJsonRPCError).message;
      dispatch(error(err));
      return { error: err };
    }
    // refresh wrapAllowance/unwrapAllowance
    dispatch(loadAccountDetails({ address, networkID, provider }));
  },
);

export const unwrapGPHM = createAsyncThunk(
  "wrap/unwrapGPHM",
  async ({ networkID, provider, address, value }: IValueAsyncThunk, { dispatch }) => {
    try {
      const phantomFinance = new Contract(addresses[networkID].PhantomFinance, PhantomFinanceAbi, provider.getSigner());
      const tx = await phantomFinance.unstake(utils.parseEther(value.toString()).toString());
      if (tx) {
        await tx.wait();
      }
    } catch (e: unknown) {
      const err = (e as IJsonRPCError).message;
      dispatch(error(err));
      return { error: err };
    }
    // reload sPHM/gPHM balances
    dispatch(getBalances({ address, networkID, provider }));
  },
);

const wrapSlice = createSlice({
  name: "whitelistWrap",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(wrapSPHM.pending, state => {
        state.wrapLoading = true;
        state.error = null;
      })
      .addCase(wrapSPHM.fulfilled, (state, action) => {
        setAll(state, action.payload || {});
        state.wrapLoading = false;
      })
      .addCase(wrapSPHM.rejected, (state, { error }) => {
        state.wrapLoading = false;
        state.error = error.message;
      })
      .addCase(unwrapGPHM.pending, (state, action) => {
        setAll(state, action.payload || {});
        state.unwrapLoading = true;
      })
      .addCase(unwrapGPHM.fulfilled, (state, action) => {
        setAll(state, action.payload || {});
        state.unwrapLoading = false;
      })
      .addCase(unwrapGPHM.rejected, (state, { error }) => {
        state.unwrapLoading = false;
        state.error = error.message;
      })
      .addCase(approveSPHM.pending, (state, action) => {
        state.sPHMApprovalLoading = true;
      })
      .addCase(approveSPHM.fulfilled, (state, action) => {
        setAll(state, action.payload || {});
        state.sPHMApprovalLoading = false;
      })
      .addCase(approveSPHM.rejected, (state, { error }) => {
        state.sPHMApprovalLoading = false;
        state.error = error.message;
      })
      .addCase(approveGPHM.pending, (state, action) => {
        state.gPHMApprovalLoading = true;
      })
      .addCase(approveGPHM.fulfilled, (state, action) => {
        setAll(state, action.payload || {});
        state.gPHMApprovalLoading = false;
      })
      .addCase(approveGPHM.rejected, (state, { error }) => {
        state.gPHMApprovalLoading = false;
        state.error = error.message;
      });
  },
});

export default wrapSlice.reducer;

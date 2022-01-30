import { BigNumber, BigNumberish, ethers } from "ethers";
import { addresses } from "../constants";
import { abi as ierc20Abi } from "../abi/IERC20.json";
import { abi as AuctionAbi } from "../abi/auction.json";
import { abi as sOHMv2 } from "../abi/sOhmv2.json";
import { abi as fuseProxy } from "../abi/FuseProxy.json";
import { abi as wsOHM } from "../abi/wsOHM.json";

import { bnToNum, setAll } from "../helpers";

import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";
import { IBaseAddressAsyncThunk, ICalcUserBondDetailsAsyncThunk } from "./interfaces";
import { FuseProxy, IERC20, SOhmv2, WsOHM } from "src/typechain";

interface IUserBalances {
  balances: {
    ohm: string;
    sohm: string;
    fsohm: string;
    wsohm: string;
    wsohmAsSohm: string;
    pool: string;
  };
}

export const getBalances = createAsyncThunk(
  "account/getBalances",
  async ({ address, networkID, provider }: IBaseAddressAsyncThunk) => {
    const fraxContract = new ethers.Contract(addresses[networkID].frax as string, ierc20Abi, provider) as IERC20;
    const sPHM = new ethers.Contract(addresses[networkID].sPHM as string, ierc20Abi, provider) as IERC20;
    const gPHM = new ethers.Contract(addresses[networkID].gPHM as string, ierc20Abi, provider) as IERC20;
    const [fraxBalance, sPHMBalance, gPHMBalance] = await Promise.all([
      fraxContract.balanceOf(address),
      sPHM.balanceOf(address),
      gPHM.balanceOf(address),
    ]);

    return {
      balances: {
        frax: +fraxBalance.toString() / 1e18,
        sPHM: +sPHMBalance.toString() / 1e18,
        gPHM: +gPHMBalance.toString() / 1e18,
      },
    };
  },
);

interface IUserAccountDetails {
  auction: {
    fraxAllowance: number;
    tokensClaimable: number;
  };
  wrapping: {
    wrapAllowance: number;
    unwrapAllowance: number;
  };
}

export const loadAccountDetails = createAsyncThunk(
  "account/loadAccountDetails",
  async ({ networkID, provider, address }: IBaseAddressAsyncThunk, { dispatch }) => {
    const fraxContract = new ethers.Contract(addresses[networkID].frax, ierc20Abi, provider);
    const auctionContract = new ethers.Contract(addresses[networkID].PhantomAuction as string, AuctionAbi, provider);
    const sPHM = new ethers.Contract(addresses[networkID].sPHM as string, ierc20Abi, provider);
    const gPHM = new ethers.Contract(addresses[networkID].gPHM as string, ierc20Abi, provider);
    const [fraxAllowance, tokensClaimable, wrapAllowance, unwrapAllowance] = await Promise.all([
      fraxContract.allowance(address, addresses[networkID].PhantomAuction),
      auctionContract.tokensClaimable(address),
      sPHM.allowance(address, addresses[networkID].PhantomStaking),
      gPHM.allowance(address, addresses[networkID].PhantomStaking),
    ]);

    // const ohmContract = new ethers.Contract(addresses[networkID].OHM_ADDRESS as string, ierc20Abi, provider) as IERC20;
    // const stakeAllowance = await ohmContract.allowance(address, addresses[networkID].STAKING_HELPER_ADDRESS);

    // const sohmContract = new ethers.Contract(addresses[networkID].SOHM_ADDRESS as string, sOHMv2, provider) as SOhmv2;
    // const unstakeAllowance = await sohmContract.allowance(address, addresses[networkID].STAKING_ADDRESS);
    // const poolAllowance = await sohmContract.allowance(address, addresses[networkID].PT_PRIZE_POOL_ADDRESS);
    // const wrapAllowance = await sohmContract.allowance(address, addresses[networkID].WSOHM_ADDRESS);

    // const wsohmContract = new ethers.Contract(addresses[networkID].WSOHM_ADDRESS as string, wsOHM, provider) as WsOHM;
    // const unwrapAllowance = await wsohmContract.allowance(address, addresses[networkID].WSOHM_ADDRESS);

    await dispatch(getBalances({ address, networkID, provider }));

    return {
      auction: {
        fraxAllowance: bnToNum(fraxAllowance) / Math.pow(10, 18),
        tokensClaimable: bnToNum(tokensClaimable) / Math.pow(10, 18),
      },
      // staking: {
      //   ohmStake: +stakeAllowance,
      //   ohmUnstake: +unstakeAllowance,
      // },
      wrapping: {
        wrapAllowance: +wrapAllowance.toString() / 1e18,
        unwrapAllowance: +unwrapAllowance.toString() / 1e18,
      },
      // pooling: {
      //   sohmPool: +poolAllowance,
      // },
    };
  },
);

export interface IUserBondDetails {
  allowance: number;
  interestDue: number;
  bondMaturationBlock: number;
  pendingPayout: string; //Payout formatted in gwei.
}
export const calculateUserBondDetails = createAsyncThunk(
  "account/calculateUserBondDetails",
  async ({ address, bond, networkID, provider }: ICalcUserBondDetailsAsyncThunk) => {
    if (!address) {
      return {
        bond: "",
        displayName: "",
        bondIconSvg: "",
        isLP: false,
        allowance: 0,
        balance: "0",
        interestDue: 0,
        bondMaturationBlock: 0,
        pendingPayout: "",
      };
    }
    // dispatch(fetchBondInProgress());

    // Calculate bond details.
    const bondContract = bond.getContractForBond(networkID, provider);
    const reserveContract = bond.getContractForReserve(networkID, provider);

    let pendingPayout, bondMaturationBlock;

    const bondDetails = await bondContract.bondInfo(address);
    let interestDue: BigNumberish = Number(bondDetails.payout.toString()) / Math.pow(10, 9);
    bondMaturationBlock = +bondDetails.vesting + +bondDetails.lastBlock;
    pendingPayout = await bondContract.pendingPayoutFor(address);

    let allowance,
      balance = BigNumber.from(0);
    allowance = await reserveContract.allowance(address, bond.getAddressForBond(networkID));
    balance = await reserveContract.balanceOf(address);
    // formatEthers takes BigNumber => String
    const balanceVal = ethers.utils.formatEther(balance);
    // balanceVal should NOT be converted to a number. it loses decimal precision
    return {
      bond: bond.name,
      displayName: bond.displayName,
      bondIconSvg: bond.bondIconSvg,
      isLP: bond.isLP,
      allowance: Number(allowance.toString()),
      balance: balanceVal,
      interestDue,
      bondMaturationBlock,
      pendingPayout: ethers.utils.formatUnits(pendingPayout, "gwei"),
    };
  },
);

interface IAccountSlice extends IUserAccountDetails, IUserBalances {
  bonds: { [key: string]: IUserBondDetails };
  loading: boolean;
}

const initialState: IAccountSlice = {
  loading: false,
  bonds: {},
  balances: { ohm: "", sohm: "", wsohmAsSohm: "", wsohm: "", fsohm: "", pool: "" },
  auction: { fraxAllowance: 0, tokensClaimable: 0 },
  wrapping: { wrapAllowance: 0, unwrapAllowance: 0 },
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    fetchAccountSuccess(state, action) {
      setAll(state, action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadAccountDetails.pending, state => {
        state.loading = true;
      })
      .addCase(loadAccountDetails.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(loadAccountDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })
      .addCase(getBalances.pending, state => {
        state.loading = true;
      })
      .addCase(getBalances.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(getBalances.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })
      .addCase(calculateUserBondDetails.pending, state => {
        state.loading = true;
      })
      .addCase(calculateUserBondDetails.fulfilled, (state, action) => {
        if (!action.payload) return;
        const bond = action.payload.bond;
        state.bonds[bond] = action.payload;
        state.loading = false;
      })
      .addCase(calculateUserBondDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      });
  },
});

export default accountSlice.reducer;

export const { fetchAccountSuccess } = accountSlice.actions;

const baseInfo = (state: RootState) => state.account;

export const getAccountState = createSelector(baseInfo, account => account);

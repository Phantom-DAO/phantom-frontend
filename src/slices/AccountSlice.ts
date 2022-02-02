import { BigNumber, BigNumberish, ethers } from "ethers";
import { addresses } from "../constants";
import { abi as ierc20Abi } from "../abi/IERC20.json";
import { abi as AuctionAbi } from "../abi/auction.json";
import { bnToNum, setAll } from "../helpers";
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";
import { IBaseAddressAsyncThunk, ICalcUserBondDetailsAsyncThunk } from "./interfaces";
import { IERC20 } from "src/typechain";
import { getOrLoadTreasuryAddress } from "./AppSlice";

interface IUserBalances {
  balances: {
    frax: number;
    sPHM: number;
    gPHM: number;
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
        sPHM: ethers.utils.formatUnits(sPHMBalance, "gwei"),
        gPHM: ethers.utils.formatUnits(gPHMBalance, "gwei"),
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
  async ({ networkID, provider, address }: IBaseAddressAsyncThunk, { dispatch, getState }) => {
    const fraxContract = new ethers.Contract(addresses[networkID].frax, ierc20Abi, provider);
    const auctionContract = new ethers.Contract(addresses[networkID].PhantomAuction as string, AuctionAbi, provider);
    const sPHM = new ethers.Contract(addresses[networkID].sPHM as string, ierc20Abi, provider);
    const gPHM = new ethers.Contract(addresses[networkID].gPHM as string, ierc20Abi, provider);
    const phantomTreasuryAddress = await getOrLoadTreasuryAddress({ networkID, provider }, { dispatch, getState });

    const [fraxAllowance, tokensClaimable, wrapAllowance, unwrapAllowance] = await Promise.all([
      fraxContract.allowance(address, addresses[networkID].PhantomAuction),
      auctionContract.tokensClaimable(address),
      sPHM.allowance(address, phantomTreasuryAddress),
      gPHM.allowance(address, phantomTreasuryAddress),
    ]);

    await dispatch(getBalances({ address, networkID, provider }));
    console.log("111111 ", +unwrapAllowance);
    return {
      auction: {
        fraxAllowance: bnToNum(fraxAllowance) / Math.pow(10, 18),
        tokensClaimable: bnToNum(tokensClaimable) / Math.pow(10, 18),
      },
      wrapping: {
        wrapAllowance: ethers.utils.formatUnits(wrapAllowance, "gwei"),
        unwrapAllowance: ethers.utils.formatUnits(unwrapAllowance, "gwei"),
      },
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
  balances: { frax: 0, sPHM: 0, gPHM: 0 },
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

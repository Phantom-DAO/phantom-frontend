import { ethers, Contract } from "ethers";
import { addresses } from "../constants";
import { abi as OlympusStakingv2ABI } from "../abi/OlympusStakingv2.json";
import PhantomStorageAbi from "../abi/PhantomStorage.json";
import { abi as sOHMv2 } from "../abi/sOhmv2.json";
import { setAll, getTokenPrice, getMarketPrice } from "../helpers";
import apollo from "../lib/apolloClient.js";
import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "src/store";
import { IBaseAsyncThunk } from "./interfaces";
import { abi as ierc20Abi } from "../abi/IERC20.json";
import { abi as sPHMABI } from "../abi/sPHM.json";
import { IERC20, SPHM } from "src/typechain";

const initialState = {
  phantomTreasuryAddress: "",
  loading: false,
  loadingMarketPrice: false,
  apy: "",
  tvl: "",
  fiveDayRate: "",
};

/**
 * get phantomTreasuryAddress from app state or load it from the contract using the async thunk
 */
export const getOrLoadTreasuryAddress = async ({ networkID, provider }: any, { dispatch, getState }: any) => {
  const { app: appState } = getState();
  if (!appState?.phantomTreasuryAddress) {
    return await loadTreasuryAddress({ networkID, provider });
  }
  return appState?.phantomTreasuryAddress;
};

export const loadTreasuryAddress = async ({ networkID, provider }: any) => {
  const phantomStorage = new Contract(addresses[networkID].PhantomStorage, PhantomStorageAbi, provider.getSigner());
  const phantomTreasuryAddress = await phantomStorage.getAddress(
    ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["phantom.contracts.treasury"])),
  );
  return phantomTreasuryAddress;
};

export const loadAppDetails = createAsyncThunk(
  "app/loadAppDetails",
  async ({ networkID, provider }: IBaseAsyncThunk, { dispatch }) => {
    let marketPrice;
    try {
      // const originalPromiseResult = await dispatch(
      //   loadMarketPrice({ networkID: networkID, provider: provider }),
      // ).unwrap();
      // marketPrice = originalPromiseResult?.marketPrice;
    } catch (rejectedValueOrSerializedError) {
      // handle error here
      console.error("Returned a null response from dispatch(loadMarketPrice)");
      return;
    }

    if (!provider) {
      console.error("failed to connect to provider, please connect your wallet");
      return {
        marketPrice,
      };
    }

    const [currentBlock, phantomTreasuryAddress] = await Promise.all([
      provider.getBlockNumber(),
      loadTreasuryAddress({ networkID, provider }),
    ]);

    const sPHMContract = new ethers.Contract(addresses[networkID].sPHM as string, sPHMABI, provider) as SPHM;
    const gPHMContract = new ethers.Contract(addresses[networkID].gPHM as string, ierc20Abi, provider) as IERC20;
    const fPHMContract = new ethers.Contract(addresses[networkID].fPHM as string, ierc20Abi, provider) as IERC20;
    const PHMContract = new ethers.Contract(addresses[networkID].PHM as string, ierc20Abi, provider) as IERC20;

    // APY

    const [apy, index, rewardYield, periodsPerYear] = await Promise.all([
      sPHMContract.apy(),
      sPHMContract.scalingFactor(),
      sPHMContract.rewardYield(),
      sPHMContract.periodsPerYear(),
    ]);

    // Five day rate
    // Math.pow(1 + sPHM.rewardYield(), 5 * sPHM.periodsPerYear() / 365) - 1
    const nextRewardMult = +rewardYield.toString() / 1e18;
    const rebasesPer5days = 5 * (+periodsPerYear.toString() / 365);
    const fiveDayRate = Math.pow(1 + nextRewardMult, rebasesPer5days) - 1;

    return {
      currentIndex: +index.toString() / 1e18,
      currentBlock,
      phantomTreasuryAddress,
      apy: +apy.toString() / 1e16,
      nextRewardYield: +rewardYield.toString() / 1e16,
      fiveDayRate: fiveDayRate * 100,
      // stakingAPY,
      // stakingTVL,
      // stakingRebase,
      // marketCap,
      // marketPrice,
    };
  },
);

/**
 * checks if app.slice has marketPrice already
 * if yes then simply load that state
 * if no then fetches via `loadMarketPrice`
 *
 * `usage`:
 * ```
 * const originalPromiseResult = await dispatch(
 *    findOrLoadMarketPrice({ networkID: networkID, provider: provider }),
 *  ).unwrap();
 * originalPromiseResult?.whateverValue;
 * ```
 */
export const findOrLoadMarketPrice = createAsyncThunk(
  "app/findOrLoadMarketPrice",
  async ({ networkID, provider }: IBaseAsyncThunk, { dispatch, getState }) => {
    const state: any = getState();
    let marketPrice;
    // check if we already have loaded market price
    if (state.app.loadingMarketPrice === false && state.app.marketPrice) {
      // go get marketPrice from app.state
      marketPrice = state.app.marketPrice;
    } else {
      // we don't have marketPrice in app.state, so go get it
      try {
        const originalPromiseResult = await dispatch(
          loadMarketPrice({ networkID: networkID, provider: provider }),
        ).unwrap();
        marketPrice = originalPromiseResult?.marketPrice;
      } catch (rejectedValueOrSerializedError) {
        // handle error here
        console.error("Returned a null response from dispatch(loadMarketPrice)");
        return;
      }
    }
    return { marketPrice };
  },
);

/**
 * - fetches the OHM price from CoinGecko (via getTokenPrice)
 * - falls back to fetch marketPrice from ohm-dai contract
 * - updates the App.slice when it runs
 */
const loadMarketPrice = createAsyncThunk("app/loadMarketPrice", async ({ networkID, provider }: IBaseAsyncThunk) => {
  let marketPrice: number;
  try {
    marketPrice = await getMarketPrice({ networkID, provider });
    marketPrice = marketPrice / Math.pow(10, 9);
  } catch (e) {
    marketPrice = await getTokenPrice("olympus");
  }
  return { marketPrice };
});

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    fetchAppSuccess(state, action) {
      setAll(state, action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadAppDetails.pending, state => {
        state.loading = true;
      })
      .addCase(loadAppDetails.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(loadAppDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.error(error.name, error.message, error.stack);
      })
      .addCase(loadMarketPrice.pending, (state, action) => {
        state.loadingMarketPrice = true;
      })
      .addCase(loadMarketPrice.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loadingMarketPrice = false;
      })
      .addCase(loadMarketPrice.rejected, (state, { error }) => {
        state.loadingMarketPrice = false;
        console.error(error.name, error.message, error.stack);
      });
  },
});

const baseInfo = (state: RootState) => state.app;

export default appSlice.reducer;

export const { fetchAppSuccess } = appSlice.actions;

export const getAppState = createSelector(baseInfo, app => app);

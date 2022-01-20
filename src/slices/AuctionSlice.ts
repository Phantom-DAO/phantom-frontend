import { ethers, BigNumber } from "ethers";
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";

// @ts-ignore
import { abi as AuctionAbi } from "../abi/auction.json";
import { abi as ierc20ABI } from "../abi/IERC20.json";
import { addresses } from "../constants";
import { bnToNum, setAll } from "../helpers";
import { RootState } from "src/store";
import { IBaseAsyncThunk, IJsonRPCError, ICommitTokensAsyncThunk, IBaseAddressAsyncThunk } from "./interfaces";
import { error, info } from "../slices/MessagesSlice";
import { fetchAccountSuccess, getBalances } from "./AccountSlice";
import { clearPendingTxn, fetchPendingTxns, getStakingTypeText } from "./PendingTxnsSlice";

export interface IAuctionDetails {
  tokenPrice: number;
  auctionSuccessful: boolean;
  tokensClaimable: number;
  totalTokensCommitted: number;
  auctionEnded: boolean;
  isOpen: boolean;
  startPrice: number;
  minimumPrice: number;
  startTime: number;
  endTime: number;
  totalTokens: number;
}

export const loadAuctionDetails = createAsyncThunk(
  "auction/loadAuctionDetails",
  async ({ provider, networkID, address }: IBaseAddressAsyncThunk): Promise<IAuctionDetails> => {
    const auctionContract = new ethers.Contract(addresses[networkID].PhantomAuction as string, AuctionAbi, provider);
    const [
      tokenPrice,
      auctionSuccessful,
      tokensClaimable,
      totalTokensCommitted,
      auctionEnded,
      isOpen,
      marketPrice,
      marketInfo,
    ] = await Promise.all([
      auctionContract.priceFunction(), // @TODO: check if tokenPrice is tokenPrice(), priceFunction(), or clearingPrice()
      auctionContract.auctionSuccessful(),
      auctionContract.tokensClaimable(address),
      auctionContract.totalTokensCommitted(),
      auctionContract.auctionEnded(),
      auctionContract.isOpen(),
      auctionContract.marketPrice(),
      auctionContract.marketInfo(),
    ]);
    const price = bnToNum(tokenPrice) / Math.pow(10, 18);
    return {
      tokenPrice: Math.round(price * 100) / 100,
      auctionSuccessful,
      tokensClaimable: bnToNum(tokensClaimable) / Math.pow(10, 18),
      totalTokensCommitted: bnToNum(totalTokensCommitted) / Math.pow(10, 18),
      auctionEnded,
      isOpen,
      startPrice: bnToNum(marketPrice.startPrice) / Math.pow(10, 18),
      minimumPrice: bnToNum(marketPrice.minimumPrice) / Math.pow(10, 18),
      startTime: bnToNum(marketInfo.startTime),
      endTime: bnToNum(marketInfo.endTime),
      totalTokens: bnToNum(marketInfo.totalTokens) / Math.pow(10, 18),
    };
  },
);

export const commitTokens = createAsyncThunk(
  "auction/loadAuctionDetails",
  async ({ provider, networkID, quantity, address }: ICommitTokensAsyncThunk, { dispatch }): Promise<void> => {
    if (!provider) {
      dispatch(error("Please connect your wallet!"));
      return;
    }

    const signer = provider.getSigner();
    const auctionContract = new ethers.Contract(
      addresses[networkID].PhantomAuction as string,
      AuctionAbi as any,
      signer,
    );
    let commitTx;
    try {
      // @todo: might need to remove gasLimit
      commitTx = await auctionContract.commitTokens(ethers.utils.parseUnits(quantity.toString(), "gwei"), true, {
        gasLimit: 300000,
      });
      dispatch(fetchPendingTxns({ txnHash: commitTx.hash, text: "Pending...", type: "commit_tokens" }));
      await commitTx.wait();
    } catch (e: unknown) {
      const rpcError = e as IJsonRPCError;
      if (rpcError.code === -32603 && rpcError.message.indexOf("ds-math-sub-underflow") >= 0) {
        dispatch(
          error(
            "You may be trying to commit more than your balance! Error code: 32603. Message: ds-math-sub-underflow",
          ),
        );
      } else {
        dispatch(error(rpcError.message));
      }
      return;
    } finally {
      if (commitTx) {
        dispatch(clearPendingTxn(commitTx.hash));
      }
    }
    dispatch(getBalances({ address, networkID, provider }));
    dispatch(loadAuctionDetails({ address, networkID, provider }));
  },
);

function alreadyApprovedToken(allowance: BigNumber) {
  return BigNumber.from("0").gt(allowance);
}

export const changeFraxApproval = createAsyncThunk(
  "stake/changeFraxApproval",
  async ({ provider, address, networkID }: IBaseAddressAsyncThunk, { dispatch }) => {
    if (!provider) {
      dispatch(error("Please connect your wallet!"));
      return;
    }

    const signer = provider.getSigner();
    const fraxContract = new ethers.Contract(addresses[networkID].frax as string, ierc20ABI, signer);

    let approveTx;
    let fraxAllowance = await fraxContract.allowance(address, addresses[networkID].PhantomAuction);

    // return early if approval has already happened
    if (alreadyApprovedToken(fraxAllowance)) {
      dispatch(info("Approval completed."));
      return dispatch(
        fetchAccountSuccess({
          auction: {
            fraxAllowance: +fraxAllowance,
          },
        }),
      );
    }

    try {
      approveTx = await fraxContract.approve(
        addresses[networkID].PhantomAuction,
        ethers.utils.parseUnits("1000000000", "gwei").toString(),
      );

      if (approveTx) {
        dispatch(fetchPendingTxns({ txnHash: approveTx.hash, text: "", type: "approve_frax" }));
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
    fraxAllowance = await fraxContract.allowance(address, addresses[networkID].PhantomAuction);

    return dispatch(
      fetchAccountSuccess({
        auction: {
          fraxAllowance: +fraxAllowance,
        },
      }),
    );
  },
);

// Note: this is a barebones interface for the state. Update to be more accurate
interface IAuctionSlice extends IAuctionDetails {
  [key: string]: any;
}

const initialState: IAuctionSlice = {
  tokenPrice: 0,
  auctionSuccessful: true,
  tokensClaimable: 0,
  totalTokensCommitted: 0,
  auctionEnded: false,
  isOpen: true,
  startPrice: 0,
  minimumPrice: 0,
  startTime: 0,
  endTime: 0,
  totalTokens: 0,
};

const auctionSlice = createSlice({
  name: "auction",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadAuctionDetails.pending, state => {
        state.loading = true;
      })
      .addCase(loadAuctionDetails.fulfilled, (state, action) => {
        setAll(state, action.payload || {});
        state.loading = false;
      })
      .addCase(loadAuctionDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.error(error.message);
      });
  },
});

export default auctionSlice.reducer;

const baseInfo = (state: RootState) => state.auction;

export const getAuctionState = createSelector(baseInfo, auction => auction);

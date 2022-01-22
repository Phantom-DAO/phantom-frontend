import { ethers, BigNumber } from "ethers";
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";

// @ts-ignore
import { abi as AuctionAbi } from "../abi/auction.json";
import { abi as ierc20ABI } from "../abi/IERC20.json";
import { addresses, NetworkId } from "../constants";
import { bnToNum, setAll } from "../helpers";
import { RootState } from "src/store";
import {
  IBaseAsyncThunk,
  IJsonRPCError,
  ICommitTokensAsyncThunk,
  IFraxApprovalAsyncThunk,
  IBaseAddressAsyncThunk,
  IAddressAsyncThunk,
} from "./interfaces";
import apollo from "../lib/apolloClient";
import { NodeHelper } from "src/helpers/NodeHelper";
import { error, info } from "../slices/MessagesSlice";
import { fetchAccountSuccess, getBalances } from "./AccountSlice";
import { clearPendingTxn, fetchPendingTxns, getStakingTypeText } from "./PendingTxnsSlice";
import { loadAccountDetails } from "./AccountSlice";

export interface IAuctionDetails {
  tokenPrice: number;
  auctionSuccessful: boolean;
  totalTokensCommitted: number;
  commitedFrax: number;
  auctionEnded: boolean;
  isOpen: boolean;
  startPrice: number;
  minimumPrice: number;
  startTime: number;
  endTime: number;
  totalTokens: number;
  auctionToken: string;
}

export const loadAuctionDetails = createAsyncThunk(
  "auction/loadAuctionDetails",
  async ({ provider, networkID }: IBaseAsyncThunk): Promise<IAuctionDetails> => {
    const auctionContract = new ethers.Contract(addresses[networkID].PhantomAuction as string, AuctionAbi, provider);
    const [
      tokenPrice,
      auctionSuccessful,
      totalTokensCommitted,
      auctionEnded,
      isOpen,
      marketPrice,
      marketInfo,
      marketStatus,
      auctionToken,
    ] = await Promise.all([
      auctionContract.clearingPrice(),
      auctionContract.auctionSuccessful(),
      auctionContract.totalTokensCommitted(),
      auctionContract.auctionEnded(),
      auctionContract.isOpen(),
      auctionContract.marketPrice(),
      auctionContract.marketInfo(),
      auctionContract.marketStatus(),
      auctionContract.auctionToken(),
    ]);
    const price = bnToNum(tokenPrice) / Math.pow(10, 18);

    return {
      tokenPrice: Math.round(price * 100) / 100,
      auctionSuccessful,
      totalTokensCommitted: bnToNum(totalTokensCommitted) / Math.pow(10, 18),
      commitedFrax: bnToNum(marketStatus.commitmentsTotal) / Math.pow(10, 18),
      auctionEnded,
      isOpen,
      startPrice: bnToNum(marketPrice.startPrice) / Math.pow(10, 18),
      minimumPrice: bnToNum(marketPrice.minimumPrice) / Math.pow(10, 18),
      startTime: bnToNum(marketInfo.startTime),
      endTime: bnToNum(marketInfo.endTime),
      totalTokens: bnToNum(marketInfo.totalTokens) / Math.pow(10, 18),
      auctionToken,
    };
  },
);

export const claimTokens = createAsyncThunk(
  "auction/claimTokens",
  async ({ provider, networkID, address }: IBaseAddressAsyncThunk, { dispatch }): Promise<void> => {
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
      commitTx = await auctionContract["withdrawTokens(address)"](address.toLowerCase());
      dispatch(fetchPendingTxns({ txnHash: commitTx.hash, text: "Pending...", type: "claim_tokens" }));

      await commitTx.wait();
    } catch (e: unknown) {
      const rpcError = e as IJsonRPCError;
      dispatch(error(rpcError.message));
      return;
    } finally {
      if (commitTx) {
        dispatch(clearPendingTxn(commitTx.hash));
      }
    }
    dispatch(loadAuctionDetails({ networkID, provider }));
    dispatch(loadAccountDetails({ networkID, provider, address }));
  },
);

export const commitTokens = createAsyncThunk(
  "auction/commitTokens",
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
      commitTx = await auctionContract.commitTokens(ethers.utils.parseEther(quantity.toString()), true, {
        gasLimit: 150000,
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
    dispatch(loadAuctionDetails({ networkID, provider }));
  },
);

export const changeFraxApproval = createAsyncThunk(
  "stake/changeFraxApproval",
  async ({ provider, address, networkID, value }: IFraxApprovalAsyncThunk, { dispatch }) => {
    if (!provider) {
      dispatch(error("Please connect your wallet!"));
      return;
    }

    const signer = provider.getSigner();
    const fraxContract = new ethers.Contract(addresses[networkID].frax as string, ierc20ABI, signer);

    let approveTx;
    try {
      approveTx = await fraxContract.approve(
        addresses[networkID].PhantomAuction,
        ethers.utils.parseEther(value.toString()).toString(),
      );

      if (approveTx) {
        dispatch(fetchPendingTxns({ txnHash: approveTx.hash, text: "Pending...", type: "approve_tokens" }));
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
    let fraxAllowance = await fraxContract.allowance(address, addresses[networkID].PhantomAuction);

    return dispatch(
      fetchAccountSuccess({
        auction: {
          fraxAllowance: bnToNum(fraxAllowance) / Math.pow(10, 18),
        },
      }),
    );
  },
);

interface ICommitment {
  readonly id: string;
  readonly owner: string;
  readonly displayName: string;
  readonly imageUrl: string;
}

export const loadAllCommitments = createAsyncThunk("app/loadAllCommitments", async () => {
  const commitments = `
      query {
        gravatars(first: 5) {
          id
          owner
          displayName
          imageUrl
        }
      }
    `;

  const graphData = await apollo(commitments);
  if (!graphData || graphData == null) {
    console.error("Returned a null response when querying TheGraph");
    return { commitments: [] };
  }

  return { commitments: (graphData as any).data.gravatars };
});

export const loadMyCommitments = createAsyncThunk("app/loadMyCommitments", async ({ address }: IAddressAsyncThunk) => {
  const commitments = `
      query {
        gravatars(first: 5, where: {owner_in: (${address})}) {
          id
          owner
          displayName
          imageUrl
        }
      }
    `;

  const graphData = await apollo(commitments);
  if (!graphData || graphData == null) {
    console.error("Returned a null response when querying TheGraph");
    return { myCommitments: [] };
  }
  return { myCommitments: (graphData as any).data.gravatars };
});

// Note: this is a barebones interface for the state. Update to be more accurate
interface IAuctionSlice extends IAuctionDetails {
  [key: string]: any;
}

const initialState: IAuctionSlice = {
  tokenPrice: 0,
  auctionSuccessful: true,
  totalTokensCommitted: 0,
  commitedFrax: 0,
  auctionEnded: false,
  isOpen: true,
  startPrice: 0,
  minimumPrice: 0,
  startTime: 0,
  endTime: 0,
  totalTokens: 0,
  commitments: null,
  myCommitments: null,
  auctionToken: "",
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
      })
      .addCase(loadAllCommitments.fulfilled, (state, action) => {
        setAll(state, action.payload || {});
        state.loading = false;
      })
      .addCase(loadMyCommitments.fulfilled, (state, action) => {
        setAll(state, action.payload || {});
        state.loading = false;
      });
  },
});

export default auctionSlice.reducer;

const baseInfo = (state: RootState) => state.auction;

export const getAuctionState = createSelector(baseInfo, auction => auction);

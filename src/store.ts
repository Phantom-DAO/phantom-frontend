import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/AccountSlice";
import bondingReducer from "./slices/BondSlice";
import appReducer from "./slices/AppSlice";
import pendingTransactionsReducer from "./slices/PendingTxnsSlice";
import messagesReducer from "./slices/MessagesSlice";
import auctionReducer from "./slices/AuctionSlice";
import claimReducer from "./slices/ClaimSlice";
import swapReducer from "./slices/SwapSlice";
import wrapReducer from "./slices/WrapSlice";
// reducers are named automatically based on the name field in the slice
// exported in slice files by default as nameOfSlice.reducer

const store = configureStore({
  reducer: {
    //   we'll have state.account, state.bonding, etc, each handled by the corresponding
    // reducer imported from the slice file
    account: accountReducer,
    bonding: bondingReducer,
    app: appReducer,
    pendingTransactions: pendingTransactionsReducer,
    messages: messagesReducer,
    auction: auctionReducer,
    claim: claimReducer,
    swap: swapReducer,
    wrap: wrapReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

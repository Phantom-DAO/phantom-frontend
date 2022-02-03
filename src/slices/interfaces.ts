import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { Bond, NetworkID } from "src/lib/Bond";

export interface IJsonRPCError {
  readonly message: string;
  readonly code: number;
  readonly data?: any;
}

export interface IBaseAsyncThunk {
  readonly networkID: NetworkID;
  readonly provider: StaticJsonRpcProvider | JsonRpcProvider;
}

export interface IChangeApprovalAsyncThunk extends IBaseAsyncThunk {
  readonly token: string;
  readonly address: string;
}

export interface IActionAsyncThunk extends IBaseAsyncThunk {
  readonly action: string;
  readonly address: string;
}

export interface IValueAsyncThunk extends IBaseAsyncThunk {
  readonly value: number;
  readonly address: string;
}

export interface IActionValueAsyncThunk extends IValueAsyncThunk {
  readonly action: string;
}

export interface IBaseAddressAsyncThunk extends IBaseAsyncThunk {
  readonly address: string;
}

// Account Slice

export interface ICalcUserBondDetailsAsyncThunk extends IBaseAddressAsyncThunk, IBaseBondAsyncThunk {
  readonly nonce: number;
}

// Bond Slice

export interface IBaseBondAsyncThunk extends IBaseAsyncThunk {
  readonly bond: Bond;
}

export interface IApproveBondAsyncThunk extends IBaseBondAsyncThunk {
  readonly address: string;
}

export interface ICalcBondDetailsAsyncThunk extends IBaseBondAsyncThunk {
  readonly bondType: string;
  readonly value: number;
}

export interface IBondAssetAsyncThunk extends IBaseBondAsyncThunk, IValueAsyncThunk {
  readonly bondType: string;
  readonly slippage: number;
}

export interface IRedeemBondAsyncThunk extends IBaseBondAsyncThunk {
  readonly address: string;
  readonly autostake: boolean;
}

export interface IRedeemAllBondsAsyncThunk extends IBaseAsyncThunk {
  readonly bonds: Bond[];
  readonly address: string;
  readonly autostake: boolean;
}

// Auction Slice

export interface ICommitTokensAsyncThunk extends IBaseAddressAsyncThunk {
  readonly quantity: string;
}

export interface IAddressAsyncThunk {
  readonly address: string;
}

export interface IFraxApprovalAsyncThunk extends IBaseAddressAsyncThunk {
  readonly value: string;
}

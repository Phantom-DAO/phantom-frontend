import { StaticJsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { ethers } from "ethers";

import PhantomAdminABI from "../abi/PhantomAdmin.json";

export class BondHelper {
  private readonly adminContractAddr: string;
  private readonly provider: StaticJsonRpcProvider | JsonRpcSigner;

  constructor(adminContractAddr: string, provider: StaticJsonRpcProvider | JsonRpcSigner) {
    this.adminContractAddr = adminContractAddr;
    this.provider = provider;
  }

  private adminABIContract() {
    return new ethers.Contract(this.adminContractAddr, PhantomAdminABI, this.provider);
  }

  static bondTypeStrToBytes(bondType: string) {
    return [...Buffer.from(bondType)];
  }

  isValidTokenForBond(tokenAddr: string) {
    return this.adminABIContract().isValidTokenForBond(tokenAddr);
  }

  infoOfBondType(bondType: string) {
    return this.adminABIContract().infoOfBondType(BondHelper.bondTypeStrToBytes(bondType));
  }

  bondingMultiplierFor(bondType: string, tokenAddr: string) {
    return this.adminABIContract().bondingMultiplierFor(BondHelper.bondTypeStrToBytes(bondType), tokenAddr);
  }
}

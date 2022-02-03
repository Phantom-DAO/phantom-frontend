import { StaticJsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { ethers } from "ethers";

import { addresses } from "../constants";
import PhantomAdminABI from "../abi/PhantomAdmin.json";
import PhantomStorageABI from "../abi/PhantomStorage.json";
import { abi as PhantomFinanceABI } from "../abi/PhantomFinance.json";
import { abi as PhantomBondPricingABI } from "../abi/PhantomBondPricing.json";

export class BondHelper {
  private readonly networkID: number;
  private readonly provider: StaticJsonRpcProvider | JsonRpcSigner;

  constructor(networkID: number, provider: StaticJsonRpcProvider | JsonRpcSigner) {
    this.networkID = networkID;
    this.provider = provider;
  }

  private adminABIContract() {
    return new ethers.Contract(addresses[this.networkID].PhantomAdmin, PhantomAdminABI, this.provider);
  }

  private storageABIContract() {
    return new ethers.Contract(addresses[this.networkID].PhantomStorage, PhantomStorageABI, this.provider);
  }

  private bondPricingABIContract() {
    return new ethers.Contract(addresses[this.networkID].PhantomBondPricing, PhantomBondPricingABI, this.provider);
  }

  private financeABIContract() {
    return new ethers.Contract(addresses[this.networkID].PhantomFinance, PhantomFinanceABI, this.provider);
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

  currentBondRatio() {
    return this.adminABIContract().currentBondRatio();
  }

  maxDebtRatio() {
    return this.storageABIContract().getUint(
      ethers.utils.keccak256(ethers.utils.solidityPack(["string"], ["phantom.bonding.max_debt_ratio"])),
    );
  }

  valuation(tokenAddr: string, amount: number) {
    return this.bondPricingABIContract().consult(tokenAddr, amount);
  }

  bond(amount: number, tokenAddr: string, bondType: string) {
    return this.financeABIContract().bond(amount, tokenAddr, BondHelper.bondTypeStrToBytes(bondType));
  }

  // User Functions

  lowestNonceAssignable(bonder: string) {
    return this.storageABIContract().getUint(
      ethers.utils.keccak256(
        ethers.utils.solidityPack(["string", "address"], ["phantom.bonding.user.lowest_assignable_nonce", bonder]),
      ),
    );
  }

  lowestNonceStillVesting(bonder: string) {
    return this.storageABIContract().getUint(
      ethers.utils.keccak256(
        ethers.utils.solidityPack(["string", "address"], ["phantom.bonding.user.lowest_nonce_still_vesting", bonder]),
      ),
    );
  }

  remainingPayoutFor(bonder: string, nonce: number) {
    return this.storageABIContract().getUint(
      ethers.utils.keccak256(
        ethers.utils.solidityPack(
          ["string", "address", "uint256"],
          ["phantom.bonding.remaining_payout_for", bonder, nonce],
        ),
      ),
    );
  }

  lastClaimAt(bonder: string, nonce: number) {
    return this.storageABIContract().getUint(
      ethers.utils.keccak256(
        ethers.utils.solidityPack(["string", "address", "uint256"], ["phantom.bonding.last_claim_at", bonder, nonce]),
      ),
    );
  }

  vestsAtTimestamp(bonder: string, nonce: number) {
    return this.storageABIContract().getUint(
      ethers.utils.keccak256(
        ethers.utils.solidityPack(
          ["string", "address", "uint256"],
          ["phantom.bonding.vests_at_timestamp", bonder, nonce],
        ),
      ),
    );
  }
}

import { StableBond, NetworkID, CustomBond, Bond, BondType } from "src/lib/Bond";
import { addresses, bondTypes } from "src/constants";
import { getTokenPrice } from "src/helpers";

import { ReactComponent as FraxImg } from "src/assets/tokens/FRAX.svg";
import { ReactComponent as wFTMImg } from "src/assets/tokens/wFTM.svg";

import { abi as ierc20Abi } from "src/abi/IERC20.json";
import { BigNumberish } from "ethers";

export interface AllBondTypesMap {
  [key: string]: Bond[];
}

export const frax = new StableBond({
  name: "frax",
  displayName: "FRAX",
  isAvailable: { [NetworkID.Mainnet]: true, [NetworkID.Testnet]: true },
  bondIconSvg: FraxImg,
  reserveAddrs: {
    [NetworkID.Mainnet]: "0xdc301622e621166bd8e82f2ca0a26c13ad0be355",
    [NetworkID.Testnet]: "0x8af3d16056706294e1f0bd586e5df08e0ac2d8df",
  },
});

export const gohm = new CustomBond({
  name: "gohm",
  displayName: "gOHM",
  lpUrl: "",
  bondType: BondType.StableAsset,
  isAvailable: { [NetworkID.Mainnet]: true, [NetworkID.Testnet]: true },
  bondIconSvg: wFTMImg,
  reserveContract: ierc20Abi, // The Standard ierc20Abi since they're normal tokens
  reserveAddrs: {
    [NetworkID.Mainnet]: "0x0ab87046fBb341D058F17CBC4c1133F25a20a52f",
    [NetworkID.Testnet]: "0x8af3d16056706294e1f0bd586e5df08e0ac2d8df",
  },
  customTreasuryBalanceFunc: async function (this: CustomBond, networkID, provider) {
    let gOHMPrice: number = await getTokenPrice();
    const token = this.getContractForReserve(networkID, provider);
    let gOHMAmount: BigNumberish = await token.balanceOf(addresses[networkID].TREASURY_ADDRESS);
    gOHMAmount = Number(gOHMAmount.toString()) / Math.pow(10, 18);
    return gOHMAmount * gOHMPrice;
  },
});

export const ftm = new CustomBond({
  name: "ftm",
  displayName: "wFTM",
  lpUrl: "",
  bondType: BondType.StableAsset,
  isAvailable: { [NetworkID.Mainnet]: true, [NetworkID.Testnet]: true },
  bondIconSvg: wFTMImg,
  reserveContract: ierc20Abi, // The Standard ierc20Abi since they're normal tokens
  reserveAddrs: {
    [NetworkID.Mainnet]: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83",
    [NetworkID.Testnet]: "0xfa743d3ea980ec8697d516097d77f91fa5561ebe",
  },
  customTreasuryBalanceFunc: async function (this: CustomBond, networkID, provider) {
    let wFTMPrice: number = await getTokenPrice();
    const token = this.getContractForReserve(networkID, provider);
    let wFTMAmount: BigNumberish = await token.balanceOf(addresses[networkID].TREASURY_ADDRESS);
    wFTMAmount = Number(wFTMAmount.toString()) / Math.pow(10, 18);
    return wFTMAmount * wFTMPrice;
  },
});

export const lqdr = new CustomBond({
  name: "lqdr",
  displayName: "LQDR",
  lpUrl: "",
  bondType: BondType.StableAsset,
  isAvailable: { [NetworkID.Mainnet]: true, [NetworkID.Testnet]: true },
  bondIconSvg: wFTMImg,
  reserveContract: ierc20Abi, // The Standard ierc20Abi since they're normal tokens
  reserveAddrs: {
    [NetworkID.Mainnet]: "0x10b620b2dbac4faa7d7ffd71da486f5d44cd86f9",
    [NetworkID.Testnet]: "0xfa743d3ea980ec8697d516097d77f91fa5561ebe",
  },
  customTreasuryBalanceFunc: async function (this: CustomBond, networkID, provider) {
    let lqdrPrice: number = await getTokenPrice();
    const token = this.getContractForReserve(networkID, provider);
    let lqdrAmount: BigNumberish = await token.balanceOf(addresses[networkID].TREASURY_ADDRESS);
    lqdrAmount = Number(lqdrAmount.toString()) / Math.pow(10, 18);
    return lqdrAmount * lqdrPrice;
  },
});

export const spirit = new CustomBond({
  name: "spirit",
  displayName: "SPIRIT",
  lpUrl: "",
  bondType: BondType.StableAsset,
  isAvailable: { [NetworkID.Mainnet]: true, [NetworkID.Testnet]: true },
  bondIconSvg: wFTMImg,
  reserveContract: ierc20Abi, // The Standard ierc20Abi since they're normal tokens
  reserveAddrs: {
    [NetworkID.Mainnet]: "0x5cc61a78f164885776aa610fb0fe1257df78e59b",
    [NetworkID.Testnet]: "0xfa743d3ea980ec8697d516097d77f91fa5561ebe",
  },
  customTreasuryBalanceFunc: async function (this: CustomBond, networkID, provider) {
    let spiritPrice: number = await getTokenPrice();
    const token = this.getContractForReserve(networkID, provider);
    let spiritAmount: BigNumberish = await token.balanceOf(addresses[networkID].TREASURY_ADDRESS);
    spiritAmount = Number(spiritAmount.toString()) / Math.pow(10, 18);
    return spiritAmount * spiritPrice;
  },
});

export const frax_phm_lp = new CustomBond({
  name: "frax_phm_lp",
  displayName: "FRAX-PHM LP",
  lpUrl:
    "https://app.sushi.com/add/0x383518188c0c6d7730d91b2c03a03c837814a899/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  bondType: BondType.LP,
  isAvailable: { [NetworkID.Mainnet]: true, [NetworkID.Testnet]: true },
  bondIconSvg: wFTMImg,
  reserveContract: ierc20Abi, // The Standard ierc20Abi since they're normal tokens
  reserveAddrs: {
    [NetworkID.Mainnet]: "0x5cc61a78f164885776aa610fb0fe1257df78e59b",
    [NetworkID.Testnet]: "0xfa743d3ea980ec8697d516097d77f91fa5561ebe",
  },
  customTreasuryBalanceFunc: async function (this: CustomBond, networkID, provider) {
    // TODO: Need a way to get LP token valuation without a bond calculator
    return 0;
  },
});

export const allBonds = [frax, gohm, ftm, lqdr, spirit, frax_phm_lp];
export const allBondTypesMap: AllBondTypesMap = bondTypes.reduce((prevVal, bondType) => {
  return { ...prevVal, [bondType]: allBonds };
}, {});

export default allBondTypesMap;

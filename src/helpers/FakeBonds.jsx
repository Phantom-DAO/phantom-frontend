import { NetworkID } from "src/lib/Bond";

import { ReactComponent as FraxImg } from "src/assets/tokens/FRAX.svg";
import { ReactComponent as OhmEthImg } from "src/assets/tokens/OHM-WETH.svg";
import { ReactComponent as wFTMImg } from "src/assets/tokens/wFTM.svg";

export const frax = {
  name: "frax",
  displayName: "FRAX",
  bondToken: "FRAX",
  bondPrice: 114.584,
  marketPrice: 143.23,
  bondDiscount: 0.2,
  purchased: 500,
  pendingPayout: 0.442,
  interestDue: 1.558,
  bondMaturationBlock: 15000,
  vestingTerm: 35000,
  allowance: 0,
  bondQuote: 1.23,
  maxBondPrice: 100,
  debtRatio: 60100000,
  isAvailable: { [NetworkID.Mainnet]: true, [NetworkID.Testnet]: true },
  bondIconSvg: FraxImg,
};

export const ftm = {
  name: "ftm",
  displayName: "wFTM",
  bondToken: "wFTM",
  bondPrice: 137.5,
  marketPrice: 143.23,
  bondDiscount: 0.04,
  purchased: 0,
  isAvailable: { [NetworkID.Mainnet]: false, [NetworkID.Testnet]: false },
  bondIconSvg: wFTMImg,
};

export const phm_frax = {
  name: "phm_frax_lp",
  displayName: "PHM-FRAX LP",
  bondToken: "FRAX",
  bondPrice: 130.3393,
  marketPrice: 143.23,
  bondDiscount: 0.09,
  purchased: 0,
  vestingTerm: 35000,
  allowance: 10,
  bondQuote: 1.23,
  maxBondPrice: 100,
  debtRatio: 60100000,
  isAvailable: { [NetworkID.Mainnet]: true, [NetworkID.Testnet]: true },
  bondIconSvg: OhmEthImg,
  lpUrl: "#",
  isLP: true,
};

export const fakeBonds = [frax, ftm, phm_frax];

export default fakeBonds;

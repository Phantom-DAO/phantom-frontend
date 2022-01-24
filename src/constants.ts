export const THE_GRAPH_URL = "https://api.thegraph.com/subgraphs/name/0xleez/ph-subgraphs";
export const EPOCH_INTERVAL = 2200;

// NOTE could get this from an outside source since it changes slightly over time
export const BLOCK_RATE_SECONDS = 13.14;

export const TOKEN_DECIMALS = 9;

export const POOL_GRAPH_URLS = {
  4: "https://api.thegraph.com/subgraphs/name/pooltogether/rinkeby-v3_4_3",
  1: "https://api.thegraph.com/subgraphs/name/pooltogether/pooltogether-v3_4_3",
};

export enum NetworkId {
  FANTOM = 250,
  FANTOM_TESTNET = 4002,
}

interface IAddresses {
  [key: number]: { [key: string]: string };
}

export const addresses: IAddresses = {
  /* FTM */
  250: {
    PHM: "0xDCa967B5Fd6DFc250e2D68775D03b9131Ae4abf5",
    PhantomAdmin: "",
    PhantomAllocator: "",
    PhantomAlphaSwap: "",
    PhantomBonding: "",
    PhantomDexRouter: "",
    PhantomExecutor: "0x825e99F8CEbE57A5efA9AB98B6bf8839cd1f0794",
    PhantomFinance: "",
    PhantomFounders: "0xFCD3c5a17c8e16C834d58D91350739709f09Bd31",
    PhantomGovernor: "0x155EAF1eEE6D582abB8Ad6e4773855a50DceEc0B",
    PhantomLaunch: "0xAF9BCA94C868D10b02003db66C317Fd403e074F7",
    PhantomPayments: "",
    PhantomStaking: "",
    PhantomStorage: "0xf99f229595a1fA265D04Afec41CCaBb6fbA1BE22",
    PhantomTreasury: "0x69ee6905F95F5453AcC3af2687Df59E57469b2F5",
    PhantomVault: "0xD9cbBB89d9e2E18FeFC0a82d7152729245Deafa8",
    aPHM: "0x8DC8d32ae584c7e705a4593e86fbbc2C2383B18D",
    fPHM: "0x90dad363A40E406cBFe3B2B3E494005758e2A490",
    gPHM: "0x3b6813D005a40fd3fEBaA91A28cCDD97b44529eD",
    sPHM: "0x7EE1273f020553AcFCEfEc91BE8690eD44ceb7A6",
    PhantomAuction: "0x67eA2dC0D042eF1dEB62AB5e3d0f687231F11B17", // test contract
    frax: "0xdc301622e621166bd8e82f2ca0a26c13ad0be355", //
  },
  /* FTM testnet */
  4002: {
    DAI_ADDRESS: "", // duplicate
    OHM_ADDRESS: "",
    STAKING_ADDRESS: "0xa0391E0a61AbC4C5e7c806Db3e9Cf642fba64b8e", // The new staking contract
    STAKING_HELPER_ADDRESS: "", // Helper contract used for Staking only
    SOHM_ADDRESS: "",
    WSOHM_ADDRESS: "",
    BONDINGCALC_ADDRESS: "",
    TREASURY_ADDRESS: "",
    CRUCIBLE_OHM_LUSD: "",
    LQTY: "",
    REDEEM_HELPER_ADDRESS: "",
    /* phm ctrcts */
    PHM: "0x9839cD79D0F8dC30A7328E38f444Bb0D5352EC50",
    PhantomAdmin: "0x13f7B4581dF403542286563C2F762077B2a368Da",
    PhantomAllocator: "0x82F6f20Dd0cbA037Ce40626a2728382Df7dD318d",
    PhantomAlphaSwap: "0xE9e960cAf5526F007e922C124ba1D2Ce0ec50c5B",
    PhantomBonding: "0x0c8A62D089B9F6310a3fa5Cdb9f2b6392C9Dc595",
    PhantomDexRouter: "0x6B70FCA25650612FB244E0e755C4c2B72d29dcBc",
    PhantomExecutor: "0xaB8A23cDBA29D282430C67eC5b99041BE60Cf7f4",
    PhantomFinance: "0x50a47673711bB7EE1e268E4790E8FFBE0a019Be6",
    PhantomFounders: "0x8Df4C543aa0216FdECc51500e699A25517ED8529",
    PhantomGovernor: "0x1464f060D710cbCc6adc81120b197ec825B088A1",
    PhantomLaunch: "0x04619F8EADa7C9c763B82ffeb12ba513b8499E5c",
    PhantomPayments: "0x2D124A3C4f50415b8553e5EaCAb536b6A74b8B83",
    PhantomStaking: "0xa56D7e5eD39EFE0727010F63D061aB486cB9785e",
    PhantomStorage: "0xdc3ECa41F1020748BBe734C1d934cE64a1B4b2Fa",
    PhantomTreasury: "0x4bAAbd0B47fd75d72f9EED0c554db94CDeC0C18a",
    PhantomVault: "0xaEABE773466BEe5B246128b487971FE12F520dC3",
    aPHM: "0x04e9a73e3ACb76be191EA9c7b0B17D95A408945E",
    fPHM: "0xA07bC8331766dF0455a721a303A6F8cFE4491E24",
    gPHM: "0x3d1b9323Ada097060ad9805DE65Af6B4460cE8a5",
    sPHM: "0x8bEe8D80d9970Aa82AEcC8963494fa1a57Ba2978",
    frax: "0xfafedb041c0dd4fa2dc0d87a6b0979ee6fa7af5f", // LINK address, kept name same as prod for ease

    /*PhantomAuction: "0xe57da0f3e0db8abc47e984d317938028aa0e0b70", // ended */
    PhantomAuction: "0x8588762f41169425c233931ba306abf247013832", // 20jan-30jan (ongoing)
    /*PhantomAuction: "0x4358A55CEdE788aAC2F7ec7bE3e91cf6D4A841fb", // 30jan-14feb*/
    /*PhantomAuction: "0x540B02e3Ac75f00f92512b0ae66f1A79b8E49A21",*/
  },
  4: {
    DAI_ADDRESS: "0xB2180448f8945C8Cc8AE9809E67D6bd27d8B2f2C", // duplicate
    OHM_ADDRESS: "0xC0b491daBf3709Ee5Eb79E603D73289Ca6060932",
    STAKING_ADDRESS: "0xC5d3318C0d74a72cD7C55bdf844e24516796BaB2",
    STAKING_HELPER_ADDRESS: "0xf73f23Bb0edCf4719b12ccEa8638355BF33604A1",
    OLD_STAKING_ADDRESS: "0xb640AA9082ad720c60102489b806E665d67DCE32",
    SOHM_ADDRESS: "0x1Fecda1dE7b6951B248C0B62CaeBD5BAbedc2084",
    WSOHM_ADDRESS: "0xe73384f11Bb748Aa0Bc20f7b02958DF573e6E2ad",
    OLD_SOHM_ADDRESS: "0x8Fc4167B0bdA22cb9890af2dB6cB1B818D6068AE",
    MIGRATE_ADDRESS: "0x3BA7C6346b93DA485e97ba55aec28E8eDd3e33E2",
    DISTRIBUTOR_ADDRESS: "0x0626D5aD2a230E05Fb94DF035Abbd97F2f839C3a",
    BONDINGCALC_ADDRESS: "0xaDBE4FA3c2fcf36412D618AfCfC519C869400CEB",
    CIRCULATING_SUPPLY_ADDRESS: "0x5b0AA7903FD2EaA16F1462879B71c3cE2cFfE868",
    TREASURY_ADDRESS: "0x0d722D813601E48b7DAcb2DF9bae282cFd98c6E7",
    REDEEM_HELPER_ADDRESS: "0xBd35d8b2FDc2b720842DB372f5E419d39B24781f",
    PT_TOKEN_ADDRESS: "0x0a2d026bacc573a8b5a2b049f956bdf8e5256cfd", // 33T token address, taken from `ticket` function on PRIZE_STRATEGY_ADDRESS
    PT_PRIZE_POOL_ADDRESS: "0xf9081132864ed5e4980CFae83bDB122d86619281", // NEW
    PT_PRIZE_STRATEGY_ADDRESS: "0x2Df17EA8D6B68Ec444c9a698315AfB36425dac8b", // NEW
  },
  1: {
    DAI_ADDRESS: "0x6b175474e89094c44da98b954eedeac495271d0f", // duplicate
    OHM_ADDRESS: "0x383518188c0c6d7730d91b2c03a03c837814a899",
    STAKING_ADDRESS: "0xfd31c7d00ca47653c6ce64af53c1571f9c36566a", // The new staking contract
    STAKING_HELPER_ADDRESS: "0xc8c436271f9a6f10a5b80c8b8ed7d0e8f37a612d", // Helper contract used for Staking only
    SOHM_ADDRESS: "0x04F2694C8fcee23e8Fd0dfEA1d4f5Bb8c352111F",
    WSOHM_ADDRESS: "0xca76543cf381ebbb277be79574059e32108e3e65",
    BONDINGCALC_ADDRESS: "0xcaaa6a2d4b26067a391e7b7d65c16bb2d5fa571a",
    TREASURY_ADDRESS: "0x31f8cc382c9898b273eff4e0b7626a6987c846e8",
    CRUCIBLE_OHM_LUSD: "0x2230ad29920D61A535759678191094b74271f373",
    LQTY: "0x6dea81c8171d0ba574754ef6f8b412f2ed88c54d",
    REDEEM_HELPER_ADDRESS: "0xE1e83825613DE12E8F0502Da939523558f0B819E",
    FUSE_6_SOHM: "0x59bd6774c22486d9f4fab2d448dce4f892a9ae25", // Tetranode's Locker
    FUSE_18_SOHM: "0x6eDa4b59BaC787933A4A21b65672539ceF6ec97b", // Olympus Pool Party
    /* MIST: "0x88acdd2a6425c3faae4bc9650fd7e27e0bebb7ab",*/
    /* PT_PRIZE_POOL_ADDRESS: "0xEaB695A8F5a44f583003A8bC97d677880D528248", // NEW
    PT_PRIZE_STRATEGY_ADDRESS: "0xf3d253257167c935f8C62A02AEaeBB24c9c5012a", // NEW */
  },
};

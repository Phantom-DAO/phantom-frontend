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
    //phm contracts
    PHM: "0x4Ac8a70DF1366163071457c1c6c7AdB1e46E0DA4",
    PhantomAdmin: "",
    PhantomAllocator: "",
    PhantomAlphaSwap: "0xAD86f0841F3905BbbE28D5fEeCF992C573a0Ef74",
    PhantomBonding: "",
    PhantomDexRouter: "",
    PhantomExecutor: "0xB30cCD668b9906c63F270fB7e130d3ab880549B2",
    PhantomFinance: "",
    PhantomFounders: "0x412FA39551a0BEf9dB9eD3427402941eF78C8209",
    PhantomGovernor: "0x38a51314E772245c0dEc231223117b73C980846d",
    PhantomLaunch: "0x7714CDE16F7Ad77e8155Ca6434289cf85756c8C7",
    PhantomPayments: "",
    PhantomStaking: "",
    PhantomStorage: "0xf99f229595a1fA265D04Afec41CCaBb6fbA1BE22",
    PhantomTreasury: "0x8589B5722B6ae24B30F890E406Fa70c221Fe2Fbc",
    PhantomVault: "0xB0D87A3f3d537ef5F8b5f1ea185CED30f66a54AF",
    aPHM: "0x747d453192D8A0B2e2184738033d0A6296301476",
    fPHM: "0x316a0E6c9Ada20d7C9C678589C63dC21afa27301",
    gPHM: "0x783E157A197327243ffed082Ab7C8cf942f0988e",
    sPHM: "0x418355d3601087EabC46557592C82483BD1c08e1",
    //end
    frax: "0xfafedb041c0dd4fa2dc0d87a6b0979ee6fa7af5f", // LINK address, kept name same as prod for ease
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
    //phm contracts
    PHM: "0x845e54a78953C4b12162f3cf4d3252a39Bdee1D9",
    PhantomAdmin: "",
    PhantomAllocator: "",
    PhantomAlphaSwap: "0xb15bef2074ED8b5F6CD860BDF6922C261fc574b2",
    PhantomBonding: "",
    PhantomDexRouter: "0x7AB9Dea2176C382B5C8699Ef23f3B25bEb506981",
    PhantomExecutor: "0x87c7b0A0368D949905EC862940201860a570d599",
    PhantomFinance: "",
    PhantomFounders: "0xB1b259440E1cFd456048FFb7D519dd4540487933",
    PhantomGovernor: "0x91651AEBf40cD2b1f144BCCFB0877a5a5fde43aA",
    PhantomLaunch: "0x9dBddc5830fFD1F2B3554C63d2cb005B17bEaf53",
    PhantomPayments: "",
    PhantomStaking: "",
    PhantomStorage: "0xff37AE8A6e78f84F72f9CEF87897333D67d9399e",
    PhantomTreasury: "0xBfd4c79a01A13B933fb9551a0f8923a28E726ca6",
    PhantomVault: "0x82e29fb0494339467f2f19cebe5360e92dDCC923",
    aPHM: "0x21a937d9570D3378366f838b95D584e0DA2042Ba",
    fPHM: "0x7DA73c277B0b23fCa06825891A1d5bf5dBF19219",
    gPHM: "0xB529F19d1B42d1381fE5fCA3cE649E42465eA8aF",
    sPHM: "0x9Ae3485beE56175528a4d1AB460cE85e7497d17a",
    //end
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

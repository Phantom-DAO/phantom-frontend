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

export const bondTypes: string[] = ["1 Day", "3 Day", "5 Day", "7 Day", "10 Day", "20 Day"];

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
    PHM: "0xF01Ed6A2b51F97BDeD9bd0Fc841c2D4B5e28BDb2",
    PhantomAdmin: "",
    PhantomAllocator: "",
    PhantomAlphaSwap: "0xAD86f0841F3905BbbE28D5fEeCF992C573a0Ef74",
    PhantomBonding: "",
    PhantomBondPricing: "",
    PhantomDexRouter: "",
    PhantomExecutor: "0x0d09B6C07B27C7EeD27A0649C0e4e7346C05eb59",
    PhantomFinance: "0xd46Cf59668880fd478Ef5eAe05DcA3B96CE6416B",
    PhantomFounders: "0x412FA39551a0BEf9dB9eD3427402941eF78C8209",
    PhantomGovernor: "0xd7b00DD460B5f81e7C638442603B7038756131B3",
    PhantomLaunch: "0x8C1038B54188ad5663a1C4fb9506F4Ec1699CC5b",
    PhantomPayments: "",
    PhantomStaking: "0x9D397cd593e31506bF65E4d8eCE15F5d520007F2",
    PhantomStorage: "0xf99f229595a1fA265D04Afec41CCaBb6fbA1BE22",
    PhantomTreasury: "", // PhantomTreasury addy is loading dynamically from PhantomStorage, do not add it here
    PhantomVault: "0xB0D87A3f3d537ef5F8b5f1ea185CED30f66a54AF",
    aPHM: "0xeFCD0759b236362f5A5Fa0D73d1cBD4ea7662c1f",
    fPHM: "0x316a0E6c9Ada20d7C9C678589C63dC21afa27301",
    gPHM: "0x354e0Bc93d29bB1E48cF4714E1eDA6DCA4aa8828",
    sPHM: "0x418355d3601087EabC46557592C82483BD1c08e1",
    PhantomAuctionClaim: "0x313FB512700aF4193331373bcB3568c9dBCA7319",
    frax: "0xdc301622e621166bd8e82f2ca0a26c13ad0be355",
    PhantomAuction: "0xbaa766bbb0e963b90f36ebaf193c3154460ed5c7",
    //end
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
    PhantomAdmin: "0x9FE84b6523B664E167662FfBe365a22031466ce0",
    PhantomAllocator: "",
    PhantomAlphaSwap: "0xb15bef2074ED8b5F6CD860BDF6922C261fc574b2",
    PhantomBonding: "0xC739D0D166c10a1DFf012fF6A57aFd74c12ad1d2",
    PhantomBondPricing: "",
    PhantomDexRouter: "0x7AB9Dea2176C382B5C8699Ef23f3B25bEb506981",
    PhantomExecutor: "0x87c7b0A0368D949905EC862940201860a570d599",
    PhantomFinance: "0xBF67b14a5f74C98ed36EB1BeB5916a74f5938B4e",
    PhantomFounders: "0xB1b259440E1cFd456048FFb7D519dd4540487933",
    PhantomGovernor: "0x91651AEBf40cD2b1f144BCCFB0877a5a5fde43aA",
    PhantomLaunch: "0xF7295e0Cd0d9Ee3E4031803D60Ee4d93B434eC13",
    PhantomPayments: "",
    PhantomStaking: "0x43b3b6db98AE48235eD007E182AC8Db45DbE81C8",
    PhantomStorage: "0xff37AE8A6e78f84F72f9CEF87897333D67d9399e",
    PhantomTreasury: "", // PhantomTreasury addy is loading dynamically from PhantomStorage, do not add it here
    PhantomVault: "0x82e29fb0494339467f2f19cebe5360e92dDCC923",
    aPHM: "0x21a937d9570D3378366f838b95D584e0DA2042Ba",
    fPHM: "0x7DA73c277B0b23fCa06825891A1d5bf5dBF19219",
    gPHM: "0x4975CC49D7f4045dF96a75e4C567Ad6506D71cc0",
    sPHM: "0x9Ae3485beE56175528a4d1AB460cE85e7497d17a",
    PhantomAuctionClaim: "0x77780B6b95f6ed78dd2FF8EfDe9Cb23E1CE16327",
    //end
    frax: "0xd73c5eca030f6ff6b46faa727621087d36fde23f", // LINK address, kept name same as prod for ease

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

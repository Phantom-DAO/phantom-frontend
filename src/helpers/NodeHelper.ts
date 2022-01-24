import { StaticJsonRpcProvider } from "@ethersproject/providers";

export class NodeHelper {
  static getFantomMainnetStaticProvider = () => {
    return new StaticJsonRpcProvider("https://rpc.testnet.fantom.network/");
  };

  static getNodesUris = () => {
    return process.env.RPC_URL;
  };
}

import { StaticJsonRpcProvider } from "@ethersproject/providers";

export class NodeHelper {
  static getMainnetStaticProvider = () => {
    return new StaticJsonRpcProvider("https://rpc.ftm.tools/");
  };

  static getNodesUris = () => {
    return process.env.RPC_URL;
  };
}

import { minutesAgo } from "./index";
import { EnvHelper } from "./Environment";
import { ethers } from "ethers";

interface ICurrentStats {
  failedConnectionCount: number;
  lastFailedConnectionAt: number;
}

/**
 * NodeHelper used to parse which nodes are valid / invalid, working / not working
 * NodeHelper.currentRemovedNodes is Object representing invalidNodes
 * NodeHelper.logBadConnectionWithTimer logs connection stats for Nodes
 * NodeHelper.getNodesUris returns an array of valid node uris
 */
export class NodeHelper {
  static getNodesUris = () => {
    return process.env.RPC_URL;
  };
}

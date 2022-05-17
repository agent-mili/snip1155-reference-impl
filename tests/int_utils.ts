import { SecretNetworkClient, Wallet } from "secretjs";
import { AminoWallet } from "secretjs/dist/wallet_amino";

export type jsEnv = {
  accounts: Account[];
  contracts: ContractInfo[];
}

export type Account = {
  address: string;
  mnemonic: string;
  walletAmino: AminoWallet;
  walletProto: Wallet;
  secretjs: SecretNetworkClient;
};

export type ContractInfo = {
  hash: string;
  address: string;
}

export function getValueFromRawLog(
    rawLog: string | undefined,
    key: string,
  ): string {
    if (!rawLog) {
      return "";
    }
  
    for (const l of JSON.parse(rawLog)) {
      for (const e of l.events) {
        for (const a of e.attributes) {
          if (`${e.type}.${a.key}` === key) {
            return String(a.value);
          }
        }
      }
    }
  
    return "";
  }
export interface RawData {
  baseContract?: string;
  dexUrl?: string;
  dexPrice?: number;
  dexQuotePrice?: number;
  dexQuotePriceImpact?: number;
  liquidity?: number;
  capitalization?: number;
  isChainsConflict: boolean;
  symbol?: Record<string, string>;
  baseCoin?: Record<string, string>;
  commitedChain?: Record<string, string>;
  parsedChain?: Record<string, string>;
  lastPrice?: Record<string, number>;
  bidPrice?: Record<string, number>;
  bidSize?: Record<string, number>;
  askPrice?: Record<string, number>;
  askSize?: Record<string, number>;
  volume?: Record<string, number>;
  spreadLP?: Record<string, number>;
  spreadD?: Record<string, number>;
  withdrawFee?: Record<string, number>;
  isDepositAllowed?: Record<string, boolean>;
  isWithdrawAllowed?: Record<string, boolean>;
  orderbook?: Record<string, UnifiedOrderbook>;
}

export interface TileData extends RawData {
  chain?: string;
  minFee?: number;
  exSpreadPercent?: number;
  bestBuyPrice: number;
  bestSellPrice: number;
  bestBuyExchange?: string;
  bestSellExchange?: string;
  depthBuyAmount?: number;
  depthSellAmount?: number;
  estimatedProfit?: number;
}

export type UnifiedOrderbook = {
  exchange: string;
  baseCoin: string;
  timestamp: string;
  asks: [string, string][];
  bids: [string, string][];
};

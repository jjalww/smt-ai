
export enum MarketAsset {
  XAUUSD = 'XAUUSD',
  XAGUSD = 'XAGUSD',
  BTCUSD = 'BTCUSD',
  EURUSD = 'EURUSD',
  GBPUSD = 'GBPUSD'
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface TradeSetup {
  entryZone: string;
  stopLoss: number;
  takeProfit: number;
}

export interface AnalysisResult {
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  conceptsFound: string[];
  explanation: string;
  sources?: GroundingSource[];
  setup?: TradeSetup;
}

export interface RiskCalculation {
  positionSize: number;
  riskAmount: number;
  leverageRequired: number;
}

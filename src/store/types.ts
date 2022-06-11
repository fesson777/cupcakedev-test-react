import { Dispatch } from "react";
import type {
  Market,
  CurrencyData,
  EnrichedMarketData,
  EnrichedMarketDataMap,
} from "types";

export type State = {
  markets: Record<Market, EnrichedMarketData>;
  data: CurrencyData[];
};

export type Ctx = {
  state: State;
  dispatch: Dispatch<Actions>;
};

export type SetMarketDataAction = {
  type: "SET_MARKET_DATA";
  payload: EnrichedMarketDataMap;
};

export type Actions = SetMarketDataAction;

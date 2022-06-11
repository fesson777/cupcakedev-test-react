import type { State, Actions } from "store/types";
import { transform } from "utils";

export function reducer(state: State, action: Actions): State {
  if (action.type === "SET_MARKET_DATA") {
    const { market, data } = action.payload;
    const markets = {
      ...state.markets,
      [market]: data,
    };
    return {
      ...state,
      markets,
      data: transform(markets),
    };
  }

  return state;
}

import { createContext, useReducer } from "react";
import type { EnrichedMarketData } from "types";
import type { State, Ctx } from "store/types";
import { reducer } from "./reducer";

const initState: State = {
  markets: {
    first: {} as EnrichedMarketData,
    second: {} as EnrichedMarketData,
    third: {} as EnrichedMarketData,
  },
  data: [],
};

const initCtx: Ctx = {
  state: initState,
  dispatch: () => undefined,
};

export const Context = createContext(initCtx);

export function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
}

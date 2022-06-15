import { useContext, useEffect } from 'react';
import { getMarketData } from 'api';
import type { Market } from 'types';
import { Context } from 'store/context';
import { enrichMarketData } from 'utils';
import { markets } from 'utils/config';

export default function DataService({ children }) {
  const { dispatch } = useContext(Context);

  useEffect(() => {
    window.setInterval(() => {
      markets.forEach(market => getData(market));
    }, 1000);
  }, []);

  async function getData(market: Market) {
    const response = await getMarketData(market);
    if (response) {
      const data = enrichMarketData(response);
      dispatch({ type: 'SET_MARKET_DATA', payload: data });
    }
  }
  return <>{children}</>;
}

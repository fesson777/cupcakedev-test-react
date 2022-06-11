import clsx from "clsx";
import { useContext, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/system";
import { getMarketData } from "api";
import type { Market } from "types";
import { Context } from "store/context";
import { enrichMarketData } from "utils";
import { markets } from "utils/config";
import classes from "./App.module.css";

function App() {
  const {
    dispatch,
    state: { data },
  } = useContext(Context);

  useEffect(() => {
    window.setInterval(() => {
      markets.forEach(market => getData(market));
    }, 1000);
  }, []);

  async function getData(market: Market) {
    const response = await getMarketData(market);
    if (response) {
      const data = enrichMarketData(response);
      dispatch({ type: "SET_MARKET_DATA", payload: data });
    }
  }

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <TableContainer component={Paper} className={classes.table_container}>
          <Table className={classes.table} aria-label="table">
            <TableHead>
              <TableRow>
                <TableCell>Pair Name/market</TableCell>
                <TableCell align="right">first</TableCell>
                <TableCell align="right">second</TableCell>
                <TableCell align="right">third</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(row => (
                <TableRow key={row.currency} className={classes.table_row}>
                  <TableCell component="th" scope="row">
                    {row.currency}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={clsx(
                      row.minValue === row.first && classes.active
                    )}
                  >
                    {row.first}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={clsx(
                      row.minValue === row.second && classes.active
                    )}
                  >
                    {row.second}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={clsx(
                      row.minValue === row.third && classes.active
                    )}
                  >
                    {row.third}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default App;

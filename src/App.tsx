import clsx from 'clsx';
import { useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/system';
import { Context } from 'store/context';
import classes from './App.module.css';

function App() {
  const {
    state: { data },
  } = useContext(Context);

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
                    className={clsx(row.minValue === row.first && classes.active)}
                  >
                    {row.first}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={clsx(row.minValue === row.second && classes.active)}
                  >
                    {row.second}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={clsx(row.minValue === row.third && classes.active)}
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

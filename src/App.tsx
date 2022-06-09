import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Container } from '@mui/system'
import { getMarketsData } from './api'
import classes from './App.module.css'
import { currencyObj } from './type'

function App() {
  const [data, setData] = useState<currencyObj[]>([])

  useEffect(() => {
    getMarketsData().then((items) => (items ? setData(items) : null))
  }, [])

  useEffect(() => {
    setInterval(() => {
      getMarketsData().then((items) => (items ? setData(items) : null))
    }, 1000)
  }, [setInterval])

  return (
    <div className="App" style={{ minHeight: '100vh', minWidth: '100%' }}>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <TableContainer component={Paper} sx={{ maxWidth: 450 }}>
          <Table sx={{ maxWidth: 450 }} aria-label="table">
            <TableHead>
              <TableRow>
                <TableCell>Pair Name/market</TableCell>
                <TableCell align="right">first</TableCell>
                <TableCell align="right">second</TableCell>
                <TableCell align="right">third</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row: any, i: number) => (
                <TableRow
                  key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={[row.active === 'first' && classes.active].join(
                      ' '
                    )}
                  >
                    {row.first}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={[row.active === 'second' && classes.active].join(
                      ' '
                    )}
                  >
                    {row.second}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={[row.active === 'third' && classes.active].join(
                      ' '
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
  )
}

export default App

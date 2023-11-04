import React from 'react'
import { useState, useEffect } from 'react';
import './AdminStatistics.css';
import GameAPI from '../../Apis/GameAPI';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
function AdminStatistics() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    GameAPI.getAdminStats()
      .then(data => {
        let newRows = data.adminStatistics.map(adminStatistic =>
          createData(adminStatistic.country, adminStatistic.gamesPlayed, adminStatistic.winRate, adminStatistic.avgScore)
        );
      setRows(newRows);
    })
  }, []);

  function createData(Country, GamesPlayed, WinRate, AvgScore) {
    return { Country, GamesPlayed, WinRate, AvgScore};
  }

  return (
    <>
      <TableContainer className='table' component={Paper}>
            <Table sx={{ maxWidth: 1200 }} aria-label="simple table" align="center">
            <TableHead className="TableHead">
              <TableRow>
                <TableCell align="center" className="TableCell">Country</TableCell>
                <TableCell align="center" className="TableCell">Games Played</TableCell>
                <TableCell align="center" className="TableCell">Win Rate</TableCell>
                <TableCell align="center" className="TableCell">Average Guess Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="TableRow"
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" className="TableCell">{row.Country}</TableCell>
                  <TableCell align="center" className="TableCell">{row.GamesPlayed}</TableCell>
                  <TableCell align="center" className="TableCell">{row.WinRate} %</TableCell>
                  <TableCell align="center" className="TableCell">{row.AvgScore}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            </Table>
          </TableContainer>
    </>
  )
}

export default AdminStatistics
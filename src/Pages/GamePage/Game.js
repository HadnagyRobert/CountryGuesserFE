import React from "react";
import { useParams } from 'react-router-dom';
import "./Game.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import GameApi from "../../Apis/GameAPI";
import GiveUp from "../../Components/GiveUp/GiveUp";
import Congratulations from "../../Components/Congratulations/Congratulations";

function Game() {
  const [guess, setGuess] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [rows, setRows] = useState([]);
  const { gameId } = useParams();
  const [finished, setFinish] = useState(null);
  const [giveUp, setGiveUp] = useState(null);
  const [error, setError] = useState({
    error: false,
    message: "",
  });

  useEffect(() => {
    GameApi.getGuesses(gameId)
      .then(data => {
        let newRows = data.guesses.map(guess =>
          createData(gameId, guess.countryName, guess.continentCorrect, guess.sizeCorrect, guess.populationCorrect)
        );
        setRows(newRows.reverse());
      })
      .catch(err => console.error(err));
  }, [gameId]);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    let guessRequest = {
      gameId: gameId,
      countryName: guess,
    };
  
    GameApi.guessCountry(guessRequest)
      .then(data => {
        let newRows = createData(gameId, data.countryName, data.continentCorrect, data.sizeCorrect, data.populationCorrect);
        if(data.errorMessage != null) {
          setError({
            error: true,
            message: data.errorMessage,
          });
          setInputValue("");
          return;
        }
        setRows(rows => [newRows, ...rows]);
        if(data.correct === true)
        {
          setFinish(true);
          setInputValue("");
          return;
        } 
      })
      .catch(err => console.error(err));

    setInputValue("");
  };

  function createData(id, Country, Continent, Size, Population) {
    return { id, Country, Continent, Size, Population};
  }
  
  const renderCellValue = (value) => {
    if (value === 'LOWER') return '⬇️';
    if (value === 'HIGHER') return '⬆️';
    if (value === 'EQUAL') return '✅';
    if (value === true) return '✅';
    if (value === false) return '❌';
    return value;
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setGuess(inputValue);
      setError({
        error: false,
        message: "",
      });
    }
  };

  const handleClick = () => {
    GameApi.giveUp(gameId);
    setGiveUp(true);
  };

  return (
    <>
    <div className="content-container">
      {finished && <Congratulations />}
      {giveUp && <GiveUp />}
      <button className="button" onClick={handleClick}>
        Give Up
      </button>
      <div className="container">
        <h1 className="title">Country Guesser</h1>
        <form onSubmit={handleSubmit} className="form-container">
          <input
            type="text"
            id="guess"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleKeyDown}
            disabled={finished || giveUp}
          />
          {error.error && <p className="error">{error.message}</p>}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1200 }} aria-label="simple table">
            <TableHead className="TableHead">
              <TableRow>
                <TableCell align="center" className="TableCell">Country</TableCell>
                <TableCell align="center" className="TableCell">Continent</TableCell>
                <TableCell align="center" className="TableCell">Size</TableCell>
                <TableCell align="center" className="TableCell">Population</TableCell>
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
                  <TableCell align="center" className="TableCell">{renderCellValue(row.Continent)}</TableCell>
                  <TableCell align="center" className="TableCell">{renderCellValue(row.Size)}</TableCell>
                  <TableCell align="center" className="TableCell">{renderCellValue(row.Population)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            </Table>
          </TableContainer>
        </form>
      </div>
    </div>
    </>
  );
}

export default Game;

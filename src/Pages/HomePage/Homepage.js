import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Components/AuthContext/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './Homepage.css';
import GameAPI from '../../Apis/GameAPI';

function Homepage() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const { isAuthenticated, tokenPayload } = authContext;
    if (isAuthenticated) {
      const { accessToken } = tokenPayload;
      setAccessToken(accessToken);
    }
  }, [authContext]);

  const startGame = () => {
    GameAPI.getGame(accessToken)
      .then(gameId => {
        navigate(`/game/${gameId}`);
      })
      .catch(error => console.log(error));
  };

  const handleClick = () => {
    startGame();
  };

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Country Guesser</h1>
      <Link to="#" className="homepage-link" onClick={handleClick}>
        Start Game
      </Link>
    </div>
  );
}

export default Homepage;
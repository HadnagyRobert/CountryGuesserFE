import api from "./InterpreterConfig";

const GameAPI = {
    getAdminStats: () => { return api.get(`/game/adminStats`).then(response => response.data)},
    getGuesses: (gameId) => { return api.get(`/game/${gameId}`).then(response => response.data)},
    giveUp: (gameId) => { return api.delete(`/game/${gameId}`).then(response => response.data)},
    guessCountry : (guessRequest) => { return api.post(`/game`, guessRequest).then(response => response.data)}, 
    getGame: (userId) => {
        const config = {
            headers: {
                Authorization: `Bearer ${userId}`, // Pass the user ID as an access token
            },
        };

        return api.get(`/game`, config).then((response) => response.data.gameId);
    },
};

export default GameAPI;

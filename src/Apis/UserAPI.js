import api from "./InterpreterConfig";

const UserAPI = {
    login : (loginRequest) => { return api.post(`/user/login`, loginRequest).then(response => response.data.accessToken)},
    signup : (registerRequest) => { return api.post(`/user`, registerRequest).then(response => response.data)},
    getAccount: (accessToken) => {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        return api.get(`/user`, config).then(response => response.data)
    },
    getUserStatistics: (accessToken) => {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        return api.get(`/user/userStats`, config).then(response => response.data)
    }
}
export default UserAPI;
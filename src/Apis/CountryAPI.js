import api from './InterpreterConfig';

const CountryAPI = {
        getCountries: () => {return api.get(`/country`).then(response => response.data)},
            // return axios.get(`https://restcountries.com/v3.1/all`)
            //     .then(response => response.data)
            //     .then(data => {
            //         const randomIndex = Math.floor(Math.random() * data.length);
            //         return data[randomIndex];
            //     })
        getCountryById: (id) => {return api.get(`/country/${id}`).then(response => response.data)},
        createCountry: (country) => {return api.post(`/country`, country).then(response => response.data)},
        editCountry: (countryName, country) => {return api.put(`/country/${countryName}`, country).then(response => response.data)},
        deleteCountry: (country) => {return api.delete(`/country/${country}`)}
}

export default CountryAPI;
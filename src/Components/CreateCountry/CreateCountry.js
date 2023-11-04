import React, { useState } from 'react';
import './CreateCountry.css';
import CountryAPI from '../../Apis/CountryAPI';
import CountryCreated from '../CountryCreated/CountryCreated';

const CreateCountry = () => {
  const [created, setCreated] = useState(null);
  const [country, setCountry] = useState({
    countryName: "",
    population: "",
    size: "",
    continent: "EUROPE"
  });

  const [errors, setErrors] = useState({});

  const continents = ["EUROPE", "NORTH_AMERICA", "SOUTH_AMERICA", "ASIA", "AFRICA", "AUSTRALIA", "ANTARCTICA"];

  const handleChange = (e) => {
    setCountry({ ...country, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};

    if (!country.countryName) errors.countryName = "Name is required.";
    if (!country.population) errors.population = "Population is required.";
    else if (country.population <= 0) errors.population = "Population has to be positive.";
    if (!country.size) errors.size = "Size is required.";
    else if (country.size <= 0) errors.size = "Size has to be positive.";

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    CountryAPI.createCountry(country)
    .then(setCreated(true))
    .catch((error) => { console.log(error); });
    setErrors({});
  }

  return (
    <div className='create-container'>
      {created && <CountryCreated />}
      <form className='create-form' onSubmit={handleSubmit}>
        <h2 className='title'>Create Country</h2>
        <div className='inputGroup'>
          <label className='label'>
            Name:
          </label>
          <input type="text" className='input' name="countryName" value={country.countryName} onChange={handleChange} />
          {errors.countryName && <p className='error'>{errors.countryName}</p>}
        </div>
        <div className='inputGroup'>
          <label className='label'>
            Population:
          </label>
          <input type="number" className='input' name="population" value={country.population} onChange={handleChange} />
          {errors.population && <p className='error'>{errors.population}</p>}
        </div>
        <div className='inputGroup'>
          <label className='label'>
            Size:
          </label>
          <input type="number" className='input' name="size" value={country.size} onChange={handleChange} />
          {errors.size && <p className='error'>{errors.size}</p>}
        </div>
        <div className='inputGroup'>
          <label className='label'>
            Continent:
          </label>
          <select name="continent" className='input' value={country.continent} onChange={handleChange}>
            {continents.map((continent) => 
              <option key={continent} value={continent}>
                {continent}
              </option>
            )}
          </select>
        </div>
        <button type="submit" className='submit'>Submit</button>
      </form>
    </div>
  );
}

export default CreateCountry;
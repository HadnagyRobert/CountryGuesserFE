import React, { useContext, useState, useEffect } from 'react';
import { CountryContext } from '../CountryContext/CountryContext';
import './EditCountry.css';
import CountryAPI from '../../Apis/CountryAPI';
import CountryEdited from '../CountryEdited/CountryEdited';
import CountryDeleted from '../CountryDeleted/CountryDeleted';

const EditCountry = () => {
  const { countries, setCountries } = useContext(CountryContext);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [editCountry, setEditCountry] = useState(null);
  const [deleteCountry, setDeleteCountry] = useState(null);
  const [country, setCountry] = useState({
    countryName: "",
    population: '',
    size: '',
    continent: 'EUROPE'
  });

  const [errors, setErrors] = useState({});

  const continents = [
    'EUROPE',
    'NORTH_AMERICA',
    'SOUTH_AMERICA',
    'ASIA',
    'AFRICA',
    'AUSTRALIA',
    'ANTARCTICA'
  ];

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await CountryAPI.getCountries();
        setCountries(response.countries.map(country => ({
          countryName: country.name,
          population: country.population,
          size: country.size,
          continent: country.continent
        })));
      } catch (error) {
        console.error('Failed to fetch countries', error);
      }
    };

    fetchCountries();
  }, [setCountries]);

  useEffect(() => {
    if (selectedCountry) {
      setCountry(selectedCountry);
    }
  }, [selectedCountry]);

  const handleChange = (e) => {
    setCountry({ ...country, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};

    if (!country.countryName) errors.countryName = 'Name is required.';
    if (!country.population) errors.population = 'Population is required.';
    else if (country.population <= 0)
      errors.population = 'Population has to be positive.';
    if (!country.size) errors.size = 'Size is required.';
    else if (country.size <= 0) errors.size = 'Size has to be positive.';

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    CountryAPI.editCountry(selectedCountry.countryName, country)
    .then(setEditCountry(true));


    setCountries(
      countries.map((c) => (c.countryName === selectedCountry.countryName ? country : c))
    );
    setSelectedCountry(null);
    setErrors({});
  };

  const handleDelete = (e) => {
    e.preventDefault();
    let errors = {};

    if (!country.countryName) errors.countryName = 'Name is required.';
    if (!country.population) errors.population = 'Population is required.';
    else if (country.population <= 0)
      errors.population = 'Population has to be positive.';
    if (!country.size) errors.size = 'Size is required.';
    else if (country.size <= 0) errors.size = 'Size has to be positive.';

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    CountryAPI.deleteCountry(selectedCountry.countryName)
    .then(setDeleteCountry(true));

    setCountries(
      countries.map((c) => (c.countryName === selectedCountry.countryName ? country : c))
    );
    setSelectedCountry(null);
    setErrors({});
  }

  return (
    <div className='edit-container'>
      {editCountry && <CountryEdited />}
      {deleteCountry && <CountryDeleted />}
      <div className='list-container'>
        <h2>Countries:</h2>
        {countries.map((country) => (
          <div key={country.countryName}>
            <button className='submit' onClick={() => setSelectedCountry(country)}>
              {country.countryName}
            </button>
          </div>
        ))}
      </div>
      <div className='edit-form-container'>
        <h2>Edit Country:</h2>
        <form className='form' onSubmit={handleSubmit}>
          <div className='inputGroup'>
            <label className='label' htmlFor='name'>
              Name:
            </label>
            <input
              type='text'
              id='countryName'
              name='countryName'
              value={country.countryName}
              onChange={handleChange}
            />
            {errors.countryName && <p className='error'>{errors.countryName}</p>}
          </div>
          <div className='inputGroup'>
            <label className='label' htmlFor='population'>
              Population:
            </label>
            <input
              type='number'
              id='population'
              name='population'
              value={country.population}
              onChange={handleChange}
            />
            {errors.population && (
              <p className='error'>{errors.population}</p>
            )}
          </div>
          <div className='inputGroup'>
            <label className='label' htmlFor='size'>
              Size:
            </label>
            <input
              type='number'
              id='size'
              name='size'
              value={country.size}
              onChange={handleChange}
            />
            {errors.size && <p className='error'>{errors.size}</p>}
          </div>
          <div className='inputGroup'>
            <label className='label' htmlFor='continent'>
              Continent:
            </label>
            <select
              id='continent'
              name='continent'
              value={country.continent}
              onChange={handleChange}
            >
              {continents.map((continent) => (
                <option key={continent} value={continent}>
                  {continent}
                </option>
              ))}
            </select>
          </div>
          <button type='submit' className='submit'>
            Submit
          </button>
        </form>
        <h2>Delete Country:</h2>
        <form type='submit' onSubmit={handleDelete}>
          <button type='submit' className='delete'>
            Delete
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCountry;

import React, {useState, useEffect} from 'react';
import axios from 'axios';

const FilterCountries = props => {
  return (
    <div>
      find countries <input value={props.filter} onChange={e => props.handleChange(e.target.value)} />
    </div>
  )
}

const Country = props => {
  return (
    <li>
      {props.country.name}
      <button onClick={e => props.showHandler(props.country) }>show</button>
    </li>
  )
}

const CapitalWeather = props => {

  return (
    <div>
      <h3>{`Weather in ${props.country.capital}`}</h3>
    </div>
  );
}

const CountryDetails = props => {

  return (
    <div>
      <h1>{props.country.name}</h1>
      <div>capital {props.country.capital}</div>
      <div>population {props.country.population}</div>
      <div><h3>languages</h3>
        <ul>
          {props.country.languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)}
        </ul>
      </div>
      <div>
        <img
          src={props.country.flag}
          alt={`flag of ${props.country.name}`}
          width="200px" />
      </div>
      <CapitalWeather country={props.country} />
    </div>
  );
}

const Results = props => {
  const maxCountries = 10;

  if (props.countries.length > maxCountries){
    // Too many results
    return (<div>Too many matches, specify another filter</div>);
  }
  else if(props.countries.length === 1){
    // Show details
    console.log("Showing details to ", props.countries[0].name);
    return (<CountryDetails country={props.countries[0]} />);
  }

  // Show list
  return (
    <div>
      <ul>
        { props.countries.map(country => <Country key={country.name} country={country} showHandler={props.showHandler} />) }
      </ul>
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState('');
  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(countryFilter.toLowerCase()));

  const showHandler = country => {
    setCountryFilter(country.name.trim());
  };

  // Get list of countries
  useEffect(()=>{
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response =>{
        setCountries(response.data);
      });
  }, []);

  return (
    <div>
      <FilterCountries
        filter={countryFilter}
        handleChange={setCountryFilter} />
      <Results
        countries={filteredCountries}
        showHandler={showHandler} />
    </div>
  );
}

export default App;

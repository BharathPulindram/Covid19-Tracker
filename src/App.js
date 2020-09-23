import React, { useEffect, useState } from "react";
import "./App.css";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");

  useEffect(() => {
    //async --> send a req to server ,wait for it, do something
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, //United States
            value: country.countryInfo.iso2, //USA
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid 19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">{country} </MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name} </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox title="CoronaVirus Cases" total={5000} cases={4444} />
          <InfoBox title="Recovered" total={6000} cases={3144} />
          <InfoBox title="Deaths" total={200} cases={1444} />
          {/* InfoBoxes  */}
        </div>
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Case by country</h3>
          <h3>Worldwide new cases</h3>
        </CardContent>
        {/* Table
        Graph */}
      </Card>
    </div>
  );
}

export default App;

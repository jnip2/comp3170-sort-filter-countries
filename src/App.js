import { useState } from "react";

import data from "./data/countries.json";
import Country from "./components/Country";

import "./styles.css";

//comparing functions
function alphaCompare(a, b) {
  return a.name.localeCompare(b.name);
}

function ascendingCompare(a, b) {
  return a.population - b.population;
}

function descCompare(a, b) {
  return b.population - a.population;
}

function shuffleList(a, b) {
  let num = Math.floor(Math.random() * 3 + 1);
  console.log(num);
  return a.name[num].localeCompare(b.name[num]);
}

function sort(list, compareFunc) {
  return list.sort(compareFunc);
}

// function filter(list, option) {
//   return list.filter((item) => {
//     return item.continent.toLowerCase() === option.toLowerCase();
//   });
// }

export default function App() {
  const countries = data.countries; //an array
  const [sortOption, setSortOption] = useState(">");
  const [filterOption, setFilterOption] = useState("all");

  // const sortedCountries = alphaSort(countries.slice());
  let sortedCountries = sort(countries, alphaCompare);

  function handleSort(e) {
    setSortOption(e.target.value);
    // alert(sortOption);
  }

  function sortCountries(e) {
    let func;
    // const option = e.target.value;
    if (sortOption === "alpha") {
      func = alphaCompare;
    } else if (sortOption === "<") {
      func = ascendingCompare;
    } else if (sortOption === ">") {
      func = descCompare;
    } else if (sortOption === "shuffle") {
      func = shuffleList;
    }
    // sortedCountries = sort(countries.slice(), func);
    // alert(sortedCountries[0].name);
    return sort(countries.slice(), func);
  }

  sortedCountries = sortCountries();

  function handleFilter(e) {
    setFilterOption(e.target.value);
    // alert(e.target.value);
  }

  const filteredCountries = filter(sortedCountries.slice(), filterOption);

  function filter(list, option) {
    if (option === "all") {
      return list;
    } else if (
      option === "asia" ||
      option === "africa" ||
      option === "europe" ||
      option === "north america" ||
      option === "south america"
    ) {
      return list.filter((item) => {
        return item.continent.toLowerCase() === option.toLowerCase();
      });
    } else if (option === "1") {
      return list.filter((item) => {
        return item.population < 100000000;
      });
    } else if (option === "100m") {
      return list.filter((item) => {
        return item.population > 100000000;
      });
    } else if (option === "200m") {
      return list.filter((item) => {
        return item.population > 200000000;
      });
    } else if (option === "500m") {
      return list.filter((item) => {
        return item.population > 500000000;
      });
    } else if (option === "1b") {
      return list.filter((item) => {
        return item.population > 1000000000;
      });
    }
  }

  return (
    <div className="App">
      <h1>World's largest countries by population</h1>
      <div className="filters">
        <label>
          Sort by:
          <select onChange={handleSort} value={sortOption}>
            <option value="alpha">A–Z</option>
            <option value="<">Population Asc.</option>
            <option value=">">Population Desc.</option>
            <option value="shuffle">Shuffle</option>
          </select>
        </label>
        <label>
          Filters:
          <select onChange={handleFilter}>
            <optgroup label="By continent">
              <option value="all">All</option>
              <option value="asia">Asia</option>
              <option value="africa">Africa</option>
              <option value="europe">Europe</option>
              <option value="north america">North America</option>
              <option value="south america">South America</option>
            </optgroup>
            <optgroup label="By population size">
              <option value="1">Less than 100M</option>
              <option value="100m">100M or more</option>
              <option value="200m">200M or more</option>
              <option value="500m">500M or more</option>
              <option value="1b">1B or more</option>
            </optgroup>
          </select>
        </label>
      </div>
      <div className="countries">
        {filteredCountries.map((country) => {
          return <Country details={country} key={country.id} />;
        })}
      </div>
    </div>
  );
}

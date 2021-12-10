// const regions = {
//   asia: asia,
//   europe: europe,
//   australia: australia,
//   afrika: afrika,
//   america: america,
//   australia: australia,
// };

let countries = [];

async function fetchCountries(region_name) {
  const res = await fetch(
    `https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1/region/${region_name}`
  );
  if (!res.ok) {
    throw Error("region data not found");
  }
  const data = await res.json();

  for (let i = 0; i < data.length; i++) {
    countries.push(data[i].cca2);
  }

  return countries;
}

let region_name = "asia";
fetchCountries(region_name).then((data) => console.log(data));

async function fetchCovidData(countryCode) {
  const url = await fetch(`https://corona-api.com/countries/${countryCode}`);
  if (!url.ok) {
    throw Error("covid country data not found");
  }
  const data = await url.json();
  const latest_data = data.data.latest_data;

  const countryData = {
    deaths: latest_data.deaths,
    confirmed: latest_data.confirmed,
    recovered: latest_data.recovered,
    critical: latest_data.critical,
  };
  console.log(countryData);
  return countryData;
}

let countryCode = "AF";
fetchCovidData(countryCode);
function collectData(dataType, countries) {}

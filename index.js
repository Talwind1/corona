// const regions = {
//   asia: asia,
//   europe: europe,
//   australia: australia,
//   afrika: afrika,
//   america: america,
//   australia: australia,
// };

async function fetchCountries(region_name) {
  const res = await fetch(
    `https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1/region/${region_name}`
  );
  if (!res.ok) {
    throw Error("region data not found");
  }
  const data = await res.json();
  const countries = [];
  for (let i = 0; i < data.length; i++) {
    countries.push(data[i].cca2);
  }
  console.log(countries);
}

let region_name = "asia";
fetchCountries(region_name);


async function fetchCovidData(countryCode){
  const url = await fetch(`https://corona-api.com/countries/${countryCode}`);
  console.log(data);
  if (url.ok) {
    const data = await url.json();
    
}
let countryCode= 'AF';
fetchCovidData(countryCode);
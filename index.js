// const regions = {
//   asia: asia,
//   europe: europe,
//   australia: australia,
//   afrika: afrika,
//   america: america,
//   australia: australia,
// };

let countryCode = "AF";
let region_name = "asia";
let myChart = document.getElementById("myChart").getContext("2d");

async function fetchCountries(region_name) {
  const res = await fetch(
    `https://intense-mesa-62220.herokuapp.com/https://restcountries.herokuapp.com/api/v1/region/${region_name}`
  );
  if (!res.ok) {
    throw Error("region data not found");
  }
  const data = await res.json();
  let countries = [];

  for (let i = 0; i < data.length; i++) {
    let countryData = {
      code: data[i].cca2,
      name: data[i].name.common,
    };
    countries.push(countryData);
  }
  return countries;
}

async function fetchCovidData(country) {
  const url = await fetch(`https://corona-api.com/countries/${country.code}`);
  if (!url.ok) {
    throw Error("covid country data not found");
  }
  const data = await url.json();
  const latest_data = data.data.latest_data;

  const countryData = {
    //  name: countryCode.name,
    deaths: latest_data.deaths,
    confirmed: latest_data.confirmed,
    recovered: latest_data.recovered,
    critical: latest_data.critical,
  };
  // console.log(countryData);
  return countryData;
}

// function arrayCovid(countries, type) {
//   const promisesArray = [];
//   countries.forEach((country) => {
//     promisesArray.push(fetchCovidData(country));
//   });
//   return promisesArray;
// }

// async function createGraph(tableData) {
//   const myGraph = new Chart(myChart, {
//     type: "bar",
//     data: {
//       datasets: tableData.deaths,
//       labels: "ddd",
//     },
//     options: {},
//   });
// }
//   let names = [];
//   let data = [];
//   tableData.forEach((element) => {
//     names.push(element.name);
//   });
//   tableData.forEach((element) => {
//     data.push(element.deaths);
//   });
//   const myGraph = new Chart(myChart, {
//     type: "bar",
//     data: {
//       datasets: data,
//       labels: names,
//     },
//     options: {},
//   });
// }

// fetchCountries(region_name)
//   .then((data) => {
//     data.forEach((element) => {
//       fetchCovidData(element.code);
//     });
//   })
//   .then((tableData) => {
//     createGraph(tableData);
//   });
fetchCountries(region_name)
  .then((countries) => {
    const arrCovid = [];
    countries.forEach((country) => {
      arrCovid.push(fetchCovidData(country));
    });
    return arrCovid;
  })
  .then((arrCovid) => Promise.all(arrCovid))
  .then((data) => console.log(data));

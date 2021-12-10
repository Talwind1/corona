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
    name: data.data.name,
    deaths: latest_data.deaths,
    confirmed: latest_data.confirmed,
    recovered: latest_data.recovered,
    critical: latest_data.critical,
  };

  return countryData;
}

function arangeDataForTable(arrData) {
  let names = [];
  let deaths = [];
  let confirmed = [];
  let recovered = [];
  let critical = [];

  for (let i = 0; i < arrData.length; i++) {
    names.push(arrData[i].name);
    deaths.push(arrData[i].deaths);
    confirmed.push(arrData[i].confirmed);
    recovered.push(arrData[i].recovered);
    critical.push(arrData[i].critical);
  }
  let arraysForTable = {
    names: names,
    deaths: deaths,
    confirmed: confirmed,
    recovered: recovered,
    critical: critical,
  };
  //console.log(arraysForTable);
  return arraysForTable;
}

function createTable(organideData) {
  let labels = organideData.names;
  let deaths = organideData.deaths;

  let myGraph = new Chart(myChart, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Deaths",
          data: deaths,
        },
      ],
    },
  });
}

fetchCountries(region_name)
  .then((countries) => {
    const arrCovid = [];
    countries.forEach((country) => {
      arrCovid.push(fetchCovidData(country));
    });
    return arrCovid;
  })
  .then((arrCovid) => Promise.all(arrCovid))
  .then((data) => {
    let organideData = arangeDataForTable(data);
    createTable(organideData);
  });

// const regions = {
//   asia: asia,
//   europe: europe,
//   africa: africa,
//   Americas: Americas,
//   Oceania: Oceania,
// };

let region_name = "";
let myChart = document.getElementById("myChart").getContext("2d");
let countries = [];
const asia = document.querySelector("#asia");
const europe = document.querySelector("#europe");
const africa = document.querySelector("#africa");
const Americas = document.querySelector("#americas");
const Oceania = document.querySelector("#oceania");
let currentInterest = "";
const confirmed = document.querySelector("#confirmed");
const deaths = document.querySelector("#deaths");
const recovered = document.querySelector("#recovered");
const critical = document.querySelector("#critical");

confirmed.addEventListener("click", () => {
  currentInterest = "confirmed";
});
deaths.addEventListener("click", () => {
  currentInterest = "deaths";
});
recovered.addEventListener("click", () => {
  currentInterest = "recovered";
});
critical.addEventListener("click", () => {
  currentInterest = "critical";
});
asia.addEventListener("click", (e) => {
  region_name = "asia";
  startAll(region_name);
});
europe.addEventListener("click", (e) => {
  region_name = "europe";
  startAll(region_name);
});
africa.addEventListener("click", (e) => {
  region_name = "africa";
  startAll(region_name);
});
Americas.addEventListener("click", (e) => {
  region_name = "americas";
  startAll(region_name);
});
Oceania.addEventListener("click", (e) => {
  region_name = "oceania";
  startAll(region_name);
});

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
    if (countryData.code !== "XK") {
      countries.push(countryData);
    }
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
  return arraysForTable;
}

function createTable(organideData, currentInterest = "confirmed") {
  let labels = organideData.names;
  let deaths = organideData[currentInterest];

  let myGraph = new Chart(myChart, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: currentInterest,
          data: deaths,
        },
      ],
    },
  });
}

function startAll(region_name) {
  fetchCountries(region_name)
    .then((countries) => {
      // console.log(countries);
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
}

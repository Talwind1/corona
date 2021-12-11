//const spinner = document.querySelector(".spinner");
let myChart = document.getElementById("myChart").getContext("2d");
let myGraph = new Chart(myChart, {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "Covid Stats",
        data: [],
      },
    ],
  },
});

let region_name = "";

let countries = [];
const asia = document.querySelector("#asia");
const europe = document.querySelector("#europe");
const africa = document.querySelector("#africa");
const Americas = document.querySelector("#americas");
const Oceania = document.querySelector("#oceania");
const contCovid = document.querySelector(".contCovid");
let currentInterest = "";

asia.addEventListener("click", (e) => {
  startAll("asia");
});
europe.addEventListener("click", (e) => {
  startAll("europe");
});
africa.addEventListener("click", (e) => {
  startAll("africa");
});
Americas.addEventListener("click", (e) => {
  startAll("americas");
});
Oceania.addEventListener("click", (e) => {
  startAll("oceania");
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
let names = [];
let deaths = [];
let confirmed = [];
let recovered = [];
let critical = [];

function arangeDataForTable(arrData) {
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

function startAll(region_name) {
  //spinner.style.display = "inline-block";
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
      let organizedData = arangeDataForTable(data);
      // console.log(organizedData);
      let botonsNames = Object.keys(data[0]);
      // console.log(botonsNames);
      //console.log(contCovid.childElementCount);
      if (contCovid.childElementCount < 4) {
        botonsNames.forEach((btnName) => {
          if (btnName !== "name") {
            let b = document.createElement("button");
            b.innerText = `${btnName}`;
            b.id = `${btnName}`;
            b.classList.add("btn");
            contCovid.appendChild(b);

            b.addEventListener("click", (e) => {
              removeData(myGraph);
              console.log(organizedData.names);
              //console.log(organizedData[e.target.id]);
              addData(
                myGraph,
                organizedData.names,
                organizedData[e.target.id],
                e.target.id
              );

              //createTable(organizedData, btnName);
            });
          }
        });
      }
    });
}

// function createTable(myGraph, organizedData, botonName) {
//   let labels = organizedData.names;
//   let datas = organizedData[botonName];

//   console.log(labels);
//   console.log(datas);
//   addData(myGraph, labels, datas, );

// console.log(myGraph);
// myGraph.data.labels = labels;
// myGraph.data.datasets[0].data = datas;

// myGraph.update();
// }

// function createChart(params) {

// console.log(datas);
// }
function removeData(myGraph) {
  myGraph.data.labels = [];
  myGraph.data.datasets.forEach((dataset) => {
    dataset.data = [];
  });
  myGraph.update();
}

function addData(myGraph, label, data, title) {
  myGraph.data.labels = label;
  myGraph.data.datasets[0].data = data;
  myGraph.data.datasets[0].label = title;
  myGraph.update();
}

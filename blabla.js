let myChart = document.getElementById("myChart").getContext("2d");

let isrPopChart = new Chart(myChart, {
  type: "bar",
  data: {
    labels: [
      "Jerusalem",
      "Tel Aviv",
      "Haifa",
      "Rishon Letzion",
      "Petach Tikva",
    ],
    datasets: [
      {
        label: "Population",
        data: [962648, 467713, 282898, 256667, 251593],
        backgroundColor: [
          "rgba(255,99,132,0.6)",
          "rgba(255,159,64,0.6)",

          "rgba(255,206,86,0.6)",
          "rgba(75,192,192,0.6)",
          "rgba(54,162,235,0.6)",
        ],
      },
    ],
  },
});

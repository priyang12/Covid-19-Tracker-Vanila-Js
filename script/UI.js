class UI {
  constructor() {
    this.lists = document.getElementById('country');
    this.graph = document.getElementById('graph').getContext('2d');
    this.active_cases = document.getElementById('active_cases');
    this.recover_cases = document.getElementById('recover_cases');
    this.death_cases = document.getElementById('death_cases');

    this.mygraphChart = null;
  }
  updateCountry(Active_cases, Recover_cases, Death_cases, Dates) {
    this.active_cases.innerHTML = Active_cases[Active_cases.length - 1];
    this.recover_cases.innerHTML = Recover_cases[Recover_cases.length - 1];
    this.death_cases.innerHTML = Death_cases[Death_cases.length - 1];
    this.show_graph(Active_cases, Recover_cases, Death_cases, Dates);
  }
  updateList(list) {
    let html = `<option value="india" selected>india</option>`;
    list.forEach((country) => {
      html = html + `<option value="${country}">${country}</option>`;
    });
    this.lists.innerHTML = html;
  }
  show_graph(Active_cases, Recover_cases, Death_cases, Dates) {
    if (this.mygraphChart) {
      this.mygraphChart.destroy();
    }
    this.mygraphChart = new Chart(this.graph, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Total Cases',
            data: Active_cases,
            fill: false,
            borderColor: 'white',
            backgroundColor: 'white',
            borderWidth: 1,
          },
          {
            label: 'Recovered',
            data: Recover_cases,
            fill: false,
            borderColor: 'rgb(0, 189, 63)',
            backgroundColor: 'rgb(0, 189, 63)',
            borderWidth: 1,
          },
          {
            label: 'Deaths',
            data: Death_cases,
            fill: false,
            borderColor: '#f44336',
            backgroundColor: '#f44336',
            borderWidth: 1,
          },
        ],
        labels: Dates,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
  show_alert() {
    this.profile.innerHTML = `
        <div>
            <h1>there is no user with this username </h1>
        </div>
        `;
  }
}

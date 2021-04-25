const api = new API();

// Init UI
const ui = new UI();

// Search input
const country = document.getElementById('country');
const graph = document.getElementById('graph');
const btn = document.getElementById('btn');

const loadlist = () => {
  api.getCountrylist().then((data) => {
    if (!data.error) {
      ui.updateList(data.list);
    } else {
      loadlist();
    }
  });
};
const load = (name) => {
  if (name !== '') {
    api.getCountryCases(name).then((data) => {
      if (!data.error) {
        ui.updateCountry(
          data.cases_list,
          data.recovered_list,
          data.deaths_list,
          data.formatedDates
        );
      } else {
        load(name);
      }
    });
  } else {
    //   display.style.display = 'none';
  }
};

const init = () => {
  loadlist();
  load('india');
  btn.addEventListener('click', (e) => {
    const name = country.value;
    load(name);
  });
};

init();

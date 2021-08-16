'use strict';
class API {
  async getCountryCases(country_name) {
    const monthsNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Junly',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    let cases_list = [],
      recovered_list = [],
      re = [],
      deaths_list = [],
      formatedDates = [],
      maxDeaths = 0,
      maxRecovered = 0,
      error = false;

    try {
      const data = await fetch(
        `https://api.covid19api.com/total/country/${country_name}`
      );
      const datas = await data.json();

      datas.forEach((data) => {
        maxRecovered =
          data.Recovered > maxRecovered ? data.Recovered : maxRecovered;
        maxDeaths = data.Deaths > maxDeaths ? data.Deaths : maxDeaths;
        cases_list.push(data.Confirmed);
        recovered_list.push(data.Recovered);
        deaths_list.push(data.Deaths);
        formatedDates.push(formatDate(data.Date));
      });
      function formatDate(dateString) {
        let date = new Date(dateString);
        return `${date.getDate()} ${monthsNames[date.getMonth()]}`;
      }
    } catch (e) {
      error = true;
    }

    return {
      cases_list,
      recovered_list,
      deaths_list,
      formatedDates,
      maxRecovered,
      maxDeaths,
      error,
    };
  }
  async getCountrylist() {
    const list = [];
    const error = false;
    try {
      const data = await fetch(`https://api.covid19api.com/countries`);
      const country = await data.json();
      country.forEach((item) => {
        list.push(item.Slug.toUpperCase());
      });
      list.sort();
    } catch (e) {
      error = true;
    }
    return {
      list,
    };
  }
}

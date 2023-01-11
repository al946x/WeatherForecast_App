/* 
  When Page Loads:

  1. Show user an input to allow them to search for a city
    - show a message on the page to point them, or guide them, to the input.
    - Once city has been inputted:
      a. Show Current Forecast
      b. Show 5 day Forecast
      c. Add city name to search history
        - Get previous searches from localStorage
        - If inputted city has not been stored to search history in localStorage, push the city name
        - Set the search history to localStorage
  2. Show search history
    - Pull search history from localStorage
    - If search history is not empty, output each city to the search history display in the DOM
*/

var apiKey = 'your api key';
var city = 'London';

$.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
  .then(function (currentData) {
    var lon = currentData.coord.lon;
    var lat = currentData.coord.lat;
    var cityURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
var foreCastURL = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=metric`;

    // console.log(currentData);
    console.log(`
      _____Current Conditions_____
      Temp: ${Math.round(currentData.main.temp)} Cº
      Wind: ${currentData.wind.speed} M/S
      Humidity: ${currentData.main.humidity}%
    `);

    $.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
      .then(function (forecastData) {
        console.log(forecastData);
      });
  });

  // get users current location 

  function getLocation() {
    navigator.geolocation.getCurrentPosition(function (data) {
      var lat = data.coords.latitude;
      var lon = data.coords.longitude;
      console.log(lat, lon);
    })
  }
  
  getLocation();
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
// global variables declared 
var apiKey = '07d2b35b0cfc6919c8c403dd4beaa059';
var city = 'London';
var baseURL = 'https://api.openweathermap.org/data/2.5/';
var currentURL = baseURL + `weather?&appid=${apiKey}&units=metric&`;
var forecastURL = baseURL + `forecast?&appid=${apiKey}&units=metric&`;
var iconURL = 'https://openweathermap.org/img/w/'
var cityURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
var foreCastURL = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=metric`;
var lon = currentData.coord.lon;
var lat = currentData.coord.lat;
var todayIcon = $('.today-wicon');
var todayDate = $('#today');
var todayTemp = $('.today-data .temp');
var todayWind = $('.today-data .wind');
var todayHumidity = $('.today-data .humidity');
var forecastWrapper = $('#forecast-container');
var searchHistory = $('.search-history');
var localSearches = [];
var cityListed = $('.city-explored');
var todayCity = $('.todays-weather h2');
var emptyContent = $('.empty');
var contentWeather = $('#content-weather');


function inputSubmitted(cityName) {
$.get(`currentURL + q=${cityName}`)
  .then(function (currentData) {


    // console.log(currentData);
    console.log(`
      _____Current Conditions_____
      Temp: ${Math.round(currentData.main.temp)} Cº
      Wind: ${currentData.wind.speed} M/S
      Humidity: ${currentData.main.humidity}%
      IconURL: ${iconURL + currentData.weather[0].icon}.png
    `);

    $.get(foreCastURL + `lat=${currentData.coord.lat}&lon=${currentData.coord.lon}`)
      .then(function (forecastData) {
        for (var castObj of forecastData.list) {
              console.log(`${iconURL + castObj.weather[0].icon}.png`); 
        }
     
      });
  });
  }

  // get users current location 

  function getLocation() {
    navigator.geolocation.getCurrentPosition(function (data) {
      var lat = data.coords.latitude;
      var lon = data.coords.longitude;
      console.log(lat, lon);
    })
  }
  
  getLocation();

  
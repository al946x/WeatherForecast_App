
//define global variables
var weatherApiKey = '2ddec8010010a68ba6398027239255a3';
var citySearchInput = $('#city-search');
var submitWeatherCity = $('#submit-city');
var forecastEl = document.querySelector('.forecast');
var todayData = document.querySelector('.today-data');
var currentWeatherIcon = $('.today-wicon');
var currentWeatherDate = $('#today');
var currentWeatherTemp = $('.today-data .temp');
var currentWeatherWind = $('.today-data .wind');
var currentWeatherHumidity = $('.today-data .humidity');

var fiveDayForecastContainer = $('#forecast-container');

var weatherSearchHistory = $('.search-history');
var exploredCities = $('.city-explored');

var currentWeatherCity = $('.todays-weather h2');

var noContent = $('.empty');

var weatherContent = $('#content-weather');

//listen for click on search button
submitWeatherCity.on("click", function() {
forecastEl.style.display = "block";
todayData.style.display = "block";
fiveDayForecastContainer.html('');
selectedCity = citySearchInput.val().toUpperCase();
displayWeatherDashboard(selectedCity);
forecast ();
});

var exploredCities = $('.city-explored');

//function to get forecast for selected city

function displayWeatherDashboard(selectedCity) { 
  selectedCity = citySearchInput.val().toUpperCase();
  var currentWeatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${weatherApiKey}&units=metric`;

$.ajax({
    url: currentWeatherApi,
    method: "GET"
  }).then(function(currentData) {
    console.log(currentData);
    var lat = currentData.coord.lat;
    var lon = currentData.coord.lon;
    var icon = currentData.weather[0].icon;
    currentWeatherCity.text(selectedCity);
    currentWeatherDate.text(moment().format('DD/MM/YY'));
    currentWeatherTemp.text(`${Math.round(currentData.main.temp)} C°`);
    currentWeatherWind.text(`${Math.round((currentData.wind.speed)*1.6)} Km/H`);
    currentWeatherHumidity.text(`${currentData.main.humidity}%`);

    $(currentWeatherIcon).attr('src', `https://openweathermap.org/img/wn/${icon}@2x.png`);  
  });
}

function forecast() {
var fiveDayForecastApi = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${weatherApiKey}`;
$.ajax({
  url: fiveDayForecastApi,
  method: "GET"
}).then(function(weatherData){
      
      var fiveDayForecast = [];
      fiveDayForecast.push(weatherData.list);

      $(fiveDayForecast[0]).each(function(i, day){

          var dayTime = day.dt_txt;

          if(dayTime.includes('15:00')){
              var icon = day.weather[0].icon
              var forecastDay = dayTime.split(' ');
              var date= moment(forecastDay[0], 'YYYY MM DD').format('DD/MM/YY');
              var temperature = day.main.temp;
              var windSpeed = day.wind.speed;
              var humidity = day.main.humidity;
              
              fiveDayForecastContainer.append(`
              <div class="daily-forecast">
              <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
              <h4>${date}</h4>
              <p class="forecast-data">
                Temp: ${Math.round(temperature)} C° <br>
                Wind: ${Math.round((windSpeed)*1.6)} KPH<br>
                Humidity: ${humidity}%
              </p>
           </div>
              `);
          }
      });
     } )
};

  var apiKey = '2ddec8010010a68ba6398027239255a3';
  var searchInput = $('#city-search');
  var submitCity = $('#submit-city');

  var todayIcon = $('.today-wicon');
  var todayDate = $('#today');
  var todayTemp = $('.today-data .temp');
  var todayWind = $('.today-data .wind');
  var todayHumidity = $('.today-data .humidity');

  var forecastWrapper = $('#forecast-container');

  var searchHistory = $('.search-history');
  var localSearches = [];
  var cityListed = $('.city-explored');

  var city = '';

  var todayCity = $('.todays-weather h3');

  var emptyContent = $('.empty');

  var contentWeather = $('#content-weather');

  $(document).ready(function() {

  // Hide content section
  contentWeather.addClass("hide");

  // When form is submitted, prevent default and search weather
  $("#search-form").submit(function (event) {
    event.preventDefault();
    searchWeather();
  }) } );

  function searchWeather() {
    searchInput = $("#search-input").val().trim();
    // Clear input after search
    $("#search-input").val("");

    // Check if search input is not empty
    if (searchInput !== "") {
      // Save search to local storage
      var history = JSON.parse(localStorage.getItem("history")) || [];
      addToHistory(searchInput);
      localStorage.setItem("history", JSON.stringify(history));
      // Render search history
      renderHistory(history);
      
      // API call to retrieve current weather
      var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=imperial`;

      $.ajax({
        url: queryURL,
        method: "GET",
      })
        .then(function(response) {
          // console.log(response);
          // Set city and date in header
          $("#city-date").text(response.name + " " + moment().format("MM/DD/YYYY"));
          // Set temperature
          $("#temp").text("Temperature: " + response.main.temp + " °F");
          // Set humidity
          $("#humidity").text("Humidity: " + response.main.humidity + "%");
          // Set wind speed
          $("#wind").text("Wind Speed: " + response.wind.speed + " MPH");
          // Set weather icon
          var icon = response.weather[0].icon;
          var iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
          $("#today-wicon").attr("src", iconURL);
        })
        .catch(function (error) {
          // console.log(error);
        }) } };

      // API call to retrieve 5-day forecast
      var forecastQueryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    
      // `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&appid=${apiKey}&units=imperial`;

      $.ajax({
        url: forecastQueryURL,
        method: "GET",
      })
        .then(function (response) {
          console.log(response);
          // Clear previous forecast
          $("#forecast").empty();
          // Loop through each day in forecast
          for (var i = 0; i < response.list.length; i++) {
            // Only get forecast for 3 PM
            if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {
              // Create and store card
              forecastWrapper.append(`
              <div class="daily-forecast">
              <img src="http://openweathermap.org/img/wn/${forecastIcon}@2x.png">
              <h4>${forecastDay}</h4>
              <p class="forecast-data">
                Temp: ${Math.round(forecastTemp)} C° <br>
                Wind: ${Math.round((forecastWind)*1.6)} KPH<br>
                Humidity: ${forecastHumidity}%
              </p>
           </div>
              
              `)  };
          }
          });

  














// // global variables declared 
//   var apiKey = '07d2b35b0cfc6919c8c403dd4beaa059';
//   var searchInput = $('#city-search');
//   var submitCity = $('#submit-city');

//   var todayIcon = $('.today-wicon');
//   var todayDate = $('#today');
//   var todayTemp = $('.today-data .temp');
//   var todayWind = $('.today-data .wind');
//   var todayHumidity = $('.today-data .humidity');

//   var forecastWrapper = $('#forecast-container');

//   var searchHistory = $('.search-history');
//   var localSearches = [];
//   var cityListed = $('.city-explored');

//   var city = '';
  
//   // var weatherURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon${lon}&appid=${apiKey}`;


//   var todayCity = $('.todays-weather h3');

//   var emptyContent = $('.empty');

//   var contentWeather = $('#content-weather');


// var searchBtn = document.getElementById('search-button')


//



// //event listener for click on search button

//   searchBtn.addEventListener('click', validInput);

//   function validInput(e) {
//     if (!searchInput.value) {
//       return
//     }
//     e.preventDefault();
//     var search = searchInput.value.trim();
//     getCoord(search);
//   }

//   //function to get the weather data
//   function getCoord(search) {
//   var geo = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${apiKey}`
//   $.get(geo) }


 
  // function inputSubmitted(cityName) {
  // $.get(`currentURL + q=${cityName}`)
  //   .then(function (currentData) {
  //     console.log(`
  //       _____Current Conditions_____
  //       Temp: ${Math.round(currentData.main.temp)} Cº
  //       Wind: ${currentData.wind.speed} M/S
  //       Humidity: ${currentData.main.humidity}%
  //       IconURL: ${iconURL + currentData.weather[0].icon}.png
  //     `);

  //     $.get(foreCastURL + `lat=${currentData.coord.lat}&lon=${currentData.coord.lon}`)
  //       .then(function (forecastData) {
  //         for (var castObj of forecastData.list) {
  //               console.log(`${iconURL + castObj.weather[0].icon}.png`); 
  //         }

  //       });
  //   });
  //   }

  //   // get users current location 

  //   function getLocation() {
  //     navigator.geolocation.getCurrentPosition(function (data) {
  //       var lat = data.coords.latitude;
  //       var lon = data.coords.longitude;
  //       console.log(lat, lon);
  //     })
  //   }

  //   getLocation();


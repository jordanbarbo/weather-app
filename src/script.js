function getCurrentDate() {
  let now = new Date();  
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let day = days[now.getDay()];
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let today = document.querySelector("#current-date");
  let hour = now.getHours();
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  } 
  today.innerHTML = day + ", " + month + " " + date + " " + hour + ":" + minute;
}
getCurrentDate();

function formatHours(timestamp) {
  let now = new Date(timestamp);
  let hour = now.getHours();
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  
  return `${hour}:${minute}`;
}


function showTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#city");
  let description = document.querySelector(".current-description");
  let currentHigh = Math.round(response.data.main.temp_max);
  let currentLow = Math.round(response.data.main.temp_min);
  let high = document.querySelector("#current-high");
  let low = document.querySelector("#current-low");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  console.log(response.data);

  highCelsiusTemperature = response.data.main.temp_max;
  lowCelsiusTemperature = response.data.main.temp_min;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  high.innerHTML = `${currentHigh}°`;
  low.innerHTML = `${currentLow}°`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  humidityElement.innerHTML = response.data.main.humidity;
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}


function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += 
      `<div class="col-sm">
        ${formatHours(forecast.dt * 1000)}
        <ul>
          <li>
            <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="Clear" />
          </li>
          <li>
            <strong class="high-temp">${Math.round(forecast.main.temp_max)}</strong>° / <span class="low-temp">${Math.round(forecast.main.temp_min)}</span>°
          </li>
        </ul>
      </div>`;
  }
}

function search(city) {
  let units = "metric";
  let apiKey = "06e7a1225f8f7ed29a9fd5ba9ca81195";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);

  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlForecast).then(showForecast);
}

function findCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-search");
  search(cityInputElement.value);
}

function getCurrentTemperature(response) {
  let currentTemp = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${temperature}`;
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = response.data.name;
  let description = document.querySelector(".current-description");
  description.innerHTML = response.data.weather[0].description;
  let currentHigh = Math.round(response.data.main.temp_max);
  let currentLow = Math.round(response.data.main.temp_min);
  let high = document.querySelector("#current-high");
  let low = document.querySelector("#current-low");
  high.innerHTML = `${currentHigh}°`;
  low.innerHTML = `${currentLow}°`;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "06e7a1225f8f7ed29a9fd5ba9ca81195";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}`).then(getCurrentTemperature);
}

function showCurrentTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  let fahrenheit = Math.round(celsiusTemperature * 9/5 + 32);
  temperatureElement.innerHTML = fahrenheit;
  
  let highTemperatureElement = document.querySelector("#current-high");
  let highFahrenheitTemperature = (highCelsiusTemperature * 9) / 5 + 32;
  highTemperatureElement.innerHTML = `${Math.round(highFahrenheitTemperature)}°`;

  let lowTemperatureElement = document.querySelector("#current-low");
  let lowFahrenheitTemperature = (lowCelsiusTemperature * 9) / 5 + 32;
  lowTemperatureElement.innerHTML = `${Math.round(lowFahrenheitTemperature)}°`;

  let forecastItemsHigh = document.querySelectorAll(".high-temp");
  forecastItemsHigh.forEach(function (item) {
    let currentTemp = item.innerHTML;
    item.innerHTML = Math.round((currentTemp * 9) / 5 + 32);

  });

  let forecastItemsLow = document.querySelectorAll(".low-temp");
  forecastItemsLow.forEach(function (item) {
    let currentTemp = item.innerHTML;
    item.innerHTML = Math.round((currentTemp * 9) / 5 + 32);
  });

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function showCelsius(event) {
  event.preventDefault();
  let celsiusTemp = document.querySelector("#current-temperature");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  celsiusTemp.innerHTML = Math.round(celsiusTemperature);

  let highTemperatureElement = document.querySelector("#current-high");
  highTemperatureElement.innerHTML = `${Math.round(highCelsiusTemperature)}°`;

  let lowTemperatureElement = document.querySelector("#current-low");
  lowTemperatureElement.innerHTML = `${Math.round(lowCelsiusTemperature)}°`;

  let forecastItemsHigh = document.querySelectorAll(".high-temp");
  forecastItemsHigh.forEach(function (item) {
    let currentTemp = item.innerHTML;
    item.innerHTML = Math.round((currentTemp - 32) * 5 / 9);
  });

  let forecastItemsLow = document.querySelectorAll(".low-temp");
  forecastItemsLow.forEach(function (item) {
    let currentTemp = item.innerHTML;
    item.innerHTML = Math.round((currentTemp - 32) * 5 / 9);
  });
}

let citySearch = document.querySelector("#city-submit-form");
citySearch.addEventListener("submit", findCity);

let currentTemperatureButton = document.querySelector("#current-location-button");
currentTemperatureButton.addEventListener("click", showCurrentTemp);

let celsiusTemperature = null;
let highCelsiusTemperature = null;
let lowCelsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

search("Los Angeles")
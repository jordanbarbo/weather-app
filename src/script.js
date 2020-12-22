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

function formatHours(timestamp) {
  let now = new Date(timestamp);
  let hour = now.getHours();
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  
  return `${hour}:${minute}`
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

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  high.innerHTML = `${currentHigh}°`;
  low.innerHTML = `${currentLow}°`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  humidityElement.innerHTML = response.data.main.humidity;
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description)
}


function showForecast(response) {
  console.log(response.data);
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
            <strong>${Math.round(forecast.main.temp_max)}°</strong> / ${Math.round(forecast.main.temp_min)}°
          </li>
        </ul>
      </div>`
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
  let h1 = document.querySelector("h1");
  let temperature = Math.round(response.data.main.temp);
  h1.innerHTML = `${temperature}`;
  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.name;
  let description = document.querySelector(".current-description");
  description.innerHTML = response.data.weather[0].description;
  let currentHigh = Math.round(response.data.main.temp_max);
  let currentLow = Math.round(response.data.main.temp_min);
  let high = document.querySelector(".current-high");
  let low = document.querySelector(".current-low");
  high.innerHTML = `${currentHigh}`;
  low.innerHTML = `${currentLow}`;
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
  let fahrenheitTemp = document.querySelector("#current-temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahr = Math.round(celsiusTemperature * 9/5 + 32);
  fahrenheitTemp.innerHTML = fahr;
}

function showCelsius(event) {
  event.preventDefault();
  let celsiusTemp = document.querySelector("#current-temperature");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  celsiusTemp.innerHTML = Math.round(celsiusTemperature);
}

let citySearch = document.querySelector("#city-submit-form");
citySearch.addEventListener("submit", findCity);

let currentTemperatureButton = document.querySelector("#current-location-button");
currentTemperatureButton.addEventListener("click", showCurrentTemp);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

getCurrentDate();
search("Los Angeles")
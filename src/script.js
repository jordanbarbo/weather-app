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

function showTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.main.temp);
  let description = document.querySelector(".current-description");
  let currentHigh = Math.round(response.data.main.temp_max);
  let currentLow = Math.round(response.data.main.temp_min);
  let high = document.querySelector(".current-high");
  let low = document.querySelector(".current-low");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  temperatureElement.innerHTML = `${temperature}`;
  description.innerHTML = response.data.weather[0].description;
  high.innerHTML = `${currentHigh}`;
  low.innerHTML = `${currentLow}`;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;

  console.log(response.data)
}

function findCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search")
  let h2 = document.querySelector("h2");
  h2.innerHTML = city.value;
  let units = "metric";
  let apiKey = "06e7a1225f8f7ed29a9fd5ba9ca81195";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${units}`
  axios.get(apiUrl).then(showTemperature);
}

let citySearch = document.querySelector("#city-submit-form");
citySearch.addEventListener("submit", findCity);

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

let currentTemperatureButton = document.querySelector("#current-location-button");
currentTemperatureButton.addEventListener("click", showCurrentTemp);

function showCelsius(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  h1.innerHTML = temperature;
}
let temperatureCelsius = document.querySelector("#celsius-link");
temperatureCelsius.addEventListener("click", showCelsius);

function showFahrenheit(event) {
  event.preventDefault();
  let fahr = Math.round(temperature * 9/5 + 32);
  let h1 = document.querySelector("h1");
  h1.innerHTML = fahr;
}

let currentTemperature = document.querySelector("#current-temperature");
let temperature = currentTemperature.innerHTML;
let temperatureFahrenheit = document.querySelector("#fahrenheit-link");
temperatureFahrenheit.addEventListener("click", showFahrenheit);


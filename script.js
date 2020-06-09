let now = new Date();
let h4 = document.querySelector("h4");
let hours = now.getHours();
let minutes = now.getMinutes();

minutes = minutes + ``;
if (minutes < 10) {
  minutes = "0" + minutes;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
h4.innerHTML = `${day} ${hours}:${minutes}`;

//////////////////////////////////////////////// changer la ville en entrant directement la donnée voulue

function changeCity(event) {
  event.preventDefault(event);
  let cityInput = document.getElementById("newCity").value;
  let key = "b2875de38775a619b72b48f178e40887";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${key}&&units=metric`;
  axios.get(url).then(showWeather);
}

let button = document.querySelector("button");
button.addEventListener("click", changeCity);

function showFahrenheit(event) {
  event.preventDefault();
  let h2 = document.querySelector("h2");
  h2.innerHTML = `18`;
}

let a = document.querySelector("a#fahrenheit");
a.addEventListener("click", showFahrenheit);

function showCelsius(event) {
  event.preventDefault();
  let h2 = document.querySelector("h2");
  h2.innerHTML = `23`;
}

document.getElementById("celsius").addEventListener("click", showCelsius);

////////////////////////////////////////////////////////////////// Changez la temperature en choissisant une ville

function showWeather(response) {
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let cityTemperature = document.querySelector("h2");
  cityTemperature.innerHTML = `${temperature}`;
  let city = document.querySelector("#localisation");
  city.innerHTML = response.data.name;
  let key = "b2875de38775a619b72b48f178e40887";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
  axios.get(url).then(showWeather);
}

/////////////////////////////////////////// trouvez la géolocalisation pour trouver la méteo de notre lieu actuel

function showPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let key = "b2875de38775a619b72b48f178e40887";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
  axios.get(url).then(showWeather);
}

function getCurrentPosition(event) {
  event.preventDefault(event);
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#currentLocationButton");
locationButton.addEventListener("click", getCurrentPosition);

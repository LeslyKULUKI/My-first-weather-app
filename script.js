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

//////////////////////////// changer l'heure dans le forecast

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

////////// changer la ville

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.getElementById("newCity").value;
  search(cityInput);
}

let button = document.querySelector("button");
button.addEventListener("click", changeCity);

// Changez la temperature

function showWeather(response) {
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  temperatureLink = temperature;
  let cityTemperature = document.querySelector("h2");
  cityTemperature.innerHTML = `${temperature}`;
  let city = document.querySelector("#localisation");
  city.innerHTML = response.data.name;
  let windElement = document.querySelector("#windElement");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let humidityElement = document.querySelector("#humidityElement");
  humidityElement.innerHTML = response.data.main.humidity;
  let weatherDescription = document.querySelector("#weatherDescription");
  weatherDescription.innerHTML = response.data.weather[0].description;
  let emojiWeather = document.querySelector("#emojiWeather");
  emojiWeather.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  emojiWeather.setAttribute("alt", response.data.weather[0].description);
  let key = "b2875de38775a619b72b48f178e40887";

  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${response.data.name}&appid=${key}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

/////////////////////////////////////////// trouvez la position pour la meteo

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

/////////////////////////////////// Changer les celsius et fahrenheit

let temperatureLink = 0;

function showFahrenheit(event) {
  event.preventDefault();
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${(Math.round(temperatureLink) * 9) / 5 + 32}`;
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

let fahrenheitLink = document.querySelector("a#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

function showCelsius(event) {
  event.preventDefault();
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${Math.round(temperatureLink)}`;
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

let celsiusLink = document.querySelector("a#celsius");
celsiusLink.addEventListener("click", showCelsius);

///////////////////////////////////////////////// mettre en place le forecast

function showForecast(response) {
  let forecastElement = document.querySelector("#sixDays");

  console.log(response.data.list);
  forecastElement.innerHTML = `

          <div class="col-sm">
<div>
<h3>  ${formatHours(response.data.list[0].dt * 1000)}</h3>
            
<img id="imageForecast" 
  src="http://openweathermap.org/img/wn/${
    response.data.list[0].weather[0].icon
  }@2x.png"
/>
            <p><strong>${Math.round(
              response.data.list[0].main.temp_max
            )}°c</strong> <em>${Math.round(
    response.data.list[0].main.temp_min
  )}°c</em> </p>
</div>
          </div>



          <div class="col-sm">
  <div>
  <h3> ${formatHours(response.data.list[1].dt * 1000)}</h3>
                      
          <img id="imageForecast" 
            src="http://openweathermap.org/img/wn/${
              response.data.list[1].weather[0].icon
            }@2x.png"/>
                      <p><strong>${Math.round(
                        response.data.list[1].main.temp_max
                      )}°c</strong> <em>${Math.round(
    response.data.list[1].main.temp_min
  )}°c</em> </p>
          </div>
                    </div>


                    <div class="col-sm">
                    <div>
                    <h3> ${formatHours(response.data.list[2].dt * 1000)}</h3>
                                        
                            <img id="imageForecast" 
                              src="http://openweathermap.org/img/wn/${
                                response.data.list[2].weather[0].icon
                              }@2x.png"
                            />
                                        <p><strong>${Math.round(
                                          response.data.list[2].main.temp_max
                                        )}°c</strong> <em>${Math.round(
    response.data.list[2].main.temp_min
  )}°c</em> </p>
                            </div>
                                      </div>



                                      <div class="col-sm">
                                      <div>
                                      <h3> ${formatHours(
                                        response.data.list[3].dt * 1000
                                      )}</h3>
                                                          
                                              <img id="imageForecast" 
                                                src="http://openweathermap.org/img/wn/${
                                                  response.data.list[3]
                                                    .weather[0].icon
                                                }@2x.png"
                                              />
                                                           <p><strong>${Math.round(
                                                             response.data
                                                               .list[3].main
                                                               .temp_max
                                                           )}°c</strong> <em>${Math.round(
    response.data.list[3].main.temp_min
  )}°c</em> </p>
                                              </div>
                                                        </div>

                                                        <div class="col-sm">
                                                        <div>
                                                        <h3> ${formatHours(
                                                          response.data.list[4]
                                                            .dt * 1000
                                                        )}</h3>
                                                                            
                                                                <img id="imageForecast" 
                                                                  src="http://openweathermap.org/img/wn/${
                                                                    response
                                                                      .data
                                                                      .list[4]
                                                                      .weather[0]
                                                                      .icon
                                                                  }@2x.png"
                                                                />
                                                                            <p><strong>${Math.round(
                                                                              response
                                                                                .data
                                                                                .list[4]
                                                                                .main
                                                                                .temp_max
                                                                            )}°c </strong><em>${Math.round(
    response.data.list[4].main.temp_min
  )}°c</em> </p>
                                                                </div>
                                                                          </div>

                                                                          <div class="col-sm">
                                                                          <div>
                                                                          <h3> ${formatHours(
                                                                            response
                                                                              .data
                                                                              .list[5]
                                                                              .dt *
                                                                              1000
                                                                          )}</h3>
                                                                                              
                                                                                  <img id="imageForecast" 
                                                                                    src="http://openweathermap.org/img/wn/${
                                                                                      response
                                                                                        .data
                                                                                        .list[5]
                                                                                        .weather[0]
                                                                                        .icon
                                                                                    }@2x.png"
                                                                                  />
                                                                                              <p><strong>${Math.round(
                                                                                                response
                                                                                                  .data
                                                                                                  .list[5]
                                                                                                  .main
                                                                                                  .temp_max
                                                                                              )}°c</strong> <em>${Math.round(
    response.data.list[5].main.temp_min
  )}°c</em> </p>
                                                                                  </div>
                                                                                            </div>

                                                                                                                              

`;
}

function search(city) {
  let newCityElement = document.querySelector("#newCity");
  newCityElement.value = city;
  let key = "b2875de38775a619b72b48f178e40887";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${key}&&units=metric`;
  axios.get(url).then(showWeather);
}
search("Paris");

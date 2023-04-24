const api_key = "f6f240dd04aa0e94518d0a682320de93";
const searchForm = document.querySelector("#search-form");
const cityInput = document.querySelector("#city-input");
const cityNameEl = document.querySelector("#city-name");
const currentDateEl = document.querySelector("#current-date");
const weatherIconEl = document.querySelector('#weather-icon');
const temperatureEl = document.querySelector("#temperature");
const humidityEl = document.querySelector("#humidity");
const windSpeedEl = document.querySelector("#wind-speed");
const forecastCardsEl = document.querySelector("#forecast-cards");
const searchHistoryEl = document.querySelector("#search-history");

const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

function renderSearchHistory() {
    searchHistoryEl.innerHTML = "";
    searchHistory.forEach((city) => {
    let li = document.createElement("li");
    li.textContent = city;
    searchHistoryEl.appendChild(li);
    });
}

function renderCurrentWeather(city, weather) {
    cityNameEl.textContent = `${city}`;
    weatherIconEl.setAttribute(
    "src",
    `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`
    );
    temperatureEl.textContent = `Temperature: ${weather.main.temp} °F`;
    humidityEl.textContent = `Humidity: ${weather.main.humidity}%`;
    windSpeedEl.textContent = `Wind Speed: ${weather.wind.speed} mph`;
}

function renderForecast(forecast) {
    forecastCardsEl.innerHTML = "";
    for (let i = 0; i < forecast.list.length; i += 8) {
    let forecastItem = forecast.list[i];

    let date = new Date(forecastItem.dt * 1000);
    let formattedDate = `${
        date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;

    let card = document.createElement("div");
    card.classList.add("forecast-card");

    let cardContent = `
        <p>${formattedDate}</p>
        <img src="http://openweathermap.org/img/w/${forecastItem.weather[0].icon}.png" alt="Weather Icon">
        <p>Temp: ${forecastItem.main.temp} °F</p>
        <p>Humidity: ${forecastItem.main.humidity}%</p>
        <p>Wind:${forecastItem.wind.speed} mph</p>
    `;
    card.innerHTML = cardContent;

    forecastCardsEl.appendChild(card);
    }
}

searchForm.addEventListener("submit", (mainPage) => {
    mainPage.preventDefault();
    let city = cityInput.value.trim().toUpperCase();
    if (searchHistory.indexOf(city) === -1) {
        searchHistory.push(city);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    renderSearchHistory();
    }

  // API query
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${api_key}`
    )
    .then((response) => response.json())
    .then((data) => {
        renderCurrentWeather(city, data);
    return fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${api_key}`
        );
    })
    .then((response) => response.json())
    .then((data) => renderForecast(data))
    .catch((error) => console.error(error));

  // Clear input
    cityInput.value = "";
});

searchHistoryEl.addEventListener("click", (sidebarCity) => {
    if (sidebarCity.target.tagName === "LI") {
        let city = sidebarCity.target.textContent;
        console.log(city);
        cityInput.value = city;
        searchForm.dispatchEvent(new Event("submit"));
    }
});

// Initialize
renderSearchHistory();

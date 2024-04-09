const cityInputEl = $('#city');
const searchButtonEl = $('#search');
const searchHistoryEl = $('#search-history');
const clearHistoryEl = $('#clear-history');

const todayForecastEl = $('#today-forecast');
const futureForecastEl = $('#future-forecast');

let searchHistory = [];

function getCity(event) {
    event.preventDefault();
    getForecast(cityInputEl.val());
}

function getForecast(city) {
    const cityUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
    
    fetch(cityUrl).then(function (cityResponse) {
        return cityResponse.json();
    }).then(function (cityData) {

        if (!cityData[0]) {
            alert("Could not find city ... please try again!")
        }

        else {
            const lat = cityData[0].lat;
            const lon = cityData[0].lon;

            const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

            fetch(weatherUrl).then(function (weatherResponse) {
                return weatherResponse.json();
            }).then(function (weatherData) {
                displayCurrentForecast(city, weatherData.list[0]);
                splitData(weatherData.list);
            })

            addSearchHistory(city);
        }
    }).catch(function (error) {
        console.log(error);
    })

    cityInputEl.val('');
}

function addSearchHistory(city) {
    if (searchHistory.indexOf(city) === -1) {
        searchHistory.unshift(city);
        localStorage.setItem('search-history', JSON.stringify(searchHistory));
        renderSearchHistory();
    }

    else {
        searchHistory.splice(searchHistory.indexOf(city), 1);
        searchHistory.unshift(city);
        localStorage.setItem('search-history', JSON.stringify(searchHistory));
        renderSearchHistory();
    }
}

function renderSearchHistory() {
    if (!searchHistory) {
        searchHistory = [];
    }

    else {

        searchHistoryEl.text('');
        for (let i = 0; i < searchHistory.length; i++) {
            createSearchHistoryButton(searchHistory[i]);
        }

        clearHistoryEl.text('');
        showClearHistory();
    }
}

function createSearchHistoryButton(city) {
    const listEl = $('<li>');
    const buttonEl = $('<button>')
        .addClass('history btn btn-secondary')
        .attr('data-search-index', city)
        .text(city);

    listEl.append(buttonEl);
    searchHistoryEl.append(listEl);
}

function getForecastHistory(event) {
    console.log(event.target);

    const buttonEl = event.target;
    const city = buttonEl.getAttribute('data-search-index');
    console.log(city);

    getForecast(city);
}

function showClearHistory() {
    const buttonEl = $('<button>')
        .addClass('history btn btn-danger')
        .text('Clear Search History');

    clearHistoryEl.append(buttonEl);
}

function clearHistory(event) {
    event.preventDefault();
    localStorage.removeItem('search-history');
    searchHistory = JSON.parse(localStorage.getItem('search-history'));
    searchHistoryEl.text('');
    clearHistoryEl.text('');
    renderSearchHistory();
}

function displayCurrentForecast(city, weatherData) {
    const date = dayjs(weatherData.dt_txt).format("M/D/YYYY");
    const temp = weatherData.main.temp;
    const wind = weatherData.wind.speed;
    const humidity = weatherData.main.humidity;
    const icon = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const description = weatherData.weather[0].description;

    const cardEl = $('<div>')
        .addClass('card my-3 current-weather-card');

    const cardBodyEl = $('<div>')
        .addClass('card-body');

    const cardHeaderEl = $('<h3>')
        .addClass('card-title h3')
        .text(`${city} (${date})`);

    const tempEl = $('<p>')
        .addClass('card-text')
        .text(`🌡️ Temp: ${temp} °F`);

    const windEl = $('<p>')
        .addClass('card-text')
        .text(`💨 Wind: ${wind} MPH`);

    const humidityEl = $('<p>')
        .addClass('card-text')
        .text(`💧 Humidity: ${humidity} %`);

    const iconEl = $('<img>')
        .attr('src', icon)
        .attr('alt', description);

    cardHeaderEl.append(iconEl);

    cardBodyEl.append(cardHeaderEl, tempEl, windEl, humidityEl);

    cardEl.append(cardBodyEl);

    todayForecastEl.text('');
    todayForecastEl.append(cardEl);
}

function splitData(weatherData) {
    const dataSplit = weatherData.length / 5;

    const columnEl = $('<div>')
        .addClass('col-12');

    const headerEl = $('<h3>')
        .addClass('forecast-header my-3')
        .text('5-Day Forecast:');

    futureForecastEl.text('');
    
    columnEl.append(headerEl);

    futureForecastEl.append(columnEl);

    for (let i = 0; i < 5; i++) {
        displayFutureForecast(weatherData[dataSplit * (i + 1) - 1]);
    }
}

function displayFutureForecast(weatherData) {
    const date = dayjs(weatherData.dt_txt).format("M/D/YYYY");
    const temp = weatherData.main.temp;
    const wind = weatherData.wind.speed;
    const humidity = weatherData.main.humidity;
    const icon = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const description = weatherData.weather[0].description;

    const columnEl = $('<div>')
        .addClass('five-day-card col-md');
    
    const cardEl = $('<div>')
        .addClass('card future-weather-card');

    const cardBodyEl = $('<div>')
        .addClass('card-body');

    const cardHeaderEl = $('<h4>')
        .addClass('card-title h4')
        .text(`${date}`);

    const tempEl = $('<p>')
        .addClass('card-text')
        .text(`🌡️ Temp: ${temp} °F`);

    const windEl = $('<p>')
        .addClass('card-text')
        .text(`💨 Wind: ${wind} MPH`);

    const humidityEl = $('<p>')
        .addClass('card-text')
        .text(`💧 Humidity: ${humidity} %`);

    const iconEl = $('<img>')
        .attr('src', icon)
        .attr('alt', description);

    cardHeaderEl.append(iconEl);

    cardBodyEl.append(cardHeaderEl, tempEl, windEl, humidityEl);

    cardEl.append(cardBodyEl);

    columnEl.append(cardEl);

    futureForecastEl.append(columnEl);
}

searchButtonEl.on('click', getCity);

searchHistoryEl.on('click', getForecastHistory);

clearHistoryEl.on('click', clearHistory);

$(document).ready(function () {
    searchHistory = JSON.parse(localStorage.getItem('search-history'));

    renderSearchHistory();
});

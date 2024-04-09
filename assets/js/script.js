// Elements for user input and search button
const cityInputEl = $('#city');
const searchButtonEl = $('#search');

// Elements for search history and clearing search history buttons
const searchHistoryEl = $('#search-history');
const clearHistoryEl = $('#clear-history');

// Elements for displaying current and future weather forecast cards
const todayForecastEl = $('#today-forecast');
const futureForecastEl = $('#future-forecast');

// Initialize our search history
let searchHistory = [];

// Function that gets the user input city
function getCity(event) {
    // Prevent page from reloading
    event.preventDefault();

    // Get the forecast for the input city
    getForecast(cityInputEl.val());
}

// Function that gets the forecast for the city
function getForecast(city) {
    // API call to the city data URL
    const cityUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
    
    // Get a response for the city
    fetch(cityUrl).then(function (cityResponse) {
        return cityResponse.json();
    }).then(function (cityData) {

        // Send an alert if the city isn't found/doesn't exist
        if (!cityData[0]) {
            alert("Could not find city ... please try again!")
        }

        else {
            // Get the latitude and longitude coordinates of the city
            const lat = cityData[0].lat;
            const lon = cityData[0].lon;

            // API call to the weather data URL
            const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

            // Get a response for the weather
            fetch(weatherUrl).then(function (weatherResponse) {
                return weatherResponse.json();
            }).then(function (weatherData) {
                // Display current weather forecast and future weather forecasts
                displayCurrentForecast(city, weatherData.list[0]);
                splitData(weatherData.list);
            })

            // Add the city to the search history
            addSearchHistory(city);
        }
    }).catch(function (error) {
        console.log(error);
    })

    // Reset the input
    cityInputEl.val('');
}

/*
  This function adds the search history to the array.
  If the city was not previously searched for, add it to the array and render the display.
  If the city was previously searched for, don't add it to the array, but move it to the top
  to show that it is the most recent search and render the display.
*/
function addSearchHistory(city) {
    if (searchHistory.indexOf(city) === -1) {
        // I am only keeping the 7 most recent unique searches or the display gets messy
        if (searchHistory.length === 7) {
            searchHistory.pop();
        }

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

// This function renders the search history display
function renderSearchHistory() {
    if (!searchHistory) {
        searchHistory = [];
    }

    else {
        // Reset the search history button display so that it doesn't duplicate
        searchHistoryEl.text('');
        for (let i = 0; i < searchHistory.length; i++) {
            createSearchHistoryButton(searchHistory[i]);
        }

        // Reset the clear search history button display so that it doesn't duplicate
        clearHistoryEl.text('');
        showClearHistory();
    }
}

// This function creates a clickable button for previously searched cities and adds it to the history list
function createSearchHistoryButton(city) {
    // Create our element tags here and append the appropiate classes, attributes and text
    const listEl = $('<li>');
    const buttonEl = $('<button>')
        .addClass('history btn btn-secondary')
        .attr('data-search-index', city)
        .text(city);

    // Gather all the elements created above and append them to the correct elements
    listEl.append(buttonEl);
    searchHistoryEl.append(listEl);
}

// This function displays weather forecast data when the button for a previously searched city is clicked
function getForecastHistory(event) {
    // Track the city in which the button was clicked
    const buttonEl = event.target;
    const city = buttonEl.getAttribute('data-search-index');

    // Get the forecast for the clicked city
    getForecast(city);
}

// This function creates a clickable clear history button when there is 1 or more search history
function showClearHistory() {
    // Create our element tags here and append the appropiate classes, attributes and text
    const buttonEl = $('<button>')
        .addClass('history btn btn-danger')
        .text('Clear Search History');

    // Gather all the elements created above and append them to the correct elements
    clearHistoryEl.append(buttonEl);
}

// This function clears the entire search history when clicked
function clearHistory(event) {
    // Prevent page from reloading
    event.preventDefault();

    // Delete the search history key from local storage
    localStorage.removeItem('search-history');
    searchHistory = JSON.parse(localStorage.getItem('search-history'));

    // Reset the display for the buttons
    searchHistoryEl.text('');
    clearHistoryEl.text('');

    // Render the display to properly update
    renderSearchHistory();
}

// This function displays the current weather forecast for the input city
function displayCurrentForecast(city, weatherData) {
    // Collect the data that we need for display
    const date = dayjs(weatherData.dt_txt).format("M/D/YYYY");
    const temp = weatherData.main.temp;
    const wind = weatherData.wind.speed;
    const humidity = weatherData.main.humidity;
    const icon = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const description = weatherData.weather[0].description;

    // Create our element tags here and append the appropiate classes, attributes and text
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

    // Gather all the elements created above and append them to the correct elements
    cardHeaderEl.append(iconEl);
    cardBodyEl.append(cardHeaderEl, tempEl, windEl, humidityEl);
    cardEl.append(cardBodyEl);

    // Reset the display to update to the new one
    todayForecastEl.text('');
    todayForecastEl.append(cardEl);
}

// This is a helper function that breaks the data down into segments to identify each day
function splitData(weatherData) {
    // The weather data is over 5 days so we split it this way
    const dataSplit = weatherData.length / 5;

    // Create our element tags here and append the appropiate classes, attributes and text
    const columnEl = $('<div>')
        .addClass('col-12');

    const headerEl = $('<h3>')
        .addClass('forecast-header my-3')
        .text('5-Day Forecast:');

    // Reset the display to update to the new one
    futureForecastEl.text('');
    
    // Gather all the elements created above and append them to the correct elements
    columnEl.append(headerEl);

    futureForecastEl.append(columnEl);

    // We only want to display 5 days of future weather forecast
    for (let i = 0; i < 5; i++) {
        /*
          I am collecting the last weather data of each 'segment' created.
          We are always given 40 sets of weather data, which is every 3 hours over 5 days.
          This gives us the most accurate data from current to future because of the time difference.

          NOTE: There is a potential bug with the API in that the current weather forecast and the
          5-day weather forecast won't be correctly displayed in a specific situation.  This only
          occurs when the first weather data (at index 0) is at the 00:00 hour.  This means that
          the last 'segment' of how I split the data will only be at the 21:00 hour on the same day.
          This means only 5 different dates will exist instead of 6 so there's nothing I can do about
          it because this is on the API side.
        */
        displayFutureForecast(weatherData[dataSplit * (i + 1) - 1]);
    }
}

// This function displays the future weather forecast over 5 days for the input city
function displayFutureForecast(weatherData) {
    // Collect the data that we need for display
    const date = dayjs(weatherData.dt_txt).format("M/D/YYYY");
    const temp = weatherData.main.temp;
    const wind = weatherData.wind.speed;
    const humidity = weatherData.main.humidity;
    const icon = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const description = weatherData.weather[0].description;

    // Create our element tags here and append the appropiate classes, attributes and text
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

    // Gather all the elements created above and append them to the correct elements
    cardHeaderEl.append(iconEl);
    cardBodyEl.append(cardHeaderEl, tempEl, windEl, humidityEl);
    cardEl.append(cardBodyEl);

    columnEl.append(cardEl);

    futureForecastEl.append(columnEl);
}

// When the 'Search' button is clicked after user input
searchButtonEl.on('click', getCity);

// When one of the search history buttons with a city name is clicked
searchHistoryEl.on('click', getForecastHistory);

// When the 'Clear Search History' button is clicked
clearHistoryEl.on('click', clearHistory);

// When the page loads, render the search history display from the previous session.
$(document).ready(function () {
    searchHistory = JSON.parse(localStorage.getItem('search-history'));

    renderSearchHistory();
});

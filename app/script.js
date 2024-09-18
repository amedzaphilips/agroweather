// Function to get weather data
function getWeather() {
    const apiKey = '957f9fc1fd855b5c9144a4d7d4c8979e'; // Your API Key
    const city = document.getElementById('city').value; // Get city from input field

    if (!city) {
        alert('Please enter a city name');
        return;
    }

    // API URL to fetch current weather data
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    // Fetch the current weather data
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                alert('City not found');
                return;
            }
            displayWeather(data); // Call the function to display weather
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    // Fetch the 5-day forecast data
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                alert('Forecast not available for this city');
                return;
            }
            displayForecast(data); // Call the function to display 5-day forecast
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
            alert('Error fetching forecast data. Please try again.');
        });
}

// Function to display weather data on the frontend
function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const cityName = data.name;
    const temperature = Math.round(data.main.temp); // Temperature in Celsius
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    // Display weather information
    tempDivInfo.innerHTML = `<p>${temperature}°C</p>`;
    weatherInfoDiv.innerHTML = `<p>${cityName}</p><p>${description}</p>`;
    
    // Display weather icon
    weatherIcon.src = iconUrl;
    weatherIcon.style.display = 'block'; // Make the icon visible
}

// Function to display 5-day weather forecast
function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = ''; // Clear previous forecast

    // Get one forecast per day (filtering to get midday data)
    const dailyForecast = data.list.filter((item) => item.dt_txt.includes("12:00:00")); 

    dailyForecast.forEach((forecast) => {
        const dateTime = new Date(forecast.dt * 1000); // Convert timestamp to Date object
        const day = dateTime.toLocaleDateString('en-US', { weekday: 'long' }); // Get day of the week
        const temperature = Math.round(forecast.main.temp); // Temperature in Celsius
        const description = forecast.weather[0].description;
        const iconCode = forecast.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        // Create HTML for each day's forecast
        const forecastHtml = `
            <div class="forecast-item">
                <span>${day}</span>
                <img src="${iconUrl}" alt="Weather Icon">
                <span>${temperature}°C</span>
                <span>${description}</span>
            </div>
        `;

        // Add the forecast to the forecast container
        forecastContainer.innerHTML += forecastHtml;
    });
}

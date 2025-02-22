const API_KEY = "fa7893e0933f635b4e10e154ee47a423"; // Replace with your OpenWeatherMap API Key

async function getWeather() {
    let city = document.getElementById("city").value;
    let weatherResult = document.getElementById("weather-result");

    if (city.trim() === "") {
        weatherResult.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        let data = await response.json();

        if (data.cod === "404") {
            weatherResult.innerHTML = `<p>City not found. Please try again.</p>`;
        } else {
            weatherResult.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
        }
    } catch (error) {
        weatherResult.innerHTML = `<p>Error fetching data. Try again later.</p>`;
    }
}
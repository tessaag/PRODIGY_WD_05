document.getElementById('submitBtn').addEventListener('click', getWeather);

function getWeather() {
  const locationInput = document.getElementById('locationInput').value;
  const apiKey = 'e84af9a21e5444c395060935240304';
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${locationInput}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch weather data. Please try again.');
      }
      return response.json();
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.log('Error fetching weather data:', error.message);
      displayErrorMessage(error.message);
    });
}

function displayWeather(data) {
  const weatherInfo = document.getElementById('weatherInfo');
  weatherInfo.innerHTML = `
    <h2>${data.location.name}, ${data.location.country}</h2>
    <p>Weather: ${data.current.condition.text}</p>
    <p>Temperature: ${data.current.temp_c}°C</p>
    <p>Humidity: ${data.current.humidity}%</p>
    <p>Wind Speed: ${data.current.wind_kph} km/h</p>
  `;
}

function displayErrorMessage(message) {
  const weatherInfo = document.getElementById('weatherInfo');
  weatherInfo.innerHTML = `<p>${message}</p>`;
}

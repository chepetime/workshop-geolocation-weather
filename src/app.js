/**
 * Weather App
 */

function toCelsius(f) {
  return String((5/9) * (f-32));
}

function handleError(error = 'Error')  {
  console.log(error);
}

function getWeather() {
  const $startButton = $('.js-start');
  const $location    = $('.js-location');
  const $temperature = $('.js-temp');
  const $hourly      = $('.js-minutely');

  const url = 'https://api.forecast.io/forecast/';
  const apiKey = '';

  // Present Data to User
  const handleForecast = data => {
    if (!data) handleError();

    $temperature.html(toCelsius(data.currently.temperature).slice(0,5) + "°C");
    $hourly.html(data.hourly.summary);
    $startButton.text('Refresh');
  }

  // Get weather Data
  const getWeatherData = position => {
    const apiUrl = `${url}${apiKey}/${position.coords.latitude},${position.coords.longitude}?callback=?`;
    $.getJSON(apiUrl, handleForecast, handleError);
  };

  // If Navigation is succesful, get weather Data
  const handleNavigator = position => {
    $location.html(`
      Latitude is ${position.coords.latitude}º
      <br>
      Longitude is ${position.coords.longitude}º
    `);
    getWeatherData(position);
  };

  // Get user location
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(handleNavigator, handleError);
  }

  $startButton.on('click', e => {
    e.preventDefault();

    if (apiKey === '' || !apiKey) {
      alert(`You need an API Key. Go to https://darksky.net/dev to get it.`);
      console.log(`You need an API Key. Go to https://darksky.net/dev to get it.`);
      return;
    }

    getUserLocation();
  });

  //-
}

// Start App
getWeather();


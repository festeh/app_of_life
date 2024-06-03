<script>
  import { onMount } from 'svelte';

  function getWeatherDescription(weatherCode) {
    // Map weather codes to descriptions
    const weatherDescriptions = {
      0: 'Unknown',
      1000: 'Clear',
      1001: 'Cloudy',
      1100: 'Mostly Clear',
      1101: 'Partly Cloudy',
      1102: 'Mostly Cloudy',
      2000: 'Fog',
      2100: 'Light Fog',
      3000: 'Light Wind',
      3001: 'Wind',
      3002: 'Strong Wind',
      4000: 'Drizzle',
      4001: 'Rain',
      4200: 'Light Rain',
      4201: 'Heavy Rain',
      5000: 'Snow',
      5001: 'Flurries',
      5100: 'Light Snow',
      5101: 'Heavy Snow',
      6000: 'Freezing Drizzle',
      6001: 'Freezing Rain',
      6200: 'Light Freezing Rain',
      6201: 'Heavy Freezing Rain',
      7000: 'Ice Pellets',
      7101: 'Heavy Ice Pellets',
      7102: 'Light Ice Pellets',
      8000: 'Thunderstorm',
    };

    return weatherDescriptions[weatherCode] || 'Unknown';
  }

  let weatherData = null;
  let loading = true;
  let error = null;

  const apiKey = 'YOUR_API_KEY';
  const apiUrl = `https://api.tomorrow.io/v4/timelines?location=Berlin&fields=temperature,weatherCode&timesteps=1h&units=metric&apikey=${apiKey}`;

  onMount(async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      weatherData = data.data.timelines[0].intervals[0].values;
      loading = false;
    } catch (err) {
      error = err.message;
      loading = false;
    }
  });
</script>

<div class="weather-card">
  {#if loading}
    <p>Loading weather data...</p>
  {:else if error}
    <p>Error: {error}</p>
  {:else}
    <h2>Weather Forecast for Berlin</h2>
    <p>Temperature: {weatherData.temperature}°C</p>
    <p>Weather: {getWeatherDescription(weatherData.weatherCode)}</p>
  {/if}
</div>

<style>
  .weather-card {
    background-color: #f4f4f4;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 300px;
    margin: 0 auto;
  }

  h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    font-size: 18px;
    margin-bottom: 5px;
  }
</style>

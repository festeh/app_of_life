// import fetch from 'node-fetch';
const apiKey = import.meta.env.VITE_TOMORROW_API_KEY;
const latitude = 52.52;
const longitude = 13.405;

function getWeatherDescription(weatherCode: number): string {
  const weatherDescriptions = {
    0: 'Unknown',
    1000: 'Ясненько',
    1001: 'Cloudy',
    1100: 'Mostly Clear',
    1101: 'Partly Cloudy',
    1102: 'Mostly Cloudy',
    2000: 'Сайлент Хилл',
    2100: 'Light Fog',
    3000: 'Light Wind',
    3001: 'Ветерочек',
    3002: 'Хуярит ветер',
    4000: 'Drizzle',
    4001: 'Дождит',
    4200: 'Айн писхен',
    4201: 'Heavy Rain',
    5000: 'Cнэжочек',
    5001: 'Flurries',
    5100: 'Cнэжочек (чучуть)',
    5101: 'Все равно никто не поверит',
    6000: 'Freezing Drizzle',
    6001: 'Freezing Rain',
    6200: 'Light Freezing Rain',
    6201: 'Heavy Freezing Rain',
    7000: 'Ice Pellets',
    7101: 'Heavy Ice Pellets',
    7102: 'Light Ice Pellets',
    8000: 'Thunderstorm',
  };

  return weatherDescriptions[weatherCode] || 'Неразбериха';
}

export async function GET() {
  const apiUrl = `https://api.tomorrow.io/v4/timelines`
    + `?location=${latitude},${longitude}`
    + `&units=metric`
    + `&apikey=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      if (response.status === 429001) {
        return new Response('Rate limit exceeded', { status: 429 });
      }
    }
    const data = await response.json();
    console.log(data);
    const hourlyData = data.timelines.hourly.map(info => {
      const temperature = info.values.temperature;
      const humidity = info.values.humidity;
      const weatherCode = info.values.weatherCode;
      const description = getWeatherDescription(weatherCode);
      return { temperature, description: description, humidity };
    })
    return new Response(JSON.stringify(hourlyData), {
      status: 200,
    })
  } catch (error) {
    console.error(error);
    return new Response('Error fetching weather data', { status: 500 });
  }
}

import { formatTime } from "$lib";

const apiKey = import.meta.env.VITE_TOMORROW_API_KEY;
const latitude = 52.52;
const longitude = 13.405;

function getWeatherDescription(weatherCode: number): string {
  const weatherDescriptions = {
    0: 'Хызы',
    1000: 'Ясненько',
    1001: 'Облачкааа',
    1100: 'Ясненько (ну почти)',
    1101: 'Яcнооблачка',
    1102: 'Облачка (в основном)',
    2000: 'Сайлент Хилл',
    2100: 'Light Fog',
    3000: 'Ветерочек (чучуть)',
    3001: 'Ветерочек',
    3002: 'Хуярит ветер',
    4000: 'Дризня',
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
    8000: 'Гррроза',
  };

  return weatherDescriptions[weatherCode] || 'Неразбериха';
}

function getEmojiDescription(weatherCode, isLate: boolean): string {
  const weatherEmojis = {
    1000: '☀️',
    1001: '☁️',
    1100: '🌤',
    1101: '🌥',
    1102: '☁️',
    2000: '🌫',
    2100: '🌁',
    3000: '💨',
    3001: '🌬',
    3002: '🌪',
    4000: '🌧',
    4001: '🌦',
    4200: '🌧',
    4201: '⛈',
    5000: '🌨',
    5001: '🌨',
    5100: '🌨',
    5101: '🌨',
    6000: '🌧',
    6001: '🌧',
    6200: '🌧',
    6201: '🌧',
    7000: '🌧',
    7101: '🌧',
    7102: '🌧',
    8000: '🌩',
  };
  if (weatherCode === 1000 && isLate) {
    return '🌚';
  }
  return weatherEmojis[weatherCode] || '🤷';
}

const mockData = [
  {
    time: "2024-06-08T18:00:00Z",
    values: {
      temperature: 20.5, humidity: 50, weatherCode: 1000,
      precipitationProbability: 0, uvIndex: 0, uvIndexHealthConcern: 0
    }
  },
  {
    time: "2024-06-08T19:00:00Z",
    values: {
      temperature: 19.5, humidity: 55, weatherCode: 1100,
      precipitationProbability: 0, uvIndex: 0, uvIndexHealthConcern: 0
    }
  },
  {
    time: "2024-06-08T20:00:00Z",
    values: {
      temperature: 18.5, humidity: 60, weatherCode: 4000,
      precipitationProbability: 50, uvIndex: 3, uvIndexHealthConcern: 1
    }
  },
  {
    time: "2024-06-08T21:00:00Z",
    values: {
      temperature: 17.5, humidity: 65, weatherCode: 4201,
      precipitationProbability: 90, uvIndex: 0, uvIndexHealthConcern: 0
    }
  },
]

function processWeatherData(info) {
  const time = formatTime(info.time);
  const temperature = Math.round(info.values.temperature) + '°C';
  const humidity = Math.round(info.values.humidity) + '%';
  const weatherCode = info.values.weatherCode;
  const description = getWeatherDescription(weatherCode);
  const precipitation = info.values.precipitationProbability;
  const uvIndex = info.values?.uvIndex || 0;
  const uvHealthConcern = info.values?.uvHealthConcern || 0;
  const isLate = new Date(info.time).getHours() >= 20;
  const windSpeed = info.values.windSpeed || 0;
  const emoji = getEmojiDescription(weatherCode, isLate);
  let warning = '';
  if (info.values.precipitationProbability > 50) {
    warning += '💦'
  }
  if (info.values.uvIndex >= 3) {
    warning += '🔥'
  }
  return { time, temperature, description, humidity, emoji, warning, uvIndex, uvHealthConcern, precipitation, windSpeed };
}

export async function GET() {
  if (!apiKey) {
    console.error('API key for weather is missing');
    return new Response('API key for weather is missing', { status: 501 });
  }
  try {
    if (import.meta.env.VITE_USE_MOCK_DATA) {
      return new Response(JSON.stringify(mockData.map(processWeatherData)), { status: 200 });
    }
    const apiUrl = `https://api.tomorrow.io/v4/weather/forecast`
      + `?location=${latitude},${longitude}`
      + `&units=metric`
      + `&apikey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.code === 429001) {
      console.error('Rate limit exceeded');
      return new Response(JSON.stringify(mockData), { status: 200 });
    }
    // filter data that is not today, convert current time to UTC time
    const today = new Date().toISOString().slice(0, 10);
    let hourlyData = data.timelines.hourly.filter(info => info.time.startsWith(today));
    hourlyData = hourlyData.map(processWeatherData)

    return new Response(JSON.stringify(hourlyData), {
      status: 200,
    })
  } catch (error) {
    console.error(error);
    const msg = `Error fetching weather data: ${error}`;
    return new Response(msg, { status: 500 });
  }
}

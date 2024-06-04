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

const mockData = [
  { time: "2024-06-08T18:00:00Z", temperature: 20, description: 'фейк данные', humidity: 50 },
  { time: "2024-06-08T19:00:00Z", temperature: 19, description: 'Облачкааа', humidity: 55 },
  { time: "2024-06-08T20:00:00Z", temperature: 18, description: 'Ясненько (ну почти)', humidity: 60 },
  { time: "2024-06-08T21:00:00Z", temperature: 17, description: 'Янооблачка', humidity: 65 },
]

export async function GET() {
  if (!apiKey) {
    console.error('API key for weather is missing');
    return new Response('API key for weather is missing', { status: 501 });
  }
  try {
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
    console.log(data);
    let hourlyData = data.timelines.hourly.map(info => {
      const time = info.time;
      const temperature = Math.round(info.values.temperature);
      const humidity = Math.round(info.values.humidity);
      const weatherCode = info.values.weatherCode;
      const description = getWeatherDescription(weatherCode);
      return { time, temperature, description: description, humidity };
    })
    // filter data that is not today
    const today = new Date().toISOString().slice(0, 10);
    // TODO: filter before, than map?
    hourlyData = hourlyData.filter(info => info.time.startsWith(today));

    return new Response(JSON.stringify(hourlyData), {
      status: 200,
    })
  } catch (error) {
    console.error(error);
    const msg = `Error fetching weather data: ${error}`;
    return new Response(msg, { status: 500 });
  }
}

async function getWeatherForCity(city) {
  const apiKey = 'a10df99138fc35f7742257d4c4f117aa' // Chave da API
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${apiKey}`

  document.getElementById('loadingMessage').style.display = 'block'
  document.getElementById('errorMessage').innerText = ''

  try {
    const response = await fetch(url)
    const data = await response.json()

    if (data.cod === 200) {
      document.getElementById('cityName').innerText = `📍 ${data.name}`
      document.getElementById('temperature').innerText = `${data.main.temp}°C`
      document.getElementById(
        'condition'
      ).innerText = `🌤 ${data.weather[0].description}`
      document.getElementById(
        'humidity'
      ).innerText = `💧 Umidade: ${data.main.humidity}%`
      document.getElementById(
        'windSpeed'
      ).innerText = `💨 Vento: ${data.wind.speed} m/s`

      document.getElementById('loadingMessage').style.display = 'none'

      recommendActivity(data.main.temp, data.weather[0].main)
    } else {
      document.getElementById('errorMessage').innerText =
        'Não foi possível encontrar o clima para esta cidade.'
      document.getElementById('loadingMessage').style.display = 'none'
    }
  } catch (error) {
    document.getElementById('errorMessage').innerText =
      'Erro ao buscar informações meteorológicas.'
    document.getElementById('loadingMessage').style.display = 'none'
  }
}

function recommendActivity(temperature, weatherCondition) {
  let activityMessage = ''

  if (weatherCondition === 'Clear' && temperature > 25) {
    activityMessage =
      '☀ Tempo perfeito para trilhas, escaladas, ciclismo, remo e saltos de bungee jump!'
  } else if (weatherCondition === 'Rain') {
    activityMessage = '🌧 Tempo chuvoso, ideal para passeios de barco.'
  } else if (weatherCondition === 'Clouds' && temperature > 20) {
    activityMessage =
      '☁ Nublado, bom para uma corrida ou uma caminhada relaxante.'
  } else if (temperature > 30) {
    activityMessage =
      "🔥 Calor intenso! Prefira atividades debaixo d'água, como natação."
  } else if (temperature < 10) {
    activityMessage =
      '🥶 Frio! Ideal para acampamentos e atividades em cabanas.'
  } else {
    activityMessage =
      '😊 Clima ameno, ideal para atividades ao ar livre como ciclismo.'
  }

  document.getElementById('activitySuggestion').innerText = activityMessage
}

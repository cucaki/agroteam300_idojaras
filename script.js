// Települések listája koordinátákkal
const locations = [
  { name: 'Seibersdorf', lat: 48.05, lon: 16.51 },
  { name: 'Rohrau', lat: 48.07, lon: 16.86 },
  { name: 'Hollabrunn', lat: 48.56, lon: 16.09 },
  { name: 'Dobbermannsdorf', lat: 48.63, lon: 16.81 },
  { name: 'Lassee', lat: 48.21, lon: 16.83 },
  { name: 'Markthof', lat: 48.21, lon: 16.9 },
  { name: 'Marchegg', lat: 48.27, lon: 16.9 },
  { name: 'Stripfing', lat: 48.26, lon: 16.83 },
  { name: 'Obersiebenbrunn', lat: 48.27, lon: 16.71 },
  { name: 'Oberweiden', lat: 48.33, lon: 16.82 },
  { name: 'Weikendorf', lat: 48.35, lon: 16.78 },
  { name: 'Apetlon', lat: 47.74, lon: 16.84 },
  { name: 'Wallern im Burgenland', name_display: 'Wallern', lat: 47.73, lon: 16.93 },
  { name: 'Frauenkirchen', lat: 47.83, lon: 16.92 },
  { name: 'St. Andrä am Zicksee', name_display: 'St. Andrä', lat: 47.78, lon: 16.96 },
  { name: 'Andau', lat: 47.77, lon: 17.03 },
  { name: 'Halbturn', lat: 47.87, lon: 16.97 },
  { name: 'Deutsch Jahrndorf', name_display: 'Deutsch Jahrndorf', lat: 47.98, lon: 17.10 },
];

// Globális változók az állapot tárolására
let selectedLocations = [];
let weatherData = {}; // Cache az adatoknak
let map;
const markers = {};

// HTML elemek referenciái
const loader = document.getElementById('loader');
const forecastContainer = document.getElementById('forecast-container');
const selectedForecastsDiv = document.getElementById('selected-forecasts');
const sevenDayContainer = document.getElementById('seven-day-summary-container');
const sevenDayList = document.getElementById('seven-day-list');

// Térkép inicializálása
function initializeMap() {
  map = L.map('map').setView([47.95, 16.9], 9);

  // JAVÍTOTT TILE URL
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  locations.forEach((loc) => {
    const marker = L.marker([loc.lat, loc.lon]).addTo(map);
    marker.bindPopup(loc.name_display || loc.name);
    marker.on('click', () => handleMarkerClick(loc, marker));
    markers[loc.name] = marker; // Marker elmentése a későbbi stílusozáshoz
  });
}

// Marker kattintás kezelése
async function handleMarkerClick(location, marker) {
  const locationName = location.name;
  const markerElement = marker._icon;

  if (selectedLocations.includes(locationName)) {
    // Kijelölés megszüntetése
    selectedLocations = selectedLocations.filter((name) => name !== locationName);
    markerElement.classList.remove('selected-marker');
  } else {
    // Kijelölés
    selectedLocations.push(locationName);
    markerElement.classList.add('selected-marker');

    // Adatok lekérése, ha még nincsenek letöltve
    if (!weatherData[locationName]) {
      loader.style.display = 'block';
      const data = await fetchWeather(location);
      weatherData[locationName] = processWeatherData(data);
      loader.style.display = 'none';
    }
  }
  renderSelectedForecasts();
}

// A kiválasztott előrejelzések újra-renderelése
function renderSelectedForecasts() {
  selectedForecastsDiv.innerHTML = ''; // Konténer kiürítése

  if (selectedLocations.length === 0) {
    forecastContainer.style.display = 'none';
    return;
  }

  forecastContainer.style.display = 'block';

  selectedLocations.forEach((locName) => {
    const data = weatherData[locName];
    if (data) {
      const location = locations.find((l) => l.name === locName);
      const displayName = location.name_display || location.name;

      // HTML string generálása az adatokból
      let forecastHTML = `
        <div class="location-forecast">
          <h3>${displayName}</h3>
          <div class="day-forecast">
            <h4>Holnap</h4>
            <div><strong>Max. hőmérséklet:</strong> ${data.daily[1].maxTemp}°C</div>
            <div>
              <strong>Szél:</strong> Max. ${data.daily[1].maxWind} km/h,
              <span class="highlight">lökések akár ${data.daily[1].maxGust} km/h</span>.
              ${data.nextDay.windChange ? `(${data.nextDay.windChange})` : ''}
            </div>
            <div>
              <strong>Csapadék (5:00-20:00):</strong>
              ${
                data.nextDay.rain.length > 0
                  ? `<div class='rain-details'>${data.nextDay.rain
                      .map((r) => `${r.hour}:00 (${r.amount} mm)`)
                      .join(', ')}</div>`
                  : `<span class='rain-highlight'> Nem várható.</span>`
              }
            </div>
          </div>
          <div class="day-forecast">
            <h4>Következő 3 nap (szél és csapadék)</h4>
            ${data.daily
              .slice(2, 4)
              .map(
                (day) => `
              <div>
                <strong>${new Date(day.date).toLocaleDateString('hu-HU', {
                  weekday: 'long',
                })}:</strong>
                &nbsp;Eső: ${day.precipSum} mm, Szél: max ${day.maxWind} km/h (lökések: ${
                  day.maxGust
                } km/h)
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      `;

      selectedForecastsDiv.innerHTML += forecastHTML;
    }
  });
}

// API hívás egy helyszínre
async function fetchWeather(location) {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&hourly=temperature_2m,precipitation,wind_speed_10m,wind_gusts_10m&daily=temperature_2m_max,precipitation_sum,wind_speed_10m_max,wind_gusts_10m_max&timezone=Europe%2FBudapest&forecast_days=8`;

  try {
    const response = await fetch(apiUrl);
    return await response.json();
  } catch (error) {
    console.error('Hiba az időjárás adatok lekérésekor:', error);
    return null;
  }
}

// 7 napos összefoglaló készítése (összes helyre)
async function fetchAllDataForSummary() {
  loader.style.display = 'block';

  const allPromises = locations.map((loc) => fetchWeather(loc));
  const allRawData = await Promise.all(allPromises);

  const allProcessedData = {};
  allRawData.forEach((data, index) => {
    if (data) {
      const locName = locations[index].name;
      allProcessedData[locName] = processWeatherData(data);
    }
  });

  // Elmentjük a már letöltött adatokat a cache-be
  weatherData = { ...weatherData, ...allProcessedData };

  const summary = generateSevenDaySummary(allProcessedData);
  renderSevenDaySummary(summary);

  loader.style.display = 'none';
  sevenDayContainer.style.display = 'block';
}

// 7 napos összefoglaló kirajzolása (javított, robusztusabb)
function renderSevenDaySummary(summary) {
  sevenDayList.innerHTML = ''; // Lista kiürítése

  // Ellenőrizzük, hogy a 'summary' egy tömb és vannak-e benne elemek
  if (!Array.isArray(summary) || summary.length === 0) {
    sevenDayList.innerHTML = '<li>Nem sikerült betölteni a heti előrejelzést.</li>';
    return;
  }

  summary.forEach((day) => {
    let dayHTML;
    const hasSignificantEvent = day.highWind.length > 0 || day.heavyRain.length > 0;
    const dateString = new Date(day.date).toLocaleDateString('hu-HU', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });

    if (hasSignificantEvent) {
      // Ha van esemény, listázzuk őket
      dayHTML = `
        <li>
          <strong>${dateString}</strong>
          ${
            day.highWind.length > 0
              ? `<div>💨 <span class="highlight">Erős szél:</span> ${day.highWind.join(
                  ', '
                )}</div>`
              : ''
          }
          ${
            day.heavyRain.length > 0
              ? `<div>💧 <span class="rain-highlight">Jelentős eső:</span> ${day.heavyRain.join(
                  ', '
                )}</div>`
              : ''
          }
        </li>
      `;
    } else {
      // Ha nincs esemény, jelezzük, hogy nyugodt az idő
      dayHTML = `
        <li>
          <strong>${dateString}</strong>
          <div>✅ Nyugodt idő várható.</div>
        </li>
      `;
    }

    sevenDayList.innerHTML += dayHTML;
  });
}

// ----- ADATFELDOLGOZÓ FÜGGVÉNYEK -----

function processWeatherData(apiData) {
  if (!apiData) return null;

  const daily = apiData.daily.time.map((date, i) => ({
    date,
    maxTemp: Math.round(apiData.daily.temperature_2m_max[i]),
    precipSum: apiData.daily.precipitation_sum[i].toFixed(1),
    maxWind: Math.round(apiData.daily.wind_speed_10m_max[i]),
    maxGust: Math.round(apiData.daily.wind_gusts_10m_max[i]),
  }));

  const nextDayRain = [];
  const hourlyTime = apiData.hourly.time;
  const tomorrowDateStr = apiData.daily.time[1];

  let morningMaxWind = 0;
  let afternoonMaxWind = 0;

  for (let i = 0; i < hourlyTime.length; i++) {
    if (hourlyTime[i].startsWith(tomorrowDateStr)) {
      const hour = new Date(hourlyTime[i]).getHours();

      if (hour >= 5 && hour <= 20 && apiData.hourly.precipitation[i] > 0.1) {
        nextDayRain.push({
          hour,
          amount: apiData.hourly.precipitation[i].toFixed(1),
        });
      }

      if (hour >= 5 && hour < 13 && apiData.hourly.wind_speed_10m[i] > morningMaxWind) {
        morningMaxWind = apiData.hourly.wind_speed_10m[i];
      }
      if (hour >= 13 && hour <= 20 && apiData.hourly.wind_speed_10m[i] > afternoonMaxWind) {
        afternoonMaxWind = apiData.hourly.wind_speed_10m[i];
      }
    }
  }

  let windChange = '';
  if (morningMaxWind > afternoonMaxWind * 1.5)
    windChange = 'délelőtt erősebb, délutánra gyengül';
  else if (afternoonMaxWind > morningMaxWind * 1.5)
    windChange = 'délelőtt gyengébb, délutánra erősödik';

  return {
    daily,
    nextDay: {
      rain: nextDayRain,
      windChange,
    },
  };
}

function generateSevenDaySummary(allData) {
  const summaryByDay = {};
  const WIND_GUST_THRESHOLD = 40; // km/h
  const RAIN_SUM_THRESHOLD = 5; // mm

  for (const locationName in allData) {
    const weather = allData[locationName];
    if (!weather) continue;

    const displayName =
      (locations.find((l) => l.name === locationName) || {}).name_display || locationName;

    weather.daily.forEach((day) => {
      if (!summaryByDay[day.date]) {
        summaryByDay[day.date] = { date: day.date, highWind: [], heavyRain: [] };
      }
      if (day.maxGust >= WIND_GUST_THRESHOLD) {
        summaryByDay[day.date].highWind.push(
          `${displayName} (${Math.round(day.maxGust)} km/h)`
        );
      }
      if (day.precipSum >= RAIN_SUM_THRESHOLD) {
        summaryByDay[day.date].heavyRain.push(`${displayName} (${day.precipSum} mm)`);
      }
    });
  }

  return Object.values(summaryByDay).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
}

// --- FONTOS: itt hívjuk meg közvetlenül, NEM DOMContentLoaded-del ---

initializeMap();
fetchAllDataForSummary();

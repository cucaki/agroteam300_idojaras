// Globális változók
let map;
let currentMarker = null; // Itt tároljuk az aktuális jelölőt, hogy törölni tudjuk az előzőt

// HTML elemek
const loader = document.getElementById('loader');
const forecastContainer = document.getElementById('forecast-container');

// Térkép inicializálása (Középpont: Magyarország)
function initializeMap() {
    map = L.map('map').setView([47.1625, 19.5033], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // ESEMÉNYKEZELŐ: Kattintás a térképre
    map.on('click', handleMapClick);
}

// Kattintás kezelése
async function handleMapClick(e) {
    const lat = e.latlng.lat;
    const lon = e.latlng.lng;

    // 1. Előző marker törlése, ha van
    if (currentMarker) {
        map.removeLayer(currentMarker);
    }

    // 2. Új marker lerakása
    currentMarker = L.marker([lat, lon]).addTo(map);
    
    // Kis animáció vagy stílus a markernek (opcionális, a CSS-edből)
    if (currentMarker._icon) {
        currentMarker._icon.classList.add('selected-marker');
    }

    // 3. UI frissítése (töltés jelzése)
    forecastContainer.style.display = 'none';
    loader.style.display = 'block';

    // 4. Adatlekérés
    const data = await fetchWeather(lat, lon);
    
    // 5. Megjelenítés
    if (data) {
        const processedData = processWeatherData(data);
        renderForecast(processedData, lat, lon);
        loader.style.display = 'none';
        forecastContainer.style.display = 'block';
    } else {
        loader.textContent = "Hiba történt az adatok letöltésekor.";
    }
}

// API hívás
async function fetchWeather(lat, lon) {
    // Ugyanaz az URL, csak a paraméterek dinamikusak
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation,wind_speed_10m,wind_gusts_10m&daily=temperature_2m_max,precipitation_sum,wind_speed_10m_max,wind_gusts_10m_max&timezone=Europe%2FBudapest&forecast_days=4`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Hálózati hiba');
        return await response.json();
    } catch (error) {
        console.error('Hiba:', error);
        return null;
    }
}

// Adatok feldolgozása (Ugyanaz a logika, mint eddig)
function processWeatherData(apiData) {
    if (!apiData) return null;

    const daily = apiData.daily.time.map((date, i) => ({
        date,
        maxTemp: Math.round(apiData.daily.temperature_2m_max[i]),
        precipSum: apiData.daily.precipitation_sum[i].toFixed(1),
        maxWind: Math.round(apiData.daily.wind_speed_10m_max[i]),
        maxGust: Math.round(apiData.daily.wind_gusts_10m_max[i]),
    }));

    // Szél és eső elemzése holnapra (részletesebb logika)
    const nextDayRain = [];
    const hourlyTime = apiData.hourly.time;
    // Mivel dinamikus a lekérés, a "holnap" mindig a daily tömb 1. eleme
    const tomorrowDateStr = apiData.daily.time[1]; 

    let morningMaxWind = 0;
    let afternoonMaxWind = 0;

    for (let i = 0; i < hourlyTime.length; i++) {
        if (hourlyTime[i].startsWith(tomorrowDateStr)) {
            const hour = new Date(hourlyTime[i]).getHours();

            // Eső 5:00 és 20:00 között
            if (hour >= 5 && hour <= 20 && apiData.hourly.precipitation[i] > 0.1) {
                nextDayRain.push({
                    hour,
                    amount: apiData.hourly.precipitation[i].toFixed(1),
                });
            }

            // Szél elemzése napszak szerint
            if (hour >= 5 && hour < 13 && apiData.hourly.wind_speed_10m[i] > morningMaxWind) {
                morningMaxWind = apiData.hourly.wind_speed_10m[i];
            }
            if (hour >= 13 && hour <= 20 && apiData.hourly.wind_speed_10m[i] > afternoonMaxWind) {
                afternoonMaxWind = apiData.hourly.wind_speed_10m[i];
            }
        }
    }

    let windChange = '';
    if (morningMaxWind > afternoonMaxWind * 1.5) windChange = 'délelőtt erősebb, délutánra gyengül';
    else if (afternoonMaxWind > morningMaxWind * 1.5) windChange = 'délelőtt gyengébb, délutánra erősödik';

    return { daily, nextDay: { rain: nextDayRain, windChange } };
}

// Megjelenítés a HTML-ben
function renderForecast(data, lat, lon) {
    // Mivel nincs név (mint a "RWA 5Ha"), ezért koordinátákat írunk ki
    const coordsDisplay = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
    
    forecastContainer.innerHTML = `
        <div class="location-forecast">
          <h3>Kiválasztott pont (${coordsDisplay})</h3>
          
          <div class="day-forecast">
            <h4>Holnap (${new Date(data.daily[1].date).toLocaleDateString('hu-HU', { weekday: 'long' })})</h4>
            <div><strong>Max. hőmérséklet:</strong> ${data.daily[1].maxTemp}°C</div>
            <div>
              <strong>Szél:</strong> Max. ${data.daily[1].maxWind} km/h,
              <span class="highlight">lökések akár ${data.daily[1].maxGust} km/h</span>.
              ${data.nextDay.windChange ? `(${data.nextDay.windChange})` : ''}
            </div>
            <div>
              <strong>Csapadék (5:00-20:00):</strong>
              ${data.nextDay.rain.length > 0
                  ? `<div class='rain-details'>${data.nextDay.rain.map((r) => `${r.hour}:00 (${r.amount} mm)`).join(', ')}</div>`
                  : `<span class='rain-highlight'> Nem várható.</span>`
              }
            </div>
          </div>

          <div class="day-forecast">
            <h4>Következő napok</h4>
            ${data.daily.slice(2, 5).map(day => `
              <div style="margin-bottom: 5px;">
                <strong>${new Date(day.date).toLocaleDateString('hu-HU', { weekday: 'long', month: 'short', day: 'numeric' })}:</strong>
                Eső: ${day.precipSum} mm, Szél: max ${day.maxWind} km/h (lökés: ${day.maxGust} km/h)
              </div>
            `).join('')}
          </div>
        </div>
    `;
}

// Indítás
initializeMap();

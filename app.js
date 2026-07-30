// ===============================
// Goal Dashboard v1.2
// Clock + Greeting + Open-Meteo Weather
// ===============================

// Carmel, Indiana
const LAT = 39.9784;
const LON = -86.1180;

function updateClock() {

    const now = new Date();

    document.getElementById("time").textContent =
        now.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit"
        });

    document.getElementById("date").textContent =
        now.toLocaleDateString([], {
            weekday: "long",
            month: "long",
            day: "numeric"
        });

    const hour = now.getHours();

    let greeting = "Good Evening";

    if (hour < 12)
        greeting = "Good Morning";
    else if (hour < 18)
        greeting = "Good Afternoon";

    document.getElementById("greeting").textContent = greeting;
}

function weatherDescription(code) {

    const map = {
        0: "Clear",
        1: "Mostly Clear",
        2: "Partly Cloudy",
        3: "Cloudy",
        45: "Fog",
        48: "Fog",
        51: "Light Drizzle",
        53: "Drizzle",
        55: "Heavy Drizzle",
        61: "Light Rain",
        63: "Rain",
        65: "Heavy Rain",
        71: "Snow",
        80: "Rain Showers",
        95: "Thunderstorms"
    };

    return map[code] || "Weather";
}

async function loadWeather() {

    try {

        const url =
            `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=auto`;

        const response = await fetch(url);

        const data = await response.json();

        const current = Math.round(data.current.temperature_2m);

        const high = Math.round(data.daily.temperature_2m_max[0]);

        const low = Math.round(data.daily.temperature_2m_min[0]);

        const text = weatherDescription(data.current.weather_code);

        document.getElementById("weather").innerHTML =
            `
            <div style="font-size:48px;font-weight:700;">
                ${current}°
            </div>

            <div style="font-size:22px;">
                ${text}
            </div>

            <div style="margin-top:10px;opacity:.75;">
                High ${high}° • Low ${low}°
            </div>
            `;

    }
    catch (e) {

        document.getElementById("weather").textContent =
            "Weather unavailable";

        console.log(e);

    }

}

updateClock();
loadWeather();

setInterval(updateClock,1000);
setInterval(loadWeather,600000);
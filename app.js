const LAT = 39.9784;
const LON = -86.1180;

function updateClock() {

    const now = new Date();

    greeting.textContent =
        now.getHours() < 12 ? "Good Morning" :
        now.getHours() < 18 ? "Good Afternoon" :
        "Good Evening";

    date.textContent = now.toLocaleDateString([], {
        weekday: "long",
        month: "long",
        day: "numeric"
    });

    time.textContent = now.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit"
    });

}

function weatherIcon(code) {

    if (code === 0) return "☀️";
    if (code === 1) return "🌤️";
    if (code === 2) return "⛅";
    if (code === 3) return "☁️";

    if (code >= 45 && code <= 48) return "🌫️";

    if (code >= 51 && code <= 57) return "🌦️";

    if (code >= 61 && code <= 67) return "🌧️";

    if (code >= 71 && code <= 77) return "❄️";

    if (code >= 80 && code <= 82) return "🌧️";

    if (code >= 95) return "⛈️";

    return "❔";
}

async function loadWeather() {

    try {

        const url =
            `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=auto`;

        const response = await fetch(url);

        const data = await response.json();

        currentTemp.textContent =
            Math.round(data.current.temperature_2m) + "°";

        currentCondition.innerHTML =
            `<div style="font-size:70px">${weatherIcon(data.current.weather_code)}</div>`;

        const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

        forecast.innerHTML = "";

        for (let i = 0; i < 7; i++) {

            const day = new Date(data.daily.time[i]);

            forecast.innerHTML += `
                <div class="day">
                    <div>${weekday[day.getDay()]}</div>
                    <div style="font-size:32px">
                        ${weatherIcon(data.daily.weather_code[i])}
                    </div>
                    <div>${Math.round(data.daily.temperature_2m_max[i])}°</div>
                </div>
            `;
        }

    } catch (err) {

        currentCondition.textContent = "Weather unavailable";
        console.log(err);

    }

}

updateClock();
loadWeather();

setInterval(updateClock, 1000);
setInterval(loadWeather, 600000);
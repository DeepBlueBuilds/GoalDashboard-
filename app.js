// =========================
// Goal Dashboard v1.2
// Live Clock + Greeting + Weather
// =========================

const API_KEY = "13006147911794057541c2ffd369a87d";
const CITY = "Carmel";
const STATE = "Indiana";

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

async function loadWeather() {

    try {

        const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${CITY},US&units=imperial&appid=${API_KEY}`;

        const response = await fetch(url);

        const data = await response.json();

        const weather =
            `${Math.round(data.main.temp)}° • ${data.weather[0].main}
High ${Math.round(data.main.temp_max)}°
Low ${Math.round(data.main.temp_min)}°`;

        document.getElementById("weather").textContent = weather;

    }
    catch (err) {

        document.getElementById("weather").textContent =
            "Unable to load weather";

        console.log(err);

    }

}

updateClock();
loadWeather();

setInterval(updateClock,1000);

// Refresh weather every 10 minutes
setInterval(loadWeather,600000);
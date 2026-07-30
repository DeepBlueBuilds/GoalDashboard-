const LAT = 39.9784;
const LON = -86.1180;

function updateClock(){

const now=new Date();

time.textContent=now.toLocaleTimeString([],{
hour:"numeric",
minute:"2-digit"
});

date.textContent=now.toLocaleDateString([],{
weekday:"long",
month:"long",
day:"numeric"
});

const h=now.getHours();

greeting.textContent=
h<12?"Good Morning":
h<18?"Good Afternoon":
"Good Evening";

}

function weatherText(code){

const map={
0:"Clear",
1:"Mostly Clear",
2:"Partly Cloudy",
3:"Cloudy",
45:"Fog",
51:"Drizzle",
61:"Rain",
63:"Rain",
71:"Snow",
80:"Showers",
95:"Storms"
};

return map[code]||"Weather";

}

async function loadWeather(){

const url=`https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=auto`;

const r=await fetch(url);

const d=await r.json();

currentTemp.textContent=Math.round(d.current.temperature_2m)+"°";

currentCondition.textContent=weatherText(d.current.weather_code);

const names=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

forecast.innerHTML="";

for(let i=0;i<7;i++){

const day=new Date(d.daily.time[i]);

forecast.innerHTML+=`
<div class="day">
<div>${names[day.getDay()]}</div>
<div>${Math.round(d.daily.temperature_2m_max[i])}°</div>
<div>${weatherText(d.daily.weather_code[i])}</div>
</div>
`;

}

}

updateClock();
loadWeather();

setInterval(updateClock,1000);
setInterval(loadWeather,600000);
function updateClock(){

    const now = new Date();

    document.getElementById("time").textContent =
        now.toLocaleTimeString([],{
            hour:"numeric",
            minute:"2-digit"
        });

    document.getElementById("date").textContent =
        now.toLocaleDateString([],{
            weekday:"long",
            month:"long",
            day:"numeric"
        });

    const hour = now.getHours();

    let greeting="Good Evening";

    if(hour<12)
        greeting="Good Morning";

    else if(hour<18)
        greeting="Good Afternoon";

    document.getElementById("greeting").textContent =
        greeting;

}

updateClock();

setInterval(updateClock,1000);

document.getElementById("weather").textContent =
"72° • Mostly Sunny";
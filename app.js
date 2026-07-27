// Goal Dashboard - Core Functions


function updateDateTime() {

    const now = new Date();

    const dateOptions = {
        weekday: "long",
        month: "long",
        day: "numeric"
    };


    document.getElementById("date").innerHTML =
        now.toLocaleDateString(undefined, dateOptions);


    document.getElementById("time").innerHTML =
        now.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit"
        });

}


// Update immediately
updateDateTime();


// Update every second
setInterval(updateDateTime, 1000);

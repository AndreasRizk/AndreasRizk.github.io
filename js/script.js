var city;

function displayDateTime(){
    const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let nodeDate = document.getElementsByClassName("date")[0];
    let nodeTime = document.getElementsByClassName("time")[0];
    let date = new Date();
    let weekDay = days[date.getDay()];
    let month = months[date.getMonth()];
    let hr = date.getHours().toString().padStart(2,'0');
    let min = date.getMinutes().toString().padStart(2,'0');
    let sec = date.getSeconds().toString().padStart(2,'0');
    nodeDate.innerHTML = `<h1>${weekDay} ${month} ${date.getDate()}, ${date.getFullYear()} </h1>`;
    nodeTime.innerHTML = `<h2>${hr}:${min}:${sec}</h2>`;
}

setInterval(displayDateTime, 1000)

function displayWeather(){    
    $(document).ready(function () {
        $.ajax({
            url: "https://geolocation-db.com/jsonp",
            jsonpCallback: "callback",
            dataType: "jsonp",
            success: function(location) {
                /*
                $('#country').html(location.country_name);
                $('#state').html(location.state);
                $('#city').html(location.city);
                $('#latitude').html(location.latitude);
                $('#longitude').html(location.longitude);
                $('#ip').html(location.IPv4);
                */
                city = location.city;
            }
        });
    });
    const xhr = new XMLHttpRequest();
    xhr.open('GET',
    `https://api.openweathermap.org/data/2.5/weather?q=Seattle&appid=4b3865c936c8cabacec0be961e765509`);
    xhr.send();
    xhr.onload = () =>{
        const data = JSON.prase(xhr.response);
        console.log(data);
    };
}

displayWeather();
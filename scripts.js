//create getWeather function
function getWeather(){
    //get elements from html
    let name = document.getElementById("name");
    let temperature = document.getElementById("temperature");
    let description = document.getElementById("description");
    let location = document.getElementById("location");
    let humidity = document.getElementById("humidity");
    let wind = document.getElementById("wind");
    //add api url and personal key
    let api = "https://api.openweathermap.org/data/2.5/weather";
    let apiKey="ADD API KEY HERE";
    //get geolocation
    navigator.geolocation.getCurrentPosition(success, error,{timeout:10000});

    function success(position){
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        let url = api + "?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=imperial";
        //fetching data from openweather api
        fetch(url)
                .then(response => response.json())
                .then(data => {
                    //condition to hide load spinner when done fetching data from the api
                    if(data){
                        hideLoader();
                    }
                    console.log(data);
                    let temp = Math.round(data.main.temp);
                    name.innerHTML = data.name;
                    temperature.innerHTML = temp + "° F";
                    location.innerHTML = data.name + " (" + latitude + "°, " + longitude + "°)";
                    wind.innerHTML = " Wind: " + Math.round(data.wind.speed) + "MPH";
                    var category = data.weather[0].main;
                    humidity.innerHTML = "Humidity: " + data.main.humidity + "% ";
                    description.innerHTML = category;
                    const d = new Date();
                    let hour = d.getHours();
                    console.log(hour);
                    //set category attribute to use for gifs in css
                document.body.setAttribute("category", category);
                });      
    }
    //error handling
    function error(err){
        console.warn(`ERROR(${err.code}): ${err.message}`);
        location.innerHTML = "Unable to retrieve your location";
    }
    //function to hile load spinner
    function hideLoader(){
        document.querySelector(".load-ring").style.display = "none";
    }
}
//calling getWeather();
getWeather();

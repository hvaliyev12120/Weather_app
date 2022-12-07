const city = document.querySelector(".nameofcity");
const country = document.querySelector(".country");
const condition = document.querySelector(".weather_condition");
const description = document.querySelector(".weather_descript");
const temperature = document.querySelector(".city_temp");
const min_temperature = document.querySelector(".min_temp");
const max_temperature = document.querySelector(".max_temp");
const feel_real = document.querySelector(".feels_like");
const humidity = document.querySelector(".hum");
const pressure = document.querySelector(".press");
const windSpeed = document.querySelector(".wind");
const wind_degree = document.querySelector(".wind_degree");

const time = document.querySelector(".date");


var search_button = document.querySelector(".searching");
var search_input = document.querySelector(".just_search");


const takeUserInput = function () {
    var city = search_input.value;
        if (city.trim() === "") {
        alert("Error: City name cannot be empty!")
    }

    const cord_value = search_input.value;
    splitted_cord_value = cord_value.split(" ");
    cordFunc(splitted_cord_value[0], splitted_cord_value[1]);

    getCityCurrentWeather(city);
}


function cordFunc(lat, lon){
    const api_url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid=df5de19c3287d39aeec080efba00bb10"
    fetch(api_url)
        .then(response => {
            const responseFromApi = response.json();
            return responseFromApi;
        })
        .then(responseFromApi => {
            getCityCurrentWeather(responseFromApi.name)
        })
        .catch(err => {
            console.log(err);
        });
}

const getCityCurrentWeather = function (city) {

  
    const api_url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=df5de19c3287d39aeec080efba00bb10&units=metric';

    fetch(api_url)
        .then(response => {
            const responseFromApi = response.json();
            return responseFromApi;
        })

        .then(responseFromApi => {
            WeatherResult(responseFromApi);
        })

        .catch(err => {
            console.log(err);
        });
        
}



const WeatherResult = function(responseFromApi) {
    city.innerHTML = "City: " + responseFromApi.name;
    country.innerHTML = "Country: " + responseFromApi.sys.country;
    let timeData = responseFromApi.dt;
    date = new Date(timeData * 1000);
    time.innerHTML = "Date: " + date;
    condition.innerHTML = "Condition: " + responseFromApi.weather[0].main;
    description.innerHTML = "Description: " + responseFromApi.weather[0].description;
    temperature.innerHTML = "Temp: " + Math.round(responseFromApi.main.temp) + " °C";
    min_temperature.innerHTML = "Min-Temp: " + responseFromApi.main.temp_min + " °C";
    max_temperature.innerHTML = "Max-Temp: " + responseFromApi.main.temp_max + " °C";
    feel_real.innerHTML = "Feels like: " + responseFromApi.main.feels_like + " °C";
    humidity.innerText = "Humidity: " + responseFromApi.main.humidity + "%";
    pressure.innerHTML = "Pressure: " + responseFromApi.main.pressure + " P ";
    windSpeed.innerHTML = "Wind speed: " + responseFromApi.wind.speed + " km/h";
    wind_degree.innerHTML = "Degree: " + responseFromApi.wind.deg +  "° (" + direction_of_wind(responseFromApi.wind.deg) + ")"; 

    function direction_of_wind(num){
        var val = Math.floor((num / 22.5) + 0.5);
        var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        direction = arr[(val % 16)];
        return direction;
    }
}
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


var search_button = document.querySelector(".searching");
var search_input = document.querySelector(".just_search");


const takeUserInput = function () {
    var city = search_input.value;
        if (city.trim() === "") {
        alert("Error: City name cannot be empty!")
    }
    getCityCurrentWeather(city);
}


const getCityCurrentWeather = function (city) {

  
    const api_url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=df5de19c3287d39aeec080efba00bb10&units=metric';

    fetch(api_url)
        .then(response => {
            if(!response.ok) {
                alert("Error: Check out your input!!!");
            }
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
    condition.innerHTML = "Condition: " + responseFromApi.weather[0].main;
    description.innerHTML = "Description: " + responseFromApi.weather[0].description;
    temperature.innerHTML = "Temp: " + Math.round(responseFromApi.main.temp) + " °C";
    min_temperature.innerHTML = "Min-Temp: " + responseFromApi.main.temp_min + " °C";
    max_temperature.innerHTML = "Max-Temp: " + responseFromApi.main.temp_max + " °C";
    feel_real.innerHTML = "Feels like: " + responseFromApi.main.feels_like + " °C";
    humidity.innerText = "Humidity: " + responseFromApi.main.humidity + "%";
    pressure.innerHTML = "Pressure: " + responseFromApi.main.pressure + " P ";
    windSpeed.innerHTML = "Wind speed: " + responseFromApi.wind.speed + " km/h";
    wind_degree.innerHTML = "Degree: " + responseFromApi.wind.deg +  "° " + windDir(wind_deg);  //not working, I don't know why?
    

    function windDir(wind_deg) {                   
        const dirs = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
        return dirs[Math.round(wind_deg / 45) % 8];     
      }

}
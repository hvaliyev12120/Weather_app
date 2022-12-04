function getWeather() {
    const location = document.querySelector(".nameofcity");
    const country = document.querySelector(".country");
    const condition = document.querySelector(".weather_condition");
    const temperature = document.querySelector(".city_temp");
    const min_temperature = document.querySelector(".min_temp");
    const max_temperature = document.querySelector(".max_temp");
    const feel_real = document.querySelector(".feels_like");
    const description = document.querySelector(".weather_descript");
    const humidity = document.querySelector(".hum");
    const pressure = document.querySelector(".press");
    const wind = document.querySelector(".wind");
    const wind_degree = document.querySelector(".wind_degree");
    const current_location = document.querySelector(".current_pos");    


    let api = "https://api.openweathermap.org/data/2.5/weather";
    let apiKey = "df5de19c3287d39aeec080efba00bb10";
    location.innerHTML = "Searching...";
  
    navigator.geolocation.getCurrentPosition(success, error);
  
    function success(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
  
      let url =
        api +
        "?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=" +
        apiKey +
        "&units=metric";
  
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          let temp = data.main.temp;
          let temp_min = data.main.temp_min;
          let temp_max = data.main.temp_max;
          let temp_feels = data.main.feels_like;
          let hmdty = data.main.humidity;
          let pres = data.main.pressure;
          let wind_speed = data.wind.speed;
          let wind_deg = data.wind.deg;
          let cond = data.weather[0].main;
          let desc = data.weather[0].description;
        
          current_location.innerHTML = "You are in " + data.name;
          temperature.innerHTML = "Temperature: " + temp + "° C";
          min_temperature.innerHTML = "Min Temperature: " + temp_min + "° C";
          max_temperature.innerHTML = "Max Temperature: " + temp_max + "° C";
          feel_real.innerHTML = "Feels Temperature: " + temp_feels + "° C";
          location.innerHTML = "City: " + data.name +" (" + latitude + "°, " + longitude + "°)";
          country.innerHTML = "Country: " + data.sys.country;
          humidity.innerHTML = "Humidity: " + hmdty + " %";  
          pressure.innerHTML = "Pressure: " + pres + " P";
          wind.innerHTML = "Wind Speed: " + wind_speed + " km/h";
          wind_degree.innerHTML = "Wind Degree: " + wind_deg + "° " + windDir(wind_deg);
          description.innerHTML = "Weather Description: " + desc;
          condition.innerHTML = "Weather Condition: " + cond;

          function windDir(wind_deg) {                 
            const dirs = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
            return dirs[Math.round(wind_deg / 45) % 8];     
          }

        });
    }
  
    function error() {
      location.innerHTML = "Cannot find your location";
    }
  }
  
  getWeather();
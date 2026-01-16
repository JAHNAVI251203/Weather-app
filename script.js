// test change
      /* api configuration */
      const apiKey = "c3170d230fc6d18e6c84076948add182";
      const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
     
      /*connecting js to html elements;DOM rendering*/ 
      const searchBox = document.querySelector(".search input");
      const searchBtn = document.querySelector(".search button");
      const weatherIcon = document.querySelector(".weather-icon");
      
      /*takes city name,call api and update the ui*/
      async function checkWeather(city){
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);//pauses until API responds
        
        //error handling
        if(response.status == 404){
          document.querySelector(".error").style.display = "block";//show error
          document.querySelector(".weather").style.display = "none";//hide weather
        }else{
          var data = await response.json();//converts api response into js object
          
          //update DOM
          document.querySelector(".city").innerHTML = data.name;
          document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"; 
          document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
          document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";
          
          //chooses icon based on weather condition
          /*API uses an array instead of single object because sometimes there can be:
            multiple weather conditions at once and API keeps it flexible*/
          if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/clouds.png";
            }
          else if(data.weather[0].main == "Clear"){
          weatherIcon.src = "images/clear.png";
          }
          else if(data.weather[0].main == "Rain"){
          weatherIcon.src = "images/rain.png";
          }
          else if(data.weather[0].main == "Drizzle"){
          weatherIcon.src = "images/drizzle.png";
          }
          else if(data.weather[0].main == "Mist"){
          weatherIcon.src = "images/mist.png";
          }

          document.querySelector(".weather").style.display = "block";//show weather
          document.querySelector(".error").style.display = "none";//hide error
        }
      } 
      
      //reads input value,calls API,updates UI
      searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value);
      });

      searchBox.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          checkWeather(searchBox.value);
        }
      });
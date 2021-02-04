var locationInput = document.querySelector('#search-location');
var searchForm = document.querySelector('#search-form');
var locationHero = document.querySelector('#hero-location');
var tempHero = document.querySelector('#temp-hero');
var weatherCardContainer = document.querySelector('.card-group');
var dateHero = document.querySelector('#hero-date');
var iconHero = document.querySelector('#hero-icon');
var tempHero = document.querySelector('#hero-temp');
var humidHero = document.querySelector('#hero-humid');
var uviHero = document.querySelector('#hero-uvi');
var windHero = document.querySelector('#hero-wind');
// var cityRecord = document.querySelectorAll('.city-record')

// OpenWeather API Key = 46cf839acea41a07f1ac5b85a8f5be30


function renderCities() {


    // Function to insert HTML element as a sibling, rather than append child
    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

     const cityHistory = document.getElementById("city-history")
     cityHistory.innerHTML = "";

    const oldCity1 = JSON.parse(localStorage.getItem('city')) || [];

    // for (let i = 0; i < oldCity1.length; i++) {
    //     console.log("############" + oldCity1.city);
    //     var cityHistory = document.createElement('div');
    //     toString(oldCity1[i]);
    //     cityHistory.classList = "hey";
    //     cityHistory.innerText = oldCity1[i];

       
    // }

                oldCity1.forEach(function (city, index) {
                var cityHistoryName = document.createElement('div');
                cityHistoryName.classList.add("city-record")
                cityHistoryName.textContent = city.city;
                cityHistory.appendChild(cityHistoryName);
                
                })

                $('.city-record').on("click", function (event) {
                    //save textContent from text area to localstorage here
                    event.preventDefault();

                    oldCityRecord = $(this).text();
                    console.log(oldCityRecord);

                    getCurrentData(oldCityRecord);
                    getForecastData(oldCityRecord);


                })
}


var formSubmitHandler = function (event) {
event.preventDefault();
const searchLocation = locationInput.value.trim();
// console.log(searchLocation);
// cardGroup.innerHTML = "";

if (searchLocation) {

    storeResult(searchLocation);
    getCurrentData(searchLocation);
    getForecastData(searchLocation);

 renderCities();

    // repoContainerEl.textContent = '';
    // nameInputEl.value = '';
} else {
    alert('Location not found.  Please enter a city name.');
}
};

 renderCities();

function storeResult(userCity) {

    const oldCity = JSON.parse(localStorage.getItem('city')) || [];
    const cityToUse = userCity;
    const existingCity = oldCity.find(({
        city
    }) => city === cityToUse);
    if (existingCity) {
        Object.assign(existingCity, {
            'city': userCity,
        })
    } else {
        const newCity = {
            'city': userCity,

        };
        oldCity.push(newCity);
    }

    localStorage.setItem('city', JSON.stringify(oldCity));

}



var getCurrentData = function (location) {

var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial&appid=46cf839acea41a07f1ac5b85a8f5be30"
  fetch(apiUrl)
      .then(function (response) {
          if (response.ok) {
              console.table(response);
              response.json().then(function (data) {
                  console.table(data);
                  //console.log(data.main.temp)
                  displayCurrent(data, location);
              });
          } else {
              alert('Error: ' + response.statusText);
          }
      })
      .catch(function (error) {
          alert('Unable to connect to OpenWeatherAPI');
      });


}

var getAddData = function (lat, long) {

    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=minutely,hourly,daily,alerts&appid=46cf839acea41a07f1ac5b85a8f5be30"
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                console.table(response);
                response.json().then(function (data) {
                    console.table(data);
                    //console.log(data.main.temp)
                    displayAddData(data);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to OpenWeatherAPI');
        });


}



var getForecastData = function (location) {

    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=imperial&count=5&appid=46cf839acea41a07f1ac5b85a8f5be30"

  fetch(apiUrl)
      .then(function (response) {
          if (response.ok) {
              console.table(response);
              response.json().then(function (data) {
                    console.table("okay so far");
                    //console.log(data.main.temp)
                  displayForecast(data, location);
              });
          } else {
              alert('Error: ' + response.statusText);
          }
      })
      .catch(function (error) {
          alert('Unable to connect to OpenWeatherAPI');
      });

}

var displayCurrent = function (weatherData, place) {


    cityName = weatherData.name;
    console.log("HERE " + cityName)

       tempF = weatherData.main.temp;
       tempLow = weatherData.main.temp_min;

       humidity = weatherData.main.humidity;
       windSpeed = weatherData.wind.speed;

       dateTime = weatherData.dt;
       iconCode = weatherData.weather[0].icon;
       descriptionMain = weatherData.weather[0].main;
       description = weatherData.weather[0].description;
       latAPI = weatherData.coord.lat;
       lonAPI = weatherData.coord.lon;

       locationHero.innerText = cityName;


       var dt = moment.unix(dateTime).format('dddd, MMMM DD, YYYY');
       dateHero.innerText = dt;


        var weatherIcon = document.createElement('img');
        // var iconUrl = "http://"
        weatherIcon.classList = ""
        weatherIcon.setAttribute('src', 'http://openweathermap.org/img/w/' + iconCode + ".png");
        locationHero.appendChild(weatherIcon);
        // iconHero.insertAdjacentElement('afterend', weatherIcon);
    // for (var i = 0; i < weatherData.length; i++) {
        windHero.innerText="Wind Speep: " + windSpeed + " MPH"
       tempHero.innerText="Temperature: " + tempF;
       humidHero.innerText="Humidity: " + humidity;

        getAddData(latAPI, lonAPI);

   

    // }


}


var displayAddData =function (weatherAdd) {


    uvIndex = weatherAdd.current.uvi;
    console.log(uvIndex)
    uviHero.innerText = "UV Index: " + uvIndex;
    if(uvIndex<=3){
        uviHero.classList = "uviLow";
    }
    if(uvIndex>3 && uvIndex<=5){
         uviHero.classList = "uviMod";
    }
     if (uvIndex>5 && uvIndex <= 7) {
         uviHero.classList = "uviHigh";
     }
     if (uvIndex > 7) {
             uviHero.classList = "uviVeryHigh";
     }

}

var displayForecast = function (weatherData, place) {


    // ########## ERROR RETURING LENGTH OF API DATA PULL ###########
    // if (weatherData.length === 0) {
    //     locationHero.textContent = 'No repositories found.';
    //     return;
    // }


    console.log(place);

       const cardGroup = document.getElementById("card-group")
       cardGroup.innerHTML = "";


    cityName=weatherData.city.name;

    for (var i = 2; i<weatherData.list.length; i+=8){

    tempF=weatherData.list[i].main.temp;
    tempLow = weatherData.list[i].main.temp_min;

    humidity = weatherData.list[i].main.humidity;
    windSpeed = weatherData.list[i].wind.speed;

    dateTime=weatherData.list[i].dt_txt;
    iconCode=weatherData.list[i].weather[0].icon;
    descriptionMain = weatherData.list[i].weather[0].main;
    description = weatherData.list[i].weather[0].description;

    var dayT = moment(dateTime).format('ddd');
    var fullDay = moment(dateTime).format('M/DD/YYYY');
    // 'M/DD/YYYY'

    var dtStr = String(dayT)
    var dtShow= dtStr.toUpperCase();

    var fullDayStr = String(fullDay);

    console.log(cityName);
    console.log(dtShow);
    console.log(tempF);
    console.log(humidity);
    console.log(iconCode);

    var weatherCard=document.createElement('div');
    weatherCard.classList = "card text-center";

    var forecastDate=document.createElement('h5');
    forecastDate.classList = "card-header flex-row align-center";
    forecastDate.innerText = dtShow;

     var forecastFullDate = document.createElement('h6');
     forecastFullDate.classList = "flex-row align-center";
     forecastFullDate.innerText = fullDayStr;

    var weatherIcon=document.createElement('img');
    // var iconUrl = "http://"
    weatherIcon.classList = "fit-image card-img-top"
    weatherIcon.setAttribute('src', 'http://openweathermap.org/img/w/' + iconCode + ".png");

     var cardBody = document.createElement('div');
     cardBody.classList = "card-body";

    var cardDescription = document.createElement('h4');
    cardDescription.classList = "descript";
    cardDescription.innerText = descriptionMain + ", " + description;

     var cardTemp = document.createElement('h5');
     cardTemp.classList = "card-title temp";
     cardTemp.innerText = Math.round(tempF) + '\xB0 F';

      var cardTempLow = document.createElement('h6');
      cardTempLow.classList = "card-title tempLow";
      cardTempLow.innerText = Math.round(tempLow) + '\xB0 F';

       var humidityShow = document.createElement('h6');
       humidityShow.classList = "flex-row align-center";
       humidityShow.innerText = "Humidity: " + humidity;

    // Function to insert HTML element as a sibling, rather than append child
   function insertAfter(referenceNode, newNode) {
       referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
   }


   

    weatherCardContainer.appendChild(weatherCard);
    weatherCard.appendChild(forecastDate);
    forecastDate.appendChild(forecastFullDate);
    insertAfter(forecastDate, cardBody)
    cardBody.appendChild(weatherIcon);
    cardBody.appendChild(cardDescription);
    cardBody.appendChild(cardTemp);
    cardBody.appendChild(cardTempLow);
    cardBody.appendChild(humidityShow);
    // insertAfter(weatherIcon, cardTemp);
    }


};


function renderOldCity() {

     //save textContent from text area to localstorage here
     event.preventDefault();

     timeHour = $(this).prev().prev().text();
     textArea = $(this).prev().val();

}

$('.city-record').on("click", function (event) {
    //save textContent from text area to localstorage here
    event.preventDefault();

    oldCityRecord = $(this).text();
    console.log(oldCityRecord);

    getCurrentData(oldCityRecord);
    getForecastData(oldCityRecord);


})




searchForm.addEventListener('submit', formSubmitHandler);
// cityRecord.addEventListener('click', renderOldCity);


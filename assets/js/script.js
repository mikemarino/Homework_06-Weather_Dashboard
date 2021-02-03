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
var windHero = document.querySelector('#hero-wind')

// OpenWeather API Key = 46cf839acea41a07f1ac5b85a8f5be30

var formSubmitHandler = function (event) {
event.preventDefault();

var searchLocation = locationInput.value.trim();



// console.log(searchLocation);

if (searchLocation) {

    getCurrentData(searchLocation)
    getForecastData(searchLocation);
    

    // repoContainerEl.textContent = '';
    // nameInputEl.value = '';
} else {
    alert('Please enter a location.');
}

};


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
                    console.table(data);
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
        locationHero.insertAdjacentElement('afterend', weatherIcon);
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

}

var displayForecast = function (weatherData, place) {

   
    // ########## ERROR RETURING LENGTH OF API DATA PULL ###########    
    // if (weatherData.length === 0) {
    //     locationHero.textContent = 'No repositories found.';
    //     return;
    // }

    console.log(place);

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

    var dt = moment(dateTime).format('ddd');

    var dtStr = String(dt)
    var dtShow= dtStr.toUpperCase();
    
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

    var weatherIcon=document.createElement('img');
    // var iconUrl = "http://"
    weatherIcon.classList = "fit-image card-img-top"
    weatherIcon.setAttribute('src', 'http://openweathermap.org/img/w/' + iconCode + ".png");
    
     var cardBody = document.createElement('div');
     cardBody.classList = "card-body";

    var cardDescription = document.createElement('h5');
    cardDescription.classList = "";
    cardDescription.innerText = descriptionMain + ", " + description;

     var cardTemp = document.createElement('h5');
     cardTemp.classList = "card-title temp";
     cardTemp.innerText = Math.round(tempF) + '\xB0 F';

      var cardTempLow = document.createElement('h6');
      cardTempLow.classList = "card-title tempLow";
      cardTempLow.innerText = Math.round(tempLow) + '\xB0 F';
         

    // Function to insert HTML element as a sibling, rather than append child
   function insertAfter(referenceNode, newNode) {
       referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
   }

    weatherCardContainer.appendChild(weatherCard);
    weatherCard.appendChild(forecastDate);
    insertAfter(forecastDate, cardBody)
    cardBody.appendChild(weatherIcon);
    cardBody.appendChild(cardDescription);
    cardBody.appendChild(cardTemp)
    cardBody.appendChild(cardTempLow)
    // insertAfter(weatherIcon, cardTemp);



    }

    // // locationHero.textContent = place;
    
    // for (var i = 0; i < weatherData.length; i++) {
    //      var temp = weatherData[i].main.temp;
    //      tempHero.textContent = temp;

    //      console.log(weatherData[i].main.temp)
    // };

    //     var repoEl = document.createElement('a');
    //     repoEl.classList = 'list-item flex-row justify-space-between align-center';
    //     repoEl.setAttribute('href', './single-repo.html?repo=' + repoName);

    //     var titleEl = document.createElement('span');
    //     titleEl.textContent = repoName;

    //     repoEl.appendChild(titleEl);

    //     var statusEl = document.createElement('span');
    //     statusEl.classList = 'flex-row align-center';

    //     if (weatherData[i].open_issues_count > 0) {
    //         statusEl.innerHTML =
    //             "<i class='fas fa-times status-icon icon-danger'></i>" + weatherData[i].open_issues_count + ' issue(s)';
    //     } else {
    //         statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    //     }

    //     repoEl.appendChild(statusEl);

    //     repoContainerEl.appendChild(repoEl);
    // }
};



















searchForm.addEventListener('submit', formSubmitHandler);

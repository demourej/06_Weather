var cityForm = document.querySelector('#city-form');
var mainCard = document.getElementById('main-card');
var mainContainer = document.getElementById('main');
var mainIconContainer = document.getElementById('mainIcon');
var forecastsContainer = document.getElementById('forecasts');
var fetchButton = document.getElementById('fetch-button');
var cityInput = document.querySelector('#citySearch');
var today = moment();

//Colects and Stores City variable from City Search Form

var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = cityInput.value;

    if (city) {
        getApi(city);
        console.log(city);
    } else {
        alert('Please enter a City Name');
    }
};


// Starts the getAPI Function which fetches Open Weather APIs and populates current and forecasted weather conditions from 2 different APIs ("Current" and "OneCall" Open Weather APIs)

function getApi(city) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=afe4b1870e5995cf5760df274b74ce50&dt=1619154000&units=metric';
    console.log(requestUrl);
    console.log(cityInput);

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var cityIconCard = document.createElement('div');
            cityIconCard.classList.add("card");
            cityIconCard.classList.add("bg-info");
            cityIconCard.setAttribute('style', 'width: 15rem');
            var cityMainCard = document.createElement('div');
            cityMainCard.classList.add("card");
            cityMainCard.classList.add("bg-secondary");
            cityMainCard.setAttribute('style', 'width: 40rem');
            mainCard.append(cityIconCard);
            mainCard.append(cityMainCard);

            var cityName = document.createElement('h3');
            var cityTemp = document.createElement('p');
            var cityWind = document.createElement('p');
            var cityHumidity = document.createElement('p');
            var cityIcon = document.createElement('img');
            var breakLine = document.createElement('br');
            cityIcon.classList.add("card-img");
            cityIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
            cityIcon.setAttribute("alt", "Weather icon");
            var dateTime = data.dt;
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            cityName.textContent = (data.name + " (" + today.format("DD/MM/YYYY") + ")");
            cityTemp.textContent = ("Temp: " + data.main.temp + " ºC");
            cityWind.textContent = ("Wind: " + data.wind.speed + " m/s");
            cityHumidity.textContent = ("Humidity: " + data.main.humidity + " %");
            cityMainCard.append(breakLine);
            cityMainCard.append(cityName);
            cityMainCard.append(cityTemp);
            cityMainCard.append(cityWind);
            cityMainCard.append(cityHumidity);
            cityIconCard.append(cityIcon);
            cityName.classList.add("main-card");
            cityTemp.classList.add("main-card");
            cityWind.classList.add("main-card");
            cityHumidity.classList.add("main-card");
            cityName.classList.add("text-white");
            cityTemp.classList.add("text-white");
            cityWind.classList.add("text-white");
            cityHumidity.classList.add("text-white");
            console.log(lat);
            console.log(lon);

            var requestForecastURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=hourly,minutely&units=metric&appid=afe4b1870e5995cf5760df274b74ce50';

            fetch(requestForecastURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    var cityUVI = document.createElement('p');
                    var currentUVI = data.current.uvi;
                    var UVIValue = document.createElement('small');
                    UVIValue.textContent = (currentUVI);
                    cityUVI.textContent = ("UV Index: ");
                    cityMainCard.append(cityUVI);
                    cityUVI.append(UVIValue);
                    UVIValue.classList.add("rounded");
                    cityUVI.classList.add("main-card");
                    cityUVI.classList.add("text-white");
                    if (currentUVI < 3)  {
                        UVIValue.classList.add("bg-success");
                    } else if (currentUVI < 7) {
                        UVIValue.classList.add("bg-warning");
                    } else if (currentUVI >= 7) {
                        UVIValue.classList.add("bg-danger");
                    }
                });


            fetch(requestForecastURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    for (var i = 1; i < 6; i++) {
                        var forecastCardCol = document.createElement('div');
                        forecastCardCol.classList.add("col-sm-2");
                        var forecastCard = document.createElement('div');
                        forecastCard.classList.add("card");
                        forecastCard.classList.add("bg-info");
                        forecastCard.classList.add("text-white");
                        var forecastCardHeader = document.createElement('div');
                        forecastCardHeader.classList.add("card-header");
                        forecastCardHeader.textContent = (today.add(1, 'days').format("DD/MM/YYYY"));
                        forecastsContainer.append(forecastCardCol);
                        forecastCardCol.append(forecastCard);
                        forecastCard.append(forecastCardHeader);
                        var forecastCardBody = document.createElement('div');
                        forecastCardBody.classList.add("card-body");
                        forecastCard.append(forecastCardBody);
                        var forecastTemperature = document.createElement('p');
                        var forecastWind = document.createElement('p');
                        var forecastHumidity = document.createElement('p');
                        var forecastIcon = document.createElement('img');
                        forecastTemperature.textContent = ("Temp: " + data.daily[i].temp.day + " ºC");
                        forecastWind.textContent = ("Wind: " + data.daily[i].wind_speed + " m/s");
                        forecastHumidity.textContent = ("Humidity: " + data.daily[i].humidity + " %");
                        forecastIcon.classList.add("card-img");
                        forecastIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon
                            + "@2x.png");
                        forecastIcon.setAttribute("alt", "Weather icon");
                        forecastCardBody.append(forecastIcon);
                        forecastCardBody.append(forecastTemperature); forecastCardBody.append(forecastWind);
                        forecastCardBody.append(forecastHumidity);
                    }
                });
        });
}
cityForm.addEventListener('submit', formSubmitHandler);
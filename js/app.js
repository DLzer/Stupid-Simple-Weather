const WXURL = 'https://api.wunderground.com/';
const GEOURL = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCMxoo103kh48YCL8VFbCc5aY5-Zn9C_xk';
let weather = document.querySelector('.weather');
let yourLocation = document.querySelector('.location');
let weatherBoxContainer = document.querySelector('.weather-box-container');
let zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
let form = document.getElementById("zipForm");

// Ready, steady, locate.
document.addEventListener('DOMContentLoaded', () => {
    setInterval(Utilities.dateAndTime, 1000);
    App.init();

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js').then(function(registration) {
                // Registration was successful
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, function(err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
});


var App = {

    init : function() {
        console.log('Animated Weather Icons by: Tuan Hoang - https://codepen.io/code4food/pen/rLvggd');
        this.geoLocate();
    },

    geoLocate : function() {

        fetch(GEOURL, {method:'post'})
            .then(response => response.json())
            .then(data => {
                const LAT = data.location.lat;
                const LON = data.location.lng;
                let URL = `${WXURL}/api/9dec8582b507efb5/geolookup/forecast/q/${LAT},${LON}.json`;
                this.getWeather(URL);
            })
            .catch(error => {
                weather.innerText = error;
            });
    },

    getWeather : function(url) {
        fetch(url)
          .then(response => response.json())
          .then(data => {
            this.weatherUpdate(data);
          })
    },
    
    weatherUpdate : function(data) {
        yourLocation.innerText = data.location.city;
        // Create a new object using the API data
        var wxForecast = { 
            myForecast : [
                {
                    day : data.forecast.simpleforecast.forecastday[0].date.weekday,
                    icon : data.forecast.simpleforecast.forecastday[0].icon_url,
                    conditions : data.forecast.simpleforecast.forecastday[0].conditions,
                    high : data.forecast.simpleforecast.forecastday[0].high.fahrenheit,
                    low : data.forecast.simpleforecast.forecastday[0].low.fahrenheit,
                    forecast : data.forecast.txt_forecast.forecastday[0].fcttext
                },
                {
                    day:data.forecast.simpleforecast.forecastday[1].date.weekday,
                    icon:data.forecast.simpleforecast.forecastday[1].icon_url,
                    conditions:data.forecast.simpleforecast.forecastday[1].conditions,
                    high:data.forecast.simpleforecast.forecastday[1].high.fahrenheit,
                    low:data.forecast.simpleforecast.forecastday[1].low.fahrenheit,
                    forecast:data.forecast.txt_forecast.forecastday[2].fcttext
                },
                {
                    day:data.forecast.simpleforecast.forecastday[2].date.weekday,
                    icon:data.forecast.simpleforecast.forecastday[2].icon_url,
                    conditions:data.forecast.simpleforecast.forecastday[2].conditions,
                    high:data.forecast.simpleforecast.forecastday[2].high.fahrenheit,
                    low:data.forecast.simpleforecast.forecastday[2].low.fahrenheit,
                    forecast:data.forecast.txt_forecast.forecastday[4].fcttext
                },
                {
                    day:data.forecast.simpleforecast.forecastday[3].date.weekday,
                    icon:data.forecast.simpleforecast.forecastday[3].icon_url,
                    conditions:data.forecast.simpleforecast.forecastday[3].conditions,
                    high:data.forecast.simpleforecast.forecastday[3].high.fahrenheit,
                    low:data.forecast.simpleforecast.forecastday[3].low.fahrenheit,
                    forecast:data.forecast.txt_forecast.forecastday[6].fcttext
                }
            ]
        };
        // Loop through our object and create the DOM elements.
        for(var i= 0,  len = wxForecast.myForecast.length; i < len; i++) {
            var weatherContainer = document.createElement('div');
                weatherContainer.className = "weather-box";
            var weatherDay = document.createElement('div');
                weatherDay.className = "weather-day col-md-3";
            var titleDay = document.createElement('h4');
                titleDay.className = "weekday";
            var titleData = document.createTextNode(''+wxForecast.myForecast[i].day+'');
                titleDay.appendChild(titleData);
            var iconContainer = document.createElement('div');
                iconContainer.className = 'icon-container';
                switch (data.forecast.simpleforecast.forecastday[i].icon) {
                    case 'chanceflurries':
                    case 'chancesnow':
                    case 'flurries':
                        iconContainer.innerHTML = snowy;
                        break;
                    case 'chancerain':
                    case 'rain':
                    iconContainer.innerHTML = rainy;
                        break;
                    case 'chancesleet':
                    case 'sleet':
                    iconContainer.innerHTML = rainy;
                        break;
                    case 'chancetstorms':
                    case 'tstorms':
                    iconContainer.innerHTML = rainy;
                        break;
                    case 'clear':
                    iconContainer.innerHTML = rainbow;
                        break;
                    case 'cloudy':
                    case 'fog':
                    case 'hazy':
                    iconContainer.innerHTML = cloudy;
                        break;
                    case 'mostlysunny':
                    case 'partlysunny':
                    case 'partlycloudy':
                    case 'mostlycloudly':
                    iconContainer.innerHTML = partlycloudy;
                        break;
                    case 'sunny':
                    iconContainer.innerHTML = sunny;
                        break;
                    case 'snow':
                    iconContainer.innerHTML = snowy;
                        break;
                    default:
                        iconContainer.innerHTML = snowy;
                }
            var subtitle = document.createElement('h5');
                subtitle.className = 'subtitle';
            var subtitleData = document.createTextNode(''+wxForecast.myForecast[i].conditions+'');
                subtitle.appendChild(subtitleData);
            var temps = document.createElement('p');
                temps.className = 'temps';
            var tempsData = document.createTextNode(''+wxForecast.myForecast[i].low+' F / '+wxForecast.myForecast[i].high+' F');
                temps.appendChild(tempsData);
            var forecast = document.createElement('p');
                forecast.className = 'forecast';
            var forecastData = document.createTextNode(''+wxForecast.myForecast[i].forecast+'');
                forecast.appendChild(forecastData);
    
        
            // Append all DOM elements
            weatherContainer.appendChild(weatherDay);
            weatherDay.appendChild(titleDay);
            weatherDay.appendChild(iconContainer);
            weatherDay.appendChild(subtitle);
            weatherDay.appendChild(temps);
            weatherDay.appendChild(forecast);
            weatherBoxContainer.appendChild(weatherDay);
        }
    }
    

}

var Utilities = {

    dateAndTime : function() {

        var dateEl = document.querySelector('.date');
        var clock = document.querySelector('.clock');
    
        var months = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
          ];
          var days = [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
          ];
    
        var date = new Date();
        
        var ampm = date.getHours() < 12 
                    ? 'AM' : 'PM';
        
        var hours = date.getHours() == 0
                    ? 12
                    : date.getHours() > 12
                    ? date.getHours() - 12
                    : date.getHours();
        
        var minutes = date.getMinutes() < 10 
                    ? '0' + date.getMinutes() 
                    : date.getMinutes();
        
        var seconds = date.getSeconds() < 10 
                    ? '0' + date.getSeconds() 
                    : date.getSeconds();
        var dayOfWeek = days[date.getDay()];
        var month = months[date.getMonth()];
        var day = date.getDate();
        var year = date.getFullYear();
    
        var dateString = dayOfWeek + ', ' + month + ' ' + day + ', ' + year;
        var clockString = hours + ':' + minutes + ':' + seconds +' '+ ampm;
    
        dateEl.innerText = dateString;
        clock.innerText = clockString;
    }
}


// Prevent form from firing
function handleForm(event) { 
    event.preventDefault(); 
} 
form.addEventListener('submit', handleForm);

// Hand the manual search for a ZIP code.
function manualSearch() {

    while (weatherBoxContainer.hasChildNodes()) {   
        weatherBoxContainer.removeChild(weatherBoxContainer.firstChild);
    }

    var zipValue = document.getElementById('zipsearch').value;

    // Validate the ZIP code using a regular expression, if it password get the weather.
    if(zipCodePattern.test(zipValue)) {
        const ZIP = zipValue;
        const MANURL = `${WXURL}/api/9dec8582b507efb5/geolookup/forecast/q/${ZIP}.json`;
        App.getWeather(MANURL);
    } else {
        console.log('Incorrect Zip Code');
        return false;
    }

    form.reset();
}
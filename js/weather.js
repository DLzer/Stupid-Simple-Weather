const WXURL = 'https://api.wunderground.com/';
const GEOURL = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCMxoo103kh48YCL8VFbCc5aY5-Zn9C_xk';
let weather = document.querySelector('.weather');
let yourLocation = document.querySelector('.location');
let weatherBoxContainer = document.querySelector('.weather-box-container');
let zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
let form = document.getElementById("zipForm"); 


// Ready, steady, locate.
document.addEventListener('DOMContentLoaded', () => {
    console.log('Animated Weather Icons by: Tuan Hoang - https://codepen.io/code4food/pen/rLvggd');
    // SSL ONLY
    //if(!navigator.geolocation) {
        geoLocate();
    // } else {
    //     console.log("[Geolocation Available]");
    //     let lat = position.coords.latitude;
    //     let long = position.coords.longitude;
    //     let URL = `${WXURL}/api/9dec8582b507efb5/geolookup/forecast/q/${lat},${long}.json`;
    //     getWeather(URL);
    // }
});

// Prevent form from firing
function handleForm(event) { 
    event.preventDefault(); 
} 
form.addEventListener('submit', handleForm);

// Hand the manual search for a ZIP code.
function manualSearch() {
    // Remove all current weather nodes.
    while (weatherBoxContainer.hasChildNodes()) {   
        weatherBoxContainer.removeChild(weatherBoxContainer.firstChild);
    }

    var zipValue = document.getElementById('zipsearch').value;

    // Validate the ZIP code using a regular expression, if it password get the weather.
    if(zipCodePattern.test(zipValue)) {
        const ZIP = zipValue;
        const MANURL = `${WXURL}/api/9dec8582b507efb5/geolookup/forecast/q/${ZIP}.json`;
        getWeather(MANURL);
    } else {
        console.log('Incorrect Zip Code');
        return false;
    }

    form.reset();
}  

// Google Geolocate API using es6 promises
function geoLocate() {

    fetch(GEOURL, {method:'post'})
        .then(response => response.json())
        .then(data => {
            const LAT = data.location.lat;
            const LON = data.location.lng;
            let URL = `${WXURL}/api/9dec8582b507efb5/geolookup/forecast/q/${LAT},${LON}.json`;
            getWeather(URL);
        })
        .catch(error => {
            weather.innerText = error;
        });
    }

// call api using es6 promises
function getWeather(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        weatherUpdate(data);
      })
}  

// update screen with api data
function weatherUpdate(data) {
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
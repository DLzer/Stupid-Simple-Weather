$(document).ready(function(){
    
    $('.noLocation').hide();
    
    // If HTML5 GeoLocate is available use it for LatLong, then reverse geoCode with getZip().
    // If HTML5 GeoLocate is not available, use Google GeoLocation API for the LatLong.
    // If neither can access the user location display an error message.
    if("geolocation" in navigator) {
        console.log('Geolocation Available');
        navigator.geolocation.getCurrentPosition(function(position){
            var latLong = position.coords.latitude+','+position.coords.longitude;
            getZip(latLong);
        });
    } else if(tryGeoLocation()) {
        tryGeoLocation()
    } else {
        $('.noLocation').show();
    }

    $('#zip-submit').on('click', function(e){
        e.preventDefault();
        var zipCode = $('#zip-search').val();

            if($('.weather-row')) {
                $('.weather-row').children().remove();
            }
            if($('#intro')) {
                $('#intro').remove();
            }
            weatherCall(zipCode);
    })

    dateAndTime = () => {
        var $date = $('.date');
        var $clock = $('.clock');

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

        $date.text(dateString);
        $clock.text(clockString);
    }
    dateAndTime();
    setInterval(dateAndTime, 1000);

});

weatherCall = (zipCode) => {
                // Small validation for zip code
                if(zipCode.length === 5) {
                    // Call to weather
                        $.ajax({
                            url: 'http://api.wunderground.com/api/9dec8582b507efb5/forecast/q/'+zipCode +'.json',
                            method: 'POST',
                            data: {},
                            success: function(data) {
                                // Add a title with the zip code.
                                $('.weather-title').append('<h2 id="intro">Your Stupid Simple Weather for '+zipCode+'..</h2>');
                                // Loop through the forecasts and create a card for each one.
                                for(var i = 0, len = data.forecast.simpleforecast.forecastday.length; i < len; i++) {
                                var weatherCard = '<div class="col-sm-3 weather-card">'+
                                                  '<div class="card">'+
                                                  '<div class="card-body">'+
                                                  '<h4 class="card-title title-day">'+data.forecast.simpleforecast.forecastday[i].date.weekday+'</h4>'+
                                                  '<div class="icon-day"><img id="icon-day" src='+data.forecast.simpleforecast.forecastday[i].icon_url+'></div>'+
                                                  '<h6 class="card-subtitle mb-2 text-muted icon">'+data.forecast.simpleforecast.forecastday[i].conditions+'</h6>'+
                                                  '<p class="card-text forecast">'+data.forecast.simpleforecast.forecastday[i].high.fahrenheit+' - '+data.forecast.simpleforecast.forecastday[i].low.fahrenheit+'</p>'+
                                                  '<p class="down-arrow"><i class="fa fa-chevron-down" aria-hidden="true"></i></p>'+
                                                  '</div>'+
                                                  '</div>'+
                                                  '</div>';
                                // Append the cards to DOM.
                                $('.weather-row').append(weatherCard);
                                }
                                // Loop through the nightly forecasts and create a card for each one.
                                for(var j = 1, jlen = data.forecast.txt_forecast.forecastday.length; j < jlen; j+=2) {
                                    var nightWeather = '<div class="col-sm-3 nightCard">'+
                                                       '<div class="card">'+
                                                       '<div class="card-body nightCard-body">'+
                                                       '<h4 class="card-title title-day">'+data.forecast.txt_forecast.forecastday[j].title+'</h4>'+
                                                       '<div class="icon-day"><img id="icon-day" src="'+data.forecast.txt_forecast.forecastday[j].icon_url+'"></div>'+
                                                       '<p class="card-text night-forecast">'+data.forecast.txt_forecast.forecastday[j].fcttext+'</p>'+
                                                       '</div>'+
                                                       '</div>'+
                                                       '</div>';
                                    // Append the cards to DOM.
                                    $('.weather-row').append(nightWeather);
                                }
                                // Initially hide the night forecast cards
                                $('.nightCard').hide();
                                // Click on the down arrow to toggle displaying the night cards.
                                $('.down-arrow').on('click',function(){
                                    $(this).find('i').toggleClass('fa-chevron-down fa-chevron-up');
                                    $('.nightCard').fadeToggle();
                                })
                            }
                        })
            
                    } else {
                        // Alert variable for vaildation failure
                        var syntaxAlert = '<div class="alert alert-warning" role="alert">' +
                                          'The zip code you entered was incorrect. Please try again!' +
                                          '</div>';
                            // Validation failure, display alert for 10 seconds.
                            $('.warning').append(syntaxAlert);
                            window.setTimeout(function(){
                                $('.alert').remove();
                            }, 10000);
                    }
}

tryGeoLocation = () => {
    $.ajax({
        type: 'POST',
        url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCMxoo103kh48YCL8VFbCc5aY5-Zn9C_xk',
        data: {},
        success: function(data){
            var latLong = data.location.lat + ',' + data.location.lng;
            getZip(latLong);
            return true;
        }
    })
}

getZip = (latLong) => {
    var apiKey = 'AIzaSyAenX_pNSjYZkuxCAmOZS6tzn9jc15M8bk';
    $.ajax({
        type: 'POST',
        url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latLong+'&key='+apiKey+'',
        data: {},
        success: function(data){
            let postalCode = data.results[0].address_components.find(function (component) {
                return component.types[0] == "postal_code";
            });
            var geoZip = postalCode.long_name;
            weatherCall(geoZip);
        }
    })
}

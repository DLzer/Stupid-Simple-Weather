$(document).ready(function(){

    if(Cookies.get('zipCode')) {
        getWeather();
    }

    $('#zip-submit').on('click', function(e){
        e.preventDefault();
        // Zip code value
        var zipCode = $('#zip-search').val();
        // Checkt to see if a cookie exists.
        // If it exists, remove it and replace it with the newer input.
        if(Cookies.get('zipCode')) {
            Cookies.remove('zipCode');
            Cookies.set('zipCode', zipCode);
        }
        // If any previous cards exist, remove them.
        if($('.card')) {
            $('.card').remove();
        }
        // If any titles exist, remove them.
        if($('#intro')) {
            $('#intro').remove();
        }
        // Small validation for zip code
        if(zipCode.length === 5) {
        // Call to weather
            $.ajax({
                url: 'http://api.wunderground.com/api/9dec8582b507efb5/forecast/q/'+zipCode +'.json',
                method: 'POST',
                data: {},
                success: function(data) {
                    // Add a title with the zip code.
                    $('.weather-title').append('<h2 id="intro">Your Stupid Simple Weather for '+zipCode+'..</h2><br>');
                    // Loop through the forecasts and create a card for each one.
                    for(var i = 0, len = data.forecast.simpleforecast.forecastday.length; i < len; i++) {
                    var weatherCard = '<div class="col-sm-3">'+
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
     })
});


getWeather = () => {


            var zipCode = Cookies.get('zipCode');
            // If any previous cards exist, remove them.
            if($('.card')) {
                $('.card').remove();
            }
            // If any titles exist, remove them.
            if($('#intro')) {
                $('#intro').remove();
            }
            // Small validation for zip code
            if(zipCode.length === 5) {
            // Call to weather
                $.ajax({
                    url: 'http://api.wunderground.com/api/9dec8582b507efb5/forecast/q/'+zipCode +'.json',
                    method: 'POST',
                    data: {},
                    success: function(data) {
                        // Add a title with the zip code.
                        $('.weather-title').append('<h2 id="intro">Your Stupid Simple Weather for '+zipCode+'..</h2><br>');
                        // Loop through the forecasts and create a card for each one.
                        for(var i = 0, len = data.forecast.simpleforecast.forecastday.length; i < len; i++) {
                        var weatherCard = '<div class="col-sm-3">'+
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


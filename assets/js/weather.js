$(document).ready(function(){

    var syntaxAlert = '<div class="alert alert-warning" role="alert">' +
                        'The zip code you entered was incorrect. Please try again!' +
                        '</div>';

    $('#zip-submit').on('click', function(e){
        e.preventDefault();
        var zipCode = $('#zip-search').val();

        if($('.card')) {
            $('.card').remove();
        }
        if($('#intro')) {
            $('#intro').remove();
        }

        if(zipCode.length <= 5) {

            $.ajax({
                url: 'http://api.wunderground.com/api/9dec8582b507efb5/forecast/q/'+zipCode +'.json',
                method: 'POST',
                data: {},
                success: function(data) {
                    console.log(data);
                    $('.weather-title').append('<h1 id="intro">Your Stupid Simple Weather for '+zipCode+'..</h1><br>');
                    for(var i = 0, len = data.forecast.simpleforecast.forecastday.length; i < len; i++) {
                    var weatherCard = '<div class="col-sm-3">'+
                                    '<div class="card">'+
                                    '<div class="card-body">'+
                                    '<h4 class="card-title title-day">'+data.forecast.simpleforecast.forecastday[i].date.weekday+'</h4>'+
                                    '<div class="icon-day"><img id="icon-day" src='+data.forecast.simpleforecast.forecastday[i].icon_url+'></div>'+
                                    '<h6 class="card-subtitle mb-2 text-muted icon">'+data.forecast.simpleforecast.forecastday[i].conditions+'</h6>'+
                                    '<p class="card-text forecast">'+data.forecast.simpleforecast.forecastday[i].high.fahrenheit+' - '+data.forecast.simpleforecast.forecastday[i].low.fahrenheit+'</p>'+
                                    '</div>'+
                                    '</div>'+
                                    '</div>';
                    $('.weather-row').append(weatherCard);
                    }
                }
            })

        } else {
            $('.warning').append(syntaxAlert);
            window.setTimeout(function(){
                $('.alert').remove();
            }, 10000); //<-- Delay in milliseconds
        }
     })

});


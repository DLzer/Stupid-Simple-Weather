dateAndTime = () => {

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
dateAndTime();
setInterval(dateAndTime, 1000);
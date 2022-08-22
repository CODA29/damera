

    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=Everett&units=imperial&appid=69df7c555ec17d432047aee16c64a1d1",
    function(data){
    //console.log(data);
    var icon ="http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

    var temp = data.main.temp + " F";

    var weather = data.weather[0].main;

    $(".icon").attr("src", icon);
    $(".weather").append(weather);
    $(".temp").append(temp);
    


    
});


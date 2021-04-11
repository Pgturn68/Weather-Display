// Moment.js
var dayDate = moment().format("dddd, MMMM Do YYYY")
var dayPlusOne = moment().add(1, "days").format("ddd, MMM D");
var dayPlusTwo = moment().add(2, 'days').format('ddd, MMM D');
var dayPlusThree = moment().add(3, 'days').format('ddd, MMM D');
var dayPlusFour = moment().add(4, 'days').format('ddd, MMM D');
var dayPlusFive = moment().add(5, 'days').format('ddd, MMM D');

var cities = JSON.parse(localStorage.getItem('cities')) || [];

$("#cityName").keypress(function () {
  var _val = $("#cityName").val();
  var _txt = _val.charAt(0).toUpperCase() + _val.slice(1);
  $("#cityName").val(_txt);
})
// Today Parameters
function displayCityInfo(chosenCity) {
  $("#today").empty();
  var city = chosenCity
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ city +"&units=imperial&appid=e9b735c3398cfe4564ec31ab0eed5a07";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response)
// 5-Day Parameters             
function getFiveDayForecast (){  
  var lat = response.city.coord.lat;
  var lon = response.city.coord.lon;
  var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&appid=e9b735c3398cfe4564ec31ab0eed5a07";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
    var todayIconLink = "http://openweathermap.org/img/wn/"+ response.current.weather[0].icon +"@2x.png";
    var dayOneIconLink = "http://openweathermap.org/img/wn/"+ response.daily[0].weather[0].icon +".png";
    var dayTwoIconLink = "http://openweathermap.org/img/wn/"+ response.daily[1].weather[0].icon +".png";
    var dayThreeIconLink = "http://openweathermap.org/img/wn/"+ response.daily[2].weather[0].icon +".png";
    var dayFourIconLink = "http://openweathermap.org/img/wn/"+ response.daily[3].weather[0].icon +".png";
    var dayFiveIconLink = "http://openweathermap.org/img/wn/"+ response.daily[4].weather[0].icon +".png";

    console.log(response)
    var display= $("<div class='searched-weather pl-4 py-3'>");
    var displayCityDate = $("<h2>").text(city + ": "+ dayDate);
    display.append(displayCityDate);

    // Today Information / Styling
    var icon = $("<img class= 'float-right bg-info rounded mr-5' src="+todayIconLink+">");
      display.append(icon);
    var temp = $("<h4>").text(" Temperature: " + response.current.temp +"°F");
      display.append(temp);
    var humidity= $("<h4>").text("Humidity: "+ response.current.humidity + "%");
      display.append(humidity);
    var wind= $("<h4>").text("Wind Speed: "+ response.current.wind_speed+ " mph");
      display.append(wind);
    var uvi= $("<h4 class='d-inline-block'>U.V. index:  </h4>")
    var uviVal= $("<span id='uvi' class=' rounded ml-1 px-1 py-1'>").text(response.current.uvi);
      display.append(uvi, uviVal);
    $("#today").append(display);

    // U.V. Index Color
    if (response.current.uvi<=2){
      $("#uvi").addClass("bg-success");
    } else if (response.current.uvi<=7){
      $("#uvi").addClass("bg-warning");
    } else if(response.current.uvi<=20) {
      $("#uvi").addClass("bg-danger");
    }

    // 5-Day Information / Styling 
    $("#forecast").empty();
    var firstDay= $("<div class='forecast-container col-md-2.4 bg-light rounded px-4 mt-4 py-2 ml-3'id='day-1'>");
    var dayOneDay = $("<h6>").text(dayPlusOne);
    var dayOneIcon = $("<img src="+dayOneIconLink+">");
    var dayOneTemp= $("<p>").text(" Temp: " +response.daily[0].temp.day+"°F");
    var dayOneHumid= $("<p>").text("Humid: "+response.daily[0].humidity+ "%");
    $(firstDay).append(dayOneDay, dayOneIcon, dayOneTemp, dayOneHumid);

    var secondDay= $("<div class='forecast-container col-md-2.4 bg-light rounded px-4 mt-4 py-2 ml-4'id='day-2'>");
    var dayTwoDay = $("<h6>").text(dayPlusTwo);
    var dayTwoIcon = $("<img src="+dayTwoIconLink+">");
    var dayTwoTemp= $("<p>").text(" Temp: " +response.daily[1].temp.day+"°F");
    var dayTwoHumid= $("<p>").text("Humid: "+response.daily[1].humidity+ "%");
    $(secondDay).append(dayTwoDay, dayTwoIcon, dayTwoTemp, dayTwoHumid);

    var thirdDay= $("<div class='forecast-container col-md-2.4 bg-light rounded px-4 mt-4 py-2 ml-4'id='day-3'>");
    var dayThreeDay = $("<h6>").text(dayPlusThree);
    var dayThreeIcon = $("<img src="+dayThreeIconLink+">");
    var dayThreeTemp= $("<p>").text(" Temp: " +response.daily[2].temp.day+"°F");
    var dayThreeHumid= $("<p>").text("Humid: "+response.daily[2].humidity+ "%");
    $(thirdDay).append(dayThreeDay, dayThreeIcon, dayThreeTemp, dayThreeHumid);

    var fourthDay= $("<div class='forecast-container col-md-2.4 bg-light rounded px-4 mt-4 py-2 ml-4'id='day-4'>");
    var dayFourDay = $("<h6>").text(dayPlusFour);
    var dayFourIcon = $("<img src="+dayFourIconLink+">");
    var dayFourTemp= $("<p>").text(" Temp: " +response.daily[3].temp.day+"°F");
    var dayFourHumid= $("<p>").text("Humid: "+response.daily[3].humidity+ "%");
    $(fourthDay).append(dayFourDay, dayFourIcon, dayFourTemp, dayFourHumid);

    var fifthDay= $("<div class='forecast-container col-md-2.4 bg-light rounded px-4 mt-4 py-2 ml-4'id='day-5'>");
    var dayFiveDay = $("<h6>").text(dayPlusFive);
    var dayFiveIcon = $("<img src="+dayFiveIconLink+">");
    var dayFiveTemp= $("<p>").text(" Temp: " +response.daily[4].temp.day+"°F");
    var dayFiveHumid= $("<p>").text("Humid: "+response.daily[4].humidity+ "%");
    $(fifthDay).append(dayFiveDay, dayFiveIcon, dayFiveTemp, dayFiveHumid);

    $("#forecast").append(firstDay, secondDay, thirdDay, fourthDay, fifthDay);
  });
};

getFiveDayForecast();
          })
        }

function renderButtons() {
  $("#history").empty();
  for (var i = 0; i < cities.length; i++) {
    var a = $("<button class= 'btn-outline-info mb-1 mt-0 btn d-flex justify-content-center btn-default btn-block'>");
    a.addClass("city");
    a.attr("chosenCity", cities[i]);
    a.text(cities[i]);
    $("#history").prepend(a);
    }
  }

renderButtons();

$(document).ready(function() {
  var chosenCity = cities.pop();
  displayCityInfo(chosenCity);
})

$("#searchBtn").on("click", function(event) {
    event.preventDefault();
    var chosenCity = $("#cityName").val().trim();
  if (cities.indexOf(chosenCity)===-1){
    cities.push(chosenCity);
    localStorage.setItem("cities", JSON.stringify(cities));
    renderButtons();
  }
  displayCityInfo(chosenCity);
});

$(document).on("click", ".city", function(event) {
  event.preventDefault();
  var chosenCity = $(this).text();
  displayCityInfo(chosenCity); 
})

$("#clearList").click(function(event) {
  event.preventDefault();
  $("#history").empty();
  localStorage.clear(); 
})
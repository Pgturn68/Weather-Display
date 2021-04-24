// Moment
var dayDate = moment().format("dddd, MMMM Do YYYY")
var dayPlusOne = moment().add(1, "days").format("ddd, MMM D");
var dayPlusTwo = moment().add(2, 'days').format('ddd, MMM D');
var dayPlusThree = moment().add(3, 'days').format('ddd, MMM D');
var dayPlusFour = moment().add(4, 'days').format('ddd, MMM D');
var dayPlusFive = moment().add(5, 'days').format('ddd, MMM D');
var dayPlusSix = moment().add(6, 'days').format('ddd, MMM D');



// application variables
var cities = JSON.parse(localStorage.getItem('cities')) || [];

// event listeners
$("#cityName").keypress(handleKeyPress);
$("#clearList").click(handleClearClick);
$(document).on("click", ".city", handleCityClick);
$("#searchBtn").on("click", handleSearchClick);
$(document).ready(init);

// main
renderButtons();




// Weather 
function displayCityInfo(chooseAcity) {
  $("#today").empty();
  var city = chooseAcity
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ city +"&units=imperial&appid=f1c6d934c46c2d1b26eb5e6679298844";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(response => gotCityInfo(response,city));
}

function gotCityInfo(response,city) {
    console.log(response);
	getSixDayForecast(response,city);
}

function getSixDayForecast (response,city){  
  var lat = response.city.coord.lat;
  var lon = response.city.coord.lon;
  var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&appid=f1c6d934c46c2d1b26eb5e6679298844";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(response => gotSixDayForecast(response,city));
}

function gotSixDayForecast(response,city) {
    var todayIconLink = "http://openweathermap.org/img/wn/"+ response.current.weather[0].icon +"@2x.png";
    var dayOneIconLink = "http://openweathermap.org/img/wn/"+ response.daily[0].weather[0].icon +".png";
    var dayTwoIconLink = "http://openweathermap.org/img/wn/"+ response.daily[1].weather[0].icon +".png";
    var dayThreeIconLink = "http://openweathermap.org/img/wn/"+ response.daily[2].weather[0].icon +".png";
    var dayFourIconLink = "http://openweathermap.org/img/wn/"+ response.daily[3].weather[0].icon +".png";
    var dayFiveIconLink = "http://openweathermap.org/img/wn/"+ response.daily[4].weather[0].icon +".png";
    var daySixIconLink = "http://openweathermap.org/img/wn/"+ response.daily[4].weather[0].icon +".png";




    console.log(response)
    var display= $("<div class='searched-weather pl-3 py-3'>");
    var displayCityDate = $("<h3>").text(city + ": "+ dayDate);
    display.append(displayCityDate);

    // Forcast for Current day
    var icon = $("<img class= 'center bg-info rounded mr-3' src="+todayIconLink+">");
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

    // U.V. Colors
    if (response.current.uvi<=2){
      $("#uvi").addClass("bg-success");
    } else if (response.current.uvi<=7){
      $("#uvi").addClass("bg-warning");
    } else if(response.current.uvi<=20) {
      $("#uvi").addClass("bg-danger");
    }

    // Forcast for the next 5 days 
    $("#forecast").empty();
    
    var firstDay= $("<div class='forecast-container col-md-2 bg-info rounded Regular shadow px-4 mt-4 py-2 ml-3'id='day-1'>");
    var dayOneDay = $("<h6>").text(dayPlusOne);
    var dayOneIcon = $("<img src="+dayOneIconLink+">");
    var dayOneTemp= $("<p>").text(" Temp: " +response.daily[0].temp.day+"°F");
    var dayOneHumid= $("<p>").text("Humid: "+response.daily[0].humidity+ "%");
    $(firstDay).append(dayOneDay, dayOneIcon, dayOneTemp, dayOneHumid);
    
    var secondDay= $("<div class='forecast-container col-md-2 bg-info rounded Regular shadow px-4 mt-4 py-2 ml-4'id='day-2'>");
    var dayTwoDay = $("<h6>").text(dayPlusTwo);
    var dayTwoIcon = $("<img src="+dayTwoIconLink+">");
    var dayTwoTemp= $("<p>").text(" Temp: " +response.daily[1].temp.day+"°F");
    var dayTwoHumid= $("<p>").text("Humid: "+response.daily[1].humidity+ "%");
    $(secondDay).append(dayTwoDay, dayTwoIcon, dayTwoTemp, dayTwoHumid);

    var thirdDay= $("<div class='forecast-container col-md-2 bg-info rounded Regular shadow px-4 mt-4 py-2 ml-4'id='day-3'>");
    var dayThreeDay = $("<h6>").text(dayPlusThree);
    var dayThreeIcon = $("<img src="+dayThreeIconLink+">");
    var dayThreeTemp= $("<p>").text(" Temp: " +response.daily[2].temp.day+"°F");
    var dayThreeHumid= $("<p>").text("Humid: "+response.daily[2].humidity+ "%");
    $(thirdDay).append(dayThreeDay, dayThreeIcon, dayThreeTemp, dayThreeHumid);

    var fourthDay= $("<div class='forecast-container col-md-2 bg-info rounded Regular shadow px-4 mt-4 py-2 ml-4'id='day-4'>");
    var dayFourDay = $("<h6>").text(dayPlusFour);
    var dayFourIcon = $("<img src="+dayFourIconLink+">");
    var dayFourTemp= $("<p>").text(" Temp: " +response.daily[3].temp.day+"°F");
    var dayFourHumid= $("<p>").text("Humid: "+response.daily[3].humidity+ "%");
    $(fourthDay).append(dayFourDay, dayFourIcon, dayFourTemp, dayFourHumid);

    var fifthDay= $("<div class='forecast-container col-md-2 bg-info rounded Regular shadow px-4 mt-4 py-2 ml-4'id='day-5'>");
    var dayFiveDay = $("<h6>").text(dayPlusFive);
    var dayFiveIcon = $("<img src="+dayFiveIconLink+">");
    var dayFiveTemp= $("<p>").text(" Temp: " +response.daily[4].temp.day+"°F");
    var dayFiveHumid= $("<p>").text("Humid: "+response.daily[4].humidity+ "%");
    $(fifthDay).append(dayFiveDay, dayFiveIcon, dayFiveTemp, dayFiveHumid);

    var sixthDay= $("<div class='forecast-container col-md-2 bg-info rounded Regular shadow px-4 mt-4 py-2 ml-4'id='day-5'>");
    var daySixDay = $("<h6>").text(dayPlusSix);
    var daySixIcon = $("<img src="+daySixIconLink+">");
    var daySixTemp= $("<p>").text(" Temp: " +response.daily[5].temp.day+"°F");
    var daySixHumid= $("<p>").text("Humid: "+response.daily[5].humidity+ "%");
    $(sixthDay).append(daySixDay, daySixIcon, daySixTemp, daySixHumid);

    $("#forecast").append(firstDay, secondDay, thirdDay, fourthDay, fifthDay, sixthDay);
 }


//event handlers
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

function init() {
  var chosenCity = cities.pop();
  displayCityInfo(chosenCity);
}

function handleKeyPress() {
  var _val = $("#cityName").val();
  var _txt = _val.charAt(0).toUpperCase() + _val.slice(1);
  $("#cityName").val(_txt);
}

function handleSearchClick(event) {
    event.preventDefault();
    var chosenCity = $("#cityName").val().trim();
  if (cities.indexOf(chosenCity)===-1){
    cities.push(chosenCity);
    localStorage.setItem("cities", JSON.stringify(cities));
    renderButtons();
  }
  displayCityInfo(chosenCity);
}

function handleCityClick(event) {
  event.preventDefault();
  var chosenCity = $(this).text();
  displayCityInfo(chosenCity); 
}

function handleClearClick(event) {
  event.preventDefault();
  $("#history").empty();
  localStorage.clear(); 
}

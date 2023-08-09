function postMovies() {
  debugger
var MovieName = $("#movie-name").val();
 debugger
    // Fires an Ajax call to the URL defined in the index.js function file
 
// All URLs to the Advanced I/O function will be of the pattern: /server/{function_name}/{url_path}
$.ajax({
url: "/server/TicketBookingAIO/admin", //If your Advanced I/O function is coded in the Java environment, replace the "alien_city_function" with "AlienCityAIO"
type: "post",
contentType: "application/json",
data: JSON.stringify({
"movie-name": MovieName
}),
success: function (data) {
  debugger
alert(data.message);
},
error: function (error) {
  debugger
alert(error.message);
}
});
}





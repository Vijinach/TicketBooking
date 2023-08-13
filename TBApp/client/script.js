function postMovies() {
  debugger
var MovieName = $("#movie-name").val();
var Location = $("#location").val();
var TheatreName = $("#theatre-name").val();
var STime = $("#show-time").val();
debugger
var ShowTime = moment(STime).format("YYYY-MM-DD HH:mm:ss");
debugger
console.log(ShowTime);
debugger
var SeatCount = $("#seat-count").val();
var Amount = $("#amount").val();
 debugger
    // Fires an Ajax call to the URL defined in the index.js function file
 
// All URLs to the Advanced I/O function will be of the pattern: /server/{function_name}/{url_path}
$.ajax({
url: "/server/TicketBookingAIO/admin", //If your Advanced I/O function is coded in the Java environment, replace the "alien_city_function" with "AlienCityAIO"
type: "post",
contentType: "application/json",
data: JSON.stringify({
"movie-name": MovieName,
"location": Location,
"theatre-name": TheatreName,
"show-time": ShowTime,
"seat-count": SeatCount,
"amount": Amount
}),
success: function (data) {
  debugger
alert(data.response);
},
error: function (error) {
  debugger
alert(error.message);
}
});
}





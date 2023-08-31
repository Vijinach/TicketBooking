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
function getBookings() {
  debugger
    $.ajax({
    url: "/server/TicketBookingAIO/admin", 
    type: "GET",
    success: function (Response) {
      debugger
      var data = getRequiredBookings(Response);
      renderTable(data);
      debugger
    },
    error: function (error) {
      debugger
    alert(error.message);
    }
  });
  }
  function getRequiredBookings(Response) {
  debugger
    var i;
    var tabledata = [];
    for (i = 0; i < Response.length; i++) {
      var displayData = Response[i];
      //var displayData = JSON.parse(Response[i]);  //local
        var gulp = {
            "Movie Name": displayData.MovieName,
            "Movie ID": displayData.MovieID,
            "Total Amount": displayData.TotalAmount,
            "Booked Date": displayData.BookedDate,
            "Theatre Name": displayData.TheatreName,
            "Seat Count": displayData.SeatCount,
          }
          debugger
        tabledata.push(gulp);
    }
    debugger
    console.log(tabledata)
    return tabledata;
  }
  function renderTable(respData) {
    debugger;
    var col = [];
    for (var i = 0; i < respData.length; i++) {
        for (var key in respData[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    var table = document.createElement("table");
    table.classList.add("ca-table-view");
    table.setAttribute('id', 'dataTable');
  
    var tr = table.insertRow(-1);
  
    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
    }
    for (var i = 0; i < respData.length; i++) {
  
        tr = table.insertRow(-1);
  
        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = respData[i][col[j]];
        }
    }
    var divContainer = document.getElementById("ShowMovies");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
  }

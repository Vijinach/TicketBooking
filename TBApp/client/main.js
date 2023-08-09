function getMovies() {
debugger
  $.ajax({
  url: "/server/TicketBookingAIO/getTicket", 
  type: "GET",
  success: function (functionResponse) {
    debugger
    var data = getRequiredData(functionResponse);
    renderTable(data);
    debugger
  },
  error: function (error) {
    debugger
    console.log(error);
  alert(error.message);
  }
});
}
function getRequiredData(functionResponse) {
debugger
  var i;
  var tabledata = [];
  for (i = 0; i < functionResponse.length; i++) {
    var displayData = functionResponse[i]; //
    //var displayData = JSON.parse(functionResponse[i]);  //local
      var gulp = {
          "Movie Name": displayData.MovieName,
          "Seat Count": displayData.SeatCount,
          "Amount": displayData.Amount,
          "TheatreName": displayData.TheatreName,
          "ShowTime": displayData.ShowTime,
          "Location": displayData.Location,
        }
        debugger
     console.log(displayData.ROWID)
          gulp["<center>Book</center>"] = '<center><button onclick="showAlert(displayData.ROWID)">Book</button></center>'
      
      tabledata.push(gulp);
      }
  console.log(tabledata)
  return tabledata;
}
function showAlert(){
  debugger
}
function getBookings() {
debugger
  $.ajax({
  url: "/server/TicketBookingAIO/getBookings", 
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
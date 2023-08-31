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
     gulp["<center>Book</center>"] = `<center><a href="javascript:BookingPopup('${displayData.ROWID}','${displayData.MovieName}','${displayData.SeatCount}','${displayData.Amount}','${displayData.TheatreName}','${displayData.ShowTime}','${displayData.Location}')">Book</a></center>`,
      tabledata.push(gulp);
      }
  console.log(tabledata)
  return tabledata;
}
function BookingPopup(ROWID,MovieName,SeatCount,Amount,TheatreName,ShowTime,Location) {
  debugger;

  $("#BookingModal").modal("show");
  document.getElementById("book-btn").value = ROWID;
  document.getElementById("MovieName").innerHTML = MovieName;
  document.getElementById("SeatCount").innerHTML = SeatCount;
  document.getElementById("Amount").innerHTML = Amount;
  document.getElementById("TheatreName").innerHTML = TheatreName;
  document.getElementById("ShowTime").innerHTML = ShowTime;
  document.getElementById("Location").innerHTML = Location;
}
function pay() {
  debugger;

  const MovieID = document.getElementById("book-btn").value;
  const MovieName = document.getElementById("MovieName").textContent
  const BSeatCount = document.getElementById("BookedSeatCount").value;
  const TheatreName = document.getElementById("TheatreName").textContent;
  const Amount = document.getElementById("Amount").textContent;
  const ASeatCount = document.getElementById("SeatCount").textContent;
  const TotalAmount = parseInt(BSeatCount) *  parseInt(Amount) ;
  var date = moment();

  const BookedDate = date.format('YYYY-MM-DD');
  console.log(BookedDate); // "17/06/2022"
 
  $.ajax({
    url: "/server/TicketBookingAIO/bookTicket",
    type: "POST",
    data : JSON.stringify({
    "MovieID" : MovieID,
    "MovieName" : MovieName,
    "BookedDate" : BookedDate,
    "TotalAmount" : TotalAmount,
    "BSeatCount" : BSeatCount,
    "ASeatCount" :ASeatCount,
    "TheatreName": TheatreName,

    }),
    contentType : "application/json", 
    success: function (data) {
      debugger;
      console.log(data);
      alert(data.data);
      window.location.reload();
    },
    error: function (error) {
      debugger;
      console.log(error);
      alert(error.data);
      window.location.reload();
    },
  });
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

function logout () {
  debugger;
  //catalyst.auth.signOut(location.protocol+"//"+ location.hostname + ":3000/__catalyst/auth/login")  //local
  catalyst.auth.signOut(location.protocol+"//"+ location.hostname + "/app/") //dev
}

async function checklogin() {
  debugger;
  await catalyst.auth.isUserAuthenticated((user)=> {

  }).catch((err) => {
    alert("You are not logged in. Please login to continue. Redirecting to login page.");
    //window.location.replace(location.protocol+"//"+ location.hostname + ":3000/__catalyst/auth/login"); //local
   window.location.replace(location.protocol+"//"+ location.hostname + "/__catalyst/auth/login"); //dev
  })
}

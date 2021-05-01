var express = require("express");
var app = express();
var PORT = 3000;
var path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var currReserv = [
  {
    id: 01,
    name: "melba",
    email: "melbagmail.com",
    phone: 8331234567,
  },
];

var waitList = [
  {
    id: 06,
    name: "bilbo",
    email: "cuyobilbo@gmail.com",
    phone: 8330987654,
  },
];

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/currReserv", function (req, res) {
  return res.json(currReserv);
});

app.get("/api/waitList", function (req, res) {
  return res.json(waitList);
});

app.get("/api/tables", function (req, res) {
    return res.json({currReserv, waitList});
  });

app.get("/api/tables/:id", function (req, res) {
  var tableID = req.params.id;

  for (var i = 0; i < currReserv.length; i++) {
    if (tableID == currReserv[i].id) {
      return res.json(currReserv[i]);
    }
  }
  
  for (var i = 0; i < waitList.length; i++) {
    if (tableID == waitList[i].id) {
      return res.json(waitList[i]);
    }
  }

  return res.json(false);
});


app.post("/api/tables", function (req, res) {
  var newTable = req.body;

  if (currReserv.length >= 5) {
    waitList.push(newTable);
  } else {
    currReserv.push(newTable);
  }

  res.json(newTable);
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
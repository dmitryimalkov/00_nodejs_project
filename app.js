const fs = require("fs"); // to open and read the files
const path = require("path"); //This is needed to build the path to the html file

const express = require("express");

const app = express();

app.set("views", path.join(__dirname, "views")); // we setup the path to our template files
app.set("view engine", "ejs"); // with this we inform that we need ejs template package

app.use(express.static("public")); //this is a middleware which looks for static files like css, js, img in a public folder
app.use(express.urlencoded({ extended: false })); //this is a middleware which launch parsing data in req.body parameter

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/confirm", function (req, res) {
  res.render("confirm");
});

app.get("/recommend", function (req, res) {
  res.render("recommend");
});
// post Users Input: Parsing Form Data & Redirecting Requests
app.post("/recommend", function (req, res) {
  //  const restaurantName = req.body.name;
  const restaurant = req.body; //read data from the recommend form
  const filePath = path.join(__dirname, "data", "restaurants.json"); // with this we setup the path
  // now we have to open and read the file for this we need fs package and push data
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);
  storedRestaurants.push(restaurant);
  // now we have to save the file
  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants)); // with this we save in file data with stringify function
  // now we have to send a response
  // we will redirect the users to a different page
  res.redirect("/confirm");
});

app.get("/restaurants", function (req, res) {
  const filePath = path.join(__dirname, "data", "restaurants.json"); // with this we setup the path
  // now we have to open and read the file for this we need fs package and push data
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData); // This is an array
  res.render("restaurants", { numberOfRestaurants: storedRestaurants.length, restaurants: storedRestaurants });
});

//dynamic route
app.get('/restaurants/:id', function(req, res) {
  const restaurantId = req.params.id;
  res.render('restaurant-detail', {rid: restaurantId});
});

app.listen(3000);

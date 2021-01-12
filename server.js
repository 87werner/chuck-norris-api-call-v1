const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");

const viewsPath = path.join(__dirname, "/views");
app.set("view engine", "hbs");
app.set("views", viewsPath);

const publicDirectory = path.join(__dirname, "/public");
app.use(express.static(publicDirectory));
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get("/", async (req, res) => {
  const myApi = await axios.get("https://api.chucknorris.io/jokes/random"); // myApi hold the value of the api
  console.log(myApi.data); // only grabs the data from the api object 
  res.render("index", {
    joke: myApi.data.value // joke is now a key with the value, myApi.data is an object and we are accesing the value of ir
  });
});

app.get("/searchJoke", (req, res) => {
  res.render("searchJoke");
});

app.get("/displayJoke", async (req, res) => {
  //Method GET - accessing the variable jokeCategory from URL
  console.log( req.query.jokeCategory )
  //Method POST - accessing the variable jokeCategory from URL we dont use query, we use body
  // console.log( req.body.jokeCategory )

  const category = req.query.jokeCategory;

  try {
    const myApi = await axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`);
    res.render("displayJoke", {
        joke: myApi.data.value
});
  
} catch (error) {
  res.render("jokeNotFound");
}
});



app.get("/about", (req, res) => {
  res.render("about");
});

app.get("*", (req, res) => {
  res.send("<h1>Sorry this page doesn't exist</h1>");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

import express from "express"
import bodyParser from "body-parser"
import axios from "axios"

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

const URL = "https://api.openweathermap.org/data/2.5/weather"
const apiKey = "844affbfc8571ffff6f66306acf48171";

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let currentDate = `${day}-${month}-${year}`;
console.log(currentDate);

app.get("/",(req,res) =>{
    res.render("index.ejs");
})

app.post("/showWeather", async(req,res) =>{
const cityName = req.body.city
try {
    const response = await axios.get(`${URL}?q=${cityName}&appid=${apiKey}&units=metric`);
    res.render("weather.ejs", {
        result: response.data,
        city: cityName,
        date: currentDate
    })
} catch (error) {
    console.error("Failed to make request:", error.message)
    const errorMessage = "Oops! Something went wrong. Please try again later"
    res.render("index.ejs", {
        error: errorMessage
    })
}
})

app.listen(port, () =>{
console.log(`Server is running on ${port}`)
})

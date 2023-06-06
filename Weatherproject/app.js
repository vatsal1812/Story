const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");

const app = express();

app.use(bodyparser.urlencoded({extended:true}));

app.get("/Weatherproject", function(req, res){
    res.sendFile(__dirname + "/index.html");

});

app.post("/Weatherproject", function(req, res){


    const query = req.body.cityName; 
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=cddc3aaf9ce2a2561223e8a8436972c3&units=metric";
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const tempdata = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1> The temp in " + query +" is " + temp + "degree. </h1>");
            res.write("<p> The wheter is currently" + tempdata + "<p>");
            res.write("<img src="  + imageUrl + ">");
            res.send();
        });
    });

})


app.listen(3000, function(){
    console.log("server is running");
});
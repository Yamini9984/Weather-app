function getWeather(){

 let city = document.getElementById("city").value;

 if(city===""){
   alert("Enter city");
   return;
 }

 // Step 1: Convert city → latitude & longitude
 fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
 .then(res=>res.json())
 .then(data=>{

   if(!data.results){
     document.getElementById("result").innerHTML="City not found";
     return;
   }

   let lat = data.results[0].latitude;
   let lon = data.results[0].longitude;

   // Step 2: Get weather using lat/lon
   fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
   .then(res=>res.json())
   .then(weather=>{

     let temp = weather.current_weather.temperature;
     let wind = weather.current_weather.windspeed;

     document.getElementById("result").innerHTML = `
       <h3>${city}</h3>
       <p>Temperature: ${temp} °C</p>
       <p>Wind Speed: ${wind} km/h</p>
     `;
   });

 });

}

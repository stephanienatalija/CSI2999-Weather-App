// Weather App

const weatherForm = document.querySelector(".weatherForm"); 
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "0d303d5a477e4f3273e57520327322a9"; 

weatherForm.addEventListener("submit", async event => {
    
    event.preventDefault();
    
    const city = cityInput.value; 
    
    if(city){
        try{
            const weatherData = await getWeatherData(city); 
            displayWeatherInfo(weatherData);
        }//end try
        catch(error){
            console.error(error); 
            displayError(error); 
        }// end catch
    } // if end
    else{
        displayError("Please enter a city"); 
    } // else end
}); //end eventListener
 
async function getWeatherData(city){
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`; 
    const response = await fetch (apiUrl);
    console.log(response); 
    
    if(!response.ok){
        throw new Error ("could not fetch weather data");
    }// end of the if statement
    
    return await response.json(); 
    
} //end getWeaterData(city)

function displayWeatherInfo(data){
   
    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, Id}]} = data;
    
    card.textContent = "";
    card.style.display = "flex"; 
    
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descriptDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");
    
    
    cityDisplay.textContent = city; 
    tempDisplay.textContent = `${((temp - 273.15)*(9/5) + 32).toFixed(1)}°F`; 
    humidityDisplay.textContent = `Humidity: ${humidity}%`; 
    descriptDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(Id); 
    
    cityDisplay.classList.add("cityDisplay"); 
    tempDisplay.classList.add("tempDisplay"); 
    humidityDisplay.classList.add("humidityDisplay"); 
    descriptDisplay.classList.add("descriptDisplay");
    weatherEmoji.classList.add("weatherEmoji"); 

    card.appendChild(cityDisplay); 
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay); 
    card.appendChild(descriptDisplay); 
    card.appendChild(weatherEmoji);
     
}

function getWeatherEmoji(weatherId){
    switch(true){
            case(weatherId >= 200 && weatherId < 300):
                console.log ("⛈️");
                break; 
             case(weatherId >= 300 && weatherId <400):
                console.log ("🌧️"); 
                break;
             case(weatherId >= 500 && weatherId < 600):
                console.log ("🌧️");
                break;
            case(weatherId >= 600 && weatherId < 700):
                console.log ("🌨️"); 
                break; 
            case(weatherId >= 700 && weatherId < 800):
                console.log ("🌫️"); 
                break;
            case(weatherId === 800):
                console.log ("☀️");
                break;
            case(weatherId >= 801 && weatherId < 810):
                console.log ("⛅️");
                break;
        default: 
            console.log("Unknown Weather Condition"); 
}//end switch
} // end getWeatherEmoji
function displayError(message){
    
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay"); 
    
    card.textContent = ""; 
    card.style.display = "flex";
    card.appendChild(errorDisplay); 
    
}


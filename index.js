const yours_wtr = document.querySelector("[your-weather]");
const scr_wtr = document.querySelector("[search-weather]");
const searchbar = document.querySelector(".searchbar");
const scr_button = document.querySelector(".search-logo");
const loading = document.querySelector("loading-sceen");
const city = document.querySelector(".city");
const sky = document.querySelector(".sky");
const wtr_logo = document.querySelector(".wtr-logo");
const tempture = document.querySelector(".temp");
const wind_speed = document.querySelector(".wind-speed");
const humid = document.querySelector(".humid");
const cloud = document.querySelector(".cloud");

//variable dec
let CurrTab = yours_wtr;
CurrTab.classList.add("currTab");
//


// click handle----------------------------
yours_wtr.addEventListener("click", () => {
    changetab(yours_wtr)
});

scr_wtr.addEventListener("click", () => {
    changetab(scr_wtr)
});

// click handle done----------------------------





//-----tab change function ----------
function changetab(click) {

    if (CurrTab != click) {
        console.log("ok");
        CurrTab.classList.remove("currTab");
        CurrTab = click;
        CurrTab.classList.add("currTab");

    }
}
//-----tab change function end----------






//API Fetching and return data for filling by datafill function

async function api_call(cityname) {
    let API_key = "ac7c15cfceeae36d3ff1ed314502d3ce";

    try {
        const Api_result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_key}`);
        const weatherData = await Api_result.json();
        console.log(weatherData); //Log the weather data to see what's returned
        datafill(weatherData);// sending data to print on screen by datafill function
    } catch (e) {
        console.log(e);
    }
}
//API Fetching done




//data-filling////////------------------------

function datafill(weatherData) {
    city.innerText = weatherData?.name;
    tempture.innerText = `${((weatherData?.main?.temp) - 273.15).toFixed(2)} C`
    sky.src = `https://flagcdn.com/144x108/${weatherData?.sys?.country.toLowerCase()}.png`;
    wtr_logo.src = `http://openweathermap.org/img/w/${weatherData?.weather?.[0]?.icon}.png`
}
//data-filling-done------////////------------------------





//search bar code------------------

scr_button.addEventListener("click", () => {
    let cityname = searchbar.value;
    api_call(cityname); //calling -api
})
//search bar code end------------------



//your location temp -----------

navigator.geolocation.getCurrentPosition(showpos);
function showpos(position){
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
}
console.log(userCoordinates.lat);


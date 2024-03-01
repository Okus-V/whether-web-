const yours_wtr = document.querySelector("[your-weather]");
const scr_wtr = document.querySelector("[search-weather]");
const searchbar = document.querySelector(".searchbar");
const scr_button = document.querySelector(".search-logo");
const loading = document.querySelector(".loading-sceen");
const city = document.querySelector(".city");
const sky = document.querySelector(".sky");
const wtr_logo = document.querySelector(".wtr-logo");
const tempture = document.querySelector(".temp");
const wind_speed = document.querySelector(".wind-speed");
const humid = document.querySelector(".humid");
const cloud = document.querySelector(".cloud");
const search_section = document.querySelector(".search-section");
const your_wether_sec = document.querySelector(".your-wether");
const grantAccess_scr = document.querySelector(".grant-acess");

//variable dec
let CurrTab = yours_wtr;
CurrTab.classList.add("currTab");
let active = CurrTab;
var coordinates = sessionStorage.getItem('user_coordinates');


//

if(coordinates == null){
    grantAccess_scr.classList.add("active");
    loading.classList.remove("active");
}
else{
fetchwether();}
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
      
        CurrTab.classList.remove("currTab");
        CurrTab = click;
        CurrTab.classList.add("currTab");
        if(!search_section.classList.contains("active")){
        search_section.classList.add("active");
        your_wether_sec.classList.remove("active");
        grantAccess_scr.classList.remove("active");
        
    }
    else{
        your_wether_sec.classList.remove("active");
        search_section.classList.remove("active");
        if(coordinates == null){
            grantAccess_scr.classList.add("active");
            loading.classList.remove("active");
        }
        else{
        fetchwether();}
    }
    
        
    }
}
//-----tab change function end----------

//---------grant access button------------





//API Fetching and return data for filling by datafill function

async function api_call(cityname) {
    loading.classList.add("active");
    your_wether_sec.classList.remove("active");
    let API_key = "ac7c15cfceeae36d3ff1ed314502d3ce";

    try {
        const Api_result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_key}`);
        const weatherData = await Api_result.json();
        console.log(weatherData); //Log the weather data to see what's returned
        datafill(weatherData);// sending data to print on screen by datafill function
    } catch (e) {
        console.log(e);
    }
    loading.classList.remove("active");
    your_wether_sec.classList.add("active");
}
//API Fetching done




//data-filling////////------------------------

function datafill(weatherData) {
    your_wether_sec.classList.add("active");
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
function yourwt(){
    
navigator.geolocation.getCurrentPosition(showpos);
}

function showpos(position){
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
    sessionStorage.setItem("user_coordinates", 
    JSON.stringify(userCoordinates));
    fetchwether();
}

//calling api ---of wether----------------

async function fetchwether(){

   
    loading.classList.add("active");
    grantAccess_scr.classList.remove("active");
let usercod = sessionStorage.getItem("user_coordinates");
let codi = await JSON.parse(usercod);
let lat = codi.lat;
let lon = codi.lon;
try{
let API_key = "ac7c15cfceeae36d3ff1ed314502d3ce";
console.log(lat);
console.log(lon);
let api = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`); 
console.log(api);
let file = await api.json();

datafill(file);
console.log(file);
}
catch (e){
    alert(`fail to fetch loaction ${e}`);
}
loading.classList.remove("active");
}


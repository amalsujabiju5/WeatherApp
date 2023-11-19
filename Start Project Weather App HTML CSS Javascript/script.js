const apiKey = "PUT YOUR API KEY";
const apiUrl = "PUT YOUR URL";

// these are the things which have a changing value
const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".weather-box img");
const error404 = document.querySelector('.not-found');
const container = document.querySelector(".container");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");


async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
 const data = await response.json();
    // Check if the response contains an error message
    if (data.cod === '404') {
        container.style.height = '600px';
        weatherBox.classList.remove('active');
        weatherDetails.classList.remove('active');
        error404.classList.add('active');
        return;
    } else {
        container.style.height = '555px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');
    }

    

    // Displaying the weather details
    document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".text-humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".text-wind").innerHTML = data.wind.speed + " km/hr";
    document.querySelector(".description").innerHTML = data.weather[0].description;

    // Determine if it's nighttime
    const now = new Date();
    const sunsetTime = new Date(data.sys.sunset * 1000); // Convert to milliseconds
    const sunriseTime = new Date(data.sys.sunrise * 1000); // Convert to milliseconds

    if (now >= sunriseTime && now <= sunsetTime) {
        // It's daytime
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/cloud.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        }
        else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.png";
        }



        // Add more conditions for different weather types
    } else {
        // It's nighttime
         if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/stars_7986262.png";
        }
        else if (data.weather[0].main == "Clouds") {
        if (data.weather[0].description === "broken clouds") {
            weatherIcon.src = "images/moon.png"; // Image for broken clouds at night
        } else {
            weatherIcon.src = "images/cloudyMoon.png"; // Default cloud image at night
        }
    }
         else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rainyNight.png";
        }
         else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snowNight.png";
        }
        else if (data.weather[0].main == "Wind") {
            weatherIcon.src = "images/windyMoon.png";
        }

        console.log(data);
    }
    }


searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

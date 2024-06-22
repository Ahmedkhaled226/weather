async function getWeather(city = 'cairo') {
    try {
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=01650505bf9c46e6bf1184502241906&q=${city}&days=3`);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        let data = await response.json();
        displayData(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please try again later.');
    }
}

function displayData(data) {
    let cartona = "";
    for (let i = 0; i < data.forecast.forecastday.length; i++) {
        let forecast = data.forecast.forecastday[i];
        let date = new Date(forecast.date);
        let dayOfWeek = getDayOfWeek(date.getDay());
        let dayOfMonth = date.getDate();
        let month = getMonthName(date.getMonth());
        let city = data.location.name;
        let temperature = forecast.day.maxtemp_c;
        let condition = forecast.day.condition.text;
        let icon = forecast.day.condition.icon;
        let rainChance = forecast.day.daily_chance_of_rain;
        let windSpeed = forecast.day.maxwind_kph;
        let windDirection = forecast.day.wind_dir;
        if (i == 0) {
            cartona += `
            <div class="today forecast">
                <div class="forecast-header" id="today">
                    <div class="date">${dayOfMonth} ${month}</div>
                    <div class="day">${dayOfWeek}</div>
                </div> <!-- .forecast-header -->
                <div class="forecast-content" id="current">
                    <div class="location">${city}</div>
                    <div class="degree">
                        <div class="num">${temperature}<sup>o</sup>C</div>
                        <div class="forecast-icon">
                            <img src="https:${icon}" alt="weather icon" width="90">
                        </div>
                    </div>
                    <div class="custom"> ${condition}</div>
                    <span><img src="https://routeweather.netlify.app/images/icon-umberella@2x.png" alt=""
                            width="21" height="21"> ${rainChance}%</span>
                    <span><img src="https://routeweather.netlify.app/images/icon-wind@2x.png" alt="" width="23"
                            height="21"> ${windSpeed} km/h</span>
                    <span><img src="https://routeweather.netlify.app/images/icon-compass@2x.png" alt=""
                            width="21" height="21"> west</span>
                </div>
            </div>
            `;
        } else {
            cartona += `
           <div class="forecast">
        <div class="forecast-header">
            <div class="day">${dayOfWeek}</div>
        </div> <!-- .forecast-header -->
        <div class="forecast-content">
            <div class="forecast-icon">
                <img src="https:${icon}" alt="" width="48">
            </div>
            <div class="degree">${temperature}<sup>o</sup>C</div>
            <small>27.3<sup>o</sup></small>
            <div class="custom">${condition}</div>
              <span><img src="https://routeweather.netlify.app/images/icon-umberella@2x.png" alt=""
                            width="21" height="21"> ${rainChance}%</span>
                    <span><img src="https://routeweather.netlify.app/images/icon-wind@2x.png" alt="" width="23"
                            height="21"> ${windSpeed} km/h</span>
                    <span><img src="https://routeweather.netlify.app/images/icon-compass@2x.png" alt=""
                            width="21" height="21"> west</span>
        </div>
        </div>
            `;
        }
    }
    document.getElementById("forecast").innerHTML = cartona;
}

function getDayOfWeek(dayIndex) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[dayIndex];
}

function getMonthName(monthIndex) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthIndex];
}

let submit = document.getElementById('submit');
let search = document.getElementById('search');

submit.addEventListener('click', function () {
    let city = search.value;
    getWeather(city);
});

getWeather();

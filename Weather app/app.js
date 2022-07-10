let city = document.getElementById("city");
let tDate = document.getElementById("date");
let tTime = document.getElementById("time");
let sunrise = document.getElementById("sunrise");
let sunset = document.getElementById("sunset");
let current_temp = document.getElementById("current_temp");
let climate_icon = document.getElementById("climate_icon");
let desc = document.getElementById("desc");
let flike = document.getElementById("feels_like");
let humid = document.getElementById("humidity");
let press = document.getElementById("pressure");
let sp = document.getElementById("speed");
let wind_direction = document.getElementById("wind-direction");
let cloud = document.getElementById("clouds");
let todays_temp = document.getElementsByClassName("todays_temp")[0];
let cards = document.getElementsByClassName("cards")[0];
let city_name = "Mumbai";

fetchData();
setInterval(updateTime, 1000);

async function fetchData() {
  const API_KEY = "c7e1edf6d2fea9138cf190cb96111c9d";
  const url =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city_name +
    "&appid=" +
    API_KEY;
  const data = await (await fetch(url)).json();
  showData(data);

  const url2 =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city_name +
    "&appid=" +
    API_KEY;
  const current_data = await (await fetch(url2)).json();
  showCurrentWeather(current_data);
}
function updateTime() {
  let t = new Date();
  let timeOfDay = t.getHours() < 12 ? "AM" : "PM";
  let t_hour = t.getHours(),
    t_min = t.getMinutes(),
    t_sec = t.getSeconds();
  t_hour = t_hour > 12 ? t_hour - 12 : t_hour;
  t_hour = t_hour == 0 ? 12 : t_hour;
  t_hour = (t_hour < 10 ? "0" : "") + t_hour;
  t_min = (t_min < 10 ? "0" : "") + t_min;
  t_sec = (t_sec < 10 ? "0" : "") + t_sec;
  tTime.innerHTML = `${t_hour}:${t_min}:${t_sec} ${timeOfDay}`;
  tDate.innerHTML = `[${t.toDateString()}]`;
}
function changeLocation(elem) {
  city_name = elem.value;
  fetchData();
}
function showCurrentWeather(current_data) {
  let { speed, deg } = current_data.wind;
  let { temp, feels_like, humidity, pressure } = current_data.main;
  let clouds = current_data.clouds.all;
  climate_icon.src = `http://openweathermap.org/img/wn/${current_data.weather[0].icon}@2x.png`;
  desc.innerText = current_data.weather[0].description;
  current_temp.innerText = Math.round(temp - 273.15) + "℃";
  flike.innerText = Math.round(feels_like - 273.15) + "℃";
  humid.innerText = humidity + "%";
  press.innerText = pressure + " hPa";
  sp.innerText = speed + " m/s";
  wind_direction.innerText = deg + " °";
  cloud.innerText = clouds + "%";
}
function showData(data) {
  city.innerText = data.city.name;
  sunrise.innerText = new Date(data.city.sunrise * 1000).toLocaleTimeString();
  sunset.innerText = new Date(data.city.sunset * 1000).toLocaleTimeString();
  data.list.forEach((element) => {
    let [day, month, date, year, time] = new Date(element.dt * 1000)
      .toString()
      .split(" ");
    let { temp, pressure, humidity } = element.main;
    let { icon } = element.weather[0];
    let today = new Date();
    date == today.getDate()
      ? (day = "Today")
      : (today.setTime(today.getTime() + 24 * 3600000),
        date == today.getDate() ? (day = "Tomorrow") : "");

    let card = `<div class="card jc-between">
                    <div>
                      <span class="b day">${day}</span>
                      <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="climate" width="86" />
                      <div class="center">
                        <img src="images/pressure.png" alt="Pressure" width="24" />
                        <span class="w-80">${pressure} hPa</span>
                      </div>
                    </div>
                    <div class="center col g">
                      <span class="b">${time.substring(0, 5)}</span>
                      <div class="center">
                        <img src="images/temperature.png" alt="Temperature" width="32" />
                        <span>${Math.round(temp - 273.15)}℃</span>
                      </div>
                      <div class="center">
                        <img src="images/humidity.png" alt="Humidity" width="24" />
                        <span>${humidity}%</span>
                      </div>
                    </div>
                  </div>`;
    cards.innerHTML += card;
  });
}

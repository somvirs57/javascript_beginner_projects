const widget = document.querySelector('.main-box');
const city = document.querySelector('.city');
const date = document.querySelector('.date');
const cel = document.querySelector('.cel');
const winfo = document.querySelector('.w-info');
const wicon = document.querySelector('.wicon');
const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');
const searchSelf = document.querySelector('.search-self');
const errText = document.querySelector('.err-txt');

const WeatherApi = '4a2e3b074988d379d7ffc15391cfc8d3';
const revGeoApi = 'pk.0e04b54883419407702c409bb8cc71b2';

const convertKelvin = function (temp) {
  const number = parseFloat(temp);
  return number - 273.15;
};

const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};
const today = new Date();

const getCityWeather = async function (input) {
  errText.textContent = '';
  date.textContent = today.toLocaleDateString('en-UK', dateOptions);
  try {
    const base = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${WeatherApi}`;
    const data = await fetch(base);
    if (data.status === 404) throw new Error('Invalid City');
    const dat = await data.json();
    //   console.log(dat);

    widget.classList.remove('hidden');

    city.textContent = dat.name + ', ' + dat.sys['country'];
    cel.textContent = Math.floor(convertKelvin(dat.main['temp']));
    winfo.textContent = dat.weather[0]['description'];

    const iconcode = dat.weather[0]['icon'];
    const iconUrl = `http://openweathermap.org/img/w/${iconcode}.png`;
    wicon.src = iconUrl;
  } catch (err) {
    widget.classList.add('hidden');
    errText.textContent = err.message;
  }
};


searchBtn.addEventListener('click', function () {
  const cityQuery = cityInput.value;

  getCityWeather(cityQuery);
});

cityInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    // console.log('enter pressed');
    searchBtn.click();
  }
});

const reverseGeo = async function (lat, lon) {
  //   console.log(lat, lon);
  const revgeo = `https://us1.locationiq.com/v1/reverse.php?key=${revGeoApi}&lat=${lat}&lon=${lon}&format=json`;
  console.log(revgeo);
  const res = await fetch(revgeo);
  const data = await res.json();
  const town = data.address.city;
  console.log(data);
  getCityWeather(town);
};

searchSelf.addEventListener('click', function () {
  navigator.geolocation.getCurrentPosition(pos => {
    cityInput.value = '';
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    reverseGeo(lat, lon);
  });
});

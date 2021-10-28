const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const icon = document.querySelector(".icon img");
const time = document.querySelector("img.time");
const local = document.querySelector(".local");
const updateUI = (data) => {
  const cityDetails = data.cityDetails;
  const cityWeather = data.cityWeather;
  //We can also destructure here for clean code
  //const {cityDetails, cityWeather} = data;
  localStorage.setItem("name", cityDetails.EnglishName);
  localStorage.setItem("temp", cityWeather.Temperature.Metric.Value);
  console.log(cityDetails);
  console.log(cityWeather);
  const localname = localStorage.name;
  const localtemp = localStorage.temp;
  //   const w = localStorage.weather;

  local.innerHTML = `
      <h5 class="local-in">last city searched was ${localname} with ${localtemp}°C</h5>
      `;
  details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${cityWeather.WeatherText}</div>
        <div class="display-4 my-4">
        <span>${cityWeather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
        </div>
    `;
  const iconSrc = `img/icons/${cityWeather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let imgTimeSrc = null;
  if (cityWeather.IsDayTime) {
    imgTimeSrc = "img/day.svg";
  } else {
    imgTimeSrc = "img/night.svg";
  }
  time.setAttribute("src", imgTimeSrc);

  // let imgTimeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
  // time.setAttribute('src', imgTimeSrc);

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};
if (localStorage.length != 0) {
  const localname = localStorage.name;
  const localtemp = localStorage.temp;
  //   const w = localStorage.weather;
  local.innerHTML = `
    <h5 class="efg">last city searched was ${localname} with ${localtemp}°C</h5>
    `;
}
const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const cityWeather = await getWeather(cityDetails.Key);

  return {
    // cityInfo : cityDetails,
    // weather : cityWeather
    // we can use object shorthand notation too if both key and value are same
    cityDetails,
    cityWeather,
  };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();

  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
});

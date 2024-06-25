// API Key
const APIKey = "03074eea385fd51c53a36d9ba0c9b4ab";
function handleSearchSubmit(event){
  event.preventDefault()
  const searchInput=document.querySelector("#search-input")
  if (!searchInput.value)
    return 
  const city=searchInput.value
  fetchWeather(city)
  searchInput.value=""
}
function fetchWeather(city){
  const apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${APIKey}&q=${city}&units=imperial`;
  fetch(apiUrlWeather).then(res=>res.json())
  .then(data=>{
    console.log(data);
    displayCurrentWeather(data)
    const {lat,lon}=data.coord
    const apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;
    fetch(apiUrlForecast).then(res=>res.json())
    .then(data=>{
      console.log(data);
    })
  })
}

function displayCurrentWeather(data){
document.querySelector("#name").textContent=data.name
document.querySelector("#date").textContent=dayjs.unix(data.dt).format("MM/DD/YYYY")
const iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
document.querySelector("#icon").src=iconUrl
document.querySelector("#temp").textContent=Math.round(data.main.temp)+"F"
document.querySelector("#humidity").textContent=data.main.humidity+"%"
document.querySelector("#wind").textContent=data.wind.speed+" mph"

}

function displayForcast(data){
  const forcastEl=document.querySelector("#forcast")
  for(let i=0; i<data.list.length; i+=8){
    const card=document.createElement("div")
  const dateEl=document.createElement("h3")
  dateEl.textContent=dayjs.unix(data.list[i].dt).format("MM/DD/YYYY")
  }
}


document.querySelector('form').addEventListener('submit',handleSearchSubmit)


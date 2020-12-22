import axios from 'axios'
import React,{useEffect, useState} from 'react'

const Weather = (props) => {

const [newWeather, setNewWeather] = useState({
      loc: '',
      temp: '',
      icon: '',
      windspeed: '',
      winddirection: ''
})

const url = "http://api.weatherstack.com/current?access_key="+props.apikey+"&query="+props.loc
  
  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        const data = response.data
        setNewWeather({
            loc: data.location.name,
            temp: data.current.temperature,
            icon: data.current.weather_icons[0],
            windspeed: data.current.wind_speed,
            winddirection: data.current.wind_dir 
        })
      })
    },[url]) // fire only when url changed

    console.log(newWeather)
      
  return(
    <div>
        <h2>Weather in {newWeather.loc}</h2>
        <div><b>temperature: </b>{newWeather.temp} Celsius</div>
        <div><img width="10%" height="10%" src={newWeather.icon} alt=""></img></div>
        <div><b>wind: </b>{newWeather.windspeed} mph direction {newWeather.winddirection}</div>
    </div>
  )    
}

export default Weather
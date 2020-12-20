import React, { useState } from 'react'

const api = {
  key: '9c3d988f28798b8531c0a84f67e38eb5',
  base: 'https://api.openweathermap.org/data/2.5/'
}

const App = () => {

  const [ query, setQuery ] = useState('')
  const [ weather, setWeather ] = useState({})

  const getFullDate = (d) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const day = days[d.getDay()]
    const date = d.getDate()
    const month = months[d.getMonth()]
    const year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }

  const getWeather = (e) => {
    if (e.key === 'Enter') {
      fetch(`${ api.base }weather?q=${ query }&units=metric&appid=${ api.key }`)
        .then(response => response.json())
        .then(result => {
          setWeather(result)
          setQuery('')
        })
    }
  }

  return (
    <div className={ (typeof weather.main !== 'undefined') && (weather.main.temp < 20) ? 'app' : 'app warm' }>
      <div className="search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          value={ query }
          onChange={ (e) => setQuery(e.target.value) }
          onKeyPress={ getWeather }
        />
      </div>
      { (typeof weather.main !== 'undefined') ? (
      <React.Fragment>
        <div className="location-box">
          <div className="location-city">{ weather.name }, { weather.sys.country }</div>
          <div className="location-date">{ getFullDate(new Date()) }</div>
        </div>
        <div className="weather-box">
          <div className="weather-temp">{ Math.floor(weather.main.temp) }&#176;</div>
          <div className="weather-note">{ weather.weather[0].main }</div>
        </div>
      </React.Fragment>
      ) : (<span>Search your city</span>) }
    </div>
  )
}

export default App
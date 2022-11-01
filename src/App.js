import React, { useState } from "react";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=0e34fc5d8a80478667f6e03f5872cbb4
`;

  const search = async (event) => {
    if (event.key === "Enter") {
      await fetch(url)
        .then((res) => res.json())
        .then((response) => {
          setData(response);
          console.log(response);
        });
      setLocation("");
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="search">
          <input
            value={location}
            onKeyPress={search}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Enter Location"
          />
        </div>
        <div className="top">
          <div className="city">
            <h2>{data.name}</h2>
          </div>
          <div className="degree">
            {data.main ? <h2>{data.main.temp.toFixed()}°C</h2> : null}
          </div>
          <div className="cloud">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.main !== undefined && (
          <div className="bottom">
            <div className="feels">
              <p>Feels like</p>
              {data.main ? <p>{data.main.feels_like.toFixed()}°C</p> : null}
            </div>
            <div className="humidity">
              <p>Humidity</p>
              {data.main ? <p>{data.main.humidity}°</p> : null}
            </div>
            <div className="wind">
              <p>Wind</p>
              {data.wind ? <p>{data.wind.speed.toFixed()} MPH</p> : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

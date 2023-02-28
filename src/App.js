import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = { weather: {} };

  /* all this does it get me the data */
  async componentDidMount() {
    const success = async ({ coords }) => {
      console.log(coords);
      const { latitude: lat, longitude: lon } = coords;

      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=17a3e02a9cc47ed1eac90bc2f9c0012a`
      );

      this.setState({ weather: data });
    };

    const error = () => {};

    navigator.geolocation.getCurrentPosition(success, error);
  }

  render() {
    console.log(this.state);

    const { list } = this.state.weather;

    if (!list) {
      return <div className="loader"></div>;
    }

    return (
      <>
        {list.map((item) => {
          return (
            <div
              className={
                item.main.temp < 280 ? "weatherItem cold" : "weatherItem"
              }
            >
              <h1>{new Date(item.dt * 1000).toLocaleString()}</h1>
              <p>{Math.round(item.main.temp - 273.15)}c</p>
            </div>
          );
        })}
      </>
    );
  }
}

export default App;

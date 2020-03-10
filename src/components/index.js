import React, { Component } from "react";
import "./styles.css";
import WeatherIcon from "react-icons-weather";
import axios from "axios";

const asyncFunc = () => {
  return new Promise(resolve => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(location => {
        setTimeout(() => resolve(location.coords), 600);
      });
    } else {
      alert(
        "I'm sorry, but geolocation services are not supported by your browser."
      );
    }
  });
};

export default class Wheater extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      location: "",
      locate: "",
      temperature: "",
      _temp: "",
      _tempInitial: "",
      simbol: "°F",
      calculada: false
    };
  }

  UNSAFE_componentWillMount = async () => {
    const location = await asyncFunc();
    this.setState({ location: location });

    const proxy = "https://cors-anywhere.herokuapp.com/";
    let myKey = "a1fd0337efdabfc77432bb7566663861";
    const api = `${proxy}https://api.darksky.net/forecast/${myKey}/${this.state.location.latitude},${this.state.location.longitude}`;
    const response = await axios.get(api);
    // console.log(response.data);
    this.setState({
      locate: response.data,
      temperature: response.data.currently,
      _tempInitial: response.data.currently.temperature,
      _temp: response.data.currently.temperature
    });
  };

  componentDidMount = async () => {
    this.state.loading = false;
  };

  handleClick() {
    if (!this.state.calculada) {
      let celsius = (this.state._temp - 32) * (5 / 9);
      this.setState({
        simbol: "°C",
        _temp: Math.floor(celsius),
        calculada: true
      });
    } else {
      this.setState({
        simbol: "°F",
        _temp: this.state._tempInitial,
        calculada: false
      });
    }
  }

  render() {
    if (this.state.loading === true) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      );
    }
    return (
      <header className="App-header">
        <div className="location">
          <h1 className="timezone-location">{this.state.locate.timezone}</h1>
          <WeatherIcon
            name="darksky"
            iconId={
              this.state.temperature.icon
                ? this.state.temperature.icon
                : "clear-day"
            }
            flip="horizontal"
            rotate="90"
          />
        </div>
        <div className="temperature">
          <div className="degree-section">
            <h2
              className="temperature-degree"
              onClick={() => this.handleClick()}
            >
              {this.state._temp}
            </h2>
            <span>{this.state.simbol}</span>
          </div>
          <div className="temperature-description">
            {this.state.temperature.summary}
          </div>
        </div>
      </header>
    );
  }
}

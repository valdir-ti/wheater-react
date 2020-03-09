import React, { Component } from "react";
import "./styles.css";
import { WiNightAltCloudy } from "react-icons/wi";
// import api from "../services/api";
import axios from "axios";

export default class Wheater extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      long: "",
      temperatureDescription: "",
      temperatureDegree: "",
      timezoneLocation: "",
      degreeSection: "",
      degreeSpan: "",
      api: "",
      proxy: "",
      proxy: ""
    };
  }

  async handlePosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(location => {
        this.setState({
          lat: location.coords.latitude,
          long: location.coords.longitude
        });

        // const proxy = "https://cors-anywhere.herokuapp.com/";
        // let myKey = "a1fd0337efdabfc77432bb7566663861";
        // const api = `${proxy}https://api.darksky.net/forecast/${myKey}/${location.coords.latitude},${location.coords.longitude}`;

        // const response = axios.get(api);
        // console.log("Response", response);
      });
    } else {
      alert(
        "I'm sorry, but geolocation services are not supported by your browser."
      );
    }
  }

  async buscaAPI() {
    // const proxy = "https://cors-anywhere.herokuapp.com/";
    // let myKey = "a1fd0337efdabfc77432bb7566663861";
    // const api = `${proxy}https://api.darksky.net/forecast/${myKey}/${this.state.lat},${this.state.long}`;
    // const response = await axios.get(api);

    console.log("Response", this.state);
  }

  componentDidMount() {
    this.handlePosition();
    // this.buscaAPI();
  }

  render() {
    return (
      <header className="App-header">
        <div className="location">
          <h1 className="timezone-location">
            Timezone <WiNightAltCloudy />
          </h1>
        </div>
        <div className="temperature">
          <div className="degree-section">
            <h2 className="temperature-degree">34</h2>
            <span>°F</span>
          </div>
          <div className="temperature-description">Temperatura descrição</div>
        </div>
      </header>
    );
  }
}

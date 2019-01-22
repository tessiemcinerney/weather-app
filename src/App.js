import React, { Component } from 'react';
import {
    BrowserRouter,
    Route
} from 'react-router-dom';
import Search from './Search';
import Header from './Header';
import Weather from "./Weather";
import DailyDetails from "./DailyDetails";

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zip: undefined,
            city: undefined,
            forecast: undefined,
            error: undefined
        }

        this.getWeather = this.getWeather.bind(this);
        this.fetchWeather = this.fetchWeather.bind(this);
    }

    fetchWeather = async(zipCode) => {
        if(zipCode) {
            const apiKey = process.env.REACT_APP_API_KEY;
            const weatherForecast = `http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&units=imperial&appid=${apiKey}`;

            try {
                const apiCall = await fetch(weatherForecast); //fetch weather data
                const response = await apiCall.json(); //save response

                const cityName = response.city.name;
                const forecastData = response.list;

                //filter through forecast data and create hashmap of data per day
                let weatherData = {};
                forecastData.forEach(function(data) {
                    const date = data.dt_txt.split(" ")[0];
                    const humidity = data.main.humidity;
                    const minTemp = data.main.temp_min;
                    const maxTemp = data.main.temp_max;
                    const dailyData = {
                        date: date,
                        humidity: humidity,
                        minTemp: minTemp,
                        maxTemp: maxTemp
                    };

                    //calculate averages
                    if(weatherData[date]){
                        dailyData.humidity = (weatherData[date].humidity + humidity) / 2;
                        dailyData.minTemp = Math.min(weatherData[date].minTemp, minTemp);
                        dailyData.maxTemp = Math.max(weatherData[date].maxTemp, maxTemp);
                    }

                    weatherData[date] = dailyData;
                });

                //array of objects containing data for each day
                let weatherDetails = [];
                for (var day in weatherData) {
                    weatherDetails.push(weatherData[day]);
                }

                //update state
                this.setState({
                    zip: zipCode,
                    city: cityName,
                    data: weatherDetails,
                    forecast: forecastData,
                    error: ""
                });
            } catch (e) {
                this.setState({
                    error: "Invalid Search - Please Try Again"
                })
            }
        }
    }

    getWeather = async (e) => {
        e.preventDefault(); //prevent default page refresh
        this.fetchWeather(e.target.elements.zip.value);
    }

    render() {
        return (
            <BrowserRouter>
              <div className="App">
                <Header />

                <Route exact path='/' render={() => {
                    return (
                        <div>
                            <Search getWeather={this.getWeather}/>
                            <Weather city={this.state.city} zipCode={this.state.zip} data={this.state.data} fetchWeather={this.fetchWeather}/>
                            {this.state.error && <h2>{this.state.error}</h2>}
                        </div>
                    );
                }} />
                <Route path='/:date/details' render={(props) => {
                    return <DailyDetails {...props} forecast={this.state.forecast}/>
                }} />
              </div>
            </BrowserRouter>
        );
    }
}

export default App;

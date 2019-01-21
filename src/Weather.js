import React, {Component} from 'react';
import {
    Link
} from 'react-router-dom';
import PropTypes from 'prop-types';

class Weather extends Component {
    
    async componentDidMount() {
        //fetch weather update every 5 minutes
        try {
            setInterval(async () => {
                this.props.fetchWeather(0);
            }, 300000);
        } catch(e) {
            console.log(e);
        }
    }

    render() {
        if(this.props.city) {
            return (
                <div>
				<h3 className="forecast-header">5 Day Forecast for {this.props.city}</h3>
                <div className="five-day-forecast">
                    {this.props.data.map(function(detail) {
                        const linkRoute = '/' + detail.date + '/details';
                        return <div className='day-detail' key={detail.date}>
                            <h4>{detail.date}</h4>
                            <div className="details">
                                <div>Max Temp: {(detail.maxTemp).toFixed(0)}</div>
                                <div>Min Temp: {(detail.minTemp).toFixed(0)}</div>
                                <div>Humidity: {(detail.humidity).toFixed(0)}</div>
                            </div>
                            <Link to={linkRoute} style={{ textDecoration: 'none' }}>
                                <button>More Details</button>
                            </Link>
                        </div>;
                    })}
                </div>
                </div>
            );
        }

        return null;
    }
}

Weather.propTypes = {
    city: PropTypes.string,
    zipCode: PropTypes.string,
    data: PropTypes.array,
    fetchWeather: PropTypes.func

}

export default Weather;
import React, {Component} from 'react';
import {
    Link
} from 'react-router-dom';
import PropTypes from 'prop-types';
import Table from './Table';

class DailyDetails extends Component {
    render() {
        const date = this.props.match.params.date;
        return (
            <div>
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <button>Back to 5 day forecast</button>
                </Link>
                <h3>Weather Report for {date}</h3>
                <table>
                <tbody>
                    <tr>
                        <th>Time</th>
                        <th>Max Temp</th>
                        <th>Min Temp</th>
                        <th>Humidity</th>
                        <th>Cloudy</th>
                        <th>Wind Speed</th>
                        <th>Description</th>

                    </tr>
                    {
                        this.props.forecast.filter(function(data) {
                            return data.dt_txt.includes(date);
                        }).map(function(daysData) {
                            return <Table key={daysData.dt_txt} data={daysData}/>;
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

DailyDetails.propTypes = {
    forecast: PropTypes.array.isRequired
}

export default DailyDetails;
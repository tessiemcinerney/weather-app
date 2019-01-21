import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Table extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.data.dt_txt.split(" ")[1]}</td>
                <td>{(this.props.data.main.temp_max).toFixed(0)}</td>
                <td>{(this.props.data.main.temp_min).toFixed(0)}</td>
                <td>{(this.props.data.main.humidity).toFixed(0)}</td>
                <td>{this.props.data.clouds.all}</td>
                <td>{this.props.data.wind.speed}</td>
                <td>{this.props.data.weather[0].main}</td>
            </tr>
        );
    }
}

Table.propTypes = {
    data: PropTypes.object.isRequired
}

export default Table;
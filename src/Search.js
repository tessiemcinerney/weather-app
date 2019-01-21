import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
	render() {
    	return (
        	<form onSubmit={this.props.getWeather}>
            	<input type="text" name="zip" placeholder="Zip Code" />
            	<button className="submit">Get Weather</button>
        	</form>
    	)
	}
}

Search.propTypes = {
	getWeather: PropTypes.func.isRequired
}

export default Search;
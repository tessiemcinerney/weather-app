import React, {Component} from 'react';

class Header extends Component {
    render() {
        return (
            <div className="header">
            	<div className="header-text">
					<h1 className="title">Weather App</h1>
					<p>Search for weather by Zip Code</p>
				</div>
			</div>
        );
    }
}

export default Header;
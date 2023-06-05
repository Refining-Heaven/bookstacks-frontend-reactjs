import { Component } from 'react';
import { connect } from 'react-redux';
import './Header.scss';
import Options from "./Options/Options";
import SearchBar from "./SearchBar/SearchBar";

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			<div className="header-container">
				<div className="header-content">
					<div className="left-content">
						<div className="logo"></div>
					</div>
					<div className="center-content">
						<div className="search-bar">
							<SearchBar />
						</div>
					</div>
					<div className="right-content">
						<Options />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

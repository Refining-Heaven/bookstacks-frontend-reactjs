import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, PATH } from '../../../utils'
import * as actions from '../../../store/actions'
import Options from "./Options/Options";
import SearchBar from "./SearchBar/SearchBar";
import './Header.scss';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	handleToHomePage = () => {
		window.location.assign(PATH.HOME)
	}

	render() {
		return (
			<div className="header-container">
				<div className="header-content">
					<div className="left-content"  onClick={() => this.props.handleCloseOptionsMenu()}>
						<div className="logo" onClick={() => this.handleToHomePage()}>

						</div>
					</div>
					<div className="center-content"  onClick={() => this.props.handleCloseOptionsMenu()}>
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
		handleCloseOptionsMenu: () => dispatch(actions.handleCloseOptionsMenu()),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

import { Component } from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { withRouter, PATH, THEMES } from '../../../utils';
import * as actions from '../../../store/actions';
import Options from './Options/Options';
import SearchBar from './SearchBar/SearchBar';
import images from '../../../assets/images';
import './Header.scss';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleToHomePage = () => {
		window.location.assign(PATH.HOME);
	};

	render() {
		const { theme } = this.props;
		return (
			<div className={theme === THEMES.LIGHT ? 'header-container' : 'header-container dark-mode'}>
				<div className="header-content">
					<div className="left-content" onClick={() => this.props.handleCloseOptionsMenu()}>
						<div className="logo" onClick={() => this.handleToHomePage()}>
							<img src={images.logo} alt="" />
						</div>
					</div>
					<div className="center-content" onClick={() => this.props.handleCloseOptionsMenu()}>
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
		theme: state.app.theme,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleCloseOptionsMenu: () => dispatch(actions.handleCloseOptionsMenu()),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

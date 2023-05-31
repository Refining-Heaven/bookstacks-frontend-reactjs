import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from "react-intl";
import { PATH, OPTIONS_MENU, USER_OPTIONS_MENU } from '../../../utils';
import OptionsMenu from './OptionsMenu/OptionsMenu';
import * as actions from '../../../store/actions';
import './Header.scss';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentOptionMenu: ''
		};
	}

	componentDidMount() {
		if (this.props.isLoggedIn) {
			this.setState({
				currentOptionMenu: USER_OPTIONS_MENU
			})
		} else {
			this.setState({
				currentOptionMenu: OPTIONS_MENU
			})
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
			this.setState({
				currentOptionMenu: OPTIONS_MENU
			})
		}
	}

	render() {
		const { optionMenuIsOpen } = this.props;
		const { currentOptionMenu } = this.state
		return (
			<div className="header-container">
				<div className="header-content">
					<div className="left-content">
						<div className="logo"></div>
					</div>
					<div className="center-content">
						<div className="search-bar"></div>
					</div>
					<div className="right-content">
						<button className="btn-login">
							<FontAwesomeIcon icon={faRightToBracket} className="login-icon" />
							<Link to={PATH.LOGIN}>
								<FormattedMessage id="button.login" />
							</Link>
						</button>
						<div className="more-option" onClick={() => this.props.handleOpenCloseOptionsMenu()}>
							<FontAwesomeIcon icon={faGear} className="more-option-icon" />
						</div>
						{optionMenuIsOpen === true && <OptionsMenu items={currentOptionMenu} />}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		optionMenuIsOpen: state.app.optionMenuIsOpen,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleOpenCloseOptionsMenu: () => dispatch(actions.handleOpenCloseOptionsMenu()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

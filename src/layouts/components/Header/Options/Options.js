import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Buffer } from "buffer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';
import { PATH, OPTIONS_MENU, USER_OPTIONS_MENU } from '../../../../utils';
import images from '../../../../assets/images';
import OptionsMenu from './OptionsMenu/OptionsMenu';
import * as actions from '../../../../store/actions';
import './Options.scss';

class Options extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentOptionMenu: '',
			userAvatar: '',
		};
	}

	componentDidMount() {
		if (this.props.isLoggedIn) {
			const { accountInfo } = this.props;
			let imageBase64 = '';
			if (accountInfo.avatar) {
				imageBase64 = new Buffer(accountInfo.avatar, 'base64').toString('binary');
			}
			this.setState({
				userAvatar: imageBase64,
			});
			this.setState({
				currentOptionMenu: USER_OPTIONS_MENU,
			});
		} else {
			this.setState({
				currentOptionMenu: OPTIONS_MENU,
			});
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
			if (this.props.isLoggedIn === false) {
				this.setState({
					currentOptionMenu: OPTIONS_MENU,
				});
			}
		}
		if (prevProps.accountInfo !== this.props.accountInfo) {
			const { isLoggedIn, accountInfo } = this.props;
			if (isLoggedIn === true) {
				let imageBase64 = '';
				if (accountInfo.avatar) {
					imageBase64 = new Buffer(accountInfo.avatar, 'base64').toString('binary');
				}
				this.setState({
					userAvatar: imageBase64,
				});
			}
		}
	}

	render() {
		const { isLoggedIn, optionMenuIsOpen } = this.props;
		const { currentOptionMenu, userAvatar } = this.state;
		return (
			<>
				{(() => {
					if (isLoggedIn) {
						return (
							<>
								<div className="more-option" onClick={() => this.props.handleOpenCloseOptionsMenu()}>
									<div className="more-option-icon">
										<img src={userAvatar === '' ? images.noUserAvatar : userAvatar} alt="" />
									</div>
								</div>
								{optionMenuIsOpen === true && <OptionsMenu items={currentOptionMenu} />}
							</>
						);
					} else {
						return (
							<>
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
							</>
						);
					}
				})()}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		accountInfo: state.user.accountInfo,
		optionMenuIsOpen: state.app.optionMenuIsOpen,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleOpenCloseOptionsMenu: () => dispatch(actions.handleOpenCloseOptionsMenu()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Options);

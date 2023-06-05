import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';
import { PATH, OPTIONS_MENU, USER_OPTIONS_MENU } from '../../../../utils';
import images from '../../../../assets/images'
import OptionsMenu from './OptionsMenu/OptionsMenu';
import * as actions from '../../../../store/actions';
import './Options.scss';

class Options extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentOptionMenu: '',
			previewImgURL: ''
		};
	}

	componentDidMount() {
		if (this.props.isLoggedIn) {
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
			this.setState({
				currentOptionMenu: OPTIONS_MENU,
			});
		}
	}

	render() {
		const { isLoggedIn, optionMenuIsOpen } = this.props;
		const { currentOptionMenu, previewImgURL } = this.state;
		return (
			<>
				{(() => {
					if (isLoggedIn) {
						return (
							<>
								<div className="more-option" onClick={() => this.props.handleOpenCloseOptionsMenu()}>
									<div className="more-option-icon">
										<img src={previewImgURL === '' ? images.noUserAvatar : previewImgURL} alt="" />
									</div>
								</div>
								{optionMenuIsOpen === true && <OptionsMenu items={currentOptionMenu} />}
							</>
						)
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
		userInfo: state.user.userInfo,
		optionMenuIsOpen: state.app.optionMenuIsOpen,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleOpenCloseOptionsMenu: () => dispatch(actions.handleOpenCloseOptionsMenu()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Options);

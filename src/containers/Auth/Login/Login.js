import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import * as actions from '../../../store/actions/userActions';
import './Login.scss';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			showPassword: false,
		};
	}

	handleOnChangeInput = (e, id) => {
		const copyState = { ...this.state };
		copyState[id] = e.target.value;
		this.setState({
			...copyState,
		});
	}

	handleShowHidePassword = () => {
		this.setState({
			showPassword: !this.state.showPassword,
		});
	};

	handleKeyDown = (e) => {
		if (e.key === 'Enter' || e.keyCode === 13) {
			this.handleUserLogin()
		}
	}

	handleUserLogin = () => {
		this.props.handleUserLogin({
			email: this.state.email,
			password: this.state.password
		});
	};

	render() {
		const { email, password, showPassword } = this.state
		return (
			<div className="login-container">
				<div className="login-form">
					<div className="login-content">
						<div className="login-title">
							<FormattedMessage id="form.title.login" />
						</div>
						<div className="login-input">
							<label>
								<FormattedMessage id="form.email" />:
							</label>
							<FormattedMessage id="placeholder.enter-email">
								{(placeholder) => <input type="email" placeholder={placeholder}
								value={email}
								onChange={(e) => this.handleOnChangeInput(e, 'email')}
								onKeyDown={(e) => this.handleKeyDown(e)}
								/>}
							</FormattedMessage>
						</div>
						<div className="login-input">
							<label>
								<FormattedMessage id="form.password" />:
							</label>
							<div className="input-password">
								<FormattedMessage id="placeholder.enter-password">
									{(placeholder) => (
										<input
											type={showPassword ? "text" : "password"}
											placeholder={placeholder}
											value={password}
											onChange={(e) => this.handleOnChangeInput(e, 'password')}
											onKeyDown={(e) => this.handleKeyDown(e)}
										/>
									)}
								</FormattedMessage>
								<span onClick={() => this.handleShowHidePassword()}>
									{showPassword === true ? (
										<FontAwesomeIcon icon={faEye} className="show-password" />
									) : (
										<FontAwesomeIcon icon={faEyeSlash} className="show-password" />
									)}
								</span>
							</div>
						</div>
						<div className="forgot-password">
							<span>
								<FormattedMessage id="form.forgot-password" />?
							</span>
						</div>
						<div className="login-btn">
							<button onClick={() => this.handleUserLogin()}>
								<FormattedMessage id="button.login" />
								{this.state.loginSucceed === true && <Link to="/" />}
							</button>
						</div>
						<div className="sign-up">
							<span>
								<FormattedMessage id="form.text.or" />
								&nbsp;
								<FormattedMessage id="form.text.sign-up" />
							</span>
							&nbsp;
							<span>
								<Link to="/sign-up">
									<FormattedMessage id="form.text.here" />
								</Link>
							</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		userInfo: state.user.userInfo
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleUserLogin: (data) => dispatch(actions.handleUserLogin(data))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

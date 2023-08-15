import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import * as actions from '../../../store/actions/userActions';
import './SignUp.scss';
import { toast } from "react-toastify";

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			username: '',
			password: '',
			showPassword: false,
		};
	}

	onChangeInput = (e, id) => {
		const copyState = { ...this.state };
		copyState[id] = e.target.value;
		this.setState({
			...copyState,
		});
	};

	handleShowHidePassword = () => {
		this.setState({
			showPassword: !this.state.showPassword,
		});
	};

	handleKeyDown = (e) => {
		if (e.key === 'Enter' || e.keyCode === 13) {
			this.handleUserSignUp();
		}
	};

	handleUserSignUp = () => {
		if (this.state.password.length < 6) {
			toast.error("Password phải từ 6 ký tự")
		} else {
			this.props.handleUserSignUp({
				email: this.state.email,
				username: this.state.username,
				password: this.state.password,
			});
		}
	};

	render() {
		const { email, username, password, showPassword } = this.state;

		return (
			<div className="sign-up-container">
				<div className="sign-up-form">
					<div className="sign-up-content">
						<div className="sign-up-title">
							<FormattedMessage id="form.title.sign-up" />
						</div>
						<div className="sign-up-input">
							<label>
								<FormattedMessage id="form.email" />:
							</label>
							<FormattedMessage id="placeholder.enter-email">
								{(placeholder) => (
									<input
										type="email"
										placeholder={placeholder}
										value={email}
										onChange={(e) => this.onChangeInput(e, 'email')}
										onKeyDown={(e) => this.handleKeyDown(e)}
									/>
								)}
							</FormattedMessage>
						</div>
						<div className="sign-up-input">
							<label>
								<FormattedMessage id="form.username" />:
							</label>
							<FormattedMessage id="placeholder.enter-username">
								{(placeholder) => (
									<input
										type="text"
										placeholder={placeholder}
										value={username}
										onChange={(e) => this.onChangeInput(e, 'username')}
										onKeyDown={(e) => this.handleKeyDown(e)}
									/>
								)}
							</FormattedMessage>
						</div>
						<div className="sign-up-input">
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
											onChange={(e) => this.onChangeInput(e, 'password')}
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
						<div className="sign-up-btn">
							<button onClick={() => this.handleUserSignUp()}>
								<FormattedMessage id="button.sign-up" />
							</button>
						</div>
						<div className="login">
							<span>
								<FormattedMessage id="form.text.or" />
								&nbsp;
								<FormattedMessage id="form.text.login" />
							</span>
							&nbsp;
							<span>
								<Link to="/login">
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
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleUserSignUp: (data) => dispatch(actions.handleUserSignUp(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

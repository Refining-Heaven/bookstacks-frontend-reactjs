import { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import * as actions from '../../../store/actions';
import { customStyles } from '../../../config/reactModal';
import './AccountInfo.scss';

class changePasswordModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPassword: '',
			newPassword: '',
			confirmNewPassword: '',
			showPassword: false,
		};
	}

	componentDidMount() {}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.changePasswordModalIsOpen !== this.props.changePasswordModalIsOpen) {
			this.setState({
				currentPassword: '',
				newPassword: '',
				confirmNewPassword: '',
			});
		}
	}

	handleCloseChangePasswordModal = () => {
		this.props.handleCloseChangePasswordModal();
		this.setState({
			currentPassword: '',
			newPassword: '',
			confirmNewPassword: '',
		});
	};

	handleOnChangeInput = (e, id) => {
		const copyState = { ...this.state };
		copyState[id] = e.target.value;
		this.setState({
			...copyState,
		});
	};

	handleShowPassword = (e) => {
		if (e.target.checked) {
			this.setState({
				showPassword: true,
			});
		} else {
			this.setState({
				showPassword: false,
			});
		}
	};

	handleChangePassword = async () => {
		await this.props.handleChangePassword({
			userId: this.props.accountInfo.id,
			currentPassword: this.state.currentPassword,
			newPassword: this.state.newPassword,
			confirmNewPassword: this.state.confirmNewPassword,
		});
	};

	render() {
		const { changePasswordModalIsOpen } = this.props;
		const { currentPassword, newPassword, confirmNewPassword, showPassword } = this.state;
		Modal.setAppElement(document.getElementById('root'));
		return (
			<Modal isOpen={changePasswordModalIsOpen} style={customStyles} contentLabel="Manage chapter modal">
				<div className="change-password-modal">
					<div className="modal-header">
						<button className="close-modal-icon" onClick={() => this.handleCloseChangePasswordModal()}>
							<FontAwesomeIcon icon={faXmark} />
						</button>
					</div>
					<div className="modal-title">
						<FormattedMessage id="title.change-password" />
					</div>
					<div className="modal-content">
						<div className="input-wrapper">
							<div className="input-data">
								<label>Current password:</label>
								<input
									type={showPassword === false ? 'password' : 'text'}
									value={currentPassword}
									onChange={(e) => this.handleOnChangeInput(e, 'currentPassword')}
								/>
							</div>
							<div className="input-data">
								<label>New password:</label>
								<input
									type={showPassword === false ? 'password' : 'text'}
									value={newPassword}
									onChange={(e) => this.handleOnChangeInput(e, 'newPassword')}
								/>
							</div>
							<div className="input-data">
								<label>Confirm new password:</label>
								<input
									type={showPassword === false ? 'password' : 'text'}
									value={confirmNewPassword}
									onChange={(e) => this.handleOnChangeInput(e, 'confirmNewPassword')}
								/>
							</div>
						</div>
						<div className="show-password">
							<input type="checkbox" id="check" onChange={(e) => this.handleShowPassword(e)} />
							<label htmlFor="check">Show password</label>
						</div>
						<div className="btn-wrapper">
							<div className="change-btn" onClick={() => this.handleChangePassword()}>
								<span>Change password</span>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		accountInfo: state.user.accountInfo,
		changePasswordModalIsOpen: state.app.changePasswordModalIsOpen,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleCloseChangePasswordModal: () => dispatch(actions.handleCloseChangePasswordModal()),
		handleChangePassword: (data) => dispatch(actions.handleChangePassword(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(changePasswordModal);

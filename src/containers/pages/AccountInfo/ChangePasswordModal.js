import { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Buffer } from 'buffer';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp, faXmark } from '@fortawesome/free-solid-svg-icons';

import * as actions from '../../../store/actions';
import { customStyles } from '../../../config/reactModal';
import images from '../../../assets/images';
import { CommonUtils } from '../../../utils';
import './AccountInfo.scss';

class UpdateAccountInfoModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPassword: '',
			newPassword: '',
			confirmNewPassword: '',
		};
	}

	componentDidMount() {}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.accountInfo !== this.props.accountInfo) {
			const { accountInfo } = this.props;
			let imageBase64 = '';
			if (accountInfo.avatar) {
				imageBase64 = new Buffer(accountInfo.avatar, 'base64').toString('binary');
			}
			if (accountInfo) {
				this.setState({
					email: accountInfo.email,
					username: accountInfo.username,
					previewImgURL: imageBase64,
				});
			}
		}
	}

	handleCloseChangePasswordModal = () => {
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

	handleUpdateAccountInfo = async () => {
		await this.props.handleUpdateAccountInfo({
			userId: this.props.accountInfo.id,
			email: this.state.email,
			username: this.state.username,
			avatar: this.state.avatar,
		});
		await this.props.fetchAccountInfo(this.props.accountInfo.id);
		this.props.handleCloseUpdateAccountInfoModal();
	};

	render() {
		const { updateAccountInfoModalIsOpen } = this.props;
		const { email, username, previewImgURL } = this.state;
		Modal.setAppElement(document.getElementById('root'));
		return (
			<Modal isOpen={updateAccountInfoModalIsOpen} style={customStyles} contentLabel="Manage chapter modal">
				<div className="update-account-info-modal">
					<div className="modal-header">
						<div className="modal-title">
							<FormattedMessage id="title.change-password" />
						</div>
						<button className="close-modal-icon" onClick={() => this.handleCloseChangePasswordModal()}>
							<FontAwesomeIcon icon={faXmark} />
						</button>
					</div>
					<div className="modal-content"></div>
				</div>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		accountInfo: state.user.accountInfo,
		updateAccountInfoModalIsOpen: state.app.updateAccountInfoModalIsOpen,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleCloseUpdateAccountInfoModal: () => dispatch(actions.handleCloseUpdateAccountInfoModal()),
		handleUpdateAccountInfo: (data) => dispatch(actions.handleUpdateAccountInfo(data)),
		fetchAccountInfo: (userId) => dispatch(actions.fetchAccountInfo(userId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAccountInfoModal);

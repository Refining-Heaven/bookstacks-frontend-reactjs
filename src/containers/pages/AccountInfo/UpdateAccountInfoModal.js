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
import { CommonUtils, THEMES } from '../../../utils';
import './AccountInfo.scss';

class UpdateAccountInfoModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			username: '',
			avatar: '',
			previewImgURL: '',
		};
	}

	componentDidMount() {
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

	handleCloseUpdateAccountInfoModal = () => {
		this.props.handleCloseUpdateAccountInfoModal();
		const { accountInfo } = this.props;
		let imageBase64 = '';
		if (accountInfo.avatar) {
			imageBase64 = new Buffer(accountInfo.avatar, 'base64').toString('binary');
		}
		if (accountInfo) {
			this.setState({
				email: accountInfo.email,
				username: accountInfo.username,
        previewImgURL: imageBase64
			});
		}
	};

	handleOnChangeInput = (e, id) => {
		const copyState = { ...this.state };
		copyState[id] = e.target.value;
		this.setState({
			...copyState,
		});
	};

	handleOnChangeImage = async (e) => {
		const data = e.target.files;
		const file = data[0];
		// encode base64
		if (file) {
			const base64 = await CommonUtils.getBase64(file);
			const objectUrl = URL.createObjectURL(file);
			this.setState({
				avatar: base64,
				previewImgURL: objectUrl,
			});
		}
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

  handleCancelUpdate = () => {
    this.props.handleCloseUpdateAccountInfoModal();
		const { accountInfo } = this.props;
		let imageBase64 = '';
		if (accountInfo.avatar) {
			imageBase64 = new Buffer(accountInfo.avatar, 'base64').toString('binary');
		}
		if (accountInfo) {
			this.setState({
				email: accountInfo.email,
				username: accountInfo.username,
        previewImgURL: imageBase64
			});
		}
  }

	render() {
		const { updateAccountInfoModalIsOpen, theme } = this.props;
		const { email, username, previewImgURL } = this.state;
		Modal.setAppElement(document.getElementById('root'));
		return (
			<Modal isOpen={updateAccountInfoModalIsOpen} style={customStyles} contentLabel="Manage chapter modal">
				<div className={theme === THEMES.LIGHT ? "update-account-info-modal" : "update-account-info-modal dark-mode"}>
					<div className="modal-header">
						<div className="modal-title">
							<FormattedMessage id="title.update-account-info" />
						</div>
						<button className="close-modal-icon" onClick={() => this.handleCloseUpdateAccountInfoModal()}>
							<FontAwesomeIcon icon={faXmark} />
						</button>
					</div>
					<div className="modal-content">
						<div className="account-info">
							<div className="left-content">
								<div className="upload-avatar">
									<div className="preview-avatar">
										<img src={previewImgURL !== '' ? previewImgURL : images.noUserAvatar} alt="" />
									</div>
									<input type="file" id="upload-image" hidden value="" onChange={(e) => this.handleOnChangeImage(e)} />
									<label className="label-upload" htmlFor="upload-image">
										<span>
											<FormattedMessage id="button.upload-image" />
										</span>
										&nbsp;
										<FontAwesomeIcon icon={faCloudArrowUp} />
									</label>
								</div>
							</div>
							<div className="right-content">
								<div className="info-wrapper">
									<div className="info-content">
										<label>
											<FormattedMessage id="label.email" />:
										</label>
										<input type="email" value={email} onChange={(e) => this.handleOnChangeInput(e, 'email')} />
									</div>
									<div className="info-content">
										<label>
											<FormattedMessage id="label.username" />:
										</label>
										<input type="text" value={username} onChange={(e) => this.handleOnChangeInput(e, 'username')} />
									</div>
								</div>
								<div className="options">
									<div className="option-btn" onClick={() => this.handleUpdateAccountInfo()}>
										<span><FormattedMessage id="button.update" /></span>
									</div>
									<div className="option-btn cancel" onClick={() => this.handleCancelUpdate()}>
										<span><FormattedMessage id="button.cancel" /></span>
									</div>
								</div>
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
		updateAccountInfoModalIsOpen: state.app.updateAccountInfoModalIsOpen,
		theme: state.app.theme
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

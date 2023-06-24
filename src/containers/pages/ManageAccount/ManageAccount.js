import { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { TITLE, LANGUAGES, THEMES } from '../../../utils';
import SubHeader from '../../../layouts/components/SubHeader/SubHeader';
import './ManageAccount.scss';
import ManageAccountTable from './ManageAccountTable';

class ManageAccount extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editMode: false,
			deleteMode: false,
			userId: '',
			username: '',
			email: '',
			role: '',
			roleData: '',
			banned: '',
			resetPassword: '',
		};
	}

	async componentDidMount() {
		await this.props.clearSelectedAccountInfo();
		this.props.fetchRoleData();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.selectedAccountInfo !== this.props.selectedAccountInfo) {
			if (this.props.selectedAccountInfo !== null) {
				const { selectedAccountInfo } = this.props;
				this.setState({
					userId: selectedAccountInfo.id,
					username: selectedAccountInfo.username,
					email: selectedAccountInfo.email,
					role: selectedAccountInfo.role,
					roleData: selectedAccountInfo.roleData,
					banned: !!selectedAccountInfo.banned,
					editMode: false,
					deleteMode: false,
				});
			}
		}
	}

	handleEnterEditMode = () => {
		this.setState({
			editMode: true,
		});
	};
	handleExitEditMode = () => {
		const { selectedAccountInfo } = this.props;
		this.setState({
			editMode: false,
			username: selectedAccountInfo.username,
			email: selectedAccountInfo.email,
			role: selectedAccountInfo.role,
			roleData: selectedAccountInfo.roleData,
			banned: !!selectedAccountInfo.banned,
      resetPassword: ''
		});
	};
	handleEnterDeleteMode = () => {
		this.setState({
			deleteMode: true,
		});
	};
	handleExitDeleteMode = () => {
		this.setState({
			deleteMode: false,
		});
	};

	handleOnChangeInput = (e, id) => {
		const copyState = { ...this.state };
		copyState[id] = e.target.value;
		this.setState({
			...copyState,
		});
	};

	handleDeleteAccount = async () => {
		await this.props.handleDeleteAccount(this.state.userId);
		await this.props.fetchAllAccount();
		this.setState({
			deleteMode: false,
		});
	};

	handleResetAccountPassword = async () => {
		await this.props.handleResetAccountPassword({
			userId: this.state.userId,
			resetPassword: this.state.resetPassword,
		});
		this.setState({
			editMode: false,
			resetPassword: '',
		});
	};

	handleChangeAccountInfo = async () => {
		await this.props.handleChangeAccountInfo({
			userId: this.state.userId,
			username: this.state.username,
			email: this.state.email,
			role: this.state.role,
			banned: this.state.banned,
		});
		await this.props.fetchAllAccount();
		await this.props.fetchSelectedAccountInfo(this.state.userId);
		this.setState({
			editMode: false,
      resetPassword: ''
		});
	};

	render() {
		const { language, selectedAccountInfo, roleList, theme } = this.props;
		const { editMode, deleteMode, username, email, role, roleData, banned, resetPassword } = this.state;
		return (
			<>
				<SubHeader title={TITLE.MANAGE_ACCOUNT} />
				<div className={theme === THEMES.LIGHT ? "content-body" : "content-body dark-mode"}>
					<div className="manage-account-container">
						<div className="content-up">
							{(() => {
								if (editMode === false && selectedAccountInfo !== null) {
									return (
										<>
											<div className="account-info-wrapper">
												<div className="account-info">
													<div className="info-label">
														<FormattedMessage id="label.username" />
													</div>
													<span>{username}</span>
												</div>
												<div className="account-info">
													<div className="info-label">
														<FormattedMessage id="label.email" />
													</div>
													<span>{email}</span>
												</div>
												<div className="account-info">
													<div className="info-label">
														<FormattedMessage id="label.role" />
													</div>
													<span>{language === LANGUAGES.VI ? roleData.valueVi : roleData.valueEn}</span>
												</div>
												<div className="account-info">
													<div className="info-label">
														<FormattedMessage id="label.banned" />
													</div>
													<span>
														{banned === false ? (
															<FormattedMessage id="button.no" />
														) : (
															<FormattedMessage id="button.yes" />
														)}
													</span>
												</div>
											</div>
											{deleteMode === false ? (
												<div className="account-options">
													<div className="edit-btn" onClick={() => this.handleEnterEditMode()}>
														<span>Edit</span>
													</div>
													<div className="delete-btn" onClick={() => this.handleEnterDeleteMode()}>
														<span>Delete </span>
													</div>
												</div>
											) : (
												<div className="account-options">
													<div className="delete-btn" onClick={() => this.handleDeleteAccount()}>
														<span>Delete account</span>
													</div>
													<div className="edit-btn" onClick={() => this.handleExitDeleteMode()}>
														<span>Cancel</span>
													</div>
												</div>
											)}
										</>
									);
								}
								if (editMode === true && selectedAccountInfo !== null) {
									return (
										<>
											<div className="account-info-wrapper">
												<div className="account-info">
													<div className="info-label">
														<FormattedMessage id="label.username" />
													</div>
													<input
														type="text"
														value={username}
														onChange={(e) => this.handleOnChangeInput(e, 'username')}
													/>
												</div>
												<div className="account-info">
													<div className="info-label">
														<FormattedMessage id="label.email" />
													</div>
													<input type="text" value={email} onChange={(e) => this.handleOnChangeInput(e, 'email')} />
												</div>
												<div className="account-info">
													<div className="info-label">
														<FormattedMessage id="label.role" />
													</div>
													<select value={role} onChange={(e) => this.handleOnChangeInput(e, 'role')}>
														{roleList &&
															roleList.length > 0 &&
															roleList.map((item, index) => {
																return (
																	<option key={index} value={item.keyMap}>
																		{language === LANGUAGES.VI ? item.valueVi : item.valueEn}
																	</option>
																);
															})}
													</select>
												</div>
												<div className="account-info">
													<div className="info-label">
														<FormattedMessage id="label.banned" />
													</div>
													<select value={banned} onChange={(e) => this.handleOnChangeInput(e, 'banned')}>
														<option value={false}>
															<FormattedMessage id="button.no" />
														</option>
														<option value={true}>
															<FormattedMessage id="button.yes" />
														</option>
													</select>
												</div>
											</div>
											<div className="account-options">
												<div className="reset-password-wrapper">
													<label>Reset password to:</label>
													<input
														type="text"
														value={resetPassword}
														onChange={(e) => this.handleOnChangeInput(e, 'resetPassword')}
													/>
													<div className="reset-btn" onClick={() => this.handleResetAccountPassword()}>
														<span>Reset password</span>
													</div>
												</div>
												<div className="save-btn" onClick={() => this.handleChangeAccountInfo()}>
													<span>Save</span>
												</div>
												<div className="edit-btn" onClick={() => this.handleExitEditMode()}>
													<span>Cancel</span>
												</div>
											</div>
										</>
									);
								}
							})()}
						</div>
						<div className="content-down">
							<ManageAccountTable />
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		selectedAccountInfo: state.app.selectedAccountInfo,
		roleList: state.app.roleList,
		theme: state.app.theme
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllAccount: () => dispatch(actions.fetchAllAccount()),
		fetchRoleData: () => dispatch(actions.fetchRoleData()),
		clearSelectedAccountInfo: () => dispatch(actions.clearSelectedAccountInfo()),
		handleChangeAccountInfo: (data) => dispatch(actions.handleChangeAccountInfo(data)),
		fetchSelectedAccountInfo: (userId) => dispatch(actions.fetchSelectedAccountInfo(userId)),
		handleResetAccountPassword: (userId) => dispatch(actions.handleResetAccountPassword(userId)),
		handleDeleteAccount: (userId) => dispatch(actions.handleDeleteAccount(userId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccount);

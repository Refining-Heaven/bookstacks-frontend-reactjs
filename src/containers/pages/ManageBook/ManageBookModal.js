import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { Buffer } from 'buffer';
import { FormattedMessage } from 'react-intl';
import Modal from 'react-modal';
import { LANGUAGES, CommonUtils } from '../../../utils';
import { customStyles } from '../../../config/reactModal';
import * as actions from '../../../store/actions';
import './ManageBook.scss';

class ManageBookModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			statusData: [],
			kindData: [],
			versionData: [],
			languageData: [],
			genreData: [],
			bookName: '',
			anotherName: '',
			author: '',
			status: '',
			kind: '',
			version: '',
			language: '',
			intro: '',
			coverImage: '',
			previewImgURL: '',
		};
	}

	componentDidMount() {
		this.props.fetchRequiredBookData();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.allRequiredBookData !== this.props.allRequiredBookData) {
			this.setState({
				statusData: this.props.allRequiredBookData.resStatus.data,
				kindData: this.props.allRequiredBookData.resKind.data,
				versionData: this.props.allRequiredBookData.resVersion.data,
				languageData: this.props.allRequiredBookData.resLanguage.data,
				genreData: this.props.allRequiredBookData.resGenre.data,
			});
		}
		if (prevProps.bookInfo !== this.props.bookInfo) {
			const { bookInfo } = this.props;
			const { genreData } = this.state;
			if (bookInfo !== null) {
				if (bookInfo && bookInfo.genreData && bookInfo.genreData.length > 0) {
					const arrGenreId = [];
					// eslint-disable-next-line array-callback-return
					bookInfo.genreData.map((item) => {
						arrGenreId.push(item.genreId);
					});
					// eslint-disable-next-line array-callback-return
					genreData.map((item) => {
						for (let i = 0; i < arrGenreId.length; i++) {
							if (item.id === arrGenreId[i]) {
								item.isSelected = true;
								return item;
							} else {
								item.isSelected = false;
							}
						}
					});
				} else {
					genreData.map((item) => {
						return (item.isSelected = false);
					});
				}
				// decode base64
				let imageBase64 = '';
				if (bookInfo.coverImage) {
					imageBase64 = new Buffer(bookInfo.coverImage, 'base64').toString('binary');
				}
				this.setState({
					bookName: bookInfo.bookName,
					anotherName: bookInfo.anotherName,
					author: bookInfo.author,
					status: bookInfo.status,
					kind: bookInfo.kind,
					version: bookInfo.version,
					language: bookInfo.language,
					intro: bookInfo.intro,
					previewImgURL: imageBase64,
				});
			}
		}
	}

	handleCloseManageBookModal = () => {
		this.props.handleCloseManageBookModal();
		if (this.props.bookInfo !== null) {
			this.props.clearBookInfo();
		}
	};

	handleSelectGenre = (genre) => {
		const { genreData } = this.state;
		if (genreData && genreData.length > 0) {
			genreData.map((item) => {
				if (item.id === genre.id) {
					item.isSelected = !item.isSelected;
				}
				return item;
			});
			this.setState({
				genreData: genreData,
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
				previewImgURL: objectUrl,
				coverImage: base64,
			});
		}
	};

	handleSaveBookInfo = async () => {
		const { genreData } = this.state;
		let bookGenre = [];
		if (genreData && genreData.length > 0) {
			const selectedGenre = genreData.filter((item) => item.isSelected === true);
			if (selectedGenre && selectedGenre.length > 0) {
				// eslint-disable-next-line array-callback-return
				selectedGenre.map((genre) => {
					const object = {};
					object.bookId = this.props.bookInfo.id;
					object.genreId = genre.id;
					bookGenre.push(object);
				});
			} else {
				bookGenre = [];
			}
		}
		await this.props.handleUpdateBookInfo({
			uploaderId: this.props.accountInfo.id,
			bookId: this.props.bookInfo.id,
			bookName: this.state.bookName,
			anotherName: this.state.anotherName,
			author: this.state.author,
			status: this.state.status,
			kind: this.state.kind,
			version: this.state.version,
			language: this.state.language,
			intro: this.state.intro,
			arrGenre: bookGenre,
			coverImage: this.state.coverImage,
		});
		await this.props.fetchAllBook();
		this.handleCloseManageBookModal();
	};

	render() {
		const {
			statusData,
			kindData,
			versionData,
			languageData,
			genreData,
			bookName,
			anotherName,
			author,
			status,
			kind,
			version,
			intro,
			previewImgURL,
		} = this.state;
		const { language, manageBookModalIsOpen } = this.props;
		Modal.setAppElement(document.getElementById('root'));
		return (
			<Modal
				isOpen={manageBookModalIsOpen}
				// onAfterOpen={afterOpenModal}
				// onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Manage book modal"
			>
				<div className="manage-book-modal">
					<div className="modal-header">
						<div className="modal-title">
							<FormattedMessage id="title.manage-book" />
						</div>
						<button className="close-modal-icon" onClick={() => this.handleCloseManageBookModal()}>
							<FontAwesomeIcon icon={faXmark} />
						</button>
					</div>
					<div className="modal-content">
						<div className="manage-book-form">
							<div className="input-book-info">
								<label>
									<FormattedMessage id="label.book-name" />:
								</label>
								<input type="text" value={bookName} onChange={(e) => this.handleOnChangeInput(e, 'bookName')} />
							</div>
							<div className="input-book-info">
								<label>
									<FormattedMessage id="label.another-name" />:
								</label>
								<input
									type="text"
									value={anotherName === null ? '' : anotherName}
									onChange={(e) => this.handleOnChangeInput(e, 'anotherName')}
								/>
							</div>
							<div className="input-book-info">
								<label>
									<FormattedMessage id="label.author" />:
								</label>
								<input
									type="text"
									value={author === null ? '' : author}
									onChange={(e) => this.handleOnChangeInput(e, 'author')}
								/>
							</div>
							<div className="input-book-info">
								<label>
									<FormattedMessage id="label.status" />:
								</label>
								<select value={status === null ? '' : status} onChange={(e) => this.handleOnChangeInput(e, 'status')}>
									<option value={null}></option>
									{statusData &&
										statusData.length > 0 &&
										statusData.map((item, index) => {
											return (
												<option key={index} value={item.keyMap}>
													{language === LANGUAGES.VI ? item.valueVi : item.valueEn}
												</option>
											);
										})}
								</select>
							</div>
							<div className="input-book-info">
								<label>
									<FormattedMessage id="label.kind" />:
								</label>
								<select value={kind === null ? '' : kind} onChange={(e) => this.handleOnChangeInput(e, 'kind')}>
									<option value={null}></option>
									{kindData &&
										kindData.length > 0 &&
										kindData.map((item, index) => {
											return (
												<option key={index} value={item.id}>
													{language === LANGUAGES.VI ? item.valueVi : item.valueEn}
												</option>
											);
										})}
								</select>
							</div>
							<div className="input-book-info">
								<label>
									<FormattedMessage id="label.version" />:
								</label>
								<select
									value={version === null ? '' : version}
									onChange={(e) => this.handleOnChangeInput(e, 'version')}
								>
									<option value={null}></option>
									{versionData &&
										versionData.length > 0 &&
										versionData.map((item, index) => {
											return (
												<option key={index} value={item.keyMap}>
													{language === LANGUAGES.VI ? item.valueVi : item.valueEn}
												</option>
											);
										})}
								</select>
							</div>
							<div className="input-book-info">
								<label>
									<FormattedMessage id="label.language" />:
								</label>
								<select
									value={this.state.language === null ? '' : this.state.language}
									onChange={(e) => this.handleOnChangeInput(e, 'language')}
								>
									<option value={null}></option>
									{languageData &&
										languageData.length > 0 &&
										languageData.map((item, index) => {
											return (
												<option key={index} value={item.keyMap}>
													{this.props.language === LANGUAGES.VI ? item.valueVi : item.valueEn}
												</option>
											);
										})}
								</select>
							</div>
							<div className="input-book-info">
								<label>
									<FormattedMessage id="label.intro" />:
								</label>
								<textarea
									rows="6"
									value={intro === null ? '' : intro}
									onChange={(e) => this.handleOnChangeInput(e, 'intro')}
								></textarea>
							</div>
							<div className="book-genre-image-container">
								<div className="book-genre">
									<label>
										<FormattedMessage id="label.genre" />:
									</label>
									<div className="select-genre-container">
										{genreData &&
											genreData.length > 0 &&
											genreData.map((item, index) => {
												return (
													<button
														className={item.isSelected === true ? 'btn-genre active' : 'btn-genre'}
														key={index}
														onClick={() => this.handleSelectGenre(item)}
													>
														{language === LANGUAGES.VI ? item.valueVi : item.valueEn}
													</button>
												);
											})}
									</div>
								</div>
								<div className="book-cover-image">
									<div className="upload-cover-image">
										<label>
											<FormattedMessage id="label.cover-image" />:
										</label>
										<input
											type="file"
											id="upload-image"
											hidden
											value=""
											onChange={(e) => this.handleOnChangeImage(e)}
										/>
										<label className="label-upload" htmlFor="upload-image">
											<span>
												<FormattedMessage id="button.upload-image" />
											</span>
											&nbsp;
											<FontAwesomeIcon icon={faCloudArrowUp} />
										</label>
									</div>
									<div className="preview-cover-image">
										{previewImgURL === '' ? '' : <img src={previewImgURL} alt="" />}
									</div>
								</div>
							</div>
							<div className="btn-container">
								<button className="btn-save" onClick={() => this.handleSaveBookInfo()}>
									<FormattedMessage id="button.save" />
								</button>
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
		bookInfo: state.app.bookInfo,
		manageBookModalIsOpen: state.app.manageBookModalIsOpen,
		allRequiredBookData: state.app.allRequiredBookData,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleCloseManageBookModal: () => dispatch(actions.handleCloseManageBookModal()),
		fetchAllBook: () => dispatch(actions.fetchAllBook()),
		fetchRequiredBookData: () => dispatch(actions.fetchRequiredBookData()),
		handleUpdateBookInfo: (data) => dispatch(actions.handleUpdateBookInfo(data)),
		clearBookInfo: () => dispatch(actions.clearBookInfo()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBookModal);

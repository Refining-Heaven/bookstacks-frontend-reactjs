import { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { ACTION, THEMES } from '../../../utils';
import { customStyles } from '../../../config/reactModal';
import * as actions from '../../../store/actions';
import './ManageChapter.scss';

class ManageChapterContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chapterNumber: '',
			chapterTitle: '',
			chapterContent: '',
			action: ACTION.CREATE,
		};
	}

	componentDidMount() {}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.chapterInfo !== this.props.chapterInfo) {
			const { chapterInfo } = this.props;
			if (chapterInfo !== null) {
				this.setState({
					chapterNumber: chapterInfo.chapterNumber,
					chapterTitle: chapterInfo.chapterTitle,
					chapterContent: chapterInfo.chapterContent,
					action: ACTION.UPDATE,
				});
			}
		}
	}

	handleCloseManageChapterModal = () => {
		this.props.handleCloseManageChapterModal();
		this.setState({
			chapterNumber: '',
			chapterTitle: '',
			chapterContent: '',
			action: ACTION.CREATE,
		});
		if (this.props.chapterInfo !== null) {
			this.props.clearChapterInfo();
		}
	};

	handleOnChangeInput = (e, id) => {
		const copyState = { ...this.state };
		copyState[id] = e.target.value;
		this.setState({
			...copyState,
		});
	};

	handleSaveChapterInfo = async () => {
		if (this.state.action === ACTION.CREATE) {
			await this.props.handleAddNewChapter({
				chapterNumber: this.state.chapterNumber,
				chapterTitle: this.state.chapterTitle,
				chapterContent: this.state.chapterContent,
				bookId: this.props.bookId,
			});
			await this.props.fetchAllChapter(this.props.bookId)
		}
		if (this.state.action === ACTION.UPDATE) {
			await this.props.handleUpdateChapterInfo({
				chapterNumber: this.state.chapterNumber,
				chapterTitle: this.state.chapterTitle,
				chapterContent: this.state.chapterContent,
				chapterId: this.props.chapterInfo.id,
			});
			await this.props.fetchAllChapter(this.props.bookId)
		}
		this.handleCloseManageChapterModal();
	};

	render() {
		const { chapterNumber, chapterTitle, chapterContent, action } = this.state;
		const { manageChapterModalIsOpen, theme } = this.props;
		Modal.setAppElement(document.getElementById('root'));
		return (
			<Modal isOpen={manageChapterModalIsOpen} style={customStyles} contentLabel="Manage chapter modal">
				<div className={theme === THEMES.LIGHT ? "manage-chapter-modal" : "manage-chapter-modal dark-mode"}>
					<div className="modal-header">
						<div className="modal-title">
							<FormattedMessage id="title.manage-chapter" />
						</div>
						<button className="close-modal-icon" onClick={() => this.handleCloseManageChapterModal()}>
							<FontAwesomeIcon icon={faXmark} />
						</button>
					</div>
					<div className="modal-content">
						<div className="manage-chapter-form">
							<div className="input-chapter-content">
								<label><FormattedMessage id="label.chapter-number" />:</label>
								<input
									type="number"
									value={chapterNumber === null ? '' : chapterNumber}
									onChange={(e) => this.handleOnChangeInput(e, 'chapterNumber')}
								/>
							</div>
							<div className="input-chapter-content">
								<label><FormattedMessage id="label.chapter-title" />:</label>
								<input
									type="text"
									value={chapterTitle === null ? '' : chapterTitle}
									onChange={(e) => this.handleOnChangeInput(e, 'chapterTitle')}
								/>
							</div>
							<div className="input-chapter-content">
								<label><FormattedMessage id="label.chapter-content" />:</label>
								<textarea
									rows="20"
									value={chapterContent === null ? '' : chapterContent}
									onChange={(e) => this.handleOnChangeInput(e, 'chapterContent')}
								></textarea>
							</div>
							<div className="btn-container">
								<button className="btn-save" onClick={() => this.handleSaveChapterInfo()}>
									{action === ACTION.CREATE ? (
										<FormattedMessage id="button.save" />
									) : (
										<FormattedMessage id="button.save-change" />
									)}
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
		chapterInfo: state.app.chapterInfo,
		manageChapterModalIsOpen: state.app.manageChapterModalIsOpen,
		theme: state.app.theme
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllChapter: (bookId) => dispatch(actions.fetchAllChapter(bookId)),
		handleAddNewChapter: (data) => dispatch(actions.handleAddNewChapter(data)),
		handleUpdateChapterInfo: (data) => dispatch(actions.handleUpdateChapterInfo(data)),
		clearChapterInfo: () => dispatch(actions.clearChapterInfo()),
		handleCloseManageChapterModal: () => dispatch(actions.handleCloseManageChapterModal()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageChapterContent);

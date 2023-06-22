import { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { customStyles } from '../../../config/reactModal';
import * as actions from '../../../store/actions';
import { withRouter, convertStringToAddressBar } from '../../../utils';
import './ChapterContent.scss';

class ChapterListModal extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.commentSectionIsOpen !== this.props.commentSectionIsOpen) {
		}
	}

	handleCloseChapterListModal = () => {
		this.props.handleCloseChapterListModal();
	};

  handleReadChapter = async (chapterId, chapterNumber) => {
		const { bookInfo } = this.props;
		const convertedBookName = convertStringToAddressBar(bookInfo.bookName);
		window.location.assign(`/book/${convertedBookName}/chapter/${chapterNumber}/id/${chapterId}`);
	};

	render() {
		const { chapterListModalIsOpen, allChapters, chapterInfo } = this.props;
		Modal.setAppElement(document.getElementById('root'));
		return (
			<Modal isOpen={chapterListModalIsOpen} style={customStyles} contentLabel="chapter list">
				<div className="chapter-list-modal">
					<div className="close">
						<div className="close-btn" onClick={() => this.handleCloseChapterListModal()}>
							<FontAwesomeIcon icon={faXmark} />
						</div>
					</div>
					<div className="chapter-list-container">
						{allChapters &&
							allChapters.length > 0 &&
							allChapters.map((item, index) => {
								return (
									<div className={item.id === chapterInfo.id ? "chapter-wrapper active" : "chapter-wrapper"} key={index}
                  onClick={() => this.handleReadChapter(item.id, item.chapterNumber)}
                  >
										<div className="number">
											<span>Chapter&nbsp;</span>
											<span>{item.chapterNumber}:&nbsp;</span>
										</div>
										<div className="title">
											<span>{item.chapterTitle}</span>
										</div>
									</div>
								);
							})}
					</div>
				</div>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		allChapters: state.app.allChapters,
    chapterInfo: state.app.chapterInfo,
    bookInfo: state.app.bookInfo,
		chapterListModalIsOpen: state.app.chapterListModalIsOpen,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleCloseChapterListModal: () => dispatch(actions.handleCloseChapterListModal()),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChapterListModal));

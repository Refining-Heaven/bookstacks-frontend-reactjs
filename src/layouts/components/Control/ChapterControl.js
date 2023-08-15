import { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from "react-toastify";
import MediaQuery from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight, faInfo, faList } from '@fortawesome/free-solid-svg-icons';
import * as actions from '../../../store/actions';
import { THEMES, convertStringToAddressBar, withRouter } from '../../../utils';
import './Control.scss';

class ChapterControl extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showControl: false,
			currentChapterIndex: '',
			chapterList: [],
      prevBtnIsDisable: false,
      nextBtnIsDisable: false,
		};
	}

	componentDidMount() {
		const element = document.getElementById('chapter-content-container');
		element.addEventListener('click', () => {
			this.setState({
				showControl: !this.state.showControl,
			});
		});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.allChapters !== this.props.allChapters) {
			const { chapterInfo, allChapters } = this.props;
			this.setState({
				chapterList: allChapters,
			});
			const currentChapter = chapterInfo.id;
			if (allChapters && allChapters.length > 0) {
				for (let i = 0; i < allChapters.length; i++) {
					const index = i;
					if (allChapters[i].id === currentChapter) {
						this.setState({
							currentChapterIndex: index,
						});
						break;
					}
				}
			}
		}
		if (prevProps.chapterInfo !== this.props.chapterInfo) {
			const { chapterInfo, allChapters } = this.props;
			const currentChapter = chapterInfo.id;
			if (allChapters && allChapters.length > 0) {
				for (let i = 0; i < allChapters.length; i++) {
					const index = i;
					if (allChapters[i].id === currentChapter) {
						this.setState({
							currentChapterIndex: index,
						});
						break;
					}
				}
			}
		}
    if (prevState.currentChapterIndex !== this.state.currentChapterIndex) {
			const { currentChapterIndex, chapterList } = this.state
      if (currentChapterIndex === 0) {
        this.setState({
          nextBtnIsDisable: true
        })
      } else {
        this.setState({
          nextBtnIsDisable: false
        })
      }
      if (currentChapterIndex === chapterList.length - 1) {
        this.setState({
          prevBtnIsDisable: true
        })
      } else {
        this.setState({
          prevBtnIsDisable: false
        })
      }
		}
	}

	handleViewBookDetail = async () => {
		const {bookInfo} = this.props
		await this.props.fetchBookInfo(bookInfo.id);
    const convertedBookName = convertStringToAddressBar(bookInfo.bookName)
		window.location.assign(`/book-detail/${convertedBookName}/id/${bookInfo.id}`);
	};

	handleOpenChapterListModal = () => {
		this.props.handleOpenChapterListModal()
	}

	handleNextChapter = async () => {
		const { chapterList, currentChapterIndex } = this.state;
    if (currentChapterIndex === 0) {
      toast.warning('This is the lastest chapter!')
    } else {
      const { bookInfo } = this.props;
      const convertedBookName = convertStringToAddressBar(bookInfo.bookName);
      const prevChapterId = chapterList[currentChapterIndex - 1].id;
      const prevChapterNumber = chapterList[currentChapterIndex - 1].chapterNumber;
      // await this.props.fetchChapterInfo(prevChapterId);
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
      window.location.assign(`/book/${convertedBookName}/chapter/${prevChapterNumber}/id/${prevChapterId}`);
    }
	};

	handlePrevChapter = async () => {
		const { chapterList, currentChapterIndex } = this.state;
    if (currentChapterIndex === chapterList.length - 1) {
      return
    } else {
      const { bookInfo } = this.props;
      const convertedBookName = convertStringToAddressBar(bookInfo.bookName);
      const nextChapterId = chapterList[currentChapterIndex + 1].id;
      const nextChapterNumber = chapterList[currentChapterIndex + 1].chapterNumber;
      // await this.props.fetchChapterInfo(nextChapterId);
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
      window.location.assign(`/book/${convertedBookName}/chapter/${nextChapterNumber}/id/${nextChapterId}`);
    }
	};

	render() {
		const { showControl, prevBtnIsDisable, nextBtnIsDisable } = this.state;
		const { theme } = this.props;
		return (
			<div className={theme === THEMES.LIGHT ? "chapter-control" : "chapter-control dark-mode"}>
				{showControl === true && (
					<>
						<div className={prevBtnIsDisable === false ? "control-btn" : "disable-control-btn"} onClick={() => this.handlePrevChapter()}>
							<FontAwesomeIcon icon={faCaretLeft} />
						</div>
						<div className="control-btn"  onClick={() => this.handleOpenChapterListModal()}>
							<FontAwesomeIcon icon={faList} />
						</div>
						<div className="control-btn" onClick={() => this.handleViewBookDetail()}>
							<FontAwesomeIcon icon={faInfo} />
						</div>
						<div className={nextBtnIsDisable === false ? "control-btn" : "disable-control-btn"} onClick={() => this.handleNextChapter()}>
							<FontAwesomeIcon icon={faCaretRight} />
						</div>
					</>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		bookInfo: state.app.bookInfo,
		chapterInfo: state.app.chapterInfo,
		allChapters: state.app.allChapters,
		chapterListModalIsOpen: state.app.chapterListModalIsOpen,
		theme: state.app.theme
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchBookInfo: (bookId) => dispatch(actions.fetchBookInfo(bookId)),
		fetchChapterInfo: (chapterId) => dispatch(actions.fetchChapterInfo(chapterId)),
		handleOpenChapterListModal: () => dispatch(actions.handleOpenChapterListModal()),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChapterControl));

import { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight, faList } from '@fortawesome/free-solid-svg-icons';
import * as actions from '../../../store/actions';
import { convertStringToAddressBar, withRouter } from '../../../utils';
import './Control.scss';
import { toast } from "react-toastify";

class ChapterControl extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showControl: true,
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
          prevBtnIsDisable: true
        })
      } else {
        this.setState({
          prevBtnIsDisable: false
        })
      }
      if (currentChapterIndex === chapterList.length - 1) {
        this.setState({
          nextBtnIsDisable: true
        })
      } else {
        this.setState({
          nextBtnIsDisable: false
        })
      }
		}
	}

	handlePrevChapter = async () => {
		const { chapterList, currentChapterIndex } = this.state;
    if (currentChapterIndex === 0) {
      return
    } else {
      const { bookInfo } = this.props;
      const convertedBookName = convertStringToAddressBar(bookInfo.bookName);
      const prevChapterId = chapterList[currentChapterIndex - 1].id;
      const prevChapterNumber = chapterList[currentChapterIndex - 1].chapterNumber;
      await this.props.fetchChapterInfo(prevChapterId);
      this.props.navigate(`/book/${convertedBookName}/chapter/${prevChapterNumber}/id/${prevChapterId}`);
    }
	};

	handleNextChapter = async () => {
		const { chapterList, currentChapterIndex } = this.state;
    if (currentChapterIndex === chapterList.length - 1) {
      toast.warning('This is the lastest chapter!')
    } else {
      const { bookInfo } = this.props;
      const convertedBookName = convertStringToAddressBar(bookInfo.bookName);
      const nextChapterId = chapterList[currentChapterIndex + 1].id;
      const nextChapterNumber = chapterList[currentChapterIndex + 1].chapterNumber;
      await this.props.fetchChapterInfo(nextChapterId);
      this.props.navigate(`/book/${convertedBookName}/chapter/${nextChapterNumber}/id/${nextChapterId}`);
    }
	};

	render() {
		const { showControl, prevBtnIsDisable, nextBtnIsDisable } = this.state;
		return (
			<div className="chapter-control">
				{showControl === true && (
					<>
						<div className={prevBtnIsDisable === false ? "control-btn" : "disable-control-btn"} onClick={() => this.handlePrevChapter()}>
							<FontAwesomeIcon icon={faCaretLeft} />
						</div>
						<div className="control-btn">
							<FontAwesomeIcon icon={faList} />
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
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchChapterInfo: (chapterId) => dispatch(actions.fetchChapterInfo(chapterId)),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChapterControl));

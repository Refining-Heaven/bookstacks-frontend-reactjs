import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { TYPE, dateCalculation, withRouter } from '../../../utils';
import ChapterControl from '../../../layouts/components/Control/ChapterControl';
import CommentControl from '../../../layouts/components/Control/CommentControl';
import CommentSection from '../../components/CommentSection/CommentSection';
import ChapterListModal from "./ChapterListModal";
import './ChapterContent.scss';

class ChapterContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chapterList: [],
		};
	}

	async componentDidMount() {
		if (this.props && this.props.params && this.props.params.id) {
			const chapterId = this.props.params.id;
			await Promise.all([
				await this.props.fetchChapterInfo(chapterId),
				await this.props.fetchBookInfo(this.props.chapterInfo.bookId),
				await this.props.fetchAllChapter(this.props.chapterInfo.bookId),
			]);
		}
	}

	render() {
		const { chapterInfo } = this.props;
		let updateDate = ''
		if (chapterInfo) {
			const lastUpdateTime = new Date(chapterInfo.updatedAt);
			updateDate = dateCalculation(lastUpdateTime);
		}
		return (
			<>
				<div id="chapter-content-container">
					{(() => {
						if (chapterInfo) {
							return (
								<div className="chapter-content-body">
									<div className="last-update">
										<span>Last update:&nbsp;</span>
										<span className="time">{updateDate === '' ? '' : updateDate}</span>
									</div>
									<div className="chapter-info">
										<span>Chapter&nbsp;</span>
										<span>{chapterInfo.chapterNumber}:&nbsp;</span>
										<span>{chapterInfo.chapterTitle}</span>
									</div>
									<div className="chapter-content">{chapterInfo.chapterContent}</div>
								</div>
							);
						}
					})()}
				</div>
				<ChapterControl />
				<ChapterListModal />
				<CommentControl />
				<CommentSection type={TYPE.CHAPTER} />
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		bookInfo: state.app.bookInfo,
		chapterInfo: state.app.chapterInfo,
		allChapters: state.app.allChapters,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllChapter: (bookId) => dispatch(actions.fetchAllChapter(bookId)),
		fetchBookInfo: (bookId) => dispatch(actions.fetchBookInfo(bookId)),
		fetchChapterInfo: (chapterId) => dispatch(actions.fetchChapterInfo(chapterId)),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChapterContent));

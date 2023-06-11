import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { withRouter } from '../../../utils';
import './ChapterContent.scss';

class ChapterContent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	async componentDidMount() {
		if (this.props && this.props.params && this.props.params.id) {
			const chapterId = this.props.params.id;
			await this.props.fetchChapterInfo(chapterId);
			this.props.fetchAllChapter(this.props.chapterInfo.bookId);
		}
	}

	render() {
		const { allChapters, chapterInfo } = this.props;
		return (
			<>
				{(() => {
					if (chapterInfo) {
						return (
							<div className="chapter-content-container">
								<div className="chapter-content-body">
									<div className="last-update">
										<span>Last update:&nbsp;</span>
										<span className="time">{chapterInfo.time}&nbsp;-&nbsp;</span>
										<span className="date">{chapterInfo.date}</span>
									</div>
									<div className="chapter-info">
										<span>Chapter&nbsp;</span>
										<span>{chapterInfo.chapterNumber}:&nbsp;</span>
										<span>{chapterInfo.chapterTitle}</span>
									</div>
									<div className="chapter-content">{chapterInfo.chapterContent}</div>
								</div>
							</div>
						);
					}
				})()}

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
		fetchChapterInfo: (chapterId) => dispatch(actions.fetchChapterInfo(chapterId)),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChapterContent));

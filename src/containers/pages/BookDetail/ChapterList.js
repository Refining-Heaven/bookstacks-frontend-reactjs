import { Component } from 'react';
import { connect } from 'react-redux';
import { convertStringToAddressBar } from '../../../utils';
import * as actions from '../../../store/actions';
import { withRouter } from '../../../utils';
import './BookDetail.scss';

class ChapterList extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.props.fetchAllChapter(this.props.bookInfo.id);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.bookInfo !== this.props.bookInfo) {
			this.props.fetchAllChapter(this.props.bookInfo.id);
		}
	}

	handleReadChapter = async (chapterId, chapterNumber) => {
		const { bookInfo } = this.props;
		await this.props.fetchChapterInfo(chapterId);
		const convertedBookName = convertStringToAddressBar(bookInfo.bookName);
		this.props.navigate(`/book/${convertedBookName}/chapter/${chapterNumber}/id/${chapterId}`);
	};

	render() {
		const { allChapters } = this.props;
		return (
			<div className="chapter-list">
				{allChapters &&
					allChapters.length > 0 &&
					allChapters.map((item, index) => {
						return (
							<div
								className="chapter-item"
								key={index}
								onClick={() => this.handleReadChapter(item.id, item.chapterNumber)}
							>
								<div className="content-up">
									<div className="number">
										<span>Chapter&nbsp;</span>
										<span>{item.chapterNumber}:&nbsp;</span>
									</div>
									<div className="title">
										<span>{item.chapterTitle}</span>
									</div>
								</div>
								<div className="content-down">
									<div className="last-update">
										<span>Last update:&nbsp;</span>
										<span className="date">{item.date}</span>
									</div>
								</div>
							</div>
						);
					})}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		bookInfo: state.app.bookInfo,
		allChapters: state.app.allChapters,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllChapter: (bookId) => dispatch(actions.fetchAllChapter(bookId)),
		fetchChapterInfo: (chapterId) => dispatch(actions.fetchChapterInfo(chapterId)),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChapterList));

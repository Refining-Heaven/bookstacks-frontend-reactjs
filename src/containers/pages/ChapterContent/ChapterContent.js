import { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import MediaQuery from 'react-responsive';
import * as actions from '../../../store/actions';
import { THEMES, TYPE, dateCalculation, withRouter } from '../../../utils';
import ChapterControl from '../../../layouts/components/Control/ChapterControl';
import CommentControl from '../../../layouts/components/Control/CommentControl';
import CommentSection from '../../components/CommentSection/CommentSection';
import ChapterListModal from './ChapterListModal';
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
		const { chapterInfo, theme } = this.props;
		let updateDate = '';
		if (chapterInfo) {
			const lastUpdateTime = new Date(chapterInfo.updatedAt);
			updateDate = dateCalculation(lastUpdateTime);
		}
		return (
			<>
				<MediaQuery minWidth={1024}>
					<div id="chapter-content-container">
						{(() => {
							if (chapterInfo) {
								return (
									<div className={theme === THEMES.LIGHT ? 'chapter-content-body' : 'chapter-content-body dark-mode'}>
										<div className="last-update">
											<span>
												<FormattedMessage id="label.last-update" />
												:&nbsp;
											</span>
											<span className="time">{updateDate === '' ? '' : updateDate}</span>
										</div>
										<div className="chapter-info">
											<span>
												<FormattedMessage id="label.chapter" />
												&nbsp;
											</span>
											<span>{chapterInfo.chapterNumber}:&nbsp;</span>
											<span>{chapterInfo.chapterTitle}</span>
										</div>
										<div className="chapter-content">{chapterInfo.chapterContent}</div>
									</div>
								);
							}
						})()}
					</div>
				</MediaQuery>
				<MediaQuery minWidth={740} maxWidth={1024}>
					<div id="chapter-content-container">
						{(() => {
							if (chapterInfo) {
								return (
									<div className={theme === THEMES.LIGHT ? 'chapter-content-body' : 'chapter-content-body dark-mode'}>
										<div className="last-update">
											<span>
												<FormattedMessage id="label.last-update" />
												:&nbsp;
											</span>
											<span className="time">{updateDate === '' ? '' : updateDate}</span>
										</div>
										<div className="chapter-info">
											<span>
												<FormattedMessage id="label.chapter" />
												&nbsp;
											</span>
											<span>{chapterInfo.chapterNumber}:&nbsp;</span>
											<span>{chapterInfo.chapterTitle}</span>
										</div>
										<div className="chapter-content">{chapterInfo.chapterContent}</div>
									</div>
								);
							}
						})()}
					</div>
				</MediaQuery>
				<MediaQuery maxWidth={740}>
					<div id="chapter-content-container">
						{(() => {
							if (chapterInfo) {
								return (
									<div className={theme === THEMES.LIGHT ? 'chapter-content-body' : 'chapter-content-body dark-mode'}>
										<div className="last-update">
											<span>
												<FormattedMessage id="label.last-update" />
												:&nbsp;
											</span>
											<span className="time">{updateDate === '' ? '' : updateDate}</span>
										</div>
										<div className="chapter-info">
											<span>
												<FormattedMessage id="label.chapter" />
												&nbsp;
											</span>
											<span>{chapterInfo.chapterNumber}:&nbsp;</span>
											<span>{chapterInfo.chapterTitle}</span>
										</div>
										<div className="chapter-content">{chapterInfo.chapterContent}</div>
									</div>
								);
							}
						})()}
					</div>
				</MediaQuery>
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
		theme: state.app.theme,
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

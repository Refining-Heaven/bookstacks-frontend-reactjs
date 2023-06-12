import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { withRouter } from '../../../utils';
import './ManageChapter.scss';

class ChapterPreview extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		const { chapterInfo } = this.props;
		return (
				<div className="chapter-preview-container">
					{(() => {
						if (chapterInfo) {
							return (
								<div className="chapter-preview-body">
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
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		chapterInfo: state.app.chapterInfo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchChapterInfo: (chapterId) => dispatch(actions.fetchChapterInfo(chapterId)),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChapterPreview));

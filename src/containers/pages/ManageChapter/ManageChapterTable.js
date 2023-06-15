import { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import './ManageChapter.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

class ManageChapterTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
	}

	handleViewChapterInfo = (chapterId) => {
		this.props.fetchChapterInfo(chapterId)
	}

	handleOpenManageChapterModal = async (chapterId) => {
		await this.props.fetchChapterInfo(chapterId)
		this.props.handleOpenManageChapterModal()
	}

	handleDeleteChapter = async (chapterId) => {
		await this.props.handleDeleteChapter(chapterId);
		if (this.props.chapterInfo !== null) {
			this.props.clearChapterInfo();
		}
		this.props.fetchAllChapter(this.props.bookId);
	};

	render() {
		const { allChapters } = this.props;
		return (
      <div className="manage-chapter-table">
				<table>
					<thead>
						<tr>
							<th className="chapter-number">
								<FormattedMessage id="label.chapter" />
							</th>
							<th className="chapter-title">
								<FormattedMessage id="label.title" />
							</th>
							<th className="options">
								<FormattedMessage id="label.options" />
							</th>
						</tr>
					</thead>
					<tbody className="chapter-list">
						{allChapters && allChapters.length === 0 &&
							<tr>
								<td colSpan='3' className="no-chapter">
									Không có chương
								</td>
							</tr>
						}
						{allChapters &&
							allChapters.length > 0 &&
							allChapters.map((item, index) => {
								return (
									<tr key={index} onClick={() => this.handleViewChapterInfo(item.id)}>
										<td className="chapter-number">{item.chapterNumber}</td>
										<td className="chapter-title">{item.chapterTitle}</td>
										<td className="options">
											<button className="btn-edit" onClick={() => this.handleOpenManageChapterModal(item.id)}>
												<FontAwesomeIcon icon={faPencilAlt} className="edit-icon" />
											</button>
											<button className="btn-delete" onClick={() => this.handleDeleteChapter(item.id)}>
												<FontAwesomeIcon icon={faTrash} className="delete-icon" />
											</button>
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
    )
	}
}

const mapStateToProps = (state) => {
	return {
		allChapters: state.app.allChapters,
		chapterInfo: state.app.chapterInfo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchChapterInfo: (chapterId) => dispatch(actions.fetchChapterInfo(chapterId)),
		fetchAllChapter: (bookId) => dispatch(actions.fetchAllChapter(bookId)),
		handleOpenManageChapterModal: () => dispatch(actions.handleOpenManageChapterModal()),
		handleDeleteChapter: (chapterId) => dispatch(actions.handleDeleteChapter(chapterId)),
		clearChapterInfo: () => dispatch(actions.clearChapterInfo()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageChapterTable);

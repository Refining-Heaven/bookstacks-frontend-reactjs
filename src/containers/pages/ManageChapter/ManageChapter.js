import { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { THEMES, TITLE } from '../../../utils';
import * as actions from '../../../store/actions';
import SubHeader from '../../../layouts/components/SubHeader/SubHeader';
import ManageChapterModal from './ManageChapterModal';
import ManageChapterTable from './ManageChapterTable';
import ChapterPreview from "./ChapterPreview";
import './ManageChapter.scss';

class ManageChapter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bookId: '',
			bookList: '',
			selectedBook: '',
			isDisabled: true,
			isLoading: true
		};
	}

	async componentDidMount() {
		this.props.clearAllChapter();
		await this.props.clearChapterInfo()
		await this.props.fetchAllBook();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.allBooks !== this.props.allBooks) {
			const { allBooks } = this.props;
			if (allBooks && allBooks.length > 0) {
				this.buildDataInputSelect(allBooks);
			}
		}
	}

	buildDataInputSelect = (inputData) => {
		let result = [];
		if (inputData && inputData.length > 0) {
			// eslint-disable-next-line array-callback-return
			inputData.map((item, index) => {
				const object = {};
				object.label = item.bookName;
				object.value = item.id;
				result.push(object);
			});
		}
		this.setState({
			bookList: result,
			isDisabled: false,
			isLoading: false
		});
	};

	handleOnChangeSelect = async (selectedBook) => {
		if (selectedBook && selectedBook.value !== '') {
			await this.props.fetchAllChapter(selectedBook.value);
			this.setState({
				selectedBook: selectedBook,
				bookId: selectedBook.value,
			});
		} else {
			await this.props.clearAllChapter();
			this.setState({
				selectedBook: '',
				bookId: '',
			});
		}
	};

	handleOpenManageChapterModal = () => {
		if (this.state.bookId !== '') {
			if (this.props.chapterInfo !== null) {
				this.props.clearChapterInfo()
			} 
			this.props.handleOpenManageChapterModal();
		} else {
			toast.warning('Please select book');
		}
	};

	render() {
		const { bookId, bookList, isDisabled, isLoading } = this.state;
		const { chapterInfo, theme } = this.props
		return (
			<>
				<SubHeader title={TITLE.MANAGE_CHAPTER} />
				<div className={theme === THEMES.LIGHT ? "content-body" : "content-body dark-mode"}>
					<div className="manage-chapter-container">
						<div className="content-left">
							{chapterInfo !== null && <ChapterPreview />}
						</div>
						<div className="content-right">
							<div className="select-book-container">
								<div className="select-book">
									<label>
										<FormattedMessage id="label.book-name" />:
									</label>
									<Select
										value={this.state.selectedBook}
										onChange={this.handleOnChangeSelect}
										options={bookList}
										isDisabled={isDisabled}
										isLoading={isLoading}
										isClearable={true}
										className="select-book-name"
										name="selectedBook"
									/>
								</div>
								<button className="btn-add-chapter" onClick={() => this.handleOpenManageChapterModal()}>
									<FormattedMessage id="button.add" />
								</button>
							</div>
							<div className="chapter-list">
								<ManageChapterTable bookId={bookId} />
							</div>
							<ManageChapterModal bookId={bookId} />
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		chapterInfo: state.app.chapterInfo,
		allBooks: state.app.allBooks,
		allChapters: state.app.allChapters,
		theme: state.app.theme
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllBook: () => dispatch(actions.fetchAllBook()),
		fetchAllChapter: (bookId) => dispatch(actions.fetchAllChapter(bookId)),
		handleOpenManageChapterModal: () => dispatch(actions.handleOpenManageChapterModal()),
		clearAllChapter: () => dispatch(actions.clearAllChapter()),
		clearChapterInfo: () => dispatch(actions.clearChapterInfo()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageChapter);

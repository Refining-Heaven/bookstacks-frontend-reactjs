import { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import { TITLE } from '../../../utils';
import * as actions from '../../../store/actions';
import SubHeader from '../../../layouts/components/SubHeader/SubHeader';
import './ManageChapter.scss';
import ManageChapterModal from './ManageChapterModal';
import ManageChapterTable from './ManageChapterTable';
import { toast } from 'react-toastify';

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
			this.props.handleOpenManageChapterModal();
		} else {
			toast.warning('Please select book');
		}
	};

	render() {
		const { bookId, bookList, isDisabled, isLoading } = this.state;
		// console.log(bookList);
		return (
			<>
				<SubHeader title={TITLE.MANAGE_CHAPTER} />
				<div className="content-body">
					<div className="manage-chapter-container">
						<div className="content-left"></div>
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
								<ManageChapterTable />
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
		allBooks: state.app.allBooks,
		allChapters: state.app.allChapters,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllBook: () => dispatch(actions.fetchAllBook()),
		fetchAllChapter: (bookId) => dispatch(actions.fetchAllChapter(bookId)),
		handleOpenManageChapterModal: () => dispatch(actions.handleOpenManageChapterModal()),
		clearAllChapter: () => dispatch(actions.clearAllChapter()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageChapter);

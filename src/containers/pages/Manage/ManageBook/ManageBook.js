import { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";
import * as actions from '../../../../store/actions'
import SubHeader from '../../../../layouts/components/SubHeader/SubHeader';
import { TITLE } from '../../../../utils';
import Book from '../../../components/Book/Book'
import ManageBookModal from './ManageBookModal';
import ManageBookTable from "./ManageBookTable";
import './ManageBook.scss';

class ManageBook extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bookList: [],
			bookName: '',
		};
	}

	componentDidMount() {
		this.props.clearBookInfo()
		this.props.fetchAllBook();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.bookList !== this.props.bookList) {
			this.setState({
				bookList: this.props.bookList,
			});
			this.props.clearBookInfo()
		}
	}

	handleOnChangeInput = (e, id) => {
		const copyState = { ...this.state };
		copyState[id] = e.target.value;
		this.setState({
			...copyState,
		});
	}

	handleAddNewBook = async () => {
		const {bookName} = this.state
		await this.props.handleAddNewBook({
			bookName: bookName,
			uploaderId: this.props.userInfo.id
		})
		this.setState({
			bookName: ''
		})
		this.props.fetchAllBook();
	}

	render() {
		const {bookList, bookName} = this.state
		const {bookInfo} = this.props
		return (
			<>
				<SubHeader title={TITLE.MANAGE_BOOK} />
				<div className="content-body">
					<div className="manage-book-container">
						<div className="content-left">
							{bookInfo !== null && <Book isShowIntro={true} data={bookInfo} />}
							
						</div>
						<div className="content-right">
							<div className="add-book">
							<div className="input-book-name">
								<label><FormattedMessage id="manage-book.modal.book-name" />:</label>
								<input type="text" value={bookName} onChange={(e) => this.handleOnChangeInput(e, 'bookName')} />
							</div>
								<button className="btn-add-book" onClick={() => this.handleAddNewBook()}>
									<FormattedMessage id="button.add" />
								</button>
							</div>
							<ManageBookModal />
							<div className="book-list">
								<ManageBookTable bookList={bookList} />
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userInfo: state.user.userInfo,
		bookInfo: state.app.bookInfo,
		bookList: state.app.bookList,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleAddNewBook: (data) => dispatch(actions.handleAddNewBook(data)),
		fetchAllBook: () => dispatch(actions.fetchAllBook()),
		clearBookInfo: () => dispatch(actions.clearBookInfo()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBook);

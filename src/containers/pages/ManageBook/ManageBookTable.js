import { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import './ManageBook.scss';

class ManageBookTable extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleViewBookInfo = (bookId) => {
		this.props.fetchBookInfo(bookId);
	};

	handleOpenManageBookModal = async (bookId) => {
		await this.props.fetchBookInfo(bookId);
		this.props.handleOpenManageBookModal();
	};

	handleDeleteBook = async (bookId) => {
		await this.props.handleDeleteBook(bookId);
		this.props.fetchAllBook();
	};

	render() {
		const { allBooks } = this.props;
		return (
			<div className="manage-book-table">
				<table>
					<thead>
						<tr>
							<th>
								<FormattedMessage id="label.book-name" />
							</th>
							<th className="options">
								<FormattedMessage id="label.options" />
							</th>
						</tr>
					</thead>
					<tbody>
						{allBooks &&
							allBooks.length > 0 &&
							allBooks.map((item, index) => {
								return (
									<tr key={index} onClick={() => this.handleViewBookInfo(item.id)}>
										<td className="book-name">{item.bookName}</td>
										<td className="options">
											<button className="btn-edit" onClick={() => this.handleOpenManageBookModal(item.id)}>
												<FontAwesomeIcon icon={faPencilAlt} className="edit-icon" />
											</button>
											<button className="btn-delete" onClick={() => this.handleDeleteBook(item.id)}>
												<FontAwesomeIcon icon={faTrash} className="delete-icon" />
											</button>
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		allBooks: state.app.allBooks,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleOpenManageBookModal: () => dispatch(actions.handleOpenManageBookModal()),
		handleDeleteBook: (bookId) => dispatch(actions.handleDeleteBook(bookId)),
		fetchAllBook: () => dispatch(actions.fetchAllBook()),
		fetchBookInfo: (bookId) => dispatch(actions.fetchBookInfo(bookId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBookTable);

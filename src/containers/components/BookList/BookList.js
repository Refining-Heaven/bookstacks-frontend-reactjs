import { Component } from 'react';
import { connect } from 'react-redux';
import {LANGUAGES, withRouter } from '../../../utils';
import Book from '../../components/Book/Book';
import './BookList.scss';

class BookList extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { showTitle, bookList, language } = this.props;
		return (
			<div className="book-list-section">
				{(() => {
					if (bookList && bookList.genreData && showTitle === true) {
						if (language === LANGUAGES.VI) {
							return <div className="list-section-title">{bookList.genreData.valueVi}</div>;
						} else {
							return <div className="list-section-title">{bookList.genreData.valueEn}</div>;
						}
					}
				})()}
				<div className="list-section-body">
					{bookList &&
						bookList.allBook &&
						bookList.allBook.length > 0 &&
						bookList.allBook.map((item, index) => {
							return <Book data={item.bookData} key={index} />;
						})}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookList));

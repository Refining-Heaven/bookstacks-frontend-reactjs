import { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES, THEMES, withRouter } from '../../../utils';
import * as actions from '../../../store/actions';
import SubHeader from '../../../layouts/components/SubHeader/SubHeader';
import Book from '../../components/Book/Book'
import './BooksFound.scss';

class BooksFound extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	async componentDidMount() {
		if (this.props && this.props.params && this.props.params.id) {
			const genreId = this.props.params.id;
			await this.props.fetchAllBookByGenre(genreId);
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.booksFound !== this.props.booksFound) {
		}
	}

	render() {
		const { language, booksFound, theme } = this.props;
		console.log(booksFound);
		return (
			<>
				{(() => {
					if (booksFound) {
						if (language === LANGUAGES.VI) {
							return <SubHeader title={booksFound.genreData.valueVi} />;
						} else {
							return <SubHeader title={booksFound.genreData.valueEn} />;
						}
					} else {
						return <SubHeader />
					}
				})()}
				<div className={theme === THEMES.LIGHT ? "content-body" : "content-body dark-mode"}>
					<div className="book-found-container">
						<div className="book-found">
							{booksFound && booksFound.allBook && booksFound.allBook.length > 0 &&
								booksFound.allBook.map((item, index) => {
									return (
										<Book data={item.bookData} key={index}/>
									)
								})
							}
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		booksFound: state.app.booksFound,
		theme: state.app.theme
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllBookByGenre: (genreId) => dispatch(actions.fetchAllBookByGenre(genreId)),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BooksFound));

import { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES, withRouter } from '../../../utils';
import * as actions from '../../../store/actions';
import SubHeader from '../../../layouts/components/SubHeader/SubHeader';
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
		const { language, booksFound } = this.props;
		return (
			<>
				{(() => {
					if (booksFound) {
						if (language === LANGUAGES.VI) {
							return <SubHeader title={booksFound.genreData.valueVi} />;
						} else {
							return <SubHeader title={booksFound.genreData.valueEn} />;
						}
					}
				})()}
				<div className="content-body">
					<div className="book-found">
						Hi
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
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllBookByGenre: (genreId) => dispatch(actions.fetchAllBookByGenre(genreId)),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BooksFound));

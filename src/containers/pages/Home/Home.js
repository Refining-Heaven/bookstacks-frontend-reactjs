import { Component } from 'react';
import { connect } from 'react-redux';

import { settings } from '../../../config/reactSlider';
import { TITLE, STATUS_TITLE, GENRE_TITLE, GENRE_ID, THEMES } from '../../../utils';
import * as actions from '../../../store/actions';
import * as services from '../../../services'
import BookSlider from '../../components/BookSlider/BookSlider';
import SubHeader from '../../../layouts/components/SubHeader/SubHeader';
import './Home.scss';
import Book from "../../components/Book/Book";
import BookList from "../../components/BookList/BookList";

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			actionList: [],
			adventureList: [],
			mysteryList: [],
			fantasyList: [],
			detectiveList: [],
			comedyList: [],
			tragedyList: [],
			martialArtsList: [],
			dramaList: [],
			supernaturalList: [],
			sci_FiList: [],
			mechaList: [],
			horrorList: []
		}
	}

	async componentDidMount() {
		await this.props.fetchAllNewBook(6);
		const action = await services.getAllBookByGenreService(GENRE_ID.ACTION, 6)
		const mystery = await services.getAllBookByGenreService(GENRE_ID.MYSTERY, 6)
		const supernatural = await services.getAllBookByGenreService(GENRE_ID.SUPERNATURAL, 6)
		this.setState({
			actionList: action.data.data,
			mysteryList: mystery.data.data,
			supernaturalList: supernatural.data.data
		})
	}

	

	render() {
		const { newBooks, theme } = this.props;
		const {actionList, mysteryList} = this.state
		return (
			<>
				<SubHeader title={TITLE.HOME} />
				<div className={theme === THEMES.LIGHT ? "content-body" : "content-body dark-mode"}>
					<BookSlider settings={settings} name={STATUS_TITLE.UPDATE} data={newBooks} />
					<BookList showTitle={true} bookList={actionList} />
					<BookList showTitle={true} bookList={mysteryList} />
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		accountInfo: state.user.accountInfo,
		newBooks: state.app.newBooks,
		theme: state.app.theme
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleAddNewBook: (data) => dispatch(actions.handleAddNewBook(data)),
		fetchAllNewBook: (limit) => dispatch(actions.fetchAllNewBook(limit)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

import { Component } from 'react';
import { connect } from 'react-redux';

import { settings } from '../../../config/reactSlider';
import { TITLE, STATUS_TITLE, KIND_TITLE, KIND_ID, THEMES } from '../../../utils';
import * as actions from '../../../store/actions';
import * as services from '../../../services'
import BookSlider from '../../components/BookSlider/BookSlider';
import SubHeader from '../../../layouts/components/SubHeader/SubHeader';
import './Home.scss';

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			allegoryList: [],
			novelList: [],
			fairyTaleList: [],
			funnyStoryList: [],
			ghostStoryList: [],
			horrorStoryList: [],
			mythList: [],
			parableList: [],
			shortStoryList: []
		}
	}

	async componentDidMount() {
		await this.props.fetchAllNewBook();
		const allMyth = await services.getAllBookByKindService(KIND_ID.MYTH, 6)
		const allNovel = await services.getAllBookByKindService(KIND_ID.NOVEL, 6)
		this.setState({
			mythList: allMyth.data.data,
			novelList: allNovel.data.data
		})
	}

	

	render() {
		const { newBooks, theme } = this.props;
		const {mythList, novelList} = this.state
		console.log(novelList);
		return (
			<>
				<SubHeader title={TITLE.HOME} />
				<div className={theme === THEMES.LIGHT ? "content-body" : "content-body dark-mode"}>
					<BookSlider settings={settings} name={STATUS_TITLE.NEW} data={newBooks} />
					<BookSlider settings={settings} name={KIND_TITLE.NOVEL} data={novelList} />
					<BookSlider settings={settings} name={KIND_TITLE.MYTH} data={mythList} />
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
		fetchAllNewBook: () => dispatch(actions.fetchAllNewBook()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

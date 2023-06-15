import { Component } from 'react';
import { connect } from 'react-redux';

import { settings } from '../../../config/reactSlider';
import { TITLE, STATUS_TITLE, KIND_TITLE } from '../../../utils';
import * as actions from '../../../store/actions';
import BookSlider from '../../components/BookSlider/BookSlider';
import SubHeader from '../../../layouts/components/SubHeader/SubHeader';
import './Home.scss';

class Home extends Component {
	componentDidMount() {
		this.props.fetchAllNewBook();
	}

	render() {
		const { newBooks } = this.props;
		return (
			<>
				<SubHeader title={TITLE.HOME} />
				<div className="content-body">
					<BookSlider settings={settings} name={STATUS_TITLE.NEW} data={newBooks} />
					{/* <BookSlider settings={settings} name={STATUS_TITLE.ACCOMPLISHED} />
					<BookSlider settings={settings} name={KIND_TITLE.ALLEGORY} />
					<BookSlider settings={settings} name={KIND_TITLE.NOVEL} />
					<BookSlider settings={settings} name={KIND_TITLE.SHORT_STORY} /> */}
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		accountInfo: state.user.accountInfo,
		newBooks: state.app.newBooks,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleAddNewBook: (data) => dispatch(actions.handleAddNewBook(data)),
		fetchAllNewBook: () => dispatch(actions.fetchAllNewBook()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

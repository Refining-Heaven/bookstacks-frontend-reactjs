import { Component } from 'react';

import './Home.scss';
import { TITLE, STATUS_TITLE, KIND_TITLE } from '../../../utils'
import BookSlider from '../../components/BookSlider/BookSlider';
import SubHeader from '../../../layouts/components/SubHeader/SubHeader';

class Home extends Component {
	render() {
		const settings = {
			dots: false,
			infinite: false,
			speed: 500,
			slidesToShow: 2,
			slideToScroll: 1,
		};
		return (
			<>
				<SubHeader title={TITLE.HOME} />
				<div className="content-body">
					<BookSlider settings={settings} name={STATUS_TITLE.NEW} />
					<BookSlider settings={settings} name={STATUS_TITLE.ACCOMPLISHED} />
					<BookSlider settings={settings} name={KIND_TITLE.ALLEGORY} />
					<BookSlider settings={settings} name={KIND_TITLE.NOVEL} />
					<BookSlider settings={settings} name={KIND_TITLE.SHORT_STORY} />
				</div>
			</>
		);
	}
}

export default Home;

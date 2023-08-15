import { Component } from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { THEMES } from '../../../utils';
import Book from '../Book/Book';
import './BookSlider.scss';

class BookSlider extends Component {
	render() {
		const { data, theme } = this.props;
		console.log("data", data);
		return (
			<div className={theme === THEMES.LIGHT ? 'book-slider-section' : 'book-slider-section dark-mode'}>
				<div className="slider-section-title">{this.props.name}</div>
				<div className="slider-section-body">
					{data && data.length > 0 && (
						<Slider {...this.props.settings}>
							{data &&
								data.length > 0 &&
								data.map((item, index) => {
									return (
										<div className="section-customize" key={index}>
											<Book data={item.chapterBookData} />
										</div>
									);
								})}
						</Slider>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		theme: state.app.theme,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookSlider);

import { Component } from 'react';
import Slider from 'react-slick';
import { connect } from "react-redux";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Book from '../Book/Book';
import './BookSlider.scss';

class BookSlider extends Component {
	render() {
		const { data } = this.props;
		return (
			<div className="book-slider-section">
				<div className="section-title">{this.props.name}</div>
				<div className="section-body">
					<Slider {...this.props.settings}>
						{data &&
							data.length > 0 &&
							data.map((item, index) => {
								return (
									<div className="section-customize" key={index}>
										<Book data={item} />
									</div>
								);
							})}
					</Slider>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookSlider);

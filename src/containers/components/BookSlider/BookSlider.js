import { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Book from '../Book/Book'
import './BookSlider.scss';

class BookSlider extends Component {
	render() {
		return (
			<div className="book-slider-section">
				<div className="section-title">{this.props.name}</div>
				<div className="section-body">
					<Slider {...this.props.settings}>
						<div className="section-customize">
							<Book />
						</div>
						<div className="section-customize">
							<Book />
						</div>
						<div className="section-customize">
							<Book />
						</div>
						<div className="section-customize">
							<Book />
						</div>
						<div className="section-customize">
							<Book />
						</div>
						<div className="section-customize">
							<Book />
						</div>
						<div className="section-customize">
							<Book />
						</div>
						<div className="section-customize">
							<Book />
						</div>
						<div className="section-customize">
							<Book />
						</div>
					</Slider>
				</div>
			</div>
		);
	}
}

export default BookSlider;

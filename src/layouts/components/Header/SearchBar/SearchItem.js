import { Component } from 'react';
import { connect } from 'react-redux';
import { Buffer } from 'buffer';
import { withRouter } from '../../../../utils';
import * as actions from '../../../../store/actions';
import images from '../../../../assets/images';
import './SearchBar.scss';

class SearchItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			previewImgURL: '',
		};
	}

	componentDidMount() {
		const { data } = this.props;
		let imageBase64 = '';
		if (data.coverImage) {
			imageBase64 = new Buffer(data.coverImage, 'base64').toString('binary');
		}
		this.setState({
			previewImgURL: imageBase64,
		});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.data !== this.props.data) {
			const { data } = this.props;
			let imageBase64 = '';
			if (data.coverImage) {
				imageBase64 = new Buffer(data.coverImage, 'base64').toString('binary');
			}
			this.setState({
				previewImgURL: imageBase64,
			});
		}
	}

	handleViewBookDetail = async (bookId) => {
		await this.props.fetchBookInfoById(bookId);
		await this.props.clearBooksFound();
		this.props.navigate(`/book-detail/${bookId}`);
	};

	render() {
		const { previewImgURL } = this.state;
		const { data } = this.props;
		return (
			<div className="item-found" onClick={() => this.handleViewBookDetail(data.id)}>
				<div className="book-cover-image">
					<img src={previewImgURL === '' ? images.noCoverImage : previewImgURL} alt="" />
				</div>
				<div className="book-info">
					<div className="book-name">{data.bookName}</div>
					<div className="book-another-name">{data.anotherName}</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchBookInfoById: (bookId) => dispatch(actions.fetchBookInfoById(bookId)),
		clearBooksFound: () => dispatch(actions.clearBooksFound()),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchItem));

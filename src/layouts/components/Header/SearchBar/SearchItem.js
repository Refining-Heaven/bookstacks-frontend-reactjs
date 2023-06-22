import { Component } from 'react';
import { connect } from 'react-redux';
import { Buffer } from 'buffer';
import { convertStringToAddressBar, withRouter } from '../../../../utils';
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

	handleViewBookDetail = async (bookId, bookName) => {
		await this.props.fetchBookInfo(bookId);
		await this.props.clearBooksFound();
		const convertedBookName = convertStringToAddressBar(bookName)
		window.location.assign(`/book-detail/${convertedBookName}/id/${bookId}`);
	};

	render() {
		const { previewImgURL } = this.state;
		const { data } = this.props;
		return (
			<div className="item-found" onClick={() => this.handleViewBookDetail(data.id, data.bookName)}>
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
		fetchBookInfo: (bookId) => dispatch(actions.fetchBookInfo(bookId)),
		clearBooksFound: () => dispatch(actions.clearBooksFound()),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchItem));

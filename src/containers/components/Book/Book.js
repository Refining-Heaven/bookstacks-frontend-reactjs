import { Component } from 'react';
import { connect } from 'react-redux';
import { Buffer } from 'buffer';
import { FormattedMessage } from 'react-intl';
import images from '../../../assets/images';
import * as actions from '../../../store/actions';
import { withRouter, convertStringToAddressBar, LANGUAGES } from '../../../utils';
import './Book.scss';

class Book extends Component {
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
    const convertedBookName = convertStringToAddressBar(bookName)
		this.props.navigate(`/book-detail/${convertedBookName}/id/${bookId}`);
	};

	render() {
		const { previewImgURL } = this.state;
		const { language, isShowIntro, data } = this.props;
		return (
			<div className="book" onDoubleClick={() => this.handleViewBookDetail(data.id, data.bookName)}>
				<div className="book-cover">
					<div className="book-cover-image">
						<img src={previewImgURL === '' ? images.noCoverImage : previewImgURL} alt="" />
					</div>
				</div>
				<div className="book-info">
					<div className="book-info-content long">
						<span className="title">
							<FormattedMessage id="book-info.book-name" />:{' '}
						</span>
						<span className="content">{data.bookName}</span>
					</div>
					<div className="book-info-content long">
						<span className="title">
							<FormattedMessage id="book-info.another-name" />:{' '}
						</span>
						<span className="content">{data.anotherName}</span>
					</div>
					<div className="book-info-content">
						<span className="title">
							<FormattedMessage id="book-info.author" />:{' '}
						</span>
						<span className="content">{data.author}</span>
					</div>
					<div className="book-info-content">
						<span className="title">
							<FormattedMessage id="book-info.status" />:{' '}
						</span>
						<span className="content">
							{language === LANGUAGES.VI ? data.statusData.valueVi : data.statusData.valueEn}
						</span>
					</div>
					<div className="book-info-content">
						<span className="title">
							<FormattedMessage id="book-info.kind" />:{' '}
						</span>
						<span className="content">{language === LANGUAGES.VI ? data.kindData.valueVi : data.kindData.valueEn}</span>
					</div>
					<div className="book-info-content">
						<span className="title">
							<FormattedMessage id="book-info.version" />:{' '}
						</span>
						<span className="content">
							{language === LANGUAGES.VI ? data.versionData.valueVi : data.versionData.valueEn}
						</span>
					</div>
					<div className="book-info-content">
						<span className="title">
							<FormattedMessage id="book-info.language" />:{' '}
						</span>
						<span className="content">
							{language === LANGUAGES.VI ? data.languageData.valueVi : data.languageData.valueEn}
						</span>
					</div>
				</div>
				{isShowIntro === true && (
					<div className="book-intro">
						<div className="book-intro-content">
							<span className="title">
								<FormattedMessage id="book-info.intro" />:{' '}
							</span>
							<div className="content">{data.intro}</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		bookInfo: state.app.bookInfo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchBookInfo: (bookId) => dispatch(actions.fetchBookInfo(bookId)),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Book));

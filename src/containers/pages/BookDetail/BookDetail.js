import { Component } from 'react';
import { connect } from 'react-redux';
import { Buffer } from 'buffer';
import SubHeader from '../../../layouts/components/SubHeader/SubHeader';
import images from "../../../assets/images";
import * as actions from '../../../store/actions';
import { withRouter, LANGUAGES } from '../../../utils';
import './BookDetail.scss';
import { FormattedMessage } from "react-intl";

class BookDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentBookId: '',
			previewImgURL: '',
		};
	}

	componentDidMount() {
		if (this.props && this.props.params && this.props.params.id) {
			const bookId = this.props.params.id;
			this.props.fetchBookInfoById(bookId);
			this.setState({
				currentBookId: bookId,
			});
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.bookInfo !== this.props.bookInfo) {
			const { bookInfo } = this.props;
			let imageBase64 = '';
			if (bookInfo.coverImage) {
				imageBase64 = new Buffer(bookInfo.coverImage, 'base64').toString('binary');
			}
			this.setState({
				previewImgURL: imageBase64,
			});
		}
	}

	render() {
		const { language,bookInfo } = this.props;
		const { previewImgURL } = this.state;
		return (
			<>
				<SubHeader title={bookInfo && bookInfo.bookName} />
				<div className="content-body">
					{(() => {
						if (bookInfo) {
							return (
								<div className="book-detail">
									<div className="book-banner">
										<div className="banner-image" style={{ backgroundImage: `url(${previewImgURL})` }}></div>
										<div className="banner-shade"></div>
									</div>
									<div className="book-cover-image">
										<img src={previewImgURL === '' ? images.noCoverImage : previewImgURL} alt="" />
									</div>
									<div className="book-name">
										<div className="name">
											<span>{bookInfo.bookName}</span>
										</div>
										<div className="another-name">
											<span>{bookInfo.anotherName}</span>
										</div>
									</div>
                  <div className="book-author">
                    <div className="info">
                      <span className="title"><FormattedMessage id="book-info.author" />: </span>
                      <span>{bookInfo.author}</span>
                    </div>
                    <div className="info">
                      <span className="title"><FormattedMessage id="book-info.author" />: </span>
                      <span>{bookInfo.author}</span>
                    </div>
                  </div>
                  <div className="book-info">
                    <div className="info">
                      <span className="title"><FormattedMessage id="book-info.status" />: </span>
                      <span>{language === LANGUAGES.VI ? bookInfo.statusData.valueVi : bookInfo.statusData.valueEn}</span>
                    </div>
                    <div className="info">
                      <span className="title"><FormattedMessage id="book-info.kind" />: </span>
                      <span>{language === LANGUAGES.VI ? bookInfo.kindData.valueVi : bookInfo.kindData.valueEn}</span>
                    </div>
                    <div className="info">
                      <span className="title"><FormattedMessage id="book-info.version" />: </span>
                      <span>{language === LANGUAGES.VI ? bookInfo.versionData.valueVi : bookInfo.versionData.valueEn}</span>
                    </div>
                    <div className="info">
                      <span className="title"><FormattedMessage id="book-info.language" />: </span>
                      <span>{language === LANGUAGES.VI ? bookInfo.languageData.valueVi : bookInfo.languageData.valueEn}</span>
                    </div>
                  </div>
								</div>
							);
						}
					})()}
				</div>
			</>
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
		fetchBookInfoById: (bookId) => dispatch(actions.fetchBookInfoById(bookId)),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookDetail));

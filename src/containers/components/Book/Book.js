import { Component } from 'react';
import { Buffer } from 'buffer';
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

	render() {
		const { previewImgURL } = this.state;
		const { isShowIntro, data } = this.props;
		return (
			<div className="book">
				<div className="book-cover">
					<div className="book-cover-image">
						<img src={previewImgURL} alt="" />
					</div>
				</div>
				<div className="book-info">
					<div className="book-info-content long">
						<span className="title">Book name: </span>
						<span className="content">{data.bookName}</span>
					</div>
					<div className="book-info-content long">
						<span className="title">Another name: </span>
						<span className="content">{data.anotherName}</span>
					</div>
					<div className="book-info-content">
						<span className="title">Author: </span>
						<span className="content">{data.author}</span>
					</div>
					<div className="book-info-content">
						<span className="title">Status: </span>
						<span className="content">{data.statusData.valueVi}</span>
					</div>
					<div className="book-info-content">
						<span className="title">Kind: </span>
						<span className="content">{data.kindData.valueVi}</span>
					</div>
					<div className="book-info-content">
						<span className="title">Version: </span>
						<span className="content">{data.versionData.valueVi}</span>
					</div>
					<div className="book-info-content">
						<span className="title">Language: </span>
						<span className="content">{data.languageData.valueVi}</span>
					</div>
					<div className="book-info-content">
						<span className="title">Genre: </span>
						<span className="content">Action, Adventure, Fantasy, Drama, Sci-fi</span>
					</div>
				</div>
				{isShowIntro === true && (
					<div className="book-intro">
						<div className="book-intro-content">
							<span className="title">Intro: </span>
							<span className="content">{data.intro}</span>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default Book;

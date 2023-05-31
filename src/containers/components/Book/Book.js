import { Component } from 'react';
import './Book.scss';

class Book extends Component {
	render() {
		const { isShowIntro } = this.props;
		return (
			<div className="book">
				<div className="book-cover">
					<div className="book-cover-image"></div>
				</div>
				<div className="book-info">
					<div className="book-info-content long">
						<span className="title">Name: </span>
						<span className="content">Grim of the nir withh the spear and the wings underwhere to the stair and the chair</span>
					</div>
					<div className="book-info-content long">
						<span className="title">Another name: </span>
						<span className="content">Grim of the nir withh the spear and the wings</span>
					</div>
					<div className="book-info-content">
						<span className="title">Author: </span>
						<span className="content">Gu Zhen Ren</span>
					</div>
					<div className="book-info-content">
						<span className="title">Status: </span>
						<span className="content">Updating</span>
					</div>
					<div className="book-info-content">
						<span className="title">Kind: </span>
						<span className="content">Novel</span>
					</div>
					<div className="book-info-content">
						<span className="title">Version: </span>
						<span className="content">Convert</span>
					</div>
					<div className="book-info-content">
						<span className="title">Language: </span>
						<span className="content">English</span>
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
							<span className="content">
								sabad adwdee fesfsrs grgthth thyttythty rthrtr ere vxv des ffsefs gesgeg rrrr gsef
							</span>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default Book;

import { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-regular-svg-icons';
import { Buffer } from 'buffer';
import { FormattedMessage } from 'react-intl';
import images from '../../../assets/images';
import { customStyles } from '../../../config/reactModal';
import * as actions from '../../../store/actions';
import { withRouter, LANGUAGES, TYPE, dateCalculation, THEMES } from '../../../utils';
import './CommentSection.scss';

class CommentSection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isComment: false,
			commentContent: '',
			isViewReply: '',
			isReply: false,
			replyContent: '',
		};
	}

	componentDidMount() {}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.commentSectionIsOpen !== this.props.commentSectionIsOpen) {
			if (this.props.commentSectionIsOpen === true) {
				this.setState({
					isComment: false,
				});
				if (this.props.bookInfo !== null && this.props.type === TYPE.BOOK) {
					this.props.fetchAllComment(this.props.bookInfo.id, TYPE.BOOK);
				}
				if (this.props.chapterInfo !== null && this.props.type === TYPE.CHAPTER) {
					this.props.fetchAllComment(this.props.chapterInfo.id, TYPE.CHAPTER);
				}
			}
		}
	}

	handleCloseCommentSection = () => {
		this.props.handleCloseCommentSection();
		this.setState({
			isViewReply: '',
		});
	};

	handleEnterComment = () => {
		this.setState({
			isComment: true,
			isViewReply: '',
		});
	};
	handleExitComment = () => {
		this.setState({
			isComment: false,
			commentContent: '',
		});
	};
	handleEnterReply = () => {
		this.setState({
			isReply: true,
		});
	};
	handleExitReply = () => {
		this.setState({
			isReply: false,
			replyContent: '',
		});
	};

	handleViewReply = async (commentIndex, commentId) => {
		if (this.state.isViewReply === commentIndex) {
			this.setState({
				isViewReply: '',
				isReply: false,
				replyContent: '',
				isComment: false,
			});
		} else {
			await this.props.fetchAllReply(commentId);
			this.setState({
				isViewReply: commentIndex,
				isReply: false,
				replyContent: '',
				isComment: false,
			});
		}
	};

	handleOnChangeInput = (e, id) => {
		const copyState = { ...this.state };
		const inputValue = e.target.value;
		if (inputValue.length < 300) {
			copyState[id] = inputValue;
			this.setState({
				...copyState,
			});
		}
	};

	handleAddComment = async () => {
		if (this.props.type === TYPE.BOOK) {
			await this.props.handleAddComment({
				content: this.state.commentContent,
				userId: this.props.accountInfo.id,
				bookId: this.props.bookInfo.id,
				type: this.props.type,
			});
			await this.props.fetchAllComment(this.props.bookInfo.id, TYPE.BOOK);
		}
		if (this.props.type === TYPE.CHAPTER) {
			await this.props.handleAddComment({
				content: this.state.commentContent,
				userId: this.props.accountInfo.id,
				bookId: this.props.bookInfo.id,
				chapterId: this.props.chapterInfo.id,
				type: this.props.type,
			});
			await this.props.fetchAllComment(this.props.chapterInfo.id, TYPE.CHAPTER);
		}
		this.setState({
			commentContent: '',
		});
	};

	handleAddReply = async (commentId) => {
		await this.props.handleAddReply({
			content: this.state.replyContent,
			userId: this.props.accountInfo.id,
			commentId: commentId,
		});
		await this.props.fetchAllReply(commentId);
		this.setState({
			replyContent: '',
		});
	};

	handleDeleteComment = async (id, type, commentId) => {
		await this.props.handleDeleteComment(id, type);
		if (type === TYPE.COMMENT) {
			if (this.props.bookInfo !== null && this.props.type === TYPE.BOOK) {
				this.props.fetchAllComment(this.props.bookInfo.id, TYPE.BOOK);
			}
			if (this.props.chapterInfo !== null && this.props.type === TYPE.CHAPTER) {
				this.props.fetchAllComment(this.props.chapterInfo.id, TYPE.CHAPTER);
			}
		}
		if (type === TYPE.REPLY) {
			await this.props.fetchAllReply(commentId);
		}
	};

	render() {
		const { isComment, commentContent, isViewReply, isReply, replyContent } = this.state;
		const { commentSectionIsOpen, allComments, allReplies, accountInfo, theme } = this.props;
		Modal.setAppElement(document.getElementById('root'));
		return (
			<Modal isOpen={commentSectionIsOpen} style={customStyles} contentLabel="Comment section">
				<div className={theme === THEMES.LIGHT ? 'comment-section-container' : 'comment-section-container dark-mode'}>
					<div className="close">
						<div className="close-btn" onClick={() => this.handleCloseCommentSection()}>
							<FontAwesomeIcon icon={faXmark} />
						</div>
					</div>
					{(() => {
						if (isComment === false) {
							return (
								<div className="btn-container">
									<div className="btn comment-btn" onClick={() => this.handleEnterComment()}>
										<FormattedMessage id="button.comment" />
									</div>
								</div>
							);
						} else {
							return (
								<div className="enter-comment">
									<label>
										<FormattedMessage id="label.enter-comment" />:
									</label>
									<textarea
										rows={4}
										value={commentContent}
										placeholder="max 300 char"
										onChange={(e) => this.handleOnChangeInput(e, 'commentContent')}
									></textarea>
									<div className="btn-container">
										<div className="btn comment-btn" onClick={() => this.handleAddComment()}>
											<FormattedMessage id="button.comment" />
										</div>
										<div className="btn close-btn" onClick={() => this.handleExitComment()}>
											<FormattedMessage id="button.close" />
										</div>
									</div>
								</div>
							);
						}
					})()}
					<div className="comment-content-container">
						{allComments &&
							allComments.length > 0 &&
							allComments.map((item, index) => {
								let userCommentImageBase64 = '';
								if (item.userCommentData.avatar) {
									userCommentImageBase64 = new Buffer(item.userCommentData.avatar, 'base64').toString('binary');
								}
								const lastCommentDate = new Date(item.createdAt);
								const commentDate = dateCalculation(lastCommentDate);
								return (
									<div className="comment-wrapper" key={index}>
										<div className="comment-content-wrapper">
											<div className="left-content">
												<div className="avatar">
													<img
														src={userCommentImageBase64 === '' ? images.noUserAvatar : userCommentImageBase64}
														alt=""
													/>
												</div>
											</div>
											<div className="right-content">
												<div className="comment-content">
													<div className="header">
														<div className="username">
															<span>{item.userCommentData.username}</span>
														</div>
														<div className="options">
															<div className="option-btn">
																<FontAwesomeIcon icon={faReply} onClick={() => this.handleViewReply(index, item.id)} />
															</div>
															<div className="option-btn">
																<FontAwesomeIcon icon={faFlag} />
															</div>
															{accountInfo && accountInfo.id === item.userCommentData.id && (
																<div className="option-btn">
																	<FontAwesomeIcon
																		icon={faTrash}
																		onClick={() => this.handleDeleteComment(item.id, TYPE.COMMENT)}
																	/>
																</div>
															)}
														</div>
													</div>
													<div className="comment">
														<span>{item.content}</span>
													</div>
												</div>
												<div className="time">
													<span>{commentDate}</span>
												</div>
											</div>
										</div>
										{isViewReply === index && (
											<div className="reply-section">
												{isReply === false ? (
													<div className="btn-container">
														<div className="btn comment-btn" onClick={() => this.handleEnterReply()}>
														<FormattedMessage id="button.reply" />
														</div>
													</div>
												) : (
													<div className="enter-reply-wrapper">
														<div className="enter-reply">
															<textarea
																value={replyContent}
																onChange={(e) => this.handleOnChangeInput(e, 'replyContent')}
															></textarea>
														</div>
														<div className="btn-container">
															<div className="btn comment-btn" onClick={() => this.handleAddReply(item.id)}>
															<FormattedMessage id="button.reply" />
															</div>
															<div className="btn close-btn" onClick={() => this.handleExitReply()}>
															<FormattedMessage id="button.close" />
															</div>
														</div>
													</div>
												)}
												{allReplies &&
													allReplies.length > 0 &&
													allReplies.map((item, index) => {
														let userReplyImageBase64 = '';
														if (item.userReplyData.avatar) {
															userReplyImageBase64 = new Buffer(item.userReplyData.avatar, 'base64').toString('binary');
														}
														const lastReplyDate = new Date(item.createdAt);
														const replyDate = dateCalculation(lastReplyDate);
														return (
															<div className="reply-wrapper" key={index}>
																<div className="reply-content-wrapper">
																	<div className="left-content">
																		<div className="avatar">
																			<img
																				src={userReplyImageBase64 === '' ? images.noUserAvatar : userReplyImageBase64}
																				alt=""
																			/>
																		</div>
																	</div>
																	<div className="right-content">
																		<div className="reply-content">
																			<div className="header">
																				<div className="username">
																					<span>{item.userReplyData.username}</span>
																				</div>
																				<div className="options">
																					<div className="option-btn">
																						<FontAwesomeIcon icon={faFlag} />
																					</div>
																					{accountInfo && accountInfo.id === item.userReplyData.id && (
																						<div className="option-btn">
																							<FontAwesomeIcon
																								icon={faTrash}
																								onClick={() =>
																									this.handleDeleteComment(item.id, TYPE.REPLY, item.commentId)
																								}
																							/>
																						</div>
																					)}
																				</div>
																			</div>
																			<div className="comment">
																				<span>{item.content}</span>
																			</div>
																		</div>
																		<div className="time">
																			<span>{replyDate}</span>
																		</div>
																	</div>
																</div>
															</div>
														);
													})}
											</div>
										)}
									</div>
								);
							})}
					</div>
				</div>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		commentSectionIsOpen: state.app.commentSectionIsOpen,
		allComments: state.app.allComments,
		allReplies: state.app.allReplies,
		accountInfo: state.user.accountInfo,
		bookInfo: state.app.bookInfo,
		chapterInfo: state.app.chapterInfo,
		theme: state.app.theme,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleCloseCommentSection: () => dispatch(actions.handleCloseCommentSection()),
		handleAddComment: (data) => dispatch(actions.handleAddComment(data)),
		handleAddReply: (data) => dispatch(actions.handleAddReply(data)),
		fetchAllComment: (id, type) => dispatch(actions.fetchAllComment(id, type)),
		fetchAllReply: (commentId) => dispatch(actions.fetchAllReply(commentId)),
		handleDeleteComment: (id, type) => dispatch(actions.handleDeleteComment(id, type)),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentSection));

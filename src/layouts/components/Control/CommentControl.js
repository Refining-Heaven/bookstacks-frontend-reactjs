import { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from "@fortawesome/free-regular-svg-icons";
import * as actions from '../../../store/actions'
import { THEMES, withRouter } from '../../../utils';
import './Control.scss';

class CommentControl extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showCommentControl: true,
		};
	}

	componentDidMount() {
	}

	handleOpenCommentSection = () => {
		this.props.handleOpenCommentSection()
	}

	render() {
    const { showCommentControl } = this.state
    const { theme } = this.props
		return (
			<div className={theme === THEMES.LIGHT ? "comment-control" : "comment-control dark-mode"}>
				{showCommentControl === true && (
					<div className="control-btn" onClick={() => this.handleOpenCommentSection()}>
						<FontAwesomeIcon icon={faComment} />
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		theme: state.app.theme
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleOpenCommentSection: () => dispatch(actions.handleOpenCommentSection())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentControl));

import { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from "@fortawesome/free-regular-svg-icons";
import * as actions from '../../../store/actions'
import { withRouter } from '../../../utils';
import './Control.scss';

class CommentControl extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showControl: true,
		};
	}

	componentDidMount() {
	}

	handleOpenCommentSection = () => {
		this.props.handleOpenCommentSection()
	}

	render() {
    const { showControl } = this.state
		return (
			<div className="comment-control">
				{showControl === true && (
					<div className="control-btn" onClick={() => this.handleOpenCommentSection()}>
						<FontAwesomeIcon icon={faComment} />
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleOpenCommentSection: () => dispatch(actions.handleOpenCommentSection())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentControl));

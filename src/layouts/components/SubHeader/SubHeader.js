import { Component } from 'react';
import { connect } from "react-redux";
import { THEMES } from "../../../utils";
import './SubHeader.scss';

class SubHeader extends Component {
	render() {
		const { theme } = this.props
		return (
			<div className={theme === THEMES.LIGHT ? "sub-header" : "sub-header dark-mode"}>
				<div className="sub-header-title">{this.props.title}</div>
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SubHeader);

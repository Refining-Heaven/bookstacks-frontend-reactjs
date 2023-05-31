import { Component } from 'react';
import './SubHeader.scss';

class SubHeader extends Component {
	render() {
		return (
			<div className="sub-header">
				<div className="sub-header-title">{this.props.title}</div>
			</div>
		);
	}
}

export default SubHeader;

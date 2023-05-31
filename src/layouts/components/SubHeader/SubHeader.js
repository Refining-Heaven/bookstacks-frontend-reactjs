import { Component } from 'react';
import './SubHeader.scss';

class SubHeader extends Component {
	render() {
		return (
			<div className="sub-header">
				<h1>{this.props.title}</h1>
			</div>
		);
	}
}

export default SubHeader;

import { Component } from 'react';
import { NavLink } from 'react-router-dom'
import './SidebarNav.scss';

class SidebarNavItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		const { to, title } = this.props;
		return (
			<NavLink className="nav-item" to={to}>
				<span className="title">{title}</span>
			</NavLink>
		);
	}
}

export default SidebarNavItem;

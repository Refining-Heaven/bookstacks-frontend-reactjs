import { Component } from 'react';
import './SidebarNav.scss';

class SidebarNav extends Component {
	render() {
		const { children } = this.props;
		return <nav>{children}</nav>;
	}
}

export default SidebarNav;

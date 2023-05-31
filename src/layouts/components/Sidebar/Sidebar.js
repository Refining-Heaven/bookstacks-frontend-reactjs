import { Component } from 'react';
import { PATH, TITLE } from '../../../utils'
import './Sidebar.scss';
import SidebarNav from '../Sidebar/SidebarNav/SidebarNav';
import SidebarNavItem from "../Sidebar/SidebarNav/SidebarNavItem";

class Sidebar extends Component {
	render() {
		return (
			<div className="sidebar-container">
				<div className="sidebar-content">
					<SidebarNav>
						<SidebarNavItem to={PATH.HOME} title={TITLE.HOME} />
						<SidebarNavItem to={PATH.MANAGE_BOOK} title={TITLE.MANAGE_BOOK} />
					</SidebarNav>
				</div>
			</div>
		);
	}
}

export default Sidebar;

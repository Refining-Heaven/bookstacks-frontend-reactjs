import { Component } from 'react';
import { connect } from "react-redux";
import { GUEST_SIDEBAR, USER_SIDEBAR, ADMIN_SIDEBAR, ROLE } from '../../../utils'
import SidebarNav from '../Sidebar/SidebarNav/SidebarNav';
import SidebarNavItem from "../Sidebar/SidebarNav/SidebarNavItem";
import './Sidebar.scss';

class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentSidebar: '',
		};
	}

	componentDidMount() {
		if (this.props.isLoggedIn === false) {
			this.setState({
				currentSidebar: GUEST_SIDEBAR,
			});
		} else {
			if (this.props.userInfo.role === ROLE.USER) {
				this.setState({
					currentSidebar: USER_SIDEBAR,
				});
			}
			if (this.props.userInfo.role === ROLE.ADMIN) {
				this.setState({
					currentSidebar: ADMIN_SIDEBAR,
				});
			}
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
			if (this.props.isLoggedIn === false) {
				this.setState({
					currentSidebar: GUEST_SIDEBAR,
				});
			} else {
				if (this.props.userInfo.role === ROLE.USER) {
					this.setState({
						currentSidebar: USER_SIDEBAR,
					});
				}
				if (this.props.userInfo.role === ROLE.ADMIN) {
					this.setState({
						currentSidebar: ADMIN_SIDEBAR,
					});
				}
			}
		}
	}
	
	render() {
		const { currentSidebar } = this.state
		return (
			<div className="sidebar-container">
				<div className="sidebar-content">
					<SidebarNav>
						{currentSidebar && currentSidebar.length > 0 &&
							currentSidebar.map((item, index) => {
								return (
									<SidebarNavItem to={item.path} title={item.title} key={index} />
								)
							})
						}
					</SidebarNav>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		userInfo: state.user.userInfo
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

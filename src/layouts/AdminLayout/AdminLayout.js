import { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import { PageControl } from '../components/Control';
import './AdminLayout.scss';

class AdminLayout extends Component {
	render() {
		const { children } = this.props;
		return (
			<div className="wrapper">
				<Header />
				<div className="body-container" onClick={() => this.props.handleCloseOptionsMenu()}>
					<Sidebar />
					<div className="content-container">
						{children}
						<PageControl />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleCloseOptionsMenu: () => dispatch(actions.handleCloseOptionsMenu()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout);

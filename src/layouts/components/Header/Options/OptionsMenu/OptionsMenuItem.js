import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, PATH } from '../../../../../utils';
import * as actions from '../../../../../store/actions';
import SubOptionsMenu from '../SubOptionsMenu/SubOptionsMenu';
import './OptionsMenu.scss';
import { Link } from 'react-router-dom';

class OptionsMenuItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			subOptionsMenuIsOpen: false,
		};
	}

	handleOpenSubOptionsMenu = () => {
		this.setState({
			subOptionsMenuIsOpen: true,
		});
	};

	handleCloseSubOptionsMenu = () => {
		this.setState({
			subOptionsMenuIsOpen: false,
		});
	};

	handleViewAccountInfo = () => {
		this.props.handleCloseOptionsMenu();
		this.props.navigate(PATH.ACCOUNT_INFO);
	};

	handleUserLogout = async () => {
		await Promise.all([
			await this.props.handleUserLogout(),
			await this.props.handleCloseOptionsMenu(),
			window.location.replace('/'),
		]);
	};

	render() {
		const { subOptionsMenuIsOpen } = this.state;
		const { data, isParent } = this.props;
		return (
			<>
				{(() => {
					if (isParent === true) {
						return (
							<div
								className="option-menu-item"
								onClick={() => this.handleOpenSubOptionsMenu()}
								onMouseLeave={() => this.handleCloseSubOptionsMenu()}
							>
								<div className="item-icon">{data.icon}</div>
								<div className="item-title">{data.title}</div>
								{subOptionsMenuIsOpen === true && <SubOptionsMenu items={data.children.data} />}
							</div>
						);
					} else if (data.type === 'LOGIN') {
						return (
							<Link to={PATH.LOGIN}>
								<div className="option-menu-item">
									<div className="item-icon">{data.icon}</div>
									<div className="item-title">{data.title}</div>
								</div>
							</Link>
						);
					}
					if (data.type === 'ACCOUNT') {
						return (
							<div className="option-menu-item" onClick={() => this.handleViewAccountInfo()}>
								<div className="item-icon">{data.icon}</div>
								<div className="item-title">{data.title}</div>
							</div>
						);
					} else if (data.type === 'LOGOUT') {
						return (
							<div className="option-menu-item" onClick={() => this.handleUserLogout()}>
								<div className="item-icon">{data.icon}</div>
								<div className="item-title">{data.title}</div>
							</div>
						);
					}
				})()}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		optionMenuIsOpen: state.app.optionMenuIsOpen,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleUserLogout: () => dispatch(actions.handleUserLogout()),
		handleCloseOptionsMenu: () => dispatch(actions.handleCloseOptionsMenu()),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OptionsMenuItem));

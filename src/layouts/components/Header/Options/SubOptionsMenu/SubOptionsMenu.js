import { Component } from 'react';
import { connect } from "react-redux";
import SubOptionsMenuItem from './SubOptionsMenuItem';
import './SubOptionsMenu.scss';
import { THEMES } from "../../../../../utils";

class SubOptionsMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			SubMenuItemList: [],
		};
	}

	componentDidMount() {
		this.setState({
			SubMenuItemList: this.props.items,
		});
	}

	render() {
		const { SubMenuItemList } = this.state;
		const { theme } = this.props;
		return (
			<div className={theme === THEMES.LIGHT ? "sub-option-menu" : "sub-option-menu dark-mode"}>
				<div className="sub-option-menu-list" tabIndex="-1">
					{SubMenuItemList &&
						SubMenuItemList.length > 0 &&
						SubMenuItemList.map((item, index) => {
							const isParent = !!item.children;
							return <SubOptionsMenuItem key={index} data={item} isParent={isParent} />;
						})}
				</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SubOptionsMenu);

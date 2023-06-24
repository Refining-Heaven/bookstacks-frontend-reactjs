import { Component } from 'react';
import { connect } from "react-redux";
import { THEMES } from "../../../../../utils";
import OptionsMenuItem from './OptionsMenuItem';
import './OptionsMenu.scss';

class OptionsMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			menuItemList: [],
		};
	}

	componentDidMount() {
		this.setState({
			menuItemList: this.props.items,
		});
	}

	render() {
		const { menuItemList } = this.state;
		const { theme } = this.props;
		return (
			<div className={theme === THEMES.LIGHT ? "option-menu" : "option-menu dark-mode"}>
				<div className="option-menu-list" tabIndex="-1">
					{menuItemList &&
						menuItemList.length > 0 &&
						menuItemList.map((item, index) => {
							const isParent = !!item.children;
							return <OptionsMenuItem key={index} data={item} isParent={isParent} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(OptionsMenu);

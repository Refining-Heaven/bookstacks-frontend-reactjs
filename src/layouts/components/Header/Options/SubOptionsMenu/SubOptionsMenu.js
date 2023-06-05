import { Component } from 'react';
import './SubOptionsMenu.scss';
import SubOptionsMenuItem from './SubOptionsMenuItem';

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
		return (
			<div className="sub-option-menu">
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

export default SubOptionsMenu;

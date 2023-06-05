import { Component } from 'react';
import './OptionsMenu.scss';
import OptionsMenuItem from './OptionsMenuItem';

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
		return (
			<div className="option-menu">
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

export default OptionsMenu;

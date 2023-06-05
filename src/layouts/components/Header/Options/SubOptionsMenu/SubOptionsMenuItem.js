import { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions';
import './SubOptionsMenu.scss';

class SubOptionsMenuItem extends Component {
	handleChangeSetting = (type, value) => {
		if (type === 'LANGUAGE') {
			this.props.handleChangeLanguage(value);
		}
		if (type === 'THEME') {
			this.props.handleChangeTheme(value);
		}
	};

	render() {
		const { data, language, theme } = this.props;
		return (
			<div
				className={language === data.value || theme === data.value ? 'sub-option-menu-item active' : 'sub-option-menu-item'}
				onClick={() => this.handleChangeSetting(data.type, data.value)}
			>
				<div className="sub-item-icon">{data.icon}</div>
				<div className="sub-item-title">{data.title}</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		theme: state.app.theme
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleChangeLanguage: (language) => dispatch(actions.handleChangeLanguage(language)),
		handleChangeTheme: (theme) => dispatch(actions.handleChangeTheme(theme)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SubOptionsMenuItem);

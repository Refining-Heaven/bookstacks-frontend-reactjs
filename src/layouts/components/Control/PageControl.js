import { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from '../../../utils';
import './Control.scss';

class PageControl extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showControl: false,
		};
	}

	componentDidMount() {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 200) {
				this.setState({
					showControl: true,
				});
			} else {
				this.setState({
					showControl: false,
				});
			}
		});
	}

	handleScrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	render() {
    const { showControl } = this.state
		return (
			<div className="page-control">
				{showControl === true && (
					<div className="control-btn" onClick={() => this.handleScrollToTop()}>
						<FontAwesomeIcon icon={faChevronUp} />
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageControl));

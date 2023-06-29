import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as actions from './store/actions';
import { ROLE } from './utils';
import { guestRoutes, userRoutes, adminRoutes } from './routes';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentRoutes: '',
		};
	}

	componentDidMount() {
		if (this.props.isLoggedIn === false) {
			this.setState({
				currentRoutes: guestRoutes,
			});
		} else {
			if (this.props.accountInfo.role === ROLE.USER) {
				this.setState({
					currentRoutes: userRoutes,
				});
			}
			if (this.props.accountInfo.role === ROLE.ADMIN) {
				this.setState({
					currentRoutes: adminRoutes,
				});
			}
		}
		if (this.props.isLoggedIn === true && this.props.accountInfo !== null) {
			this.props.fetchAccountInfo(this.props.accountInfo.id);
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
			if (this.props.isLoggedIn === false) {
				this.setState({
					currentRoutes: guestRoutes,
				});
			} else {
				if (this.props.accountInfo.role === ROLE.USER) {
					this.setState({
						currentRoutes: userRoutes,
					});
				}
				if (this.props.accountInfo.role === ROLE.ADMIN) {
					this.setState({
						currentRoutes: adminRoutes,
					});
				}
			}
		}
		if (prevProps.accountInfo !== this.props.accountInfo) {
			if (this.props.accountInfo && !!this.props.accountInfo.banned === true) {
				this.props.handleUserLogout()
			}
		}
	}

	render() {
		const { currentRoutes } = this.state;
		return (
			<Router basename="">
				<div className="App">
					<Routes>
						{currentRoutes &&
							currentRoutes.length > 0 &&
							currentRoutes.map((route, index) => {
								let Layout = route.layout;
								const Page = route.page;
								if (route.layout === null) {
									Layout = Fragment;
								}
								return (
									<Route
										key={index}
										path={route.path}
										element={
											<Layout>
												<Page />
											</Layout>
										}
									/>
								);
							})}
					</Routes>
					<ToastContainer
						position="bottom-right"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="light"
					/>
				</div>
			</Router>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		started: state.app.started,
		isLoggedIn: state.user.isLoggedIn,
		accountInfo: state.user.accountInfo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAccountInfo: (userId) => dispatch(actions.fetchAccountInfo(userId)),
		handleUserLogout: () => dispatch(actions.handleUserLogout()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

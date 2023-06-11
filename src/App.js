import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ROLE } from "./utils";
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
			if (this.props.userInfo.role === ROLE.USER) {
				this.setState({
					currentRoutes: userRoutes,
				});
			}
			if (this.props.userInfo.role === ROLE.ADMIN) {
				this.setState({
					currentRoutes: adminRoutes,
				});
			}
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
			if (this.props.isLoggedIn === false) {
				this.setState({
					currentRoutes: guestRoutes,
				});
			} else {
				if (this.props.userInfo.role === ROLE.USER) {
					this.setState({
						currentRoutes: userRoutes,
					});
				}
				if (this.props.userInfo.role === ROLE.ADMIN) {
					this.setState({
						currentRoutes: adminRoutes,
					});
				}
			}
		}
	}

	render() {
		const { currentRoutes } = this.state
		return (
			<Router basename="">
				<div className="App">
						<Routes>
							{currentRoutes && currentRoutes.length > 0 &&
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
		userInfo: state.user.userInfo
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

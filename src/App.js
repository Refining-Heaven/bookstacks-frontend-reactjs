import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { publicRoutes } from './routes';
import CustomScrollbars from './custom/CustomScrollbars';

class App extends Component {
	render() {
		return (
			<Router basename="">
				<div className="App">
					<CustomScrollbars style={{ height: '100vh', width: '100%' }}>
						<Routes>
							{publicRoutes.map((route, index) => {
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
					</CustomScrollbars>
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
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

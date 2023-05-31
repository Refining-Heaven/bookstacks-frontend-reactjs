import { Component } from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";


class ManageLayout extends Component {
  render() {
    const { children } = this.props;
		return (
			<div className="wrapper">
				<Header />
				<div className="body-container">
					<Sidebar />
					<div className="content-container">	
						{children}
					</div>
				</div>
			</div>
		);
  }
}

export default ManageLayout
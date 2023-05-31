import { Component } from "react";
import './GlobalStyles.scss';

class GlobalStyles extends Component {
  render() {
    const { children } = this.props
    return children
  }
}

export default GlobalStyles

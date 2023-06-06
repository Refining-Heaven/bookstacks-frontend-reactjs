import { Component } from 'react';
import { TITLE } from "../../../utils";
import SubHeader from "../../../layouts/components/SubHeader/SubHeader";
import './ManageUser.scss'

class ManageUser extends Component {
  render() {
    return (
      <>
        <SubHeader title={TITLE.MANAGE_USER} />
      </>
    )
  }
}

export default ManageUser
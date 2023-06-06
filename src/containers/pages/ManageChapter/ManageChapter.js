import { Component } from 'react';
import { TITLE } from "../../../utils";
import SubHeader from "../../../layouts/components/SubHeader/SubHeader";
import './ManageChapter.scss'

class ManageChapter extends Component {
  render() {
    return (
      <>
        <SubHeader title={TITLE.MANAGE_CHAPTER} />
      </>
    )
  }
}

export default ManageChapter
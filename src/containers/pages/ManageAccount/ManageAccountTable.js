import { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import './ManageAccount.scss';

class ManageAccountTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
    };
	}

  componentDidMount() {
    this.props.fetchAllAccount()
  }

  handleFetchSelectedAccountInfo = (userId) => {
    this.props.fetchSelectedAccountInfo(userId)
  }

	render() {
		const { language, allAccounts } = this.props;
		return (
			<div className="manage-account-table">
				<div className="table-wrapper">
					<table>
						<thead>
							<tr>
								<th className="account-username">
									<FormattedMessage id="label.username" />
								</th>
								<th className="account-email">
									<FormattedMessage id="label.email" />
								</th>
                <th className="account-role">
									<FormattedMessage id="label.role" />
								</th>
                <th className="account-banned">
									<FormattedMessage id="label.banned" />
								</th>
							</tr>
						</thead>
						<tbody>
							{allAccounts &&
								allAccounts.length > 0 &&
								allAccounts.map((item, index) => {
									return (
										<tr key={index} onClick={() => this.handleFetchSelectedAccountInfo(item.id)}>
											<td className="account-username">{item.username}</td>
											<td className="account-email">{item.email}</td>
											<td className="account-role">{language === LANGUAGES.VI ? item.roleData.valueVi : item.roleData.valueEn}</td>
											<td className="account-banned">{!!item.banned === false ? (
															<FormattedMessage id="button.no" />
														) : (
															<FormattedMessage id="button.yes" />
														)}</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
    allAccounts: state.app.allAccounts
  };
};

const mapDispatchToProps = (dispatch) => {
	return {
    fetchAllAccount: () => dispatch(actions.fetchAllAccount()),
    fetchSelectedAccountInfo: (userId) => dispatch(actions.fetchSelectedAccountInfo(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccountTable);

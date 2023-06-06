import { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import * as actions from '../../../../store/actions';
import './SearchBar.scss';
import SearchItem from './SearchItem';

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchValue: '',
			isLoading: false,
			timer: null,
		};
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.clearSearchValue !== this.props.clearSearchValue) {
			if (this.props.clearSearchValue === true)
				this.setState({
					searchValue: '',
				});
		}
	}

	handleOnChangeInput = (e) => {
		const searchValue = e.target.value;
		this.setState({
			searchValue: searchValue,
			isLoading: true,
		});
		if (searchValue === '') {
			this.setState({
				isLoading: false,
			});
			this.props.clearBooksFound();
		}
		if (searchValue !== '') {
			clearTimeout(this.state.timer);
			const newTimer = setTimeout(async () => {
				await this.props.fetchAllBookByName(this.state.searchValue);
				this.setState({
					isLoading: false,
				});
			}, 500);
			this.setState({
				timer: newTimer,
			});
		}
	};

	handleClearSearch = () => {
		this.setState({
			searchValue: '',
		});
		this.props.clearBooksFound();
	};

	render() {
		const { searchValue, isLoading } = this.state;
		const { booksFound } = this.props;
		return (
			<>
				<div className="search">
					<FormattedMessage id="placeholder.search">
						{(placeholder) => (
							<input placeholder={placeholder} value={searchValue} onChange={(e) => this.handleOnChangeInput(e)} />
						)}
					</FormattedMessage>
					{(() => {
						if (!!searchValue && isLoading === false) {
							return (
								<div className="clear-icon" onClick={() => this.handleClearSearch()}>
									<FontAwesomeIcon icon={faXmarkCircle} />
								</div>
							);
						}
					})()}
					{isLoading === true && <FontAwesomeIcon className="loading-icon" icon={faSpinner} />}
					<button className="search-btn" onMouseDown={(e) => e.preventDefault()}>
						<FontAwesomeIcon icon={faMagnifyingGlass} />
					</button>
				</div>
				{(() => {
					if (booksFound && booksFound.length > 0) {
						return (
							<div className="search-result">
								{booksFound.map((item, index) => {
									return <SearchItem data={item} key={index} />;
								})}
							</div>
						);
					}
				})()}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		booksFound: state.app.booksFound,
		clearSearchValue: state.app.clearSearchValue,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllBookByName: (name) => dispatch(actions.fetchAllBookByName(name)),
		clearBooksFound: () => dispatch(actions.clearBooksFound()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

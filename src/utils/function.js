import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage } from "react-intl";

export function withRouter(Child) {
	return (props) => {
		const location = useLocation();
		const navigate = useNavigate();
		const params = useParams();
		return <Child {...props} navigate={navigate} location={location} params={params} />;
	};
}

export function convertStringToAddressBar(str) {
	str = str.toLowerCase();
	str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
	str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
	str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
	str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
	str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
	str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
	str = str.replace(/đ/g, 'd');
	str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323|\u02C6|\u0306|\u031B/g, '');
	str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]| |~|\$|_|`|-|{|}|\||\\/g, '-');
	str = str.replace(/-+-| - /g, '-');
	str = str.replace(/ + /g, '');
	str = str.replace(/^\-+|\-+$/g, '');
	return str;
}

export function dateCalculation(lastDate) {
	const currentDate = new Date();
	const secs = Math.floor(Math.abs(currentDate - lastDate) / 1000);
	if (secs >= 60) {
		const mins = Math.floor(secs / 60);
		if (mins >= 60) {
			const hours = Math.floor(mins / 60);
			if (hours >= 24) {
				const days = Math.floor(hours / 24);
				return (
					<>
						<span>{days}</span>&nbsp;
						<FormattedMessage id="date.day-ago" />
					</>
				)
			} else {
				return (
					<>
						<span>{hours}</span>&nbsp;
						<FormattedMessage id="date.hour-ago" />
					</>
				)
			}
		} else {
			return (
				<>
					<span>{mins}</span>&nbsp;
					<FormattedMessage id="date.min-ago" />
				</>
			)
		}
	} else {
		return (
			<>
				<span>{secs}</span>&nbsp;
				<FormattedMessage id="date.sec-ago" />
			</>
		)
	}
}

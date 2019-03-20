export default function (str) {
	let month = ['Янв','Фев','Мар','Апр','Мая','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'];
	return str.split("-")[2] + " " + month[str.split("-")[1] - 1];
}
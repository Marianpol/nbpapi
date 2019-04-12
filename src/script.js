function getUrl(url){
	const req = new XMLHttpRequest();
	req.open('GET', url, false);
	req.send(null);
	return req.responseText;
}
let obiekt = JSON.parse(getUrl('http://api.nbp.pl/api/exchangerates/tables/A/?format=json'));
let mainTable = document.getElementById('main-table');
let userTable = document.getElementById('user-table');

function tableNamesDrawing(obj){
	let table = '<table border="1"';
	for (let i = 0; i < obj[0].rates.length;i++){
		table += `<tr><td>${obj[0].rates[i].currency}</td>
		          <td>${obj[0].rates[i].code}</td>
		          <td>${obj[0].rates[i].mid}</td></tr> `;
	}
	table += '</table>'
	mainTable.innerHTML = table;
}
tableNamesDrawing(obiekt);

function userTableDrawing(utable){
	let table = '<table border="1"';
	for (let i = 0; i < utable[0].rates.length;i++){
		table += `<tr><td>${utable[0].rates[i].mid}</td></tr>`;
	}
	table += '</table>';
	userTable.innerHTML = table;
}

(function getExchangeRateDate(){
	let date = window.location.href;
	date = date.slice(date.indexOf('=') + 1);
	let chosenRates = JSON.parse(getUrl(`http://api.nbp.pl/api/exchangerates/tables/A/${date}/?format=json`));
	userTableDrawing(chosenRates);
})();




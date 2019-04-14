//let latestExchangeRates = JSON.parse(getUrl('http://api.nbp.pl/api/exchangerates/tables/A/?format=json'));
let latestExchangeRates = 'http://api.nbp.pl/api/exchangerates/tables/A/?format=json';
let mainTable = document.getElementById('main-table');
let userTable = document.getElementById('user-table');

const makeRequest = function (url){
	const req = new XMLHttpRequest();
	return new Promise(function(res, rej){
		req.onreadystatechange = function(){
			if(readyState !== 4) return;
			if(req.status >= 200 && req.status < 300){
				res(req);
			}else{
				rej({
					status: req.status,
					statusText: req.statusText,
				})	
			}
		}
		req.open('GET',url,flase);
		req.send();
	});
}

fetch(latestExchangeRates)
	.then(response => {
		return response.json();
	})
	.then(data => {
		drawExchangeRatesTable(data);
		console.log(data);
	})
	.catch(err => {
		console.log('Something went wrong', err);
	})

function drawExchangeRatesTable(data){
	const rates = data[0].rates;
	let table = '<table border="1"';
	for (let rate of rates){
		table += `<tr><td>${rate.currency}</td>
		          <td>${rate.code}</td>
		          <td>${rate.mid}</td></tr> `;
	}
	table += '</table>'
	mainTable.innerHTML = table;
}


/*function userTableDrawing(utable){
	let table = '<table border="1"';
	for (let i = 0; i < utable[0].rates.length;i++){
		table += `<tr><td>${utable[0].rates[i].mid}</td></tr>`;
	}
	table += '</table>';
	userTable.innerHTML = table;
}*/

/*(function getExchangeRateDate(){
	let date = window.location.href;
	date = date.slice(date.indexOf('=') + 1);
	let chosenRates = JSON.parse(getUrl(`http://api.nbp.pl/api/exchangerates/tables/A/${date}/?format=json`));
	userTableDrawing(chosenRates);
})();*/

/*function getUrl(url){
	const req = new XMLHttpRequest();
	req.open('GET', url, false);
	req.send();
	return req.responseText;
}*/



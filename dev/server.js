const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const SeatCodeChain = require('./seatCodeChain');

const seatCodeChain = new SeatCodeChain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var usedSeatCodes = [];
var availableSeatCodes = [
	'1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
];


app.get('/', function(req, res) {
	res.json('Hello World');
});

app.get('/seatCodeChain', function(req, res) {
	res.json(seatCodeChain);
});

app.get('/availableSeatCodes', function(req, res) {
	res.json(availableSeatCodes);
});

app.post('/requestSeatCode', function(req, res) {
	if (availableSeatCodes && availableSeatCodes.length) {		
		var errors = [];
		if (!req.body.companyCode && req.body.companyCode == '') {
			errors.push('companyCode value is required');
		}
		if (!req.body.empCode && req.body.empCode == '') {
			errors.push('companyCode value is required');
		}
		if (errors && errors.length) {
			res.json({
				'status': 'ERROR',
				'error': errors
			});
		} else {
			availableSeatCodes = availableSeatCodes.sort(function (a, b) {
									    if (parseInt(a) < parseInt(b)) 
									    	return -1;
									    return 1;
									});
			const seatCodeIndex = seatCodeChain.requestSeatCode(req.body.companyCode, req.body.empCode, availableSeatCodes[0]);
			if (seatCodeIndex) {
				usedSeatCodes.push(availableSeatCodes.shift());
				res.json({
					'status': 'SUCCESS',
					'msg' : 'Seatcode request raised successfully',
					'result': [{
						'seatCodeIndex': seatCodeIndex,
						'availableSeatCodes': availableSeatCodes
					}]
				});
			} else {
				res.json({
					'status': 'WARNING',
					'msg' : 'Failed to raise a seatcode, please wait for some time',
					'result': []
				});
			}			
		}		
	} else {
		res.json({
			'status': 'WARNING',
			'msg' : 'No available seatcodes exist to raise the request, please wait for some time',
			'result': []
		});
	}
	
	
});

app.get('/mining', function(req, res) {
	const lastSeatCodeBlock = seatCodeChain.getLastSeat();
	const previousHash = lastSeatCodeBlock.previousHash;

	const currentSeatCodeBlockData = {
		index: lastSeatCodeBlock.index + 1,
		seatCodes:  seatCodeChain.pendingSeatCodes
	};

	if (currentSeatCodeBlockData.seatCodes && currentSeatCodeBlockData.seatCodes.length) {
		const nonce = seatCodeChain.proofOfWork(previousHash, currentSeatCodeBlockData);
		const currentBlockHash = seatCodeChain.hashData(currentSeatCodeBlockData, previousHash, nonce);
		const newSeatCodeBlock = seatCodeChain.createSeatCode(previousHash, currentBlockHash, nonce);
		var lastSeatCode;
		if (availableSeatCodes && availableSeatCodes.length) {
			lastSeatCode = availableSeatCodes[availableSeatCodes.length - 1];
		} else {
			lastSeatCode = usedSeatCodes[usedSeatCodes.length - 1];
		}
		//add new seatCodes to the blockchain
		var lastIndex = (lastSeatCode / 2) + 1;
		for (let index = 1; index <= lastIndex; index ++) {
			availableSeatCodes.push((parseInt(lastSeatCode) + index) + '');
			if (index ==  lastIndex) {
				res.json({
					status: 'SUCCESS',
					msg: 'New seatCode block mined successfully',
					result: newSeatCodeBlock
				});
			}
		}
	} else {
		res.json({
			status: 'SUCCESS',
			msg: 'No pending requests availale for mining',
			result: []
		});
	}
		
});

// set app defaults
var app_host = process.env.HOST || 'localhost';
var app_port = process.env.PORT || 9009;

// lift the app
app.listen(app_port, app_host, function (){
    console.log('Seatcode - A blockchain app listening on host: http://' + app_host + ':' + app_port);    
}).on('error', function (err){
    if(err.code === 'EADDRINUSE'){
        console.error('Error starting app: Port ' + app_port + ' already in use, choose another');
    }else{
        console.error('Error starting app: ' + err);
        app.emit('error');
    }
});
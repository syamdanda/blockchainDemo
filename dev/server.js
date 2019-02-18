const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const SeatCodeChain = require('./seatCodeChain');

const seatCodeChain = new SeatCodeChain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', function(req, res) {
	res.json('Hello World');
});

app.get('/seatCodeChain', function(req, res) {
	res.json(seatCodeChain);
});

app.post('/requestSeatCode', function(req, res) {
	const seatCodeIndex = seatCodeChain.requestSeatCode(req.body.companyCode, req.body.empCode, req.body.seatCode);
	res.json({'result' : 'seatCode request successfully raised and the seatCodeIndex is : ' + seatCodeIndex});
});

app.get('/mining', function(req, res) {
	const lastSeatCodeBlock = seatCodeChain.getLastSeat();
	const previousHash = lastSeatCodeBlock.previousHash;

	const currentSeatCodeBlockData = {
		index: lastSeatCodeBlock.index + 1,
		seatCodes:  seatCodeChain.pendingSeatCodes
	};

	const nonce = seatCodeChain.proofOfWork(previousHash, currentSeatCodeBlockData);
	const currentBlockHash = seatCodeChain.hashData(currentSeatCodeBlockData, previousHash, nonce);
	const newSeatCodeBlock = seatCodeChain.createSeatCode(previousHash, currentBlockHash, nonce);

	res.json({
		status: 'SUCCESS',
		result: 'New seatCode block mined successfully at'
	});
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
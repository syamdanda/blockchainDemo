
const _ = require('underscore');
const sha256 = require('sha256');

function SeatCodeChain() {
	this.seatCodes = [];
	this.pendingSeatCodes = [];

	// Genesis Block..
	this.createSeatCode('0', '00', 0);
}

SeatCodeChain.prototype.createSeatCode = function (previousHash, currentHash, nonce) {
	const seatCodeObj = {
		'index': this.seatCodes.length + 1,
		'timestamp': new Date().getTime(),
		'seatCodes': this.pendingSeatCodes,
		'nonce': nonce,
		'previousHash': previousHash,
		'hash': currentHash
	}
	this.seatCodes.push(seatCodeObj);
	this.pendingSeatCodes = [];
	return seatCodeObj;
}

SeatCodeChain.prototype.getSeat = function(hash) {
	return _.find(this.seatCodes, function(seatCodeObj) { 
		return seatCodeObj.hash == hash; 
	});
}

SeatCodeChain.prototype.getGenesisSeat = function() {
	return this.seatCodes[0];
}

SeatCodeChain.prototype.getLastSeat = function() {
	return this.seatCodes[this.seatCodes.length - 1];
}

SeatCodeChain.prototype.requestSeatCode = function(companyCode, empCode, seatCode) {
	const seatCodeInfo = {
		'companyCode': companyCode,
		'empCode': empCode,
		'seatCode': seatCode,
		'status': 'WAITING'
	};

	this.pendingSeatCodes.push(seatCodeInfo);

	return this.getLastSeat()['index'] + 1;
}

SeatCodeChain.prototype.hashData = function(currentSeatCodeBlockData, previousHash, nonce) {
	return sha256(nonce + previousHash + JSON.stringify(currentSeatCodeBlockData));
}

SeatCodeChain.prototype.proofOfWork = function(previousHash, currentSeatCodeBlockData) {
	
	let nonce = 0;
	let hash = this.hashData(currentSeatCodeBlockData, previousHash, nonce);
	while (hash.substring(0, 5) != '00000') {
		//console.log('nonce :: ' + nonce);
		nonce ++;
		hash = this.hashData(currentSeatCodeBlockData, previousHash, nonce);
	}
	//console.log(hash);
	return nonce;
}

module.exports = SeatCodeChain;
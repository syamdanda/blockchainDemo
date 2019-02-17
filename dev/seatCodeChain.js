
const _ = require('underscore');
const sha256 = require('sha256');

function SeatCodeChain() {
	this.seatCodes = [];
	this.pendingSeatCodes = [];;

	// Genesis Block..
	this.createSeatCode('0', '00', 0);
}

SeatCodeChain.prototype.createSeatCode = function (previousHash, currentHash, nounce) {
	const seatCodeObj = {
		'index': this.seatCodes.length + 1,
		'timestamp': new Date().getTime(),
		'seatCodeInfo': this.seatCodeInfo,
		'nounce': nounce,
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

SeatCodeChain.prototype.hashData = function(seatCodeInfo, previousHash, nounce) {
	return sha256(nounce + previousHash + JSON.stringify(seatCodeInfo));
}

SeatCodeChain.prototype.proofOfWork = function(previousHash, seatCodeInfo) {
	
	let nounce = 0;
	let hash = this.hashData(seatCodeInfo, previousHash, nounce);
	while (hash.substring(0, 2) != '00') {
		//console.log('nounce :: ' + nounce);
		nounce ++;
		hash = this.hashData(seatCodeInfo, previousHash, nounce);
	}

	//console.log(hash);

	return nounce;
}

module.exports = SeatCodeChain;
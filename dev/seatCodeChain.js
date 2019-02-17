
const _ = require('underscore');

function SeatCodeChain() {
	this.seatCodes = [];
	this.seatCodeInfo = {
		'companyCode': null,
		'empCode': null,
		'seatCode': null,
		'status': 'WAITING'
	};
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
	this.seatCodeInfo = {};
	return seatCodeObj;
}

SeatCodeChain.prototype.getSeat = function(hash) {
	return _.find(this.seatCodes, function(seatCodeObj) { 
		return seatCodeObj.hash == hash; 
	});
}

SeatCodeChain.prototype.getOriginSeat = function() {
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

	this.seatCodeInfo = seatCodeInfo;

	return this.getLastSeat()['index'] + 1;
}

module.exports = SeatCodeChain;
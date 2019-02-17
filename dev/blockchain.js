
const _ = require('underscore');

function SeatCodeChain() {
	this.seatCodes = [];
	this.seatCodeInfo = {
		'empId': 0,
		'seatCode': null
	};
}

SeatCodeChain.prototype.createBlock = function (previousHash, currentHash, nounce) {
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
	return this.seatCodes[this.SeatCodeChain.length - 1];
}
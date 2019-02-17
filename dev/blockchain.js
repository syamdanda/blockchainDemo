
const _ = require('underscore');

function Blockchain() {
	this.blockChain = [];
	this.data = [];
}

Blockchain.prototype.createBlock = function (previousHash, currentHash, nounce) {
	const block = {
		index: this.blockChain.length + 1,
		timestamp: new Date().getTime(),
		data: this.data,
		nounce: nounce,
		previousHash: previousHash,
		hash: currentHash
	}
	this.blockChain.push(block);
	this.data = [];
	return block;
}

Blockchain.prototype.getBlock = function(hash) {
	return _.find(this.data, function(block) { 
		return block.hash == hash; 
	});
}

Blockchain.prototype.getOriginBlock = function() {
	return this.data[0];
}

Blockchain.prototype.getLastBlock = function() {
	return this.data[this.data.length - 1];
}

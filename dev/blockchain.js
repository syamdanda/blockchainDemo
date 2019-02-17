
const _ = require('underscore');

function Blockchain() {
	this.blockChain = [];
	this.records = [];
}

Blockchain.prototype.createBlock = function (previousHash, currentHash, nounce) {
	const block = {
		index: this.blockChain.length + 1,
		timestamp: new Date().getTime(),
		records: this.records,
		nounce: nounce,
		previousHash: previousHash,
		hash: currentHash
	}
	this.blockChain.push(block);
	this.records = [];
	return block;
}

Blockchain.prototype.getBlock = function(hash) {
	return _.find(this.blockChain, function(block) { 
		return block.hash == hash; 
	});
}

Blockchain.prototype.getOriginBlock = function() {
	return this.blockChain[0];
}

Blockchain.prototype.getLastBlock = function() {
	return this.blockChain[this.blockChain.length - 1];
}
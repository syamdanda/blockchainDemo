
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
		currentHash: currentHash
	}
	this.blockChain.push(block);
	this.data = [];
	return block;
}



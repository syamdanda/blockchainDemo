const SeatCodeChain = require('./seatCodeChain');

const seatCode = new SeatCodeChain();

console.log(JSON.stringify(seatCode, null, 2));


seatCode.createSeatCode('A0', 'A1', 123);

seatCode.requestSeatCode('C1', 'EMP1', 'SEAT1');
seatCode.requestSeatCode('C1', 'EMP2', 'SEAT2');
seatCode.requestSeatCode('C1', 'EMP3', 'SEAT3');

console.log(JSON.stringify(seatCode, null, 2));

//seatCode.createSeatCode('A1', 'A2', 321);

//console.log(seatCode.proofOfWork('A123', seatCode.seatCodes[1].seatCodeInfo));

const SeatCodeChain = require('./seatCodeChain');

const seatCode = new SeatCodeChain();

seatCode.createSeatCode('A0', 'A1', 123);

seatCode.requestSeatCode('C1', 'EMP1', 'SEAT1');

seatCode.createSeatCode('A1', 'A2', 321);

console.log(seatCode.seatCodes[1]);
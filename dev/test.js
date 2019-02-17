const SeatCodeChain = require('./seatCodeChain');

const seatCode = new SeatCodeChain();

seatCode.createSeatCode('A0DFGHJYU', 'A1RTYUJBVD', 123);

seatCode.requestSeatCode('C1', 'EMP1', 'SEAT1');

console.log(seatCode);
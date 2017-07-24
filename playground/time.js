const moment = require('moment');

// let date = new Date();

// console.log(date.getMonth());

let ts = moment().valueOf();
console.log(ts);

let createdAt = 1234;
let date = moment(createdAt);
console.log(date.format('h:mm a'));
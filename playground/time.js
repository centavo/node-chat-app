var moment = require('moment');

var createdAt = 12345
var date = moment(createdAt);

console.log(date.format('h:mm a'))

var someTimestamp = moment().valueOf();
console.log(someTimestamp);

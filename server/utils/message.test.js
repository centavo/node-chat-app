var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = 'Penny';
    var text = 'This is a test message';
    var res = generateMessage(from, text);
    console.log(res);
      expect(res).toInclude({from, text});
      expect(res.createdAt).toBeA('number');
  });
});
// const expect = require('expect');
// const utils = require('./utils');
//
// describe('Utils', () => {
//   describe('#add', () => {
//     it('should add two numbers', () => {
//       var res = utils.add(33, 11);
//       expect(res).toBe(44).toBeA('number');
//     });

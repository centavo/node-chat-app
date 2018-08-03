var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = 'Penny';
    var text = 'This is a test message';
    var res = generateMessage(from, text);
      expect(res).toInclude({from, text});
      expect(res.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate the correct location object', () => {
    var from = 'Penny';
    var latitude = 123;
    var longitude = -456;
    var url = 'https://www.google.com/maps?q=123,-456'
    var res = generateLocationMessage(from, latitude, longitude);
      expect(res.createdAt).toBeA('number');
      expect(res).toInclude({from, url});
  });
});

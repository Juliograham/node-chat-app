const expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    let from = 'John';
    let text = 'Example text';
    let message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({
        from,
        text
    });
  });
});

describe('generateLocationMessage', () => {
  it('should generate current location object', () => {
    let from = 'Harry';
    let latitude = 10;
    let longitude = 20;
    let url = 'https://www.google.com/maps?q=10,20';
    let message = generateLocationMessage(from, latitude, longitude);
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({
        from,
        url
    });
  });
});
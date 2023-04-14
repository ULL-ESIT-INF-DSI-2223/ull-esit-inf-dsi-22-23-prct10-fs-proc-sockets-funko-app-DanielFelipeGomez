import 'mocha';
import {expect} from 'chai';
import {EventEmitter} from 'events';
import {MessageEventEmitterClient} from '../src/eventEmitterClient.js';
import net from 'net';


describe('MessageEventEmitterClient', () => {
  it('Should emit a message event once it gets a complete message', (done) => {
    const socket = new EventEmitter();
    const client = new MessageEventEmitterClient(socket);

    client.on('message', (message) => {
      expect(message).to.be.eql({'type': 'change', 'prev': 13, 'curr': 26});
      done();
    });

    socket.emit('data', '{"type": "change", "prev": 13');
    socket.emit('data', ', "curr": 26}');
    socket.emit('data', '\n');
  });

  it('Should emit a message event once it gets a complete message', (done) => {
    const client = net.connect({port: 60300});

    client.write(JSON.stringify({'comando': 'ls', 'args': ['-l']}) + "\n")

    let wholeData = '';
    client.on('data', (dataChunk) => {
      wholeData += dataChunk;

      let messageLimit = wholeData.indexOf('\n');
        while (messageLimit !== -1) {
          const message = JSON.parse(wholeData.substring(0, messageLimit).toString());
          wholeData = wholeData.substring(messageLimit + 1);
          expect(message.salida)
          messageLimit = wholeData.indexOf('\n');
        }
    });
    
  });
})
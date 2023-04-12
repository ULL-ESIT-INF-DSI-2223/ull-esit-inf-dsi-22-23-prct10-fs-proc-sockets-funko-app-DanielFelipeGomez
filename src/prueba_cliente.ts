import { ClientRequest } from 'http';
import net from 'net';

const client = net.connect({port: 60300});

let lista = []
for (let i = 3; i < process.argv.length; i++) {
  lista.push(process.argv[i])
}


client.write(JSON.stringify({'comando': process.argv[2], 'args': lista}) + "\n")

let wholeData = '';
client.on('data', (dataChunk) => {
  wholeData += dataChunk;

  let messageLimit = wholeData.indexOf('\n');
    while (messageLimit !== -1) {
      const message = JSON.parse(wholeData.substring(0, messageLimit).toString());
      wholeData = wholeData.substring(messageLimit + 1);
      console.log(message.salida)
      messageLimit = wholeData.indexOf('\n');
    }
});

client.on('end', () => {
  const message = JSON.parse(wholeData);
});


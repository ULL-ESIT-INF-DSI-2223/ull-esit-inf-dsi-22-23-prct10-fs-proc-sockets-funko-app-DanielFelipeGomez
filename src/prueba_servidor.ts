import net from 'net';
import {watchFile} from 'fs';
import {spawn} from 'child_process';


net.createServer((connection) => {
  console.log('A client has connected.');

  let wholeData = '';
  connection.on('data', (comando) => {
    wholeData += comando;

    let messageLimit = wholeData.indexOf('\n');
    while (messageLimit !== -1) {
      const message = JSON.parse(wholeData.substring(0, messageLimit).toString());
      wholeData = wholeData.substring(messageLimit + 1);
      const cat = spawn(message.comando, message.args);
      cat.stdout.pipe(process.stdout);
      let out = ''
      cat.stdout.on('data', (piece) => out += piece);
      cat.on('close', () => {
        connection.write(JSON.stringify({'salida': out}) + "\n")
      })
      messageLimit = wholeData.indexOf('\n');
    }
  })




  connection.on('close', () => {
    console.log('A client has disconnected.');
  });
}).listen(60300, () => {
  console.log('Waiting for clients to connect.');
});
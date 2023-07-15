const https = require('https');
const { networkInterfaces } = require('os');

const nets = networkInterfaces();
Object.entries(nets).forEach(([name, value]) => {
  value.forEach(net => {
    (!net.internal) && console.log(name, net.family, net.cidr)
  })
});

https.get('https://myip.wtf/text', response => {
  const raw = [];
  response.on('data', chunk => raw.push(chunk));
  response.on('end', () => console.log(Buffer.concat(raw).toString().trim()));
}).on('error', error => { console.log('Error: ', error.message); });

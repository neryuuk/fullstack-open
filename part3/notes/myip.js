const https = require('https');
const { networkInterfaces } = require('os');

const get = (url) => https.get(url, response => {
  const raw = [];
  response.on('data', chunk => raw.push(chunk));
  response.on('end', () => {
    const data = Buffer.concat(raw).toString().trim()
    data.split('\n').forEach(row => {
      const items = row.trim().split(',')
      console.log([
        items && items[0] ? items[0].trim() : null,
        items && items[1] ? items[1].trim() : null,
      ].join(' '))
    })
  })
}).on('error', error => {
  console.error('Error:', error.message)
})

const interfaces = () => {
  const nets = networkInterfaces();
  Object.entries(nets).forEach(([name, value]) => {
    value.forEach(net => {
      (!net.internal) && console.log(name, net.family, net.cidr)
    })
  })
}

interfaces()
get('https://ip4only.me/api/')
get('https://ip6only.me/api/')

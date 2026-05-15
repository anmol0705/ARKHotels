const https = require('https');

const titles = [
  'Lalpur, Ranchi',
  'Khadgarha Bus Stand',
  'HEC Ranchi',
  'Ranchi Junction railway station',
  'BIT Mesra'
].join('|');

const options = {
  hostname: 'en.wikipedia.org',
  path: `/w/api.php?action=query&titles=${encodeURIComponent(titles)}&prop=pageimages&format=json&pithumbsize=800`,
  method: 'GET',
  headers: {
    'User-Agent': 'ARKHotelsAgent/1.0 (test@example.com)'
  }
};

const req = https.request(options, res => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    console.log(JSON.stringify(JSON.parse(data), null, 2));
  });
});

req.on('error', error => {
  console.error(error);
});

req.end();

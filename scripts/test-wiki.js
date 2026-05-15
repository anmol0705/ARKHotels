const https = require('https');

const options = {
  hostname: 'en.wikipedia.org',
  path: '/w/api.php?action=query&titles=Hundru_Falls&prop=pageimages&format=json&pithumbsize=800',
  method: 'GET',
  headers: {
    'User-Agent': 'ARKHotelsAgent/1.0 (test@example.com)'
  }
};

const req = https.request(options, res => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    console.log(data);
  });
});

req.on('error', error => {
  console.error(error);
});

req.end();

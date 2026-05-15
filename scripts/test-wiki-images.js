const https = require('https');

const titles = [
  'Birsa Munda Airport',
  'Ranchi Junction railway station',
  'Ranchi Lake',
  'Rock Garden, Ranchi',
  'Pahari Mandir',
  'Jagannath Temple, Ranchi',
  'Bhagwan Birsa Biological Park',
  'Dassam Falls',
  'Jonha Falls',
  'Hundru Falls',
  'JSCA International Stadium Complex'
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
    const json = JSON.parse(data);
    const pages = json.query.pages;
    const results = Object.values(pages).map(p => {
      return {
        title: p.title,
        hasImage: !!p.thumbnail,
        imageUrl: p.thumbnail ? p.thumbnail.source : null
      }
    });
    console.log(JSON.stringify(results, null, 2));
  });
});

req.on('error', error => {
  console.error(error);
});

req.end();

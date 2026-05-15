const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = path.join(__dirname, '../public/images/explore');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Map of file names to Unsplash photo IDs that represent the location type
const imageMap = {
  // Business
  'samford-hospital.jpg': '1519494026892-80bbd2d6fd0d',
  'kokar-industrial-area.jpg': '1496247749665-49cf5b1022e9',
  'upper-bazar.jpg': '1533900298318-6b8da08a523e',
  'lalpur.jpg': '1449844908441-8829872d2607',
  'dipatoli.jpg': '1486406146926-c627a92ad1ab',
  'passport-office.jpg': '1497366216548-37526070297c',
  'ranchi-junction.jpg': '1474487548417-781cb71495f3',
  'khelgaon.jpg': '1504450758481-7338eba7524a',
  'psu-belt.jpg': '1496247749665-49cf5b1022e9',
  'birsa-munda-airport.jpg': '1436491865332-7a61a109cc05',
  'namkum-industrial-area.jpg': '1496247749665-49cf5b1022e9',
  'bit-mesra.jpg': '1449844908441-8829872d2607',

  // Leisure
  'ranchi-lake.jpg': '1476514525535-07fb3b4ae5f1',
  'rock-garden.jpg': '1476514525535-07fb3b4ae5f1',
  'pahari-mandir.jpg': '1582555172866-f73bb12a2ab3',
  'jagannath-temple.jpg': '1582555172866-f73bb12a2ab3',
  'nakshatra-van.jpg': '1476514525535-07fb3b4ae5f1',
  'biological-park.jpg': '1476514525535-07fb3b4ae5f1',
  'dassam-falls.jpg': '1476611317561-60117649dd94',
  'jonha-falls.jpg': '1476611317561-60117649dd94',
  'hundru-falls.jpg': '1476611317561-60117649dd94',

  // Transit (unique)
  'khadgarha-bus-stand.jpg': '1544620347-c4fd4a3d5957', // Bus station
};

async function downloadImage(filename, photoId) {
  const url = `https://images.unsplash.com/photo-${photoId}?w=800&q=80`;
  const filePath = path.join(targetDir, filename);

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      // Follow redirects
      if (res.statusCode === 301 || res.statusCode === 302) {
        https.get(res.headers.location, (redirectRes) => {
          const stream = fs.createWriteStream(filePath);
          redirectRes.pipe(stream);
          stream.on('finish', () => resolve(filePath));
          stream.on('error', reject);
        }).on('error', reject);
        return;
      }

      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${filename}: HTTP ${res.statusCode}`));
        return;
      }

      const stream = fs.createWriteStream(filePath);
      res.pipe(stream);
      stream.on('finish', () => resolve(filePath));
      stream.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  console.log(`Downloading ${Object.keys(imageMap).length} images...`);
  const promises = [];
  
  for (const [filename, photoId] of Object.entries(imageMap)) {
    promises.push(
      downloadImage(filename, photoId)
        .then(() => console.log(`✓ Downloaded ${filename}`))
        .catch(err => console.error(`✗ Error downloading ${filename}: ${err.message}`))
    );
  }

  await Promise.all(promises);
  console.log('Finished downloading all images!');
}

main();

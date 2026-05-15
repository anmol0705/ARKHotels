const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = path.join(__dirname, '../public/images/explore');

const wikiMap = {
  'jonha-falls.jpg': 'Jonha Falls',
  'jagannath-temple.jpg': 'Jagannath Temple, Ranchi',
  'birsa-munda-airport.jpg': 'Birsa Munda Airport',
  'dassam-falls.jpg': 'Dassam Falls',
  'hundru-falls.jpg': 'Hundru Falls',
  'khelgaon.jpg': 'JSCA International Stadium Complex',
  'ranchi-junction.jpg': 'Ranchi Junction railway station',
  'pahari-mandir.jpg': 'Pahari Mandir'
};

async function downloadImage(url, filePath) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'ARKHotelsAgent/1.0 (https://arkhotelsranchi.in; stay@arkhotelsranchi.in)',
      'Accept': 'image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
    }
  });
  if (!res.ok) throw new Error(`Failed to download: HTTP ${res.status}`);
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(filePath, buffer);
  return filePath;
}

async function fetchWikiThumbnail(title) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=800`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'ARKHotelsAgent/1.0 (https://arkhotelsranchi.in; stay@arkhotelsranchi.in)'
    }
  });
  if (!res.ok) throw new Error(`API failed: HTTP ${res.status}`);
  const json = await res.json();
  const pages = json.query.pages;
  const page = Object.values(pages)[0];
  if (page && page.thumbnail && page.thumbnail.source) {
    return page.thumbnail.source;
  }
  return null;
}

async function main() {
  console.log(`Fetching ${Object.keys(wikiMap).length} real Wikipedia images...`);
  
  for (const [filename, title] of Object.entries(wikiMap)) {
    try {
      const url = await fetchWikiThumbnail(title);
      if (url) {
        const filePath = path.join(targetDir, filename);
        await downloadImage(url, filePath);
        console.log(`✓ Replaced ${filename} with real photo of ${title}`);
      } else {
        console.log(`✗ No thumbnail found for ${title}`);
      }
    } catch (err) {
      console.error(`✗ Error on ${title}: ${err.message}`);
    }
  }

  console.log('Finished updating images!');
}

main();

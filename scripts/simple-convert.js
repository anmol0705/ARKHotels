const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function main() {
  const input = process.argv[2];
  const output = process.argv[3];
  try {
    await sharp(input).toFormat('webp').toFile(output);
    console.log(`Successfully converted ${input} to ${output}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}
main();

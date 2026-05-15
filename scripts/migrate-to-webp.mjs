import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_IMAGES_DIR = path.join(__dirname, '../public/images');

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.avif'];

function getAllFolders(dir) {
  let results = [dir];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory() && !file.startsWith('old_')) {
      results = results.concat(getAllFolders(filePath));
    }
  }
  return results;
}

function processFolder(folderPath) {
  const folderName = path.basename(folderPath);
  // Special case for root
  const actualFolderName = folderPath === PUBLIC_IMAGES_DIR ? 'images' : folderName;
  const oldFolderName = `old_${actualFolderName}`;
  const oldFolderPath = path.join(folderPath, oldFolderName);

  console.log(`\n📂 Processing: ${folderPath}`);

  // 1. Ensure old folder exists
  if (!fs.existsSync(oldFolderPath)) {
    fs.mkdirSync(oldFolderPath, { recursive: true });
  }

  // 2. Identify images in CURRENT folder
  const files = fs.readdirSync(folderPath);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (IMAGE_EXTENSIONS.includes(ext)) {
      const inputPath = path.join(folderPath, file);
      if (fs.statSync(inputPath).isFile()) {
        const outputName = path.parse(file).name + '.webp';
        const outputPath = path.join(folderPath, outputName);
        const archivePath = path.join(oldFolderPath, file);

        console.log(`  🔄 Converting: ${file} -> ${outputName}`);
        try {
          execSync(`npx --package sharp node scripts/simple-convert.js "${inputPath}" "${outputPath}"`, { stdio: 'inherit' });
          fs.renameSync(inputPath, archivePath);
          console.log(`  ✓ Done & Archived: ${file}`);
        } catch (err) {
          console.error(`  ✗ Failed: ${file} - ${err.message}`);
        }
      }
    }
  }

  // 3. Identify images in OLD folder that don't have webp in parent
  if (fs.existsSync(oldFolderPath)) {
    const oldFiles = fs.readdirSync(oldFolderPath);
    for (const file of oldFiles) {
      const ext = path.extname(file).toLowerCase();
      if (IMAGE_EXTENSIONS.includes(ext)) {
        const inputPath = path.join(oldFolderPath, file);
        const outputName = path.parse(file).name + '.webp';
        const outputPath = path.join(folderPath, outputName);

        if (!fs.existsSync(outputPath)) {
          console.log(`  🔄 Converting from archive: ${file} -> ${outputName}`);
          try {
            execSync(`npx --package sharp node scripts/simple-convert.js "${inputPath}" "${outputPath}"`, { stdio: 'inherit' });
            console.log(`  ✓ Done: ${file}`);
          } catch (err) {
            console.error(`  ✗ Failed archive: ${file} - ${err.message}`);
          }
        }
      }
    }
  }
}

const folders = getAllFolders(PUBLIC_IMAGES_DIR);
for (const folder of folders) {
  processFolder(folder);
}

console.log('\n✨ All done!');

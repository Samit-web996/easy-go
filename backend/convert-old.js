import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const directoryPath = './uploads';

async function convertExistingImages() {
  try {
    // Folder exists ya nahi check karo
    if (!fs.existsSync(directoryPath)) {
      console.log("Could'nt find upload file!! Please check path.");
      return;
    }

    const files = fs.readdirSync(directoryPath);

    console.log(`📁 Total ${files.length} files mili hain. Processing shuru...\n`);

    for (const file of files) {

      const ext = path.extname(file).toLowerCase();

      if (ext === '.jpg' || ext === '.png') {

        const inputPath = path.join(directoryPath, file);
        const outputName = path.basename(file, ext) + '.webp';
        const outputPath = path.join(directoryPath, outputName);

        console.log(`🔄 Converting: ${file} ➜ ${outputName}`);

        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);

        if (fs.existsSync(outputPath)) {

          fs.unlinkSync(inputPath);

          console.log(`🗑️ Deleted Old File: ${file}`);
        } else {
          console.log(`❌ Conversion failed for: ${file}`);
        }
      }
    }

    console.log('\n🎉 Saari images successfully WebP mein convert ho gayi!');

  } catch (err) {
    console.error('❌ Error aaya:', err);
  }
}

convertExistingImages();

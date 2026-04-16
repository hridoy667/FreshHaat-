import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';

/**
 * Clean, Compress, and Save images to the public directory.
 * @param file The Multer file buffer
 * @param subDirectory The folder inside /public (e.g. 'shops', 'avatars')
 */
export async function processAndSaveImage(
  file: Express.Multer.File,
  subDirectory: string,
): Promise<string> {
  // 1. Path Management
  const uploadDir = path.join(process.cwd(), 'public', subDirectory);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // 2. Filename Sanitization
 
  const timestamp = Date.now();
  const safeName = file.originalname
    .split('.')[0]                   // Get name without extension
    .replace(/\s+/g, '-')           // Spaces to hyphens
    .replace(/[^a-zA-Z0-9-]/g, '')  // Remove special chars
    .toLowerCase();

  const fileName = `${timestamp}-${safeName}.webp`; 
  const filePath = path.join(uploadDir, fileName);

  // 3. Image Processing (The Sweet Spot)
  await sharp(file.buffer)
    .resize(1000, 1000, { 
      fit: 'inside', 
      withoutEnlargement: true 
    })
    .webp({ quality: 75 }) // 75-80 quality offers huge size savings with no visible loss
    .toFile(filePath);

  // 4. Return the path for the Database
  return `/public/${subDirectory}/${fileName}`;
}
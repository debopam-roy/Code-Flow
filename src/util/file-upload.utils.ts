import * as sharp from 'sharp';
import { memoryStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';

export async function compressImage(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer).resize(200, 200).jpeg({ quality: 80 }).toBuffer();
}

export const multerOptions = {
  storage: memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_, file, cb) => {
    const allowedMimeTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp',
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new BadRequestException('Invalid file type. Only images are allowed!'),
        false,
      );
    }
  },
};

import multer from 'multer';
import { join } from 'path';
import nanoid from 'nanoid';

export const diskStorage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, join(__dirname, '../assets/avatar'));
  },
  filename(req, file, callback) {
    callback(null, `${nanoid.nanoid()}.${file.mimetype.split('/')[1]}`);
  },
});

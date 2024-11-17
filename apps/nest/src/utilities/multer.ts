import multer from 'multer';
import { join } from 'path';
import nanoid from 'nanoid';

export const diskStorage = multer.diskStorage({
  destination(req, file, callback) {
    console.log(__dirname);
    callback(
      null,
      join(
        __dirname,
        process.env.NODE_ENV === 'test'
          ? '../assets/avatar'
          : '../../src/assets/avatar',
      ),
    );
  },
  filename(req, file, callback) {
    callback(null, `${nanoid.nanoid()}.${file.mimetype.split('/')[1]}`);
  },
});

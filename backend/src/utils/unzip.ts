import * as path from 'path';
import * as yauzl from 'yauzl';
import * as mkdirp from 'mkdirp';
import * as fs from 'fs';

export const unzipBuffer = (buffer: Buffer, unzipToDir: string) => {
  return new Promise<void>((resolve, reject) => {
    try {
      // Create folder if not exists
      mkdirp.sync(unzipToDir);

      // Same as example we open the zip.
      yauzl.fromBuffer(buffer, { lazyEntries: true }, (err, zipFile) => {
        if (err) {
          zipFile.close();
          reject(err);
          return;
        }

        // This is the key. We start by reading the first entry.
        zipFile.readEntry();

        // Now for every entry, we will write a file or dir
        // to disk. Then call zipFile.readEntry() again to
        // trigger the next cycle.
        zipFile.on('entry', (entry) => {
          try {
            // Directories
            if (/\/$/.test(entry.fileName)) {
              // Create the directory then read the next entry.
              mkdirp.sync(path.join(unzipToDir, entry.fileName));
              zipFile.readEntry();
            }
            // Files
            else {
              // Write the file to disk.
              zipFile.openReadStream(entry, (readErr, readStream) => {
                if (readErr) {
                  zipFile.close();
                  reject(readErr);
                  return;
                }

                const file = fs.createWriteStream(
                  path.join(unzipToDir, entry.fileName),
                );
                readStream.pipe(file);
                file.on('finish', () => {
                  // Wait until the file is finished writing, then read the next entry.
                  file.close(() => {
                    zipFile.readEntry();
                  });

                  file.on('error', (err) => {
                    zipFile.close();
                    reject(err);
                  });
                });
              });
            }
          } catch (e) {
            zipFile.close();
            reject(e);
          }
        });
        zipFile.on('end', () => {
          resolve();
        });
        zipFile.on('error', (err) => {
          zipFile.close();
          reject(err);
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};

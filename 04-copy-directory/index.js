const fs = require('fs');
const path = require('path');

fs.rm(
  path.join(__dirname, 'files-copy'),
  { recursive: true, force: true },
  (error) => {
    if (error) return console.error(error.message);

    fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, () => {});
    fs.readdir(
      path.join(__dirname, 'files'),
      { withFileTypes: true },
      (error, data) => {
        if (error) return console.error(error.message);

        data.forEach((file) => {
          if (file.isFile()) {
            fs.copyFile(
              path.join(__dirname, 'files', file.name),
              path.join(__dirname, 'files-copy', file.name),
              (error) => {
                if (error) return console.error(error.message);
              },
            );
          }
        });
      },
    );
  },
);
